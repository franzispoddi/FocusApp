const { Sequelize, DataTypes } = require('sequelize');
// Assuming you have a Sequelize instance (sequelize) already configured
const sequelize = require('../db'); // Adjust the import according to your setup

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validates if the string is an email
    },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timezone: {
    type: DataTypes.STRING,
    defaultValue: 'UTC',
  },
  defaultReminderSetting: {
    type: DataTypes.INTEGER,
    defaultValue: 10, // minutes before event
  },
  viewPreferences: {
    type: DataTypes.JSON,
    defaultValue: {
      theme: 'light', // or 'dark'
      startOfWeek: 'Monday', // or 'Sunday'
    },
  },
}, {
  // Model options go here
  sequelize, // This bit is important - it ties this model to the instance
  modelName: 'User', // We choose the model name
});

module.exports = User;