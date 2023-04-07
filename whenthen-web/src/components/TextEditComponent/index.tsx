import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';

const TextEditorComponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  enum fontSytleName {
    NanumGothic = '나눔고딕',
    Gulim01 = '굴림1',
    Gulim02 = '굴림1',
    NanumSquareRoundR = '스퀘어라운드R',
    NanumSquareRoundB = '스퀘어라운드B',
  }

  const [textContent, setTextContent] = useState('');
  const [fontFamily, setFontFamily] = useState(fontSytleName.NanumGothic);

  const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextContent(event.target.value);
  };

  const handleBold = (e) => {
    console.log(e.target.id);
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

  return (
    <div>
      <div className={styles.buttonBox}>
        <Dropdown as={ButtonGroup}>
          <Button
            variant="success"
            id="fontSytleText"
            className={styles.dropdownBox}
          >
            {fontFamily}
          </Button>
          <Dropdown.Toggle split variant="success" id="dropdownSplit" />
          <Dropdown.Menu>
            {Object.values(fontSytleName).map((font) => {
              return (
                <Dropdown.Item
                  as="button"
                  value={font}
                  onClick={handleFont}
                  key={font}
                >
                  {font}
                </Dropdown.Item>
              );
            })}
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
          id="strikeThroughBtn"
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
        >
          {textContent}
        </div>
      </div>
    </div>
  );
};

export default TextEditorComponent;
