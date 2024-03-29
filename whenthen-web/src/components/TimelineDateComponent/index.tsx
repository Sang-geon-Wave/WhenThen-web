import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import TimelineCardComponent, {
  PropsTimelineCardComponent,
} from '../TimelineCardComponent';
import { MovieIntro, MovieListByDate } from '../../types/MovieDataType';
import { Container } from 'react-bootstrap';

export interface PropsTimelineDateComponent {
  movieList: MovieListByDate;
}

const TimelineDateComponent: React.FunctionComponent<
  PropsTimelineDateComponent
> = ({ movieList }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const date: string = movieList.date;
  const message: string = movieList.message;
  const movieItems: MovieIntro[] = movieList.movieItems;

  return (
    <div className={styles.timelineDateContainer}>
      <div className={styles.timelineDateCardTitle}>{date}</div>
      {message}
      {movieItems.map((movieItem, idx) => (
        <Container className="pb-3 px-0">
          <TimelineCardComponent movieIntro={movieItem} key={`dataKey${idx}`} />
        </Container>
      ))}
    </div>
  );
};

export default TimelineDateComponent;
