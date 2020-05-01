export interface News {
  title: string;
  content: string;
}

export interface OnlineNewsArticle extends News {
  sourceName: string;
  imageUrl?: string;
  url?: string;
}