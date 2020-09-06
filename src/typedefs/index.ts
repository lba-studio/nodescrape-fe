export interface News {
  title: string;
  content: string;
}

export interface OnlineNewsArticle extends News {
  sourceName: string;
  imageUrl?: string;
  url?: string;
}

export enum SentimentLikertValue {
  POSITIVE = "Positive",
  VERY_POSITIVE = "Very Positive",
  SLIGHTLY_POSITIVE = "Slightly Positive",
  VERY_NEGATIVE = "Very Negative",
  NEGATIVE = "Negative",
  SLIGHTLY_NEGATIVE = "Slightly Negative",
  NEUTRAL = "Neutral",
}
