const fs = require('fs');
const path = require('path');

// 站点URL
const siteUrl = 'https://betterhomefit.com';
const dataPath = path.join(__dirname, '../src/app/data/Home-Fitness.json');
const outputPath = path.join(__dirname, '../.open-next/assets/sitemap.xml');
const buildIdPath = path.join(__dirname, '../.open-next/assets/BUILD_ID');

// 获取构建时间
function getBuildTime() {
  const stat = fs.statSync(buildIdPath);
  const d = new Date(stat.mtime);
  return d.toISOString().slice(0, 10);
}

// 分类slug生成
function getCategorySlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
}

// xml转义
function escapeXml(str) {
  return str.replace(/[<>&'"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','\'':'&apos;','"':'&quot;'}[c]));
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
        loc: `${siteUrl}/article/${article.id}`,
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

  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log('sitemap.xml generated:', outputPath);
}

main();
