const fs = require('fs');
const path = require('path');

/**
 * 复制ads.txt文件到生产构建目录
 * 遵循KISS原则：保持脚本简单直接
 * 遵循DRY原则：避免重复代码
 */
function copyAdsFile() {
  const sourceFile = path.join(__dirname, '..', 'src', 'app', 'data', 'ads.txt');
  
  // 定义所有需要复制到的目标目录
  const targetDirectories = [
    {
      path: path.join(__dirname, '..', '.next', 'standalone'),
      name: 'Next.js Standalone'
    },
    {
      path: path.join(__dirname, '..', '.open-next'),
      name: 'OpenNext Cloudflare'
    }
  ];

  try {
    // 检查源文件是否存在
    if (!fs.existsSync(sourceFile)) {
      console.warn('⚠️  警告: ads.txt 源文件不存在:', sourceFile);
      return;
    }

    console.log('📋 开始复制 ads.txt 文件...');
    
    let successCount = 0;
    let totalTargets = 0;

    // 遍历所有目标目录
    targetDirectories.forEach(target => {
      totalTargets++;
      
      // 检查目标目录是否存在
      if (!fs.existsSync(target.path)) {
        console.warn(`⚠️  警告: ${target.name} 目录不存在:`, target.path);
        return;
      }

      const targetFile = path.join(target.path, 'ads.txt');
      
      try {
        // 复制文件
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`✅ 成功复制 ads.txt 到 ${target.name}:`, targetFile);
        successCount++;
      } catch (error) {
        console.error(`❌ 复制到 ${target.name} 时出错:`, error.message);
      }
    });

    // 输出总结信息
    console.log(`📊 复制完成: ${successCount}/${totalTargets} 个目标目录成功`);
    
    if (successCount === 0) {
      console.error('❌ 所有复制操作都失败了');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ 复制 ads.txt 文件时出错:', error.message);
    process.exit(1);
  }
}

// 执行复制操作
copyAdsFile(); 