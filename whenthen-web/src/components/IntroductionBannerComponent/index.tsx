import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

export interface PropsIntroductionBannerComponent {
  imgUrl?: string;
  title: string;
  content: string;
}

const IntroductionBannerComponent: React.FunctionComponent<
  PropsIntroductionBannerComponent
> = ({ imgUrl, title, content }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div className={styles.banner}>
      {imgUrl && <img className={styles.image} alt="No Image" src={imgUrl} />}
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <h3 className={styles.content}>{content}</h3>
      </div>
    </div>
  );
};

export default IntroductionBannerComponent;
