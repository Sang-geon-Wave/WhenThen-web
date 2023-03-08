import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface ProbsTimelineCardsComponent {
  children: React.ReactNode;
}

const TimelineCardsComponent: React.FunctionComponent<
  ProbsTimelineCardsComponent
> = ({ children }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div className={styles.dummyCard}>
      <div>{children}</div>
    </div>
  );
};

export default TimelineCardsComponent;
