import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Form from 'react-bootstrap/Form';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface PropsImageUploadComponent {
  onFileChange: (file: File) => void;
}

const ImageUploadComponent: React.FunctionComponent<
  PropsImageUploadComponent
> = ({ onFileChange }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [previewImgDataUrl, setPreviewImgDataUrl] = useState<
    string | undefined
  >();

  const handlerFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImgDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImgDataUrl(undefined);
    }
  };

  return (
    <div>
      <Form.Control
        type="file"
        placeholder="이미지를 첨부해주세요."
        onChange={handlerFileChange}
        accept="image/*"
      />
      <div className="w-100 d-flex justify-content-center">
        {previewImgDataUrl && (
          <img
            className={styles.previewUploadImg}
            src={previewImgDataUrl}
            alt="사용자 업로드 이미지"
          />
        )}
      </div>
    </div>
  );
};

export default ImageUploadComponent;
