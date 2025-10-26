#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const path = require('path');
const os = require('os');

// 颜色输出工具
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
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

function logStep(message) {
  console.log(`${colors.cyan}${colors.bright}🚀 ${message}${colors.reset}`);
}

// 解析命令行参数
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    install: false,
    help: false,
    pm2Path: process.env.PM2_WORKING_DIR || '~',
    configFile: 'ecosystem.config.js'
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--install':
      case '-i':
        options.install = true;
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
      default:
        logWarning(`未知参数: ${arg}`);
    }
  }
  return options;
}

// 扩展路径中的 ~ 符号为绝对路径
function expandPath(dirPath) {
  if (dirPath.startsWith('~')) {
    return path.join(os.homedir(), dirPath.slice(1));
  }
  return dirPath;
}

async function runCommand(command, description, cwd = process.cwd()) {
  logStep(description);
  
  try {
    const { stdout, stderr } = await execAsync(command, { cwd });
    
    if (stdout) console.log(stdout);
    if (stderr && !stderr.includes('warning')) console.log(stderr);
    
    logSuccess(`${description} 完成`);
    return true;
  } catch (error) {
    logError(`${description} 失败: ${error.message}`);
    return false;
  }
}

async function checkPM2Environment() {
  try {
    // 静默检查 PM2 是否可用
    await execAsync('pm2 --version');
    return true;
  } catch (error) {
    logError('PM2 未安装或不可用');
    return false;
  }
}

async function deploy() {
  const options = parseArgs();

  if (options.help) {
    console.log(`
用法: npm run deploy [选项]

选项:
  -i, --install   执行 npm install 安装依赖
  -h, --help      显示此帮助信息
    `);
    return;
  }

  logInfo('开始部署流程...');
  
  // 检查 PM2 环境
  const pm2Ok = await checkPM2Environment();
  if (!pm2Ok) {
    process.exit(1);
  }
  
  const expandedPm2Path = expandPath(options.pm2Path);
  
  try {
    // 1. 拉取最新代码
    const gitSuccess = await runCommand('git pull', '拉取最新代码');
    if (!gitSuccess) throw new Error('代码拉取失败');
    
    // 2. 安装依赖（可选）
    if (options.install) {
      const installSuccess = await runCommand('npm install', '安装依赖');
      if (!installSuccess) throw new Error('依赖安装失败');
    } else {
      logInfo('跳过依赖安装');
    }
    
    // 3. 构建项目
    const buildSuccess = await runCommand('npm run build', '构建项目');
    if (!buildSuccess) throw new Error('项目构建失败');
    
    // 4. 重启 PM2 服务
    const pm2Success = await runCommand(
      `pm2 reload ${options.configFile}`, 
      '重启 PM2 服务',
      expandedPm2Path
    );
    
    if (!pm2Success) {
      throw new Error('PM2 重启失败');
    }
    
    logSuccess('🎉 部署完成！');
    
  } catch (error) {
    logError(`部署失败: ${error.message}`);
    process.exit(1);
  }
}

// 执行部署
deploy();