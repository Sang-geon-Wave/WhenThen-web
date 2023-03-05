//import React from 'react';
import Card from './card';
import list from './testData';

const TimelineCardComponent = () => {
  return (
    <div style={{ margin: '1rem' }}>
      {list.map((singer) => (
        <Card
          title={singer.title}
          imgUrl={singer.imgUrl}
          content={singer.content}
        ></Card>
      ))}
    </div>
  );
};

export default TimelineCardComponent;
