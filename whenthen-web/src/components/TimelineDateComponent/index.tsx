import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import TimelineCardsComponent from '../TimelineCardsComponent';

export interface ProbsTimelineDateComponent {
  date: string;
  message: string;
  children: React.ReactElement[];
}

const TimelineDateComponent: React.FunctionComponent<
  ProbsTimelineDateComponent
> = ({ date, message, children }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div className={styles.timeline_date_container}>
      <div className={styles.timeline_date_card_title}>{date}</div>
      <br></br>
      {message}
      {children.map((child, index) => (
        <TimelineCardsComponent key={index}>{child}</TimelineCardsComponent>
      ))}
    </div>
  );
};

export default TimelineDateComponent;
