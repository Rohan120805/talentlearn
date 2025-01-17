// backend/routes/adminModule.js
import express from 'express';
import Module from '../models/Module.js';

const router = express.Router();

// new module
router.post('/', async (req, res) => {
  const { title, author, description, skillsAcquired, videos } = req.body;
  if (!title || !author || !description || !skillsAcquired || !videos) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const module = new Module({ title, author, description, skillsAcquired, videos });
    await module.save();
    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update an existing module
router.put('/:id', async (req, res) => {
  const { title, author, description, skillsAcquired, videos } = req.body;
  if (!title || !author || !description || !skillsAcquired || !videos) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, { title, author, description, skillsAcquired, videos }, { new: true });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a module
router.delete('/:id', async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.json({ message: 'Module deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;