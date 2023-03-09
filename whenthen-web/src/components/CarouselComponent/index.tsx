import React, { useState, useEffect, useRef } from 'react';
import stylesDesktopDefault from './DesktopDefault.module.scss';

const imgSrc = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLpZ3AmUlI_h9TNBB-lEnxyFDIplBHlYyL1A&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSthULQX_46UhK1K35yNXHrcdfrL7zmHCWXDA&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4zRpZR__dX85rRE56oziBQHW9SmLNHK4AOw&usqp=CAU',
];

const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef<Function>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export interface ProbsCarouselItemComponent {
  src: string;
}

const CarouselItemComponent: React.FunctionComponent<
  ProbsCarouselItemComponent
> = ({ src }) => {
  return (
    <div className={stylesDesktopDefault.carouselItem}>
      <img src={src} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

const CarouselComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useInterval(() => {
    setActiveIndex((activeIndex + 1) % imgSrc.length);
  }, 2000);

  return (
    <div className={stylesDesktopDefault.carousel}>
      <div
        className={stylesDesktopDefault.carouselInner}
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
