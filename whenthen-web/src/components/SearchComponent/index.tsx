import React, { useEffect, useRef, useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import api from '../../api';

interface PropsSearchComponent {
  types: String[];
}

const SearchComponent: React.FunctionComponent<PropsSearchComponent> = ({
  types,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [selectedType, setSelectedType] = useState(types[0]);
  let searchValue = '';

  useEffect(() => {}, [selectedType]);

  const getSearchResult = async () => {
    try {
      const result = await api.get(
        `/search?type=${selectedType}&value=${searchValue}`,
      );
      console.log(result);
    } catch (e: any) {
      console.log(e instanceof Error ? e.message : String(e));
    }
  };
  // TODO: connect api server, Form.Control customize(datetime input etc.)
  return (
    <div>
      <InputGroup className="mb-3">
        <DropdownButton variant="secondary" title={selectedType}>
          {types.map((type) => (
            <Dropdown.Item
              onClick={() => {
                setSelectedType(type);
              }}
            >
              {type}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <Form.Control
          aria-label="search"
          onChange={(e) => {
            searchValue = e.target.value;
          }}
        />
        <Button variant="primary" onClick={getSearchResult}>
          Search
        </Button>
      </InputGroup>
    </div>
  );
};

export default SearchComponent;
