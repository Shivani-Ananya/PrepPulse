require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Task = require('../models/Task');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/PrepPulse';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding');
    
    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    
    // Create test user
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      placementDate: new Date('2024-12-31'),
      streak: 7,
      daysUsed: 30
    });
    
    await user.save();
    
    // Create sample tasks
    const tasks = [
      {
        text: 'Solve 5 LeetCode medium problems',
        category: 'DSA',
        priority: 'high',
        user: user._id,
        completed: true,
        completedAt: new Date()
      },
      {
        text: 'Complete aptitude practice set',
        category: 'Aptitude',
        priority: 'medium',
        user: user._id
      },
      {
        text: '30-minute yoga session',
        category: 'Yoga/Fitness',
        priority: 'medium',
        user: user._id
      },
      {
        text: 'Practice guitar for 1 hour',
        category: 'Music',
        priority: 'low',
        user: user._id
      },
      {
        text: 'Work on portfolio project',
        category: 'Coding & Project',
        priority: 'high',
        user: user._id
      },
      {
        text: 'Study operating systems chapter',
        category: 'Core Subjects',
        priority: 'medium',
        user: user._id
      },
      {
        text: 'System design practice',
        category: 'DSA',
        priority: 'high',
        user: user._id
      }
    ];
    
    await Task.insertMany(tasks);
    
    console.log('✅ Seed data created successfully!');
    console.log(`📧 Test user: ${user.email}`);
    console.log(`🔑 Password: password123`);
    console.log(`📝 Created ${tasks.length} sample tasks`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();