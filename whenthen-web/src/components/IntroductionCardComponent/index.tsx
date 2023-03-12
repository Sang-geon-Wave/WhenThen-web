import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

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

  // mobile style not exist
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div className={styles.card}>
      <img className={styles.image} alt="No Image" src={imgUrl} />
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <h1 className={styles.subtitle}>{subtitle}</h1>
        <h3 className={styles.content}>{content}</h3>
      </div>
    </div>
  );
};

export default IntroductionCardComponent;
