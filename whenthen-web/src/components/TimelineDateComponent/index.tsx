import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import TimelineCardComponent, {
  PropsTimelineCardComponent,
} from '../TimelineCardComponent';

export interface PropsTimelineDateComponent {
  date: string;
  message: string;
  cards: PropsTimelineCardComponent[];
}

const TimelineDateComponent: React.FunctionComponent<
  PropsTimelineDateComponent
> = ({ date, message, cards }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div className={styles.timelineDateContainer}>
      <div className={styles.timelineDateCardTitle}>{date}</div>
      {message}
      {cards.map((card) => (
        <TimelineCardComponent
          title={card.title}
          sub={card.sub}
          imgUrl={card.imgUrl}
          content={card.content}
        ></TimelineCardComponent>
      ))}
    </div>
  );
};

export default TimelineDateComponent;
