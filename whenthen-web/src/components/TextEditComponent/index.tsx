import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Button from 'react-bootstrap/Button';

const TextEditorComponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [text, setText] = useState('');
  const [fontFamily, setFontFamily] = useState('NanumGothic');
  const [fontSize, setFontSize] = useState(4);

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
  const handleFontSize = (event) => {
    setFontSize(event.target.value);
    document.execCommand('fontSize', false, event.target.value);
  };

  const handleFocus = (event) => {
    console.log(event.target.innerHTML);
  };

  return (
    <div>
      <div className={styles.buttonBox}>
        <select id="fontSelector" value={fontFamily} onChange={handleFont}>
          <option value={'NanumGothic'}>나눔고딕</option>
          <option value={'Gulim01'}>굴림1</option>
          <option value={'Gulim02'}>굴림2</option>
          <option value={'NanumSquareRoundR'}>스퀘어라운드R</option>
          <option value={'NanumSquareRoundB'}>스퀘어라운드B</option>
        </select>
        <select
          id="fontSizeSelector"
          value={fontSize}
          onChange={handleFontSize}
        >
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
        </select>
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
        ></div>
      </div>
    </div>
  );
};

export default TextEditorComponent;
