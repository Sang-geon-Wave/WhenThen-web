import React from 'react';
import TimelineDateComponent, {
  ProbsTimelineDateComponent,
} from '../../components/TimelineDateComponent';
import list from '../../assets/strings/TimeLinePage/testData';

export interface ProbsTimelinePage {
  data: ProbsTimelineDateComponent[];
}

const TimelinePage: React.FunctionComponent<ProbsTimelinePage> = ({ data }) => {
  if (data === null) {
    data = list;
  }
  return (
    <div>
      {data.map((val) => (
        <TimelineDateComponent
          date={val.date}
          message={val.message}
          cards={val.cards}
        ></TimelineDateComponent>
      ))}
    </div>
  );
};

export default TimelinePage;
