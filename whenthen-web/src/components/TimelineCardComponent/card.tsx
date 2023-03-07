import React, { useState } from 'react';

export interface TimelineCardComponent {
  title: string;
  imgUrl: string;
  content: string;
}

const Card: React.FunctionComponent<TimelineCardComponent> = ({
  title,
  imgUrl,
  content,
}) => {
  const len: number = content.split('\n').length - 1;
  const FS: number = 16;
  let [more, detail] = useState(false);
  const set_detail = () => {
    if (more === false) detail(true);
    else detail(false);
  };
  return (
    <>
      <div
        style={{
          margin: '1%',
          padding: '1%',
          display: 'block',
          borderColor: 'black',
          borderStyle: 'double',
          backgroundColor: 'beige',
          textAlign: 'left',
          fontSize: `${FS}px`,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            width: '100%',
          }}
        >
          <img
            src={imgUrl}
            style={{
              float: 'left',
              width: '20%',
              marginRight: '1%',
            }}
          />
          <div
            className=""
            style={{
              float: 'left',
              width: '78%',
              height: '100%',
              textAlign: 'left',
            }}
          >
            <h1 style={{ fontSize: '5vh' }}>Title: {title}</h1>
            <textarea
              onClick={set_detail}
              readOnly
              style={{
                width: '100%',
                height: more ? `${FS * len + FS * 0.5}px` : `${4 * FS}px`,
                border: 'none',
                resize: 'none',
                overflow: more ? 'auto' : 'hidden',
              }}
            >
              {content}
            </textarea>
          </div>
        </div>
        {more && (
          <div
            style={{
              //margin: '1rem',
              display: 'inline-block',
              textAlign: 'right',
              width: '100%',
            }}
          >
            <button>좋아요</button>
            <button>구독</button>
            <button>알림설정</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
