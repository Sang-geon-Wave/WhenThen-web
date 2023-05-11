import React from 'react';
import timeLineMockDataList from '../../assets/strings/TimeLinePage/testData';

import DefaultLayout from '../../layouts/DefaultLayout';
import TimelineDateComponent from '../../components/TimelineDateComponent';
const TimelinePage = () => {
  return (
    <DefaultLayout>
      <div>
        {timeLineMockDataList.map((data, idx) => (
          <TimelineDateComponent
            date={data.date}
            message={data.message}
            items={data.movieItems}
            key={`dateKey${idx}`}
          />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default TimelinePage;
