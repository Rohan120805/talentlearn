// backend/routes/adminInternship.js
import express from 'express';
import Internship from '../models/Internship.js';

const router = express.Router();

// POST a new internship
router.post('/', async (req, res) => {
  const { title, companyName, description, skillsRequired, location, deadline, link, image } = req.body;
  try {
    const internship = new Internship({ title, companyName, description, skillsRequired, location, deadline, link, image });
    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// PUT to update an existing internship
router.put('/:id', async (req, res) => {
  const { title, companyName, description, skillsRequired, location, deadline, link, image } = req.body;
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, { title, companyName, description, skillsRequired, location, deadline, link, image }, { new: true });
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(internship);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// DELETE an internship
router.delete('/:id', async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json({ message: 'Internship deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;