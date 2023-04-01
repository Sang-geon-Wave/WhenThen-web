import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Button from 'react-bootstrap/Button';
import { Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap';

const TextEditorComponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [text, setText] = useState('');
  const [fontFamily, setFontFamily] = useState('나눔고딕');

  const handleSetValue = (event) => {
    setText(event.target.value);
  };

  const handleBold = () => {
    document.execCommand('bold', false);
  };
  const handleItalic = () => {
    document.execCommand('italic', false);
  };
  const handleUnderline = () => {
    document.execCommand('underline', false);
  };
  const handleStrike = () => {
    document.execCommand('strikeThrough', false);
  };

  const handleFont = (event) => {
    setFontFamily(event.target.value);
    document.execCommand('fontName', false, event.target.value);
  };

  const handleFocus = (event) => {
    console.log(event.target.innerHTML);
  };

  return (
    <div>
      <div className={styles.buttonBox}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {fontFamily}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as="button" value={'나눔고딕'} onClick={handleFont}>
              나눔고딕
            </Dropdown.Item>
            <Dropdown.Item as="button" value={'굴림1'} onClick={handleFont}>
              굴림1
            </Dropdown.Item>
            <Dropdown.Item as="button" value={'굴림2'} onClick={handleFont}>
              굴림2
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              value={'스퀘어라운드R'}
              onClick={handleFont}
            >
              스퀘어라운드R
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              value={'스퀘어라운드B'}
              onClick={handleFont}
            >
              스퀘어라운드B
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          id="boldBtn"
          className={styles.button}
          variant="light"
          onClick={handleBold}
        >
          <b>B</b>
        </Button>
        <Button
          id="italicBtn"
          className={styles.button}
          variant="light"
          onClick={handleItalic}
        >
          <i>I</i>
        </Button>
        <Button
          id="underlineBtn"
          className={styles.button}
          variant="light"
          onClick={handleUnderline}
        >
          <u>U</u>
        </Button>
        <Button
          id="underlineBtn"
          className={styles.button}
          variant="light"
          onClick={handleStrike}
        >
          <s>S</s>
        </Button>
      </div>
      <div className={styles.mainBox}>
        <div
          id="textEdit"
          className={styles.textBox}
          contentEditable="true"
          onInput={handleSetValue}
          onFocus={handleFocus}
          style={{ fontFamily }}
        ></div>
      </div>
    </div>
  );
};

export default TextEditorComponent;
