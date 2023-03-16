import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import ImageUploadComponent from '../../components/ImageUploadComponent';
import { Button, Form } from 'react-bootstrap';
import LocationInputComponent from '../../components/LocationInputComponent';

const CreatePage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const [file, setFile] = useState<File>();

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  return (
    <div>
      <h1>이벤트 생성</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>타이틀</Form.Label>
          <Form.Control size="lg" placeholder="타이틀을 작성해주세요." />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>기간</Form.Label>
          <Form.Control placeholder="임시" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>장소</Form.Label>
          <LocationInputComponent></LocationInputComponent>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>관련 URL</Form.Label>
          <Form.Control placeholder="임시" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>이미지</Form.Label>
          <ImageUploadComponent
            onFileChange={handleFileChange}
          ></ImageUploadComponent>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" placeholder="글을 쓰세요!" />
        </Form.Group>
        <Button type="submit" variant="primary" size="lg" className="w-100">
          추가하기
        </Button>
      </Form>
    </div>
  );
};

export default CreatePage;
