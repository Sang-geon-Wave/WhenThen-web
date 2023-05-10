import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Card } from 'react-bootstrap';

export interface PropsIntroductionCardComponent {
  imgUrl?: string;
  title: string;
  subtitle: string;
  content: string;
}

const IntroductionCardComponent: React.FunctionComponent<
  PropsIntroductionCardComponent
> = ({ imgUrl, title, subtitle, content }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <Card>
      {imgUrl && (
        <Card.Img
          variant="top"
          className={styles.image}
          alt="No Image"
          src={imgUrl}
        />
      )}
      <Card.Body className="bg-light">
        <h3 className={styles.subtitle}>{subtitle}</h3>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.content}>{content}</h3>
      </Card.Body>
    </Card>
  );
};

export default IntroductionCardComponent;
