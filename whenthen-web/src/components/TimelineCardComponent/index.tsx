import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { MovieIntro } from '../../types/MovieDataType';
import { Row, Col, Card, Button } from 'react-bootstrap';

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
    <Card className={cardStyles.containerCard}>
      <Row>
        <Col md={2}>
          <Card.Img
            alt="포스터 사진이 없어요"
            src={imgUrl}
            className={cardStyles.imgBlock}
          />
        </Col>
        <Col md={10}>
          <Card.Body>
            <div className={cardStyles.movieIntroduceBlock}>
              <h1 className={cardStyles.title}>{title}</h1>
              <h4>{sub}</h4>
              <hr />
              <p
                onClick={switchMoreInfoState}
                className={
                  moreInfo
                    ? cardStyles.contentClickBlock
                    : cardStyles.contentBlock
                }
              >
                {content}
              </p>
              <hr />
              {moreInfo && (
                <div className={cardStyles.moreInfoButtonBlock}>
                  <Button variant="outline-secondary">수정</Button>{' '}
                  <Button variant="outline-danger">삭제</Button>{' '}
                  <Button variant="outline-success">좋아요</Button>{' '}
                </div>
              )}
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default TimelineCardComponent;
