import React from 'react';
import TimelineDateComponent from '../../components/TimelineDateComponent';
import timeLineMockDataList from '../../assets/strings/TimeLinePage/testData';

const TimelinePage = () => {
  return (
    <div>
      {timeLineMockDataList.map((timelineData) => (
        <TimelineDateComponent
          date={timelineData.Date}
          message={timelineData.Message}
          cards={timelineData.Cards}
        ></TimelineDateComponent>
      ))}
    </div>
  );
};

export default TimelinePage;
