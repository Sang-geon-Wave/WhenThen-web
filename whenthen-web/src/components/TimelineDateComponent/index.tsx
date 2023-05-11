import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import TimelineCardComponent, {
  PropsTimelineCardComponent,
} from '../TimelineCardComponent';

export interface PropsTimelineDateComponent {
  date: string;
  message: string;
  items: PropsTimelineCardComponent[];
}

const TimelineDateComponent: React.FunctionComponent<
  PropsTimelineDateComponent
> = (data) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const date: string = data.date;
  const message: string = data.message;
  const items: PropsTimelineCardComponent[] = data.items;

  return (
    <div className={styles.timelineDateContainer}>
      <div className={styles.timelineDateCardTitle}>{date}</div>
      {message}
      {items.map((item, idx) => (
        <TimelineCardComponent
          title={item.title}
          content={item.content}
          imgUrl={item.imgUrl}
          sub={item.sub}
          key={`dataKey${idx}`}
        />
      ))}
    </div>
  );
};

export default TimelineDateComponent;
