import React, { useEffect, useRef, useState, useCallback } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import api from '../../api';
import DatepickerComponent from '../DatepickerComponent';

interface PropsSearchComponent {
  types: string[];
  dateTypes?: Set<string>;
}

const SearchComponent: React.FunctionComponent<PropsSearchComponent> = ({
  types,
  dateTypes,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [selectedType, setSelectedType] = useState(types[0]);
  const [isDateType, setDateType] = useState(
    dateTypes && dateTypes.has(selectedType),
  );
  const valueRef = useRef('');

  useEffect(() => {
    setDateType(dateTypes && dateTypes.has(selectedType));
  }, [selectedType]);

  const getSearchResult = useCallback(async () => {
    try {
      const result = await api.get(
        `/search?type=${selectedType}&value=${valueRef.current}`,
      );
      console.log(result);
    } catch (e: any) {
      console.log(e instanceof Error ? e.message : String(e));
    }
  }, [selectedType]);

  const handleTypeSelect = useCallback((type: string) => {
    setSelectedType(type);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      valueRef.current = e.target.value;
    },
    [],
  );

  return (
    <div>
      <InputGroup className="mb-3">
        <DropdownButton variant="secondary" title={selectedType}>
          {types.map((type) => (
            <Dropdown.Item key={type} onClick={() => handleTypeSelect(type)}>
              {type}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        {isDateType && (
          <DatepickerComponent
            onDateSelected={(formattedDate) => {
              valueRef.current = formattedDate;
            }}
          ></DatepickerComponent>
        )}
        {!isDateType && (
          <Form.Control aria-label="search" onChange={handleInputChange} />
        )}
        <Button variant="primary" onClick={getSearchResult}>
          Search
        </Button>
      </InputGroup>
    </div>
  );
};

export default SearchComponent;
