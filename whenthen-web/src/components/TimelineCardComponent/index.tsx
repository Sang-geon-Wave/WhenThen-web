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
  sub = 0,
  content = 1,
}

const TimelineCardComponent: React.FunctionComponent<
  PropsTimelineCardComponent
> = ({
  title,
  sub = DefaultEnum.sub,
  imgUrl,
  content = DefaultEnum.content,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const cardStyles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [moreInfo, setMoreInfo] = useState(false);
  const switchMoreInfoState = () => {
    if (content === DefaultEnum.content) return;
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
        <h1 style={{ fontSize: moreInfo ? '5vh' : '10vh' }}>Title: {title}</h1>
        <h2
          style={{
            fontSize: moreInfo ? '2.5vh' : '4vh',
            color: 'rgb(188, 188, 188)',
          }}
        >
          {sub === DefaultEnum.sub ? '아직 정보가 없습니다.' : sub}
        </h2>
        <hr />
        <textarea
          onClick={switchMoreInfoState}
          readOnly
          className={
            moreInfo ? cardStyles.contentClickBlock : cardStyles.contentBlock
          }
        >
          {content === DefaultEnum.content ? '아직 정보가 없습니다.' : content}
        </textarea>
        <hr />
        {moreInfo && (
          <div className={cardStyles.moreInfoButtonBlock}>
            <button className={cardStyles.moreInfoButton}>좋아요</button>
            <button className={cardStyles.moreInfoButton}>구독</button>
            <button className={cardStyles.moreInfoButton}>알림설정</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineCardComponent;
