import React from 'react';
import useRootData from '../../hooks/useRootData';
import TimelineDateComponent from '../../components/TimelineDateComponent';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

const TimelineDatePage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;
  const tmpDates = ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04'];
  const dummyData = [{ text: 'A' }, { text: 'B' }, { text: 'C' }];

  return (
    <div>
      {tmpDates.map((val, idx) => {
        return (
          <TimelineDateComponent
            date={val}
            message={idx + ' 더덕 메시지'}
            cards={dummyData}
          ></TimelineDateComponent>
        );
      })}
    </div>
  );
};

export default TimelineDatePage;
