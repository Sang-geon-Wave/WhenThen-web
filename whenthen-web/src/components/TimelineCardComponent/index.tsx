import React, { useState } from 'react';
import stylesDesktopDefault from './DesktopDefault.module.scss';

export interface TimelineCardComponent {
  title: string;
  sub: string;
  imgUrl: string;
  content: string;
}

const Card: React.FunctionComponent<TimelineCardComponent> = ({
  title,
  sub,
  imgUrl,
  content,
}) => {
  const cardStyles = stylesDesktopDefault;
  const len: number = content.split('\n').length;
  const FS: number = 14;
  let [more, detail] = useState(false);
  const set_detail = () => {
    if (more === false) detail(true);
    else detail(false);
  };
  return (
    <div className={cardStyles.mainBlock}>
      <img alt="loading" src={imgUrl} className={cardStyles.imgBlock} />
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
          style={{
            height: more ? `${FS * (len + 1.5)}px` : `${6 * FS}px`,
            fontSize: `${FS}px`,
          }}
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

export default Card;
