import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DaumPostcode from 'react-daum-postcode';
import { Button } from 'react-bootstrap';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface PropsLocationInputComponent {
  onAddressChange: (address: string) => void;
}

const LocationInputComponent: React.FunctionComponent<
  PropsLocationInputComponent
> = ({ onAddressChange }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [isSearchBtnClick, setIsSearchBtnClick] = useState(false);
  const [locationAddress, setLocationAddress] = useState(String);

  const openPostCode = () => {
    setIsSearchBtnClick(true);
  };

  const handleComplete = (data: any) => {
    onAddressChange(data.address);
    setLocationAddress(data.address);
    setIsSearchBtnClick(false);
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="주소 검색 버튼을 눌러 주소를 입력하세요."
          defaultValue={locationAddress}
          readOnly
        />
        <Button
          variant="outline-secondary bg-secondary text-white"
          onClick={openPostCode}
        >
          주소검색
        </Button>
        {isSearchBtnClick && (
          <DaumPostcode
            onComplete={handleComplete}
            autoClose={false}
          ></DaumPostcode>
        )}
      </InputGroup>
    </div>
  );
};

export default LocationInputComponent;
