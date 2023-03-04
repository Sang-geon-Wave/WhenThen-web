import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface ProbsTimelineDateComponent {
  date: string;
  message: string;
  highlight: boolean;
}

const TimelineDateComponent: React.FunctionComponent<
  ProbsTimelineDateComponent
> = ({ date, message, highlight }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return highlight ? (
    <div className={styles.highlightMessage}>
      {date}
      {message}
    </div>
  ) : (
    <div className={styles.message}>
      {date}
      {message}
    </div>
  );
};

export default TimelineDateComponent;
