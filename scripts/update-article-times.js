const fs = require('fs');
const path = require('path');

// 读取JSON文件
const dataPath = path.join(__dirname, '../src/app/data/Home-Fitness.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// 基准日期：2025/5/30
const baseDate = new Date('2025-05-30T00:00:00');
// 今天的日期（作为上限）
const today = new Date();
today.setHours(23, 59, 59, 999); // 设置为今天的最后一刻

// 生成随机天数（7-10天，更随机）
function getRandomDays() {
  // 使用更随机的分布，让间隔看起来更不规则
  const random = Math.random();
  if (random < 0.3) return 7;
  if (random < 0.6) return 8;
  if (random < 0.85) return 9;
  return 10;
}

// 格式化日期为ISO字符串
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  // 使用随机时间，但确保不会影响日期计算
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const seconds = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

// 将日期设置为当天的开始（00:00:00），然后加上随机时间
function setDateWithRandomTime(date, daysToAdd) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + daysToAdd);
  // 设置为当天的开始
  newDate.setHours(0, 0, 0, 0);
  // 加上随机时间（0-23小时）
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  const randomSeconds = Math.floor(Math.random() * 60);
  newDate.setHours(randomHours, randomMinutes, randomSeconds);
  return newDate;
}

// 处理每个分类
data.categories.forEach((category) => {
  // 为每个分类生成一个随机的起始日期（从2025/5/30往后7-10天）
  const categoryStartOffset = getRandomDays();
  let currentDate = setDateWithRandomTime(baseDate, categoryStartOffset);
  
  // 处理分类内的每篇文章
  category.articles.forEach((article, index) => {
    // 确保日期不超过今天
    if (currentDate > today) {
      currentDate = new Date(today);
      // 为今天的日期添加随机时间
      const randomHours = Math.floor(Math.random() * 24);
      const randomMinutes = Math.floor(Math.random() * 60);
      const randomSeconds = Math.floor(Math.random() * 60);
      currentDate.setHours(randomHours, randomMinutes, randomSeconds);
    }
    
    // 设置createTime
    article.createTime = formatDate(currentDate);
    // updateTime和createTime一致
    article.updateTime = article.createTime;
    
    // 为下一篇文章生成间隔时间（7-10天），但最后一篇文章不需要计算下一篇文章的日期
    if (index < category.articles.length - 1) {
      const interval = getRandomDays();
      // 使用新的函数来设置日期，确保间隔是整数天
      const nextDate = setDateWithRandomTime(currentDate, interval);
      
      // 如果下一篇文章的日期会超过今天，则不再增加
      if (nextDate <= today) {
        currentDate = nextDate;
      } else {
        // 如果已经超过今天，保持当前日期不变
        currentDate = new Date(today);
        const randomHours = Math.floor(Math.random() * 24);
        const randomMinutes = Math.floor(Math.random() * 60);
        const randomSeconds = Math.floor(Math.random() * 60);
        currentDate.setHours(randomHours, randomMinutes, randomSeconds);
      }
    }
  });
});

// 保存修改后的数据
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('文章时间已成功更新！');

