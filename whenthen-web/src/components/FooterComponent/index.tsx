import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Row, Col } from 'react-bootstrap';
// import stylesMobileDefault from './MobileDefault.module.scss';

const FooterComponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div className={styles.footer}>
      <Row className="px-3 py-2">
        <Col>
          <span>© 2023 TGIF</span>
          <br />
          <span>본 활동은 SW중심대학사업의 지원을 받아 수행하였습니다.</span>
          <br />
        </Col>
        <Col className={styles.linkButtonSet}>
          <div className={styles.linkButton}>git</div>
          <div className={styles.linkButton}>notion</div>
          <div className={styles.linkButton}></div>
        </Col>
      </Row>
    </div>
  );
};
export default FooterComponent;
