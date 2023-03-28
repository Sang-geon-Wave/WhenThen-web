import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

interface PropsDatepickerComponent {}

const DatepickerComponent: React.FunctionComponent<
  PropsDatepickerComponent
> = ({}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const dateInformation = (nowDate: Date, additionalMonth?: number) => {
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
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [hidden, setHidden] = useState(true);
  const [formattedDate, setFormattedDate] = useState('');
  const [nowDate, setNowDate] = useState(dateInformation(new Date()));
  const squares = [];
  for (let i = 0; i < nowDate.offset; i++) {
    squares.push(<div className={`${styles.square} ${styles.empty}`}> </div>);
  }
  for (let i = 1; i <= nowDate.daysInMonth; i++) {
    let calendarDate = new Date(nowDate.date);
    calendarDate.setDate(i);
    squares.push(
      <div
        className={styles.square}
        onClick={() => {
          setFormattedDate(calendarDate.toLocaleDateString());
          setHidden(!hidden);
        }}
      >
        {i}
      </div>,
    );
  }

  return (
    <div className={styles.datepicker}>
      <InputGroup size="sm" id="datepicker" onClick={() => setHidden(!hidden)}>
        <Form.Control id="datepicker-date" value={formattedDate} readOnly />
      </InputGroup>
      {!hidden && (
        <div className={styles.container}>
          <div className={styles.controller}>
            <div
              className={styles.arrowleft}
              onClick={() => {
                setNowDate(dateInformation(nowDate.date, -1));
              }}
            >
              ≪
            </div>
            <div className={styles.monthyear}>
              <span className={styles.year}>{nowDate.year}년 </span>
              <span className={styles.month}>{nowDate.month}월</span>
            </div>
            <div
              className={styles.arrowright}
              onClick={() => {
                setNowDate(dateInformation(nowDate.date, 1));
              }}
            >
              ≫
            </div>
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
