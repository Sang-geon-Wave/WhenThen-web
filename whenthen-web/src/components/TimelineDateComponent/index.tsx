import React from 'react';
import useRootData from '../../hooks/useRootData';
import TimelineDummyCardComponent, {
  ProbsTimelineDummyCardComponent,
} from '../TimelineDummyCardComponent';
import stylesDesktopDefault from './DesktopDefault.module.scss';

export interface ProbsTimelineDateComponent {
  date: string;
  message: string;
  cards: ProbsTimelineDummyCardComponent[];
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
      {cards.map((card, index) => (
        <TimelineDummyCardComponent
          key={index}
          {...card}
        ></TimelineDummyCardComponent>
      ))}
    </div>
  );
};

export default TimelineDateComponent;
