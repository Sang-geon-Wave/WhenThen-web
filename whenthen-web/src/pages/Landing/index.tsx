import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

import DefaultLayout from '../../layouts/DefaultLayout';
import IntroductionCardComponent from '../../components/IntroductionCardComponent';
import CarouselComponent from '../../components/CarouselComponent';

import logoImg from '../../assets/images/aeyung.jpg';
import logo from '../../assets/images/logo.svg';

const LandingPage = () => {
  const { screenClass, sideBarVisibility, changeSideBarVisibility } =
    useRootData(({ appStore }) => ({
      screenClass: appStore.screenClass.get(),
      sideBarVisibility: appStore.sideBarVisibility.get(),
      changeSideBarVisibility: appStore.changeSideBarVisibility,
    }));
  const isDesktop = screenClass === 'xl';

  return (
    <DefaultLayout>
      <div>
        <CarouselComponent />
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
    </DefaultLayout>
  );
};

export default LandingPage;
