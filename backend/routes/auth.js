import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbRun, dbGet } from '../database.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }

  try {
    // Check if email already exists
    const existingUser = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'Ushbu email orqali allaqachon ro\'yxatdan o\'tilgan' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await dbRun(
      'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || null, hashedPassword, 'user']
    );

    const token = jwt.sign(
      { id: result.lastID, email, role: 'user' },
      process.env.JWT_SECRET || 'nihol_super_secret_jwt_key_2026_safe',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz',
      token,
      user: { id: result.lastID, name, email, phone, role: 'user' }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server xatoligi yuz berdi' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { login, password } = req.body; // login can be email or phone

  if (!login || !password) {
    return res.status(400).json({ error: 'Login va parol kiritilishi shart' });
  }

  try {
    // Check by email or phone
    const user = await dbGet('SELECT * FROM users WHERE email = ? OR phone = ?', [login, login]);
    if (!user) {
      return res.status(400).json({ error: 'Email/telefon raqam yoki parol xato' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Email/telefon raqam yoki parol xato' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'nihol_super_secret_jwt_key_2026_safe',
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Muvaffaqiyatli kirdingiz',
      token,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server xatoligi yuz berdi' });
  }
});

// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await dbGet('SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?', [req.user.id]);
    if (!user) {
      return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server xatoligi yuz berdi' });
  }
});

export default router;
