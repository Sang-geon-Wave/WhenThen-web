import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

const TextEditomponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [text, setText] = useState('');
  const [bold, setBold] = useState(false);
  // const [selectionStart, setSelectionStart] = useState(0);
  // const [selectionEnd, setSelectionEnd] = useState(0);

  const handleSetValue = (event) => {
    setText(event.target.value);
  };
  const handleSetSpecialkey = (event) => {
    console.log(event.keyCode);
    if (event.keyCode === 9) {
      event.preventDefault();
      let val = event.target.value;
      let start = event.target.selectionStart;
      let end = event.target.selectionEnd;
      event.target.value = val.substring(0, start) + '\t' + val.substring(end);
      event.target.selectionStart = event.target.selectionEnd = start + 1;
      handleSetValue(event);
      return false;
    }
  };
  const handleBoldClick = () => {
    setBold(!bold);
  };
  const handleFocus = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <div className={styles.buttonBox}>
        <button onClick={handleBoldClick}>Bo</button>
        <button onClick={handleBoldClick}>UL</button>
      </div>
      <div className={styles.mainBox}>
        <textarea
          id="textbox"
          className={styles.textBox}
          placeholder="텍스트를 입력해 주세요. "
          value={text}
          onChange={(event) => handleSetValue(event)}
          onKeyDown={(event) => handleSetSpecialkey(event)}
          onFocus={(event) => handleFocus(event)}
        />
      </div>
    </div>
  );
};

export default TextEditomponent;
