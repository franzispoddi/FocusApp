const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Make sure to adjust the import according to your setup

const TestModel = sequelize.define('Test', {
  // Define model attributes
  message: {
    type: DataTypes.STRING,
    allowNull: false // Assuming you want this field to be required
  }
}, {
  // Model options go here (optional)
  sequelize, // Pass your Sequelize instance here
  modelName: 'Test', // Define the name of your model
  timestamps: false // Assuming you don't need Sequelize to automatically manage createdAt and updatedAt fields for this model
});

module.exports = router;
