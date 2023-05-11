import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

export interface PropsTimelineCardComponent {
  title: string;
  sub?: string;
  imgUrl?: string;
  content?: string;
}

enum DefaultEnum {
  DefaultText = '아직 정보가 없어요',
}

const TimelineCardComponent: React.FunctionComponent<
  PropsTimelineCardComponent
> = (data) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const cardStyles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const title: string = data.title;
  const sub: string = data.sub == null ? DefaultEnum.DefaultText : data.sub;
  const imgUrl: string =
    data.imgUrl == null ? DefaultEnum.DefaultText : data.imgUrl;
  const content: string =
    data.content == null ? DefaultEnum.DefaultText : data.content;

  const [moreInfo, setMoreInfo] = useState(false);
  const switchMoreInfoState = () => {
    if (content === DefaultEnum.DefaultText) return;
    setMoreInfo(!moreInfo);
  };

  return (
    <div className={cardStyles.mainBlock}>
      <img alt="No Image" src={imgUrl} className={cardStyles.imgBlock} />
      <div className={cardStyles.introduceBlock}>
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
