import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import TimelineCardComponent, {
  ProbsTimelineCardComponent,
} from '../TimelineCardComponent';

export interface ProbsTimelineDateComponent {
  date: string;
  message: string;
  cards: ProbsTimelineCardComponent[];
}

const TimelineDateComponent: React.FunctionComponent<
  ProbsTimelineDateComponent
> = ({ date, message, cards }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div className={styles.timelineDateContainer}>
      <div className={styles.timelineDateCardTitle}>{date}</div>
      <br></br>
      {message}
      {cards.map((val) => (
        <TimelineCardComponent
          title={val.title}
          sub={val.sub}
          imgUrl={val.imgUrl}
          content={val.content}
        ></TimelineCardComponent>
      ))}
    </div>
  );
};

export default TimelineDateComponent;
