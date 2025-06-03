export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  duration: string;
  status: number;
  createTime: string;
  updateTime: string;
}

export interface Category {
  id: number;
  name: string;
  articles: Article[];
}

export interface HomeData {
  id: number;
  name: string;
  keywords: string;
  description: string;
  categories: Category[];
}

export interface SearchResult {
  articles: Article[];
  total: number;
  query: string;
}

export interface MenuItems {
  home: string;
  affordableGym: string;
  familyWorkouts: string;
  strengthTraining: string;
  motivation: string;
} 