import React, { useEffect, useRef, useState, useCallback } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import api from '../../api';
import DatepickerComponent from '../DatepickerComponent';
import { AxiosResponse } from 'axios';

interface PropsSearchComponent {
  types: string[];
  dateTypes?: Set<string>;
  onSearchCompleted: (response: AxiosResponse<any, any>) => void;
}

const SearchComponent: React.FunctionComponent<PropsSearchComponent> = ({
  types,
  dateTypes,
  onSearchCompleted,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [searchType, setSearchType] = useState(types[0]);
  const [searchValue, setSearchValue] = useState('');
  const [isDateType, setDateType] = useState(
    dateTypes && dateTypes.has(searchType),
  );

  useEffect(() => {
    setDateType(dateTypes && dateTypes.has(searchType));
  }, [searchType]);

  const getSearchResult = useCallback(async () => {
    if (!searchValue) return;

    try {
      const response: AxiosResponse<any, any> = await api.get(
        `/search?type=${searchType}&value=${searchValue}&page=1`,
      );
      onSearchCompleted(response);
      console.log(response);
    } catch (e: any) {
      console.log(e instanceof Error ? e.message : String(e));
    }
  }, [searchType, searchValue]);

  const handleTypeSelect = useCallback((type: string) => {
    setSearchType(type);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    [],
  );

  return (
    <div>
      <InputGroup className="mb-3">
        <DropdownButton variant="secondary" title={searchType}>
          {types.map((type) => (
            <Dropdown.Item key={type} onClick={() => handleTypeSelect(type)}>
              {type}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        {isDateType && (
          <DatepickerComponent
            onDateSelected={(formattedDate) => {
              setSearchValue(formattedDate);
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
