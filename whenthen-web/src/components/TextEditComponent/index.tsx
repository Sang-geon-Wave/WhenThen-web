import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Dropdown, ButtonGroup, Button, ToggleButton } from 'react-bootstrap';

export interface PropsTextEditComponent {
  getTextContent?: string;
}

const TextEditComponent: React.FunctionComponent<PropsTextEditComponent> = ({
  getTextContent,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  enum fontSytleName {
    NanumGothic = '나눔고딕',
    Gulim01 = '굴림1',
    Gulim02 = '굴림2',
    NanumSquareRoundR = '스퀘어라운드R',
    NanumSquareRoundB = '스퀘어라운드B',
  }

  const [textContent, setTextContent] = useState('');
  const [fontFamily, setFontFamily] = useState(fontSytleName.NanumGothic);

  const handleChangeTextContent = () => {
    const curText = document.getElementById('textEdit');
    if (curText != null) {
      setTextContent(curText.innerHTML);
      getTextContent = curText.innerHTML;
    } else {
      getTextContent = '';
    }
  };

  const keyDownHandling = (event: any) => {
    if (event.ctrlKey && event.keyCode == 66) {
      setBold(!bold);
    } else if (event.ctrlKey && event.keyCode == 73) {
      setItalic(!italic);
    } else if (event.ctrlKey && event.keyCode == 85) {
      setUnderline(!underline);
    }
  };

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strikeThrough, setStrikeThrough] = useState(false);

  const handleBold = () => {
    setBold(!bold);
    document.execCommand('bold', false);
  };
  const handleItalic = () => {
    setItalic(!italic);
    document.execCommand('italic', false);
  };
  const handleUnderline = () => {
    setUnderline(!underline);
    document.execCommand('underline', false);
  };
  const handleStrike = () => {
    setStrikeThrough(!strikeThrough);
    document.execCommand('strikeThrough', false);
  };

  const handleFont = (event: any) => {
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
            className={styles.dropdownClick}
            value={fontFamily}
            onClick={handleFont}
          >
            {fontFamily}
          </Button>
          <Dropdown.Toggle
            className={styles.dropdownSelect}
            split
            variant="success"
            id="dropdownSplit"
          />
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
        <ToggleButton
          id="boldBtn"
          className={styles.button}
          variant="light"
          onClick={handleBold}
          type="checkbox"
          checked={bold}
          value={'B'}
        >
          <b>B</b>
        </ToggleButton>
        <ToggleButton
          id="italicBtn"
          className={styles.button}
          variant="light"
          onClick={handleItalic}
          type="checkbox"
          checked={italic}
          value={'I'}
        >
          <i>I</i>
        </ToggleButton>
        <ToggleButton
          id="underlineBtn"
          className={styles.button}
          variant="light"
          onClick={handleUnderline}
          type="checkbox"
          checked={underline}
          value={'U'}
        >
          <u>U</u>
        </ToggleButton>
        <ToggleButton
          id="strikeThroughBtn"
          className={styles.button}
          variant="light"
          onClick={handleStrike}
          type="checkbox"
          checked={strikeThrough}
          value={'S'}
        >
          <s>S</s>
        </ToggleButton>
      </div>
      <div className={styles.mainBox}>
        <div
          id="textEdit"
          className={styles.textBox}
          contentEditable="true"
          onInput={handleChangeTextContent}
          onKeyDown={keyDownHandling}
        />
      </div>
    </div>
  );
};

export default TextEditComponent;
