// backend/routes/module.js
import express from 'express';
import Module from '../models/Module.js';

const router = express.Router();

// GET all modules
router.get('/', async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific module by ID
router.get('/:id', async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;