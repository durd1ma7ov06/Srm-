import express from 'express';
import { dbRun, dbAll, dbGet } from '../database.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

const FREE_DELIVERY_FROM = 100000;
const DELIVERY_FEE = 15000;

// Create a new order
router.post('/', authMiddleware, async (req, res) => {
  const { items, address, phone } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0 || !address || !phone) {
    return res.status(400).json({ error: 'Noto\'g\'ri buyurtma ma\'lumotlari' });
  }

  try {
    // Calculate totals based on backend prices
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await dbGet('SELECT * FROM products WHERE id = ?', [item.id]);
      if (!product) {
        return res.status(400).json({ error: `Mahsulot topilmadi: ${item.name || item.id}` });
      }

      const itemQty = Number(item.qty) || 1;
      const cleanPrice = parseInt(String(product.price).replace(/\s/g, ''), 10);
      const itemDiscount = product.discount || 0;
      const finalPrice = itemDiscount > 0 ? Math.round(cleanPrice * (1 - itemDiscount / 100)) : cleanPrice;

      subtotal += finalPrice * itemQty;
      validatedItems.push({
        id: product.id,
        qty: itemQty,
        price: finalPrice
      });
    }

    const deliveryFee = subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
    const totalAmount = subtotal + deliveryFee;

    // Start transaction or write sequentially
    const orderResult = await dbRun(
      'INSERT INTO orders (user_id, status, total_amount, delivery_fee, address, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, 'pending', totalAmount, deliveryFee, address, phone]
    );
    const orderId = orderResult.lastID;

    // Save order items
    for (const item of validatedItems) {
      await dbRun(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.id, item.qty, item.price]
      );
    }

    res.status(201).json({
      message: 'Buyurtmangiz qabul qilindi',
      orderId,
      totalAmount,
      deliveryFee
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server xatoligi yuz berdi' });
  }
});

// Get user orders list
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await dbAll(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server xatoligi' });
  }
});

// Get specific order details (including items)
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const order = await dbGet(
      'SELECT * FROM orders WHERE id = ? AND (user_id = ? OR ? = "admin")',
      [id, req.user.id, req.user.role]
    );

    if (!order) {
      return res.status(404).json({ error: 'Buyurtma topilmadi' });
    }

    const items = await dbAll(
      `SELECT oi.id, oi.quantity as qty, oi.price, p.name, p.image, p.unit
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [id]
    );

    res.json({ ...order, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server xatoligi' });
  }
});

export default router;
