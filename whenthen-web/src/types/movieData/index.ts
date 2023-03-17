export interface MovieIntro {
  title: string;
  imgUrl?: string;
  sub?: string;
  content?: string;
}

export interface MovieListByDate {
  date: string;
  message: string;
  movieItems: MovieIntro[];
}
