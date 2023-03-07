import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface ProbsTimelineDateComponent {
  date: string;
  message: string;
}

const TimelineDateComponent: React.FunctionComponent<
  ProbsTimelineDateComponent
> = ({ date, message }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  // return highlight ? (
  //   <div className={styles.highlightMessage}>
  //     {date}
  //     <br></br>
  //     {message}
  //   </div>
  // ) : (
  //   <div className={styles.message}>
  //     {date}
  //     <br></br>
  //     {message}
  //   </div>
  // );
  return (
    <div className={styles.message}>
      <div className={styles.dateTitle}>{date}</div>
      <br></br>
      {message}
    </div>
  );
};

export default TimelineDateComponent;
