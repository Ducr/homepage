#!/usr/bin/env node

/**
 * 徽章生成器
 * 用于生成README中的各种徽章
 */

const fs = require('fs');
const path = require('path');

// 读取package.json获取项目信息
const packagePath = path.join(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// 徽章配置
const badges = {
  npm: {
    version: `[![npm version](https://img.shields.io/npm/v/${pkg.name}?style=flat-square)](https://www.npmjs.com/package/${pkg.name})`,
    downloads: `[![npm downloads](https://img.shields.io/npm/dm/${pkg.name}?style=flat-square)](https://www.npmjs.com/package/${pkg.name})`,
    license: `[![npm license](https://img.shields.io/npm/l/${pkg.name}?style=flat-square)](https://github.com/Ducr/homepage/blob/master/LICENSE)`,
  },
  github: {
    stars: `[![GitHub stars](https://img.shields.io/github/stars/Ducr/homepage?style=flat-square)](https://github.com/Ducr/homepage/stargazers)`,
    forks: `[![GitHub forks](https://img.shields.io/github/forks/Ducr/homepage?style=flat-square)](https://github.com/Ducr/homepage/network)`,
    issues: `[![GitHub issues](https://img.shields.io/github/issues/Ducr/homepage?style=flat-square)](https://github.com/Ducr/homepage/issues)`,
    license: `[![GitHub license](https://img.shields.io/github/license/Ducr/homepage?style=flat-square)](https://github.com/Ducr/homepage/blob/master/LICENSE)`,
  },
  ci: {
    build: `[![Build Status](https://img.shields.io/github/actions/workflow/status/Ducr/homepage/ci.yml?branch=master&style=flat-square)](https://github.com/Ducr/homepage/actions)`,
    deploy: `[![Deploy Status](https://img.shields.io/github/actions/workflow/status/Ducr/homepage/deploy.yml?branch=master&style=flat-square&label=deploy)](https://github.com/Ducr/homepage/actions)`,
  },
  tech: {
    nextjs: `[![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=flat-square&logo=next.js)](https://nextjs.org/)`,
    typescript: `[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)`,
    tailwind: `[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)`,
  },
  quality: {
    codeclimate: `[![Code Climate](https://img.shields.io/codeclimate/maintainability/Ducr/homepage?style=flat-square)](https://codeclimate.com/github/Ducr/homepage)`,
    codecov: `[![Codecov](https://img.shields.io/codecov/c/github/Ducr/homepage?style=flat-square)](https://codecov.io/gh/Ducr/homepage)`,
  }
};

// 生成徽章组合
function generateBadgeSet(categories) {
  const result = [];
  categories.forEach(category => {
    if (badges[category]) {
      Object.values(badges[category]).forEach(badge => {
        result.push(badge);
      });
    }
  });
  return result.join('\n');
}

// 命令行参数处理
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'npm':
    console.log(generateBadgeSet(['npm']));
    break;
  case 'github':
    console.log(generateBadgeSet(['github']));
    break;
  case 'ci':
    console.log(generateBadgeSet(['ci']));
    break;
  case 'tech':
    console.log(generateBadgeSet(['tech']));
    break;
  case 'quality':
    console.log(generateBadgeSet(['quality']));
    break;
  case 'all':
    console.log(generateBadgeSet(['npm', 'github', 'ci', 'tech']));
    break;
  default:
    console.log(`
徽章生成器

用法:
  node scripts/generate-badges.js <category>

类别:
  npm      - NPM相关徽章
  github   - GitHub相关徽章
  ci       - CI/CD徽章
  tech     - 技术栈徽章
  quality  - 代码质量徽章
  all      - 所有主要徽章

示例:
  node scripts/generate-badges.js npm
  node scripts/generate-badges.js all
    `);
    break;
} 