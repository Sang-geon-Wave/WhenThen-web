import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

import DefaultLayout from '../../layouts/DefaultLayout';
import IntroductionCardComponent from '../../components/IntroductionCardComponent';
import CarouselComponent from '../../components/CarouselComponent';

import logoImg from '../../assets/images/aeyung.jpg';
import logo from '../../assets/images/logo.svg';

import DefaultLayout from '../../layouts/DefaultLayout';

const LandingPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;
  return (
    <DefaultLayout>
      <div>
        <CarouselComponent />
        <div className={styles.introductionCardBlock}>
          <IntroductionCardComponent
            imgUrl={logoImg}
            title="string"
            subtitle="string"
            content="string"
          />
          <IntroductionCardComponent
            imgUrl={logo}
            title="string"
            subtitle="string"
            content="string"
          />
          <IntroductionCardComponent
            imgUrl={logoImg}
            title="string"
            subtitle="string"
            content="string"
          />
          <IntroductionCardComponent
            imgUrl={logo}
            title="string"
            subtitle="string"
            content="string"
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LandingPage;
