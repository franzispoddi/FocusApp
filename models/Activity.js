const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Make sure this path points to your Sequelize connection configuration file

class Activity extends Model {}

Activity.init({
  // Define model attributes
  activityType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Task', 'Event', 'Goal']]
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
    // Note: Sequelize doesn't support automatic population like Mongoose. You'll manage joins manually.
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  startTime: DataTypes.DATE,
  endTime: DataTypes.DATE,
  dueDate: DataTypes.DATE,
  isAllDay: DataTypes.BOOLEAN,
  recurrence: DataTypes.JSON, // Storing complex objects in JSON
  isScheduled: DataTypes.BOOLEAN,
  isCompleted: DataTypes.BOOLEAN,
  priority: DataTypes.INTEGER,
  tags: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL supports array types
  projectId: DataTypes.INTEGER, // Assuming project ID is an integer
  status: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['pending', 'in progress', 'completed', 'blocked']]
    }
  },
  assignedDate: DataTypes.DATE,
  currentProgress: DataTypes.INTEGER,
  deadline: DataTypes.DATE,
  pomodoroSettings: DataTypes.JSON, // Using JSON to store complex object
  totalTimeSpent: DataTypes.INTEGER,
  // relatedUsers and sessionCategoryDetails could be managed via associations in Sequelize or JSON fields
  relatedUsers: DataTypes.JSON,
  sessionCategoryDetails: DataTypes.JSON,
  changeHistory: DataTypes.JSON // Again, JSON for complex objects
}, {
  sequelize,
  modelName: 'Activity'
  // Additional model options go here
});

module.exports = Activity;