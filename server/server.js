const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Assuming .env is in the root of your project
const sequelize = require('../db'); // Adjust the path as necessary
const Activity = require('../models/Activity');  // Adjust paths as necessary
const User = require('../models/User'); // Assuming you have a User model for authentication


// Middleware
const authenticate = require('../middleware/authenticate'); // Adjust path as necessary


// Authentication and Task Routes
const authRouter = require('../routes/authRoutes'); // Adjust path as necessary
const taskRoutes = require('../routes/taskRoutes'); // Adjust the path as necessary


const app = express();
app.use(express.json()); // Middleware to parse JSON bodies


//Use Routes
app.use('/api', authRouter);
app.use('/api/tasks', taskRoutes);

// Development-specific error handler
// This will print stacktrace
if (process.env.NODE_ENV === 'development') {
  app.use((err, req, res, next) => {
    console.error(err.stack); // Log the stacktrace for debugging purposes
    res.status(err.status || 500);
    res.send({
      error: {
        message: err.message,
        stack: err.stack, // Sending the stack trace could be useful for debugging but should be avoided in production
      }
    });
  });
}

// Middleware for Error Logging - Add this before starting the server and after all other route/middleware definitions
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error message/stack
  res.status(500).send('Something broke!');
});

// Get all tasks for the logged-in user
taskRoutes.get('/', authenticate, async (req, res) => {
   try {
       const tasks = await Task.findAll({ where: { userId: req.user.id } });
       res.json(tasks);
   } catch (error) {
       res.status(500).send(error.toString());
   }
});


// Add a new task
taskRoutes.post('/', authenticate, async (req, res) => {
   try {
       const task = await Task.create({ ...req.body, userId: req.user.id });
       res.status(201).json(task);
   } catch (error) {
       res.status(400).send(error.toString());
   }
});


// Update a task
taskRoutes.put('/:id', authenticate, async (req, res) => {
   try {
       const task = await Task.update(req.body, {
           where: { id: req.params.id, userId: req.user.id },
           returning: true,
       });
       res.json(task);
   } catch (error) {
       res.status(400).send(error.toString());
   }
});


// Delete a task
taskRoutes.delete('/:id', authenticate, async (req, res) => {
   try {
       await Task.destroy({ where: { id: req.params.id, userId: req.user.id } });
       res.status(204).send();
   } catch (error) {
       res.status(500).send(error.toString());
   }
});


// Start the server after ensuring the DB connection
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced!');
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });
}).catch((error) => {
 console.error('Failed to sync DB:', error);
});