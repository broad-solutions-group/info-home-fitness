const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/app/data/Home-Fitness.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const baseDate = new Date('2025-05-30T00:00:00');
const today = new Date();

console.log('验证文章时间设置：\n');
console.log(`基准日期: ${baseDate.toISOString().split('T')[0]}`);
console.log(`今天日期: ${today.toISOString().split('T')[0]}\n`);

data.categories.forEach((cat, idx) => {
  const first = cat.articles[0];
  const last = cat.articles[cat.articles.length - 1];
  const firstDate = new Date(first.createTime);
  const lastDate = new Date(last.createTime);
  const daysFromBase = Math.floor((firstDate - baseDate) / (1000 * 60 * 60 * 24));
  
  console.log(`分类 ${idx + 1}: ${cat.name}`);
  console.log(`  文章数量: ${cat.articles.length}`);
  console.log(`  第一篇文章: ${first.createTime.split('T')[0]} (基准日期后${daysFromBase}天)`);
  console.log(`  最后一篇文章: ${last.createTime.split('T')[0]}`);
  console.log(`  是否超过今天: ${lastDate > today ? '是' : '否'}`);
  
  // 检查分类内文章间隔
  const intervals = [];
  for (let i = 1; i < cat.articles.length; i++) {
    const prevDate = new Date(cat.articles[i - 1].createTime);
    const currDate = new Date(cat.articles[i].createTime);
    const intervalMs = currDate - prevDate;
    const intervalDays = intervalMs / (1000 * 60 * 60 * 24);
    intervals.push(intervalDays.toFixed(1));
  }
  console.log(`  文章间隔: ${intervals.join(', ')} 天`);
  console.log('');
});

