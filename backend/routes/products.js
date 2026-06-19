import express from 'express';
import { dbAll, dbGet } from '../database.js';

const router = express.Router();

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await dbAll(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.id
    `);
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server xatoligi' });
  }
});

// Get all products (with optional search, category, deal, top parameters)
router.get('/', async (req, res) => {
  const { category, search, deal, top } = req.query;

  let query = `
    SELECT p.*, c.name_uz as category_name_uz, c.name_ru as category_name_ru, c.name_en as category_name_en, c.slug as category_slug
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;
  const params = [];

  if (category) {
    query += ' AND c.slug = ?';
    params.push(category);
  }

  if (search) {
    // Search across all three language name fields
    query += ' AND (p.name_uz LIKE ? OR p.name_ru LIKE ? OR p.name_en LIKE ?)';
    const searchParam = `%${search}%`;
    params.push(searchParam, searchParam, searchParam);
  }

  if (deal === 'true' || deal === '1') {
    query += ' AND p.deal = 1';
  }

  if (top === 'true' || top === '1') {
    query += ' AND p.top = 1';
  }

  try {
    const products = await dbAll(query, params);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server xatoligi' });
  }
});

// Get category details by slug
router.get('/categories/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const cat = await dbGet('SELECT * FROM categories WHERE slug = ?', [slug]);
    if (!cat) {
      return res.status(404).json({ error: 'Kategoriya topilmadi' });
    }
    res.json(cat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server xatoligi' });
  }
});

// Get single product details
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await dbGet(`
      SELECT p.*, c.name_uz as category_name_uz, c.name_ru as category_name_ru, c.name_en as category_name_en, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [id]);

    if (!product) {
      return res.status(404).json({ error: 'Mahsulot topilmadi' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server xatoligi' });
  }
});

export default router;
