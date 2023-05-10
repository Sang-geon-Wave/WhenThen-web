import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

import DefaultLayout from '../../layouts/DefaultLayout';
import IntroductionCardComponent from '../../components/IntroductionCardComponent';
import CarouselComponent from '../../components/CarouselComponent';

import logoImg from '../../assets/images/aeyung.jpg';
import logo from '../../assets/images/logo.svg';
import { Container, Row, Col } from 'react-bootstrap';

const LandingPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;
  return (
    <DefaultLayout hideSideBar={true}>
      <div>
        <CarouselComponent />
        <Container className="py-lg-5">
          <Row className="py-4">
            <h1 className="text-center">새로운 이벤트를 만나보세요.</h1>
          </Row>
          <Row xs={1} md={2} lg={4}>
            <Col className="pb-4">
              <IntroductionCardComponent
                imgUrl="https://cdn.marvel.com/content/1x/themarvels_lob_crd_03.jpg"
                title="Marvels"
                subtitle="2023-01-01"
                content="string"
              />
            </Col>
            <Col className="pb-4">
              <IntroductionCardComponent
                imgUrl="https://cdn.marvel.com/content/1x/guardiansofthegalaxyvolume3_lob_crd_03.jpg"
                title="가디언즈 오브 갤럭시"
                subtitle="2023-01-01"
                content="string"
              />
            </Col>
            <Col className="pb-4">
              <IntroductionCardComponent
                imgUrl="https://cdn.marvel.com/content/1x/antmanandthewaspquantumania_lob_crd_03.jpg"
                title="앤트맨"
                subtitle="2023-01-01"
                content="string"
              />
            </Col>
            <Col className="pb-4">
              <IntroductionCardComponent
                imgUrl="https://cdn.marvel.com/content/1x/blackpantherwakandaforever_lob_crd_06.jpg"
                title="블랙펜서"
                subtitle="2023-01-01"
                content="string"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default LandingPage;
