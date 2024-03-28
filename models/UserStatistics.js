const mongoose = require('mongoose');
const { Schema } = mongoose;

const userStatisticsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  focusSessions: [{
    sessionId: { type: Schema.Types.ObjectId, ref: 'Session' },
    category: { type: String },
    duration: { type: Number }, // In minutes
    completed: { type: Boolean, default: false }
  }],
  appUsage: [{
    appId: { type: String },
    duration: { type: Number }, // In minutes
  }],
  tasksCompleted: { type: Number, default: 0 }
});

const userStatistics = mongoose.model('userStatistics', userStatisticsSchema);
module.exports = userStatistics;