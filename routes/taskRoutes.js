const express = require('express');
const router = express.Router();


// Assuming authenticate middleware sets req.userId with the logged-in user's ID


// Get all tasks for the logged-in user
router.get('/', async (req, res) => {
 try {
   const tasks = await Activity.findAll({
     where: { userId: req.userId, activityType: 'Task' }
   });
   res.json(tasks);
 } catch (error) {
   res.status(500).send(error.toString());
 }
});


// Add a new task
router.post('/', async (req, res) => {
 try {
   const task = await Activity.create({ ...req.body, userId: req.userId, activityType: 'Task' });
   res.status(201).json(task);
 } catch (error) {
   res.status(400).send(error.toString());
 }
});


// Update a task
router.put('/:id', async (req, res) => {
 try {
   const updatedTask = await Activity.update(req.body, {
     where: { id: req.params.id, userId: req.userId, activityType: 'Task' },
     returning: true // This option is needed to get the updated object back
   });


   if (updatedTask && updatedTask[0] > 0) {
     res.json(updatedTask[1][0]); // Return the updated task
   } else {
     res.status(404).send('Task not found');
   }
 } catch (error) {
   res.status(400).send(error.toString());
 }
});


// Delete a task
router.delete('/:id', async (req, res) => {
 try {
   const result = await Activity.destroy({
     where: { id: req.params.id, userId: req.userId, activityType: 'Task' }
   });


   if (result > 0) {
     res.status(204).send();
   } else {
     res.status(404).send('Task not found');
   }
 } catch (error) {
   res.status(500).send(error.toString());
 }
});


module.exports = router;