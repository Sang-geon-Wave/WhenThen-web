import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { MovieIntro } from '../../types/MovieDataType';

export interface PropsTimelineCardComponent {
  movieIntro: MovieIntro;
}

enum DefaultEnum {
  DefaultText = '아직 정보가 없어요',
}

const TimelineCardComponent: React.FunctionComponent<
  PropsTimelineCardComponent
> = ({ movieIntro }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const cardStyles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const title: string = movieIntro.title;
  const sub: string =
    movieIntro.sub == null ? DefaultEnum.DefaultText : movieIntro.sub;
  const imgUrl: string =
    movieIntro.imgUrl == null ? DefaultEnum.DefaultText : movieIntro.imgUrl;
  const content: string =
    movieIntro.content == null ? DefaultEnum.DefaultText : movieIntro.content;

  const [moreInfo, setMoreInfo] = useState(false);
  const switchMoreInfoState = () => {
    if (content === DefaultEnum.DefaultText) return;
    setMoreInfo(!moreInfo);
  };

  return (
    <div className={cardStyles.mainBlock}>
      <img
        alt="포스터 사진이 없어요"
        src={imgUrl}
        className={cardStyles.imgBlock}
      />
      <div className={cardStyles.movieIntroduceBlock}>
        <h1
          className={
            moreInfo ? cardStyles.titleClickBlock : cardStyles.titleBlock
          }
        >
          Title: {title}
        </h1>
        <h2
          className={moreInfo ? cardStyles.subClickBlock : cardStyles.subBlock}
        >
          {sub}
        </h2>
        <hr />
        <p
          onClick={switchMoreInfoState}
          className={
            moreInfo ? cardStyles.contentClickBlock : cardStyles.contentBlock
          }
        >
          {content}
        </p>
        <hr />
        {moreInfo && (
          <div className={cardStyles.moreInfoButtonBlock}>
            <button className={cardStyles.moreInfoButton}>추가</button>
            <button className={cardStyles.moreInfoButton}>삭제</button>
            <button className={cardStyles.moreInfoButton}>따봉</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineCardComponent;
