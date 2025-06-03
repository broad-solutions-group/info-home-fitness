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