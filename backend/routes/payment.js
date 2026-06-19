import express from 'express';
import crypto from 'crypto';
import { dbRun, dbGet } from '../database.js';

const router = express.Router();

// Helper to compute MD5 hash for Click signatures
const md5 = (str) => crypto.createHash('md5').update(str).digest('hex');

// ==========================================
// 💳 CLICK TO'LOV INTEGRATSIYASI
// ==========================================
router.post('/click', async (req, res) => {
  const {
    click_trans_id,
    service_id,
    click_paydoc_id,
    merchant_trans_id, // order_id
    amount,
    action,
    error,
    sign_time,
    sign_string,
  } = req.body;

  // 1. Click sign_string imzosini tekshirish
  const secretKey = process.env.CLICK_SECRET_KEY || 'TEST_CLICK_SECRET_KEY_HERE';
  const mySign = md5(
    `${click_trans_id}${service_id}${click_paydoc_id}${merchant_trans_id}${amount}${action}${sign_time}${secretKey}`
  );

  if (mySign !== sign_string) {
    return res.json({ error: -1, error_note: 'Imzo xatosi (Signature mismatch)' });
  }

  // Click xatoligi yuborgan bo'lsa
  if (parseInt(error) < 0) {
    return res.json({ error: -9, error_note: 'Click to\'lov xatoligi' });
  }

  const orderId = Number(merchant_trans_id);

  try {
    // 2. Buyurtmani bazadan tekshirish
    const order = await dbGet('SELECT * FROM orders WHERE id = ?', [orderId]);
    if (!order) {
      return res.json({ error: -5, error_note: 'Buyurtma topilmadi' });
    }

    // Narxni solishtirish (Click yuborgan summa so'mda keladi)
    if (Math.round(order.total_amount) !== Math.round(Number(amount))) {
      return res.json({ error: -2, error_note: 'Noto\'g\'ri summa' });
    }

    if (order.status === 'paid' && action === 0) {
      return res.json({ error: -4, error_note: 'Buyurtma allaqachon to\'langan' });
    }

    // 3. Action = 0 (Prepare)
    if (Number(action) === 0) {
      // Tranzaksiyani tekshirish yoki yaratish
      let transaction = await dbGet('SELECT * FROM transactions WHERE payment_id = ?', [click_trans_id]);
      if (!transaction) {
        await dbRun(
          'INSERT INTO transactions (order_id, payment_system, payment_id, amount, state) VALUES (?, ?, ?, ?, ?)',
          [orderId, 'click', click_trans_id, amount, 1] // state 1: created/prepare
        );
      }
      return res.json({
        click_trans_id,
        merchant_trans_id,
        merchant_prepare_id: click_trans_id,
        error: 0,
        error_note: 'Success',
      });
    }

    // 4. Action = 1 (Complete)
    if (Number(action) === 1) {
      const transaction = await dbGet('SELECT * FROM transactions WHERE payment_id = ?', [click_trans_id]);
      
      if (!transaction) {
        return res.json({ error: -6, error_note: 'Tranzaksiya topilmadi' });
      }

      if (transaction.state === 2) {
        return res.json({
          click_trans_id,
          merchant_trans_id,
          merchant_confirm_id: click_trans_id,
          error: 0,
          error_note: 'Success (Already paid)',
        });
      }

      // Tranzaksiyani yopish va buyurtmani 'paid' qilish
      const now = new Date().toISOString();
      await dbRun(
        'UPDATE transactions SET state = ?, perform_at = ? WHERE payment_id = ?',
        [2, now, click_trans_id] // state 2: performed
      );
      await dbRun('UPDATE orders SET status = ? WHERE id = ?', ['paid', orderId]);

      return res.json({
        click_trans_id,
        merchant_trans_id,
        merchant_confirm_id: click_trans_id,
        error: 0,
        error_note: 'Success',
      });
    }

    return res.json({ error: -3, error_note: 'Noma\'lum amal (Action)' });
  } catch (err) {
    console.error(err);
    return res.json({ error: -7, error_note: 'Ichki server xatoligi' });
  }
});

// ==========================================
// 💳 PAYME TO'LOV INTEGRATSIYASI (JSON-RPC 2.0)
// ==========================================
router.post('/payme', async (req, res) => {
  // 1. Basic Auth tekshirish
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.json({
      jsonrpc: '2.0',
      id: req.body.id,
      error: { code: -32504, message: 'Avtorizatsiya xatosi' }
    });
  }

  const token = authHeader.split(' ')[1];
  const decoded = Buffer.from(token, 'base64').toString('ascii');
  const [user, key] = decoded.split(':');
  const expectedKey = process.env.PAYME_MERCHANT_KEY || 'TEST_PAYME_SECRET_KEY_HERE';

  if (key !== expectedKey) {
    return res.json({
      jsonrpc: '2.0',
      id: req.body.id,
      error: { code: -32504, message: 'Avtorizatsiya xatosi' }
    });
  }

  const { method, params, id } = req.body;

  try {
    switch (method) {
      case 'CheckPerformTransaction': {
        const orderId = Number(params.account.order_id);
        const amount = Number(params.amount);

        const order = await dbGet('SELECT * FROM orders WHERE id = ?', [orderId]);
        if (!order) {
          return res.json({
            jsonrpc: '2.0',
            id,
            error: { code: -31050, message: { uz: 'Buyurtma topilmadi', ru: 'Заказ не найден' } }
          });
        }

        // Payme tiyinlarda yuboradi (1 so'm = 100 tiyin)
        if (Math.round(order.total_amount * 100) !== amount) {
          return res.json({
            jsonrpc: '2.0',
            id,
            error: { code: -31001, message: { uz: 'Noto\'g\'ri summa', ru: 'Неверная сумма' } }
          });
        }

        if (order.status === 'paid') {
          return res.json({
            jsonrpc: '2.0',
            id,
            error: { code: -31051, message: { uz: 'Buyurtma allaqachon to\'langan', ru: 'Заказ уже оплачен' } }
          });
        }

        return res.json({ jsonrpc: '2.0', id, result: { allow: true } });
      }

      case 'CreateTransaction': {
        const orderId = Number(params.account.order_id);
        const amount = Number(params.amount);
        const paymeId = params.id;

        const order = await dbGet('SELECT * FROM orders WHERE id = ?', [orderId]);
        if (!order) {
          return res.json({
            jsonrpc: '2.0',
            id,
            error: { code: -31050, message: { uz: 'Buyurtma topilmadi', ru: 'Заказ не найден' } }
          });
        }

        if (Math.round(order.total_amount * 100) !== amount) {
          return res.json({
            jsonrpc: '2.0',
            id,
            error: { code: -31001, message: { uz: 'Noto\'g\'ri summa', ru: 'Неверная сумма' } }
          });
        }

        // Mavjud tranzaksiyani tekshirish
        const existingTx = await dbGet('SELECT * FROM transactions WHERE payment_id = ?', [paymeId]);
        if (existingTx) {
          if (existingTx.state !== 1) {
            return res.json({
              jsonrpc: '2.0',
              id,
              error: { code: -31008, message: { uz: 'Tranzaksiya holati noto\'g\'ri', ru: 'Неверный статус транзакции' } }
            });
          }
          return res.json({
            jsonrpc: '2.0',
            id,
            result: {
              create_time: new Date(existingTx.created_at).getTime(),
              transaction: String(existingTx.id),
              state: 1
            }
          });
        }

        // Boshqa order uchun yaratilgan bo'lsa
        const activeTxForOrder = await dbGet('SELECT * FROM transactions WHERE order_id = ? AND state = 1', [orderId]);
        if (activeTxForOrder) {
          return res.json({
            jsonrpc: '2.0',
            id,
            error: { code: -31052, message: { uz: 'Buyurtma to\'lov jarayonida', ru: 'Заказ в процессе оплаты' } }
          });
        }

        // Yangi tranzaksiya yaratish
        const now = new Date().toISOString();
        const txResult = await dbRun(
          'INSERT INTO transactions (order_id, payment_system, payment_id, amount, state, created_at) VALUES (?, ?, ?, ?, ?, ?)',
          [orderId, 'payme', paymeId, amount, 1, now]
        );

        return res.json({
          jsonrpc: '2.0',
          id,
          result: {
            create_time: new Date(now).getTime(),
            transaction: String(txResult.lastID),
            state: 1
          }
        });
      }

      case 'PerformTransaction': {
        const paymeId = params.id;
        const tx = await dbGet('SELECT * FROM transactions WHERE payment_id = ?', [paymeId]);

        if (!tx) {
          return res.json({
            jsonrpc: '2.0',
            id,
            error: { code: -31003, message: { uz: 'Tranzaksiya topilmadi', ru: 'Транзакция не найдена' } }
          });
        }

        if (tx.state === 2) {
          return res.json({
            jsonrpc: '2.0',
            id,
            result: {
              transaction: String(tx.id),
              perform_time: new Date(tx.perform_at).getTime(),
              state: 2
            }
          });
        }

        if (tx.state !== 1) {
          return res.json({
            jsonrpc: '2.0',
            id,
            error: { code: -31008, message: { uz: 'Tranzaksiyani yakunlab bo\'lmaydi', ru: 'Невозможно выполнить транзакцию' } }
          });
        }

        const now = new Date().toISOString();
        await dbRun(
          'UPDATE transactions SET state = 2, perform_at = ? WHERE id = ?',
          [now, tx.id]
        );
        await dbRun('UPDATE orders SET status = ? WHERE id = ?', ['paid', tx.order_id]);

        return res.json({
          jsonrpc: '2.0',
          id,
          result: {
            transaction: String(tx.id),
            perform_time: new Date(now).getTime(),
            state: 2
          }
        });
      }

      case 'CancelTransaction': {
        const paymeId = params.id;
        const reason = Number(params.reason);
        const tx = await dbGet('SELECT * FROM transactions WHERE payment_id = ?', [paymeId]);

        if (!tx) {
          return res.json({
            jsonrpc: '2.0',
            id,
            error: { code: -31003, message: { uz: 'Tranzaksiya topilmadi', ru: 'Транзакция не найдена' } }
          });
        }

        if (tx.state === 2) {
          // performed bo'lsa cancel state -2 bo'ladi
          const now = new Date().toISOString();
          await dbRun(
            'UPDATE transactions SET state = -2, cancel_at = ?, cancel_reason = ? WHERE id = ?',
            [now, reason, tx.id]
          );
          await dbRun('UPDATE orders SET status = ? WHERE id = ?', ['cancelled', tx.order_id]);

          return res.json({
            jsonrpc: '2.0',
            id,
            result: {
              transaction: String(tx.id),
              cancel_time: new Date(now).getTime(),
              state: -2
            }
          });
        }

        if (tx.state === 1) {
          // created bo'lsa cancel state -1 bo'ladi
          const now = new Date().toISOString();
          await dbRun(
            'UPDATE transactions SET state = -1, cancel_at = ?, cancel_reason = ? WHERE id = ?',
            [now, reason, tx.id]
          );
          await dbRun('UPDATE orders SET status = ? WHERE id = ?', ['cancelled', tx.order_id]);

          return res.json({
            jsonrpc: '2.0',
            id,
            result: {
              transaction: String(tx.id),
              cancel_time: new Date(now).getTime(),
              state: -1
            }
          });
        }

        // Alla qachon cancel qilingan bo'lsa
        return res.json({
          jsonrpc: '2.0',
          id,
          result: {
            transaction: String(tx.id),
            cancel_time: new Date(tx.cancel_at).getTime(),
            state: tx.state
          }
        });
      }

      case 'CheckTransaction': {
        const paymeId = params.id;
        const tx = await dbGet('SELECT * FROM transactions WHERE payment_id = ?', [paymeId]);

        if (!tx) {
          return res.json({
            jsonrpc: '2.0',
            id,
            error: { code: -31003, message: { uz: 'Tranzaksiya topilmadi', ru: 'Транзакция не найдена' } }
          });
        }

        return res.json({
          jsonrpc: '2.0',
          id,
          result: {
            create_time: new Date(tx.created_at).getTime(),
            perform_time: tx.perform_at ? new Date(tx.perform_at).getTime() : 0,
            cancel_time: tx.cancel_at ? new Date(tx.cancel_at).getTime() : 0,
            transaction: String(tx.id),
            state: tx.state,
            reason: tx.cancel_reason || null
          }
        });
      }

      default: {
        return res.json({
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: 'Metod topilmadi' }
        });
      }
    }
  } catch (err) {
    console.error(err);
    return res.json({
      jsonrpc: '2.0',
      id,
      error: { code: -32400, message: 'Ichki server xatosi' }
    });
  }
});

export default router;
