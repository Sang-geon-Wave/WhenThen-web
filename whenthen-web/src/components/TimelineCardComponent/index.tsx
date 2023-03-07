//import React from 'react';
import Card from './card';
import list from './testData';

const TimelineCardComponent = () => {
  return (
    <div>
      {list.map((movie) => (
        <Card
          title={movie.title}
          sub={movie.sub}
          imgUrl={movie.imgUrl}
          content={movie.content}
        ></Card>
      ))}
    </div>
  );
};

export default TimelineCardComponent;
