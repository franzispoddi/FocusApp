const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('franziskaspoddig', 'franzi', 'franzi123', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
