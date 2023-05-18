import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import ImageUploadComponent from '../../components/ImageUploadComponent';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import LocationInputComponent from '../../components/LocationInputComponent';

import DefaultLayout from '../../layouts/DefaultLayout';
import DatepickerComponent from '../../components/DatepickerComponent';
import { ScheduleDataType } from '../../types/ScheduleDataType';

const CreateSchedulePage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const [scheduleData, setscheduleData] = useState<ScheduleDataType>({
    title: '',
    startDate: '',
    endDate: '',
    placeAddr: '',
    eventUrl: '',
    contents: '',
    image: undefined,
  });

  const handleInputChanged = (
    name: keyof ScheduleDataType,
    value: string | File,
  ) => {
    setscheduleData({
      ...scheduleData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <DefaultLayout>
      <div className="p-md-5">
        <h1>이벤트 생성</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>타이틀</Form.Label>
            <Form.Control
              size="lg"
              placeholder="타이틀을 작성해주세요."
              name="title"
              onChange={(event) =>
                handleInputChanged('title', event.target.value)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <div>
              <Row>
                <Col>
                  시작일
                  <DatepickerComponent
                    onDateSelected={(formattedDate) =>
                      handleInputChanged('startDate', formattedDate)
                    }
                  ></DatepickerComponent>
                </Col>
                <Col>
                  종료일
                  <DatepickerComponent
                    onDateSelected={(formattedDate) =>
                      handleInputChanged('endDate', formattedDate)
                    }
                  ></DatepickerComponent>
                </Col>
              </Row>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>장소</Form.Label>
            <LocationInputComponent
              onAddressChange={(placeAddr) =>
                handleInputChanged('placeAddr', placeAddr)
              }
            ></LocationInputComponent>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>관련 URL</Form.Label>
            <Form.Control
              placeholder="이벤트 관련 URL을 입력해보세요."
              name="eventUrl"
              onChange={(event) =>
                handleInputChanged('eventUrl', event.target.value)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>이미지</Form.Label>
            <ImageUploadComponent
              onFileChange={(file) => handleInputChanged('image', file)}
            ></ImageUploadComponent>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="글을 쓰세요!"
              name="contents"
              onChange={(event) =>
                handleInputChanged('contents', event.target.value)
              }
            />
          </Form.Group>
          <Button type="submit" variant="primary" size="lg" className="w-100">
            추가하기
          </Button>
        </Form>
      </div>
    </DefaultLayout>
  );
};

export default CreateSchedulePage;
