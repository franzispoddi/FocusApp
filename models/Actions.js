const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust the import according to your setup

const Actions = sequelize.define('Actions', {
  // Assuming userId will be set to associate this model with the User model
  // User Preferences
  preferences: {
    type: DataTypes.JSON,
    // No need for detailed sub-object structure here, as JSON can store any structure
  },

  // Notifications (including reminders as a type of notification)
  notifications: {
    type: DataTypes.JSON,
    // Storing notifications as an array of objects within a JSON column
  },

  // Actions and Activity Log
  actions: {
    type: DataTypes.JSON,
    // Storing actions as an array of objects within a JSON column
  },
}, {
  sequelize, // This ties the model to your Sequelize instance
  modelName: 'Actions', // We choose the model name
});

module.exports = Actions;