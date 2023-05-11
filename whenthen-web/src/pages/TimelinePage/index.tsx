import React from 'react';
import TimelineDateComponent from '../../components/TimelineDateComponent';
import timeLineMockDataList from '../../assets/strings/TimeLinePage/testData';

import DefaultLayout from '../../layouts/DefaultLayout';
const TimelinePage = () => {
  return (
    <DefaultLayout>
      <div className="p-md-5">
        <h1>타임라인</h1>
        {timeLineMockDataList.map((movieList, idx) => (
          <TimelineDateComponent movieList={movieList} key={`dateKey${idx}`} />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default TimelinePage;
