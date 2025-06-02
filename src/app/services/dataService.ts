import { HomeData, Article, Category, SearchResult } from '../types';
import homeData from '../data/Home-Fitness.json';

class DataService {
  private data: HomeData;

  constructor() {
    this.data = homeData as HomeData;
  }

  // 获取所有数据
  getAllData(): HomeData {
    return this.data;
  }

  // 获取首页数据
  getHomePageData() {
    const allArticles = this.getAllArticles();
    
    return {
      heroArticles: allArticles.slice(0, 3), // 轮播图文章
      trendingArticles: allArticles.slice(3, 9), // 热门文章，从5个增加到6个
      categoryPreviews: this.data.categories.map(category => ({
        ...category,
        articles: category.articles.slice(0, 3) // 每个分类预览3篇文章
      }))
    };
  }

  // 获取所有文章
  getAllArticles(): Article[] {
    return this.data.categories.flatMap(category => category.articles);
  }

  // 根据分类名获取分类数据
  getCategoryByName(categoryName: string): Category | null {
    const categoryMap: { [key: string]: string } = {
      'affordable-home-gym-setups': 'Affordable Home Gym Setups',
      'family-kids-friendly-workouts': 'Family & Kids Friendly Workouts',
      'strength-training-without-equipment': 'Strength Training Without Equipment',
      'motivation-habit-building-tips': 'Motivation & Habit Building Tips'
    };

    const fullCategoryName = categoryMap[categoryName];
    if (!fullCategoryName) return null;

    return this.data.categories.find(category => 
      category.name === fullCategoryName
    ) || null;
  }

  // 根据ID获取文章
  getArticleById(id: number): Article | null {
    const allArticles = this.getAllArticles();
    return allArticles.find(article => article.id === id) || null;
  }

  // 搜索文章
  searchArticles(query: string): SearchResult {
    if (!query.trim()) {
      return {
        articles: [],
        total: 0,
        query: query
      };
    }

    const allArticles = this.getAllArticles();
    const searchTerm = query.toLowerCase();
    
    const filteredArticles = allArticles.filter(article =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.description.toLowerCase().includes(searchTerm)
    );

    return {
      articles: filteredArticles,
      total: filteredArticles.length,
      query: query
    };
  }

  // 获取相关文章
  getRelatedArticles(currentArticleId: number, limit: number = 4): Article[] {
    const allArticles = this.getAllArticles();
    const currentArticle = this.getArticleById(currentArticleId);
    
    if (!currentArticle) return [];

    // 找到当前文章所属的分类
    const currentCategory = this.data.categories.find(category =>
      category.articles.some(article => article.id === currentArticleId)
    );

    if (!currentCategory) return [];

    // 从同一分类中获取其他文章
    const relatedArticles = currentCategory.articles
      .filter(article => article.id !== currentArticleId)
      .slice(0, limit);

    // 如果同分类文章不够，从其他分类补充
    if (relatedArticles.length < limit) {
      const otherArticles = allArticles
        .filter(article => 
          article.id !== currentArticleId && 
          !relatedArticles.some(related => related.id === article.id)
        )
        .slice(0, limit - relatedArticles.length);
      
      relatedArticles.push(...otherArticles);
    }

    return relatedArticles;
  }

  // 根据文章ID获取文章所属的分类
  getArticleCategory(articleId: number): Category | null {
    return this.data.categories.find(category =>
      category.articles.some(article => article.id === articleId)
    ) || null;
  }

  // 获取分类的简短名称（用于标签显示）
  getCategoryShortName(categoryName: string): string {
    const shortNameMap: { [key: string]: string } = {
      'Affordable Home Gym Setups': '💰 Budget',
      'Family & Kids Friendly Workouts': '👨‍👩‍👧‍👦 Family',
      'Strength Training Without Equipment': '💪 Bodyweight',
      'Motivation & Habit Building Tips': '🧠 Motivation'
    };

    return shortNameMap[categoryName] || categoryName;
  }

  // 获取来自不同分类的热门文章（每个分类一篇）
  getPopularArticlesFromDifferentCategories(limit: number = 4): Article[] {
    const popularArticles: Article[] = [];
    
    // 获取有文章的分类列表
    const availableCategories = this.data.categories.filter(category => category.articles.length > 0);
    
    if (availableCategories.length === 0) {
      return popularArticles;
    }
    
    // 计算每个分类应该分配的文章数量，确保分布均匀
    const baseQuota = Math.floor(limit / availableCategories.length);
    const extraSlots = limit % availableCategories.length;
    
    // 为每个分类设置配额
    const categoryQuotas: { [categoryName: string]: number } = {};
    availableCategories.forEach((category, index) => {
      categoryQuotas[category.name] = baseQuota + (index < extraSlots ? 1 : 0);
    });
    
    // 为每个分类分别维护选择的索引，加入随机起始位置
    const categoryIndexes: { [categoryName: string]: number } = {};
    availableCategories.forEach(category => {
      // 随机起始位置，避免总是选择每个分类的前几篇文章
      categoryIndexes[category.name] = Math.floor(Math.random() * Math.min(3, category.articles.length));
    });
    
    // 先按配额从每个分类选择文章
    for (const category of availableCategories) {
      const quota = categoryQuotas[category.name];
      let selectedFromCategory = 0;
      let articleIndex = categoryIndexes[category.name];
      
      while (selectedFromCategory < quota && articleIndex < category.articles.length) {
        const article = category.articles[articleIndex];
        
        // 确保文章没有重复添加
        if (!popularArticles.some(existing => existing.id === article.id)) {
          popularArticles.push(article);
          selectedFromCategory++;
        }
        articleIndex++;
      }
      
      // 如果某个分类的文章不够，从头开始继续选择
      if (selectedFromCategory < quota) {
        articleIndex = 0;
        while (selectedFromCategory < quota && articleIndex < categoryIndexes[category.name]) {
          const article = category.articles[articleIndex];
          
          if (!popularArticles.some(existing => existing.id === article.id)) {
            popularArticles.push(article);
            selectedFromCategory++;
          }
          articleIndex++;
        }
      }
    }
    
    // 如果仍然不够文章（某些分类文章数量太少），从所有剩余文章中随机补充
    if (popularArticles.length < limit) {
      const allArticles = this.getAllArticles();
      const remainingArticles = allArticles.filter(article => 
        !popularArticles.some(popular => popular.id === article.id)
      );
      
      // 随机打乱剩余文章
      const shuffledRemaining = remainingArticles.sort(() => Math.random() - 0.5);
      const needed = limit - popularArticles.length;
      popularArticles.push(...shuffledRemaining.slice(0, needed));
    }

    return popularArticles;
  }
}

export const dataService = new DataService(); 