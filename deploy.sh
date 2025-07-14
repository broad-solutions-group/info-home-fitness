#!/bin/bash

# Cloudflare Pages 部署脚本
# 使用方法: ./deploy.sh [project-name]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目名称
PROJECT_NAME=${1:-"info-home-fitness"}

echo -e "${BLUE}🚀 开始部署到 Cloudflare Pages...${NC}"
echo -e "${YELLOW}项目名称: ${PROJECT_NAME}${NC}"

# 检查是否安装了 wrangler
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}❌ Wrangler 未安装${NC}"
    echo -e "${YELLOW}请先安装 Wrangler:${NC}"
    echo "npm install -g wrangler"
    exit 1
fi

# 检查是否已登录
if ! wrangler whoami &> /dev/null; then
    echo -e "${RED}❌ 未登录 Cloudflare${NC}"
    echo -e "${YELLOW}请先登录:${NC}"
    echo "wrangler login"
    exit 1
fi

echo -e "${BLUE}📦 构建项目...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 构建成功${NC}"
else
    echo -e "${RED}❌ 构建失败${NC}"
    exit 1
fi

echo -e "${BLUE}🚀 部署到 Cloudflare Pages...${NC}"
wrangler pages deploy out --project-name=$PROJECT_NAME

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 部署成功！${NC}"
    echo -e "${BLUE}🌐 您的网站应该可以在以下地址访问:${NC}"
    echo -e "${GREEN}https://${PROJECT_NAME}.pages.dev${NC}"
else
    echo -e "${RED}❌ 部署失败${NC}"
    exit 1
fi

echo -e "${BLUE}📋 部署后检查清单:${NC}"
echo -e "${YELLOW}□ 网站可以正常访问${NC}"
echo -e "${YELLOW}□ 所有页面都能正确加载${NC}"
echo -e "${YELLOW}□ 图片和静态资源正常显示${NC}"
echo -e "${YELLOW}□ 搜索功能正常工作${NC}"
echo -e "${YELLOW}□ 移动端适配正常${NC}"
echo -e "${YELLOW}□ sitemap.xml 可访问${NC}"
echo -e "${YELLOW}□ 性能指标良好${NC}"
echo -e "${YELLOW}□ SEO 元数据正确${NC}"

echo -e "${GREEN}🎉 部署完成！${NC}" 