import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import TimelineCardComponent, {
  PropsTimelineCardComponent,
} from '../TimelineCardComponent';
import { ArticleIntro, ArticleListByDate } from '../../types/ArticleDataType';

export interface PropsTimelineDateComponent {
  articleList: ArticleListByDate;
}

const TimelineDateComponent: React.FunctionComponent<
  PropsTimelineDateComponent
> = ({ articleList }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const date: string = articleList.date;
  const message: string = articleList.message;
  const movieItems: ArticleIntro[] = articleList.movieItems;

  return (
    <div className={styles.timelineDateContainer}>
      <div className={styles.timelineDateCardTitle}>{date}</div>
      {message}
      {movieItems.map((movieItem, idx) => (
        <TimelineCardComponent articleIntro={movieItem} key={`dataKey${idx}`} />
      ))}
    </div>
  );
};

export default TimelineDateComponent;
