import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

export interface ProbsTimelineCardComponent {
  title: string;
  sub?: string;
  imgUrl?: string;
  content?: string;
}

const TimelineCardComponent: React.FunctionComponent<
  ProbsTimelineCardComponent
> = ({
  title,
  sub = '아직 정보가 없어요',
  imgUrl,
  content = '아직 정보가 없어요',
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const cardStyles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [more, detail] = useState(false);
  const set_detail = () => {
    if (content === '아직 정보가 없어요') return;
    if (more === false) detail(true);
    else detail(false);
  };

  return (
    <div className={cardStyles.mainBlock}>
      <img
        alt="포스터 사진이 없어요"
        src={imgUrl}
        className={cardStyles.imgBlock}
      />
      <div className={cardStyles.movieIntroduceBlock}>
        <h1 style={{ fontSize: more ? '5vh' : '10vh' }}>Title: {title}</h1>
        <h2
          style={{
            fontSize: more ? '2.5vh' : '4vh',
            color: 'rgb(188, 188, 188)',
          }}
        >
          {sub}
        </h2>
        <hr />
        <textarea
          onClick={set_detail}
          readOnly
          className={
            more ? cardStyles.contentClickBlock : cardStyles.contentBlock
          }
        >
          {content}
        </textarea>
        <hr />
        {more && (
          <div className={cardStyles.morePageButton}>
            <button>좋아요</button>
            <button>구독</button>
            <button>알림설정</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineCardComponent;
