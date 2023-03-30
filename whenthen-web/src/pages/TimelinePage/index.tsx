import React from 'react';
import TimelineDateComponent from '../../components/TimelineDateComponent';
import timeLineMockDataList from '../../assets/strings/TimeLinePage/testData';

import DefaultLayout from '../../layouts/DefaultLayout';
const TimelinePage = () => {
  return (
    <DefaultLayout>
      <div>
        {timeLineMockDataList.map((movieList) => (
          <TimelineDateComponent movieList={movieList} key={`dateKey${idx}`} />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default TimelinePage;
