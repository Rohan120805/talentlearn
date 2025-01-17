// backend/routes/internship.js
import express from 'express';
import Internship from '../models/Internship.js';

const router = express.Router();

// GET all internships
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific internship by ID
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;