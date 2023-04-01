import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup, { InputGroupProps } from 'react-bootstrap/InputGroup';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

interface PropsDatepickerComponent {
  onDateSelected: (formattedDate: string) => void;
}

const DatepickerComponent: React.FunctionComponent<
  PropsDatepickerComponent
> = ({ onDateSelected }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const dateManager = (nowDate: Date, additionalMonth?: number) => {
    if (additionalMonth) nowDate.setMonth(nowDate.getMonth() + additionalMonth);
    const copiedNow = new Date(nowDate);

    copiedNow.setDate(1);
    const firstDate = new Date(copiedNow);
    copiedNow.setMonth(copiedNow.getMonth() + 1);
    copiedNow.setDate(0);
    const lastDate = new Date(copiedNow);

    return {
      date: nowDate,
      month: nowDate.getMonth() + 1,
      year: nowDate.getFullYear(),
      offset: firstDate.getDay(),
      daysInMonth: lastDate.getDate(),
      totalSquares:
        firstDate.getDay() - 1 + lastDate.getDate() + (6 - lastDate.getDay()),
    };
  };
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const [hidden, setHidden] = useState(true);
  const [formattedDate, setFormattedDate] = useState('');
  const [nowDate, setNowDate] = useState(dateManager(new Date()));
  const squares = [];
  const datepickerRef = useRef<HTMLDivElement>(null);

  for (let i = 0; i < nowDate.offset; i++) {
    squares.push(<div className={`${styles.square} ${styles.empty}`}> </div>);
  }
  for (let i = 1; i <= nowDate.daysInMonth; i++) {
    let tempDate = new Date(nowDate.date);
    tempDate.setDate(i);
    squares.push(
      <div
        className={styles.square}
        onClick={() => {
          setFormattedDate(tempDate.toLocaleDateString());
          onDateSelected(tempDate.toLocaleDateString());
          setHidden(!hidden);
        }}
      >
        {i}
      </div>,
    );
  }

  useEffect(() => {
    const onClickEvent = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement;
      if (
        target?.contains(datepickerRef.current) &&
        target !== datepickerRef.current &&
        !hidden
      ) {
        setHidden(true);
      }
    };

    document.addEventListener('click', onClickEvent);

    return () => {
      document.removeEventListener('click', onClickEvent);
    };
  });

  return (
    <div ref={datepickerRef} className={styles.datepicker}>
      <InputGroup onClick={() => setHidden(!hidden)}>
        <Form.Control value={formattedDate} readOnly />
      </InputGroup>
      {!hidden && (
        <div className={styles.container}>
          <div className={styles.controller}>
            <div
              className={styles.arrowleft}
              onClick={() => {
                setNowDate(dateManager(nowDate.date, -1));
              }}
            ></div>
            <div className={styles.monthyear}>
              <span className={styles.year}>{nowDate.year}년 </span>
              <span className={styles.month}>{nowDate.month}월</span>
            </div>
            <div
              className={styles.arrowright}
              onClick={() => {
                setNowDate(dateManager(nowDate.date, 1));
              }}
            ></div>
          </div>
          <div className={styles.squares}>
            {days.map((day) => (
              <div className={`${styles.square} ${styles.day}`}>{day}</div>
            ))}
            {squares.map((square) => square)}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatepickerComponent;
