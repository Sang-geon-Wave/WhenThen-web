import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import ImageUploadComponent from '../../components/ImageUploadComponent';
import { Button, Form, Row, Col } from 'react-bootstrap';
import LocationInputComponent from '../../components/LocationInputComponent';

import DefaultLayout from '../../layouts/DefaultLayout';
import DatepickerComponent from '../../components/DatepickerComponent';
const CreateSchedulePage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const [createScFormValue, setCreateScFormValue] = useState({
    title: '',
    startDate: '',
    endDate: '',
    placeAddr: '',
    eventUrl: '',
    contents: '',
    img1: undefined as File | undefined, // img1 프로퍼티 추가
  });

  const handleFileChange = (file: File) => {
    setCreateScFormValue({
      ...createScFormValue,
      img1: file,
    });
  };

  const handleLocationInputChange = (address: string) => {
    setCreateScFormValue({
      ...createScFormValue,
      placeAddr: address,
    });
  };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateScFormValue({
      ...createScFormValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateSelected = (name: string, formattedDate: string) => {
    setCreateScFormValue({
      ...createScFormValue,
      [name]: formattedDate,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(createScFormValue, null, 2));
  };

  return (
    <DefaultLayout>
      <div>
        <h1>이벤트 생성</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>타이틀</Form.Label>
            <Form.Control
              size="lg"
              placeholder="타이틀을 작성해주세요."
              name="title"
              onChange={handleInputTextChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <div>
              <Row>
                <Col>
                  시작일
                  <DatepickerComponent
                    onDateSelected={(formattedDate) =>
                      handleDateSelected('startDate', formattedDate)
                    }
                  ></DatepickerComponent>
                </Col>
                <Col>
                  종료일
                  <DatepickerComponent
                    onDateSelected={(formattedDate) =>
                      handleDateSelected('endDate', formattedDate)
                    }
                  ></DatepickerComponent>
                </Col>
              </Row>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>장소</Form.Label>
            <LocationInputComponent
              onAddressChange={handleLocationInputChange}
            ></LocationInputComponent>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>관련 URL</Form.Label>
            <Form.Control
              placeholder="임시"
              name="eventUrl"
              onChange={handleInputTextChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>이미지</Form.Label>
            <ImageUploadComponent
              onFileChange={handleFileChange}
            ></ImageUploadComponent>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="글을 쓰세요!"
              name="contents"
              onChange={handleInputTextChange}
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
