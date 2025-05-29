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
      trendingArticles: allArticles.slice(3, 8), // 热门文章
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
}

export const dataService = new DataService(); 