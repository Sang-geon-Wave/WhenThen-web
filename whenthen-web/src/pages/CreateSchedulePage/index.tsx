import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';

import DefaultLayout from '../../layouts/DefaultLayout';
import ImageUploadComponent from '../../components/ImageUploadComponent';
import LocationInputComponent from '../../components/LocationInputComponent';
import TextEditComponent from '../../components/TextEditComponent';
import DatepickerComponent from '../../components/DatepickerComponent';

import { ScheduleDataType } from '../../types/ScheduleDataType';
import { AlertType } from '../../components/AlertComponent';

import api from '../../api';
import HttpStatus from 'http-status-codes';

const CreateSchedulePage = () => {
  const { screenClass, setAlert } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
    setAlert: appStore.setAlert,
  }));
  const isDesktop = screenClass === 'xl';

  const navigate = useNavigate();

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

  const [visibleChkAlert, setVisibleChkAlert] = useState(false);

  const handleInputChanged = (
    name: keyof ScheduleDataType,
    value: string | File,
  ) => {
    setscheduleData({
      ...scheduleData,
      [name]: value,
    });
  };

  function checkAllFieldsFilled(data: ScheduleDataType): boolean {
    return Object.values(data).every((value) => Boolean(value));
  }

  const handleVisibleChkAlert = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
    setVisibleChkAlert(true);
    setTimeout(() => {
      setVisibleChkAlert(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkAllFieldsFilled(scheduleData) === false) {
      handleVisibleChkAlert();
    } else {
      const formData = new FormData();
      formData.append('title', scheduleData.title);
      formData.append('thumbnail', scheduleData.image as File);
      formData.append('contents', scheduleData.contents);
      formData.append('eventUrl', scheduleData.eventUrl);
      formData.append('placeAddr', scheduleData.placeAddr);
      formData.append('startDate', scheduleData.startDate);
      formData.append('endDate', scheduleData.endDate);
      try {
        const { data } = await api.post('/article/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const { status: statusResult } = data;
        if (statusResult == HttpStatus.OK) {
          setAlert({
            alertContent: '이벤트가 정상적으로 등록되었어요!',
            alertType: AlertType.Information,
            handleConfirm: () => {
              navigate('/timeline');
            },
          });
        } else {
          throw new Error('post fail');
        }
      } catch (e) {
        setAlert({
          alertContent: '전송하는 중 오류가 발생했어요. 다시 시도해주세요.',
          alertType: AlertType.Information,
        });
      }
    }
  };

  return (
    <DefaultLayout hideSideBar={false}>
      <div>
        <h1>이벤트 생성</h1>
        <Form onSubmit={handleSubmit}>
          <Alert show={visibleChkAlert} key="warning" variant="warning">
            입력하지 않은 항목이 있습니다.
          </Alert>
          <Form.Group className="mb-3">
            <Form.Label>타이틀</Form.Label>
            <Form.Control
              size="lg"
              placeholder="타이틀을 작성해주세요."
              name="title"
              onChange={(event) =>
                handleInputChanged('title', event.target.value)
              }
              required
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
              required
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
            <TextEditComponent
              onTextChange={(textContent) => {
                handleInputChanged('contents', textContent);
              }}
            ></TextEditComponent>
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
