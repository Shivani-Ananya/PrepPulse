const Analytics = require('../models/Analytics');

const analyticsLogger = async (req, res, next) => {
  const startTime = Date.now();
  
  // Store original send function
  const originalSend = res.send;
  
  // Override send function
  res.send = function(data) {
    // Restore original send
    res.send = originalSend;
    
    // Log analytics (async, don't wait for it)
    logAnalytics(req, res, startTime, data).catch(console.error);
    
    // Call original send
    return originalSend.call(this, data);
  };
  
  next();
};

const logAnalytics = async (req, res, startTime, responseData) => {
  try {
    const duration = Date.now() - startTime;
    
    const analytics = new Analytics({
      endpoint: req.path,
      method: req.method,
      statusCode: res.statusCode,
      duration,
      userAgent: req.get('user-agent'),
      userId: req.user?._id,
      timestamp: new Date(),
      ipAddress: req.ip || req.connection.remoteAddress
    });
    
    await analytics.save();
  } catch (error) {
    console.error('Analytics logging error:', error);
    // Don't throw, analytics shouldn't affect main functionality
  }
};

module.exports = analyticsLogger;