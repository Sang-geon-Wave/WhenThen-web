import React from 'react';
import TimelineDateComponent from '../../components/TimelineDateComponent';
import timeLineMockDataList from '../../assets/strings/TimeLinePage/testData';

const TimelinePage = () => {
  return (
    <div>
      {timeLineMockDataList.map((timelineData) => (
        <TimelineDateComponent
          date={timelineData.date}
          message={timelineData.message}
          cards={timelineData.cards}
        />
      ))}
    </div>
  );
};

export default TimelinePage;
