import { useState } from 'react';

import CarouselItemComponent from './CarouselItem/index';
import useInterval from '../../hooks/useInterval';

import stylesDesktopDefault from './DesktopDefault.module.scss';
import useRootData from '../../hooks/useRootData';

const imgSrc = [
  'https://software.kookmin.ac.kr/_res/kookmin/software/img/main/img-main-vi02.jpg',
  'https://software.kookmin.ac.kr/_res/kookmin/software/img/main/img-main-vi03.jpg',
  'https://software.kookmin.ac.kr/_res/kookmin/software/img/main/img-main-vi04.jpg',
  'https://software.kookmin.ac.kr/_res/kookmin/software/img/main/img-main-vi05.jpg',
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
