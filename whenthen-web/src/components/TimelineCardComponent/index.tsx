import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { ArticleIntro } from '../../types/ArticleDataType';

export interface PropsTimelineCardComponent {
  articleIntro: ArticleIntro;
}

enum DefaultEnum {
  DefaultText = '아직 정보가 없어요',
}

const TimelineCardComponent: React.FunctionComponent<
  PropsTimelineCardComponent
> = ({ articleIntro }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const cardStyles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const title: string = articleIntro.title;
  const sub: string =
    articleIntro.sub == null || articleIntro.sub == ''
      ? DefaultEnum.DefaultText
      : articleIntro.sub;
  const imgUrl: string =
    articleIntro.imgUrl == null || articleIntro.imgUrl == ''
      ? DefaultEnum.DefaultText
      : articleIntro.imgUrl;
  const content: string =
    articleIntro.content == null || articleIntro.content == ''
      ? DefaultEnum.DefaultText
      : articleIntro.content;

  const [moreInfo, setMoreInfo] = useState(false);

  return (
    <div className={cardStyles.mainBlock}>
      <img
        alt="포스터 사진이 없어요"
        src={imgUrl}
        className={cardStyles.imgBlock}
      />
      <div>
        <div
          className={cardStyles.movieIntroduceBlock}
          onClick={() => {
            setMoreInfo(!moreInfo);
          }}
        >
          <h1
            className={
              moreInfo ? cardStyles.titleClickBlock : cardStyles.titleBlock
            }
          >
            Title: {title}
          </h1>
          <h2
            className={
              moreInfo ? cardStyles.subClickBlock : cardStyles.subBlock
            }
          >
            {sub}
          </h2>
          <hr />
          <p
            className={
              moreInfo ? cardStyles.contentClickBlock : cardStyles.contentBlock
            }
          >
            {content}
          </p>
          <hr />
        </div>
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
