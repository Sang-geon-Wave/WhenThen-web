import React from 'react';
import TimelineDateComponent from '../../components/TimelineDateComponent';
import timeLineMockDataList from '../../assets/strings/TimeLinePage/testData';
import DefaultLayout from '../../layouts/DefaultLayout';
import api from '../../api';
import { MovieListByDate } from '../../types/MovieDataType';

const TimelinePage = () => {
  const getArticle = async () => {
    const { data } = await api.get('article/like');
    const userLike = data.users;
    return userLike;
  };

  const articleList = getArticle();

  articleList.then((articleList) => {
    console.log(articleList);
    return (
      <DefaultLayout>
        <div>
          {articleList.map((articles, idx) => (
            <TimelineDateComponent movieList={articles} key={`dateKey${idx}`} />
          ))}
        </div>
      </DefaultLayout>
    );
  });
};

export default TimelinePage;
