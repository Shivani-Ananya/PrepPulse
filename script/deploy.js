#!/usr/bin/env node

require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const environment = process.argv[2] || 'staging';

const deployConfigs = {
  staging: {
    branch: 'staging',
    remote: 'origin',
    buildCommand: 'npm run build',
    envFile: '.env.staging'
  },
  production: {
    branch: 'main',
    remote: 'origin',
    buildCommand: 'npm run build:prod',
    envFile: '.env.production'
  }
};

const config = deployConfigs[environment];

if (!config) {
  console.error(`❌ Unknown environment: ${environment}`);
  console.error('Usage: npm run deploy:staging OR npm run deploy:prod');
  process.exit(1);
}

console.log(`🚀 Starting deployment to ${environment}...`);

try {
  // Check if environment file exists
  if (!fs.existsSync(path.join(__dirname, '..', config.envFile))) {
    console.error(`❌ Environment file not found: ${config.envFile}`);
    process.exit(1);
  }
  
  console.log('1️⃣  Running tests...');
  execSync('npm test', { stdio: 'inherit' });
  
  console.log('2️⃣  Linting code...');
  execSync('npm run lint', { stdio: 'inherit' });
  
  console.log('3️⃣  Pulling latest changes...');
  execSync(`git pull ${config.remote} ${config.branch}`, { stdio: 'inherit' });
  
  console.log('4️⃣  Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('5️⃣  Copying environment file...');
  fs.copyFileSync(
    path.join(__dirname, '..', config.envFile),
    path.join(__dirname, '..', '.env')
  );
  
  console.log('6️⃣  Starting server...');
  // This would be replaced with your actual deployment command
  // For example: pm2 restart prepulse-backend
  console.log('✅ Deployment process completed!');
  console.log(`📋 Next steps: Run "pm2 restart prepulse-backend" on your server`);
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}