import { useState } from 'react';

import CarouselItemComponent from './CarouselItem/index';
import useInterval from '../../hooks/useInterval';

import stylesDesktopDefault from './DesktopDefault.module.scss';
import useRootData from '../../hooks/useRootData';

const imgSrc = [
  'https://www.ygfamily.com/upload/main/jisoo_20230331_kr.jpg',
  'https://www.ygfamily.com/upload/main/treasure_20221004_kr.jpg',
  'https://www.ygfamily.com/upload/main/LCH_kr.jpg',
  'https://www.ygfamily.com/upload/main/BLACKPINK_20220907_kr.jpg',
];

const CarouselComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  useInterval(() => {
    setActiveIndex((activeIndex + 1) % imgSrc.length);
  }, 3000);

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselInner}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {imgSrc.map((src) => {
          return <CarouselItemComponent src={src} />;
        })}
      </div>
    </div>
  );
};

export default CarouselComponent;
