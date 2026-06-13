const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// All routes require authentication
router.use(auth);

// GET /api/tasks — get all tasks for authenticated user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/tasks/stats — get task statistics
router.get('/stats', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });

    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === 'Pending').length;
    const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const overdue = tasks.filter(
  (t) =>
    t.dueDate &&
    t.status !== 'Completed' &&
    new Date(t.dueDate) < new Date()
).length;
    res.json({
  total,
  pending,
  inProgress,
  completed,
  overdue,
  completionPercentage,
});
  } catch (error) {
    console.error('Get stats error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/tasks — create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/tasks/:id — update a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Update task error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/tasks/:id — delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
