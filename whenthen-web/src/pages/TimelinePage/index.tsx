import React, { useState, useEffect } from 'react';
import TimelineDateComponent from '../../components/TimelineDateComponent';
import DefaultLayout from '../../layouts/DefaultLayout';
import api from '../../api';
import { ArticleListByDate, ArticleIntro } from '../../types/ArticleDataType';

const getArticle = async () => {
  const { data } = await api.get('article/all');
  const userLike = data.users;
  return userLike;
};

const TimelinePage = () => {
  const defaultArray: ArticleListByDate[] = [];
  const [articleList, setArticleList] = useState(defaultArray);
  useEffect(() => {
    getArticle().then((userLike) => {
      const articleList: ArticleListByDate[] = [];
      var movieList: ArticleIntro[] = [];
      var time: string = '';
      userLike.forEach((article: any) => {
        const movieIntro: ArticleIntro = {
          title: article.title,
          imgUrl: article.thumbnail,
          sub: article.place,
          content: article.detail,
        };
        if (time === '') {
          time = article.start_date;
          movieList.push(movieIntro);
        } else if (time === article.start_date) {
          movieList.push(movieIntro);
        } else {
          const movieData: ArticleListByDate = {
            date: article.start_date.substring(0, 10),
            message: 'test',
            movieItems: movieList,
          };
          articleList.push(movieData);
          time = article.start_date;
          movieList = [];
          movieList.push(movieIntro);
        }
      });
      const movieData: ArticleListByDate = {
        date: time.substring(0, 10),
        message: 'test',
        movieItems: movieList,
      };
      articleList.push(movieData);

      setArticleList(articleList);
    });
  }, []);

  return (
    <DefaultLayout hideSideBar={false}>
      <div>
        {articleList.map((articles, idx) => (
          <TimelineDateComponent articleList={articles} key={`dateKey${idx}`} />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default TimelinePage;
