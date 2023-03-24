import React from 'react';
import TimelineDateComponent from '../../components/TimelineDateComponent';
import timeLineMockDataList from '../../assets/strings/TimeLinePage/testData';

const TimelinePage = () => {
  return (
    <div>
      {timeLineMockDataList.map((movieList, idx) => (
        <TimelineDateComponent
          movieList={movieList}
          key={`dateKey${idx}`}
        ></TimelineDateComponent>
      ))}
    </div>
  );
};

export default TimelinePage;
