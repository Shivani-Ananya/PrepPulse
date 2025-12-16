const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  },
  statusCode: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // milliseconds
    required: true
  },
  userAgent: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ipAddress: String,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Index for faster queries
analyticsSchema.index({ timestamp: -1 });
analyticsSchema.index({ endpoint: 1 });
analyticsSchema.index({ userId: 1, timestamp: -1 });

// Static method to get usage statistics
analyticsSchema.statics.getUsageStats = async function(days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const stats = await this.aggregate([
    {
      $match: {
        timestamp: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          endpoint: "$endpoint"
        },
        count: { $sum: 1 },
        avgDuration: { $avg: "$duration" },
        errors: {
          $sum: {
            $cond: [{ $gte: ["$statusCode", 400] }, 1, 0]
          }
        }
      }
    },
    {
      $group: {
        _id: "$_id.date",
        endpoints: {
          $push: {
            endpoint: "$_id.endpoint",
            count: "$count",
            avgDuration: "$avgDuration",
            errors: "$errors"
          }
        },
        totalRequests: { $sum: "$count" },
        totalErrors: { $sum: "$errors" }
      }
    },
    {
      $sort: { _id: -1 }
    }
  ]);
  
  return stats;
};

module.exports = mongoose.model('Analytics', analyticsSchema);