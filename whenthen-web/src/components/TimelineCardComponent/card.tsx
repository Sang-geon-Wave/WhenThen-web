import React, { useState } from 'react';
import './card.css';

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
  const len: number = content.split('\n').length;
  const FS: number = 14;
  let [more, detail] = useState(false);
  const set_detail = () => {
    if (more === false) detail(true);
    else detail(false);
  };
  return (
    <>
      <div className="mainBlock">
        <div
          style={{
            display: 'inline-block',
            width: '100%',
          }}
        >
          <img
            src={imgUrl}
            style={{
              borderRadius: '5vh',
              float: 'left',
              width: '20%',
              marginRight: '1%',
            }}
          />
          <div className="movieIntroduceBlock">
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
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'white',
                width: '100%',
                resize: 'none',
                overflow: more ? 'auto' : 'hidden',
                height: more ? `${FS * (len + 1.5)}px` : `${6 * FS}px`,
                fontSize: `${FS}px`,
              }}
            >
              {content}
            </textarea>
            <hr />
            {more && (
              <div className="morePageButton">
                <button>좋아요</button>
                <button>구독</button>
                <button>알림설정</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
