const fs = require('fs');
const path = require('path');

// 站点URL
const siteUrl = 'https://betterhomefit.com';
const dataPath = path.join(__dirname, '../src/app/data/Home-Fitness.json');
const outputPath = path.join(__dirname, '../out/sitemap.xml');

// 获取构建时间
function getBuildTime() {
  return new Date().toISOString().slice(0, 10);
}

// 转义XML特殊字符
function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// 获取分类slug
function getCategorySlug(categoryName) {
  const slugMap = {
    'Affordable Home Gym Setups': 'affordable-home-gym-setups',
    'Family & Kids Friendly Workouts': 'family-kids-friendly-workouts',
    'Strength Training Without Equipment': 'strength-training-without-equipment',
    'Motivation & Habit Building Tips': 'motivation-habit-building-tips'
  };
  return slugMap[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
}

// 生成文章slug（id-title格式）
function generateArticleSlug(id, title) {
  // 将标题转换为URL友好的格式
  const titleSlug = title
    .toLowerCase()
    .trim()
    // 替换特殊字符为连字符
    .replace(/[^\w\s-]/g, '')
    // 将多个空格或连字符替换为单个连字符
    .replace(/[\s_-]+/g, '-')
    // 移除开头和结尾的连字符
    .replace(/^-+|-+$/g, '')
    // 限制长度（保留前50个字符）
    .substring(0, 50)
    .replace(/-+$/, ''); // 移除末尾的连字符

  return `${id}-${titleSlug}`;
}

function main() {
  const buildTime = getBuildTime();
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(raw);
  const categories = data.categories || [];

  let urls = [];
  // 首页
  urls.push({ loc: `${siteUrl}/`, changefreq: 'daily', priority: '1.0', lastmod: buildTime });
  // 静态页
  [
    { path: '/search', p: '0.5' },
    { path: '/about', p: '0.5' },
    { path: '/terms', p: '0.5' },
    { path: '/privacy', p: '0.5' },
  ].forEach(({ path, p }) => {
    urls.push({ loc: `${siteUrl}${path}`, changefreq: 'daily', priority: p, lastmod: buildTime });
  });
  // 分类页
  categories.forEach(cat => {
    urls.push({
      loc: `${siteUrl}/category/${getCategorySlug(cat.name)}`,
      changefreq: 'daily',
      priority: '0.8',
      lastmod: buildTime
    });
  });
  // 文章详情页
  categories.forEach(cat => {
    (cat.articles || []).forEach(article => {
      urls.push({
        loc: `${siteUrl}/article/${generateArticleSlug(article.id, article.title)}`,
        changefreq: 'daily',
        priority: '0.6',
        lastmod: buildTime
      });
    });
  });

  // 生成xml
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(u =>
      `  <url>\n` +
      `    <loc>${escapeXml(u.loc)}</loc>\n` +
      `    <lastmod>${u.lastmod}</lastmod>\n` +
      `    <changefreq>${u.changefreq}</changefreq>\n` +
      `    <priority>${u.priority}</priority>\n` +
      `  </url>`
    ),
    '</urlset>'
  ].join('\n');

  // 确保输出目录存在
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log('sitemap.xml generated:', outputPath);
}

main();
