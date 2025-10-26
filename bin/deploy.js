#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// 颜色输出工具
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function logSuccess(message) {
  console.log(`${colors.green}${colors.bright}✅ ${message}${colors.reset}`);
}

function logError(message) {
  console.log(`${colors.red}${colors.bright}❌ ${message}${colors.reset}`);
}

function logInfo(message) {
  console.log(`${colors.blue}${colors.bright}ℹ️  ${message}${colors.reset}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}${colors.bright}⚠️  ${message}${colors.reset}`);
}

async function runCommand(command, description) {
  logInfo(`执行: ${description}`);
  console.log(`命令: ${command}`);
  
  try {
    const { stdout, stderr } = await execAsync(command);
    
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(stderr);
    }
    
    logSuccess(`${description} 完成`);
    return true;
  } catch (error) {
    logError(`${description} 失败: ${error.message}`);
    return false;
  }
}

async function deploy() {
  logInfo('🚀 开始部署流程...');
  
  try {
    // 1. 拉取最新代码
    const gitSuccess = await runCommand('git pull', '拉取最新代码');
    if (!gitSuccess) {
      throw new Error('代码拉取失败，部署终止');
    }
    
    // 2. 安装依赖（可选，如果需要的话）
    // const installSuccess = await runCommand('npm install', '安装依赖');
    // if (!installSuccess) {
    //   throw new Error('依赖安装失败，部署终止');
    // }
    
    // 3. 构建项目
    const buildSuccess = await runCommand('npm run build', '构建项目');
    if (!buildSuccess) {
      throw new Error('项目构建失败，部署终止');
    }
    
    // 4. 重启 PM2 服务
    const pm2Success = await runCommand('pm2 reload ecosystem.config.js', '重启 PM2 服务');
    if (!pm2Success) {
      throw new Error('PM2 重启失败');
    }
    
    logSuccess('🎉 部署完成！');
    logInfo('可以使用以下命令检查服务状态:');
    console.log('  pm2 list');
    console.log('  pm2 logs');
    
  } catch (error) {
    logError(`部署失败: ${error.message}`);
    process.exit(1);
  }
}

// 执行部署
deploy();