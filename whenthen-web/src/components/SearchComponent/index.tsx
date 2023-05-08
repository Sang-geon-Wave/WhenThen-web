import React, { useEffect, useRef, useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';

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

  useEffect(() => {}, [selectedType]);

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
        <Form.Control aria-label="search" />
        <Button variant="primary">Search</Button>
      </InputGroup>
    </div>
  );
};

export default SearchComponent;
