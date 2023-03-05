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
  let [more, detail] = useState(false);
  const set_detail = () => {
    if (more === false) detail(true);
    else detail(false);
  };
  return (
    <div
      style={{
        margin: '1rem',
        display: 'inline-block',
        width: '90%',
        height: '100%',
      }}
    >
      <h1>Title: {title}</h1>
      <div>
        <img
          width={'20%'}
          height={'100%'}
          src={imgUrl}
          style={{
            float: 'left',
            marginRight: '1rem',
          }}
        />
        <textarea
          readOnly
          style={{
            float: 'left',
            width: '70%',
            height: more ? '330px' : '200px',
            border: 'none',
            resize: 'none',
          }}
        >
          {content}
        </textarea>
        <button onClick={set_detail}>더보기</button>
      </div>
      <div
        style={{
          margin: '1rem',
          display: 'inline-block',
          width: '100%',
          height: '100%',
        }}
      >
        <button>좋아요</button>
        <button>구독</button>
        <button>알림설정</button>
      </div>
    </div>
  );
};

export default Card;
