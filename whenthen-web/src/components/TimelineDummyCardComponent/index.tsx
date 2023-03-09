import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface ProbsTimelineDummyCardComponent {
  text: string;
}

const TimelineDummyCardComponent: React.FunctionComponent<
  ProbsTimelineDummyCardComponent
> = ({ text }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div className={styles.dummyCard}>
      <div>{text}</div>
    </div>
  );
};

export default TimelineDummyCardComponent;
