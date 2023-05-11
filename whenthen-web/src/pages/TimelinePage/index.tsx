import React, { useState } from 'react';
import TimelineDateComponent from '../../components/TimelineDateComponent';
import timeLineMockDataList from '../../assets/strings/TimeLinePage/testData';
import DefaultLayout from '../../layouts/DefaultLayout';
import api from '../../api';
import { ArticleListByDate, ArticleIntro } from '../../types/ArticleDataType';

const getArticle = async () => {
  const { data } = await api.get('article/like');
  const userLike = data.users;
  return userLike;
};

const TimelinePage = () => {
  const defaultArray: ArticleListByDate[] = [];
  const [articleList, setArticleList] = useState(defaultArray);

  getArticle().then((userLike) => {
    const articleList: ArticleListByDate[] = [];
    userLike.forEach((article: any) => {
      const movieList: ArticleIntro[] = [];
      const movieIntro: ArticleIntro = {
        title: article.title,
        imgUrl: article.thumbnail,
        sub: article.place,
        content: article.detail,
      };
      movieList.push(movieIntro);
      const movieData: ArticleListByDate = {
        date: article.start_datetime.substring(0, 10),
        message: article.end_datetime.substring(0, 10),
        movieItems: movieList,
      };
      articleList.push(movieData);
    });
    setArticleList(articleList);
    return;
  });

  return (
    <DefaultLayout>
      <div>
        {articleList.map((articles, idx) => (
          <TimelineDateComponent articleList={articles} key={`dateKey${idx}`} />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default TimelinePage;
