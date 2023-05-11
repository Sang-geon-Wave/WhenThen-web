export interface ArticleIntro {
  title: string;
  imgUrl?: string;
  sub?: string;
  content?: string;
}

export interface ArticleListByDate {
  date: string;
  message: string;
  movieItems: ArticleIntro[];
}
