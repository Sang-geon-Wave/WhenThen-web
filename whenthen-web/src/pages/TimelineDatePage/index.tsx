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

  const ChildComponent1 = () => {
    return <div>Child Component 1</div>;
  };

  const ChildComponent2 = () => {
    return <div>Child Component 1</div>;
  };

  return (
    <div>
      {tmpDates.map((val, idx) => {
        return (
          <TimelineDateComponent date={val} message={idx + '더덕'}>
            <ChildComponent1 />
            <ChildComponent2 />
          </TimelineDateComponent>
        );
      })}

      <TimelineDateComponent date={'2023-03-04'} message={'일더덕'}>
        <ChildComponent1 />
        <ChildComponent2 />
      </TimelineDateComponent>
    </div>
  );
};

export default TimelineDatePage;
