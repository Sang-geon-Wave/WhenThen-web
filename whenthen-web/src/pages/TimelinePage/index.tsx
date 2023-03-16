import React from 'react';
import TimelineDateComponent from '../../components/TimelineDateComponent';
import timeLineMockDatas from '../../assets/strings/TimeLinePage/testData';

const TimelinePage = () => {
  return (
    <div>
      {timeLineMockDatas.map((timelineData) => (
        <TimelineDateComponent
          date={timelineData.date}
          message={timelineData.message}
          cards={timelineData.cards}
        ></TimelineDateComponent>
      ))}
    </div>
  );
};

export default TimelinePage;
