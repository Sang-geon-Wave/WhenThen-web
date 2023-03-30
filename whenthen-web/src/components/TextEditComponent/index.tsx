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

  const handleSetValue = (event) => {
    setText(event.target.value);
  };

  const handleBoldClick = () => {
    document.execCommand('bold', false, null);
  };
  const handleItalicClick = () => {
    document.execCommand('italic', false, null);
  };
  const handleUnderlineClick = () => {
    document.execCommand('underline', false, null);
  };

  const handleFocus = (event) => {
    console.log(event.target.innerHTML);
  };

  return (
    <div>
      <div className={styles.buttonBox}>
        <Button
          id="boldBtn"
          className={styles.button}
          variant="light"
          onClick={handleBoldClick}
        >
          <b>B</b>
        </Button>
        <Button
          id="italicBtn"
          className={styles.button}
          variant="light"
          onClick={handleItalicClick}
        >
          <i>I</i>
        </Button>
        <Button
          id="underlineBtn"
          className={styles.button}
          variant="light"
          onClick={handleUnderlineClick}
        >
          <u>U</u>
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
