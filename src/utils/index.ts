import siteData from '../app/data/Home-Fitness.json';

/**
 * 转换markdown文本中的特殊字符串
 * @param content - 原始markdown内容
 * @returns 转换后的markdown内容
 */
export function transformMarkdown(content: string): string {
  if (!content) return content;

  let transformedContent = content;

  // 替换 {sitename} 为网站名称
  const siteName = siteData.name || 'Home Fitness';
  transformedContent = transformedContent.replace(/\{sitename\}/g, siteName);

  // 替换 {domainname} 为当前域名
  const domainName = typeof window !== 'undefined' 
    ? window.location.hostname 
    : 'localhost';
  transformedContent = transformedContent.replace(/\{domainname\}/g, domainName);

  return transformedContent;
}

/**
 * 生成文章slug（id-title格式）
 * @param id - 文章ID
 * @param title - 文章标题
 * @returns 格式化的slug字符串
 */
export function generateArticleSlug(id: number, title: string): string {
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

/**
 * 从slug中解析文章ID
 * @param slug - 文章slug（格式：id-title）
 * @returns 文章ID，如果解析失败返回null
 */
export function parseArticleIdFromSlug(slug: string): number | null {
  // slug格式：id-title，提取开头的数字部分
  const match = slug.match(/^(\d+)/);
  if (match && match[1]) {
    const id = parseInt(match[1], 10);
    return isNaN(id) ? null : id;
  }
  return null;
} 