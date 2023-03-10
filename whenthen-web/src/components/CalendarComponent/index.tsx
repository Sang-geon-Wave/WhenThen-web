import React, { Component } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './dateColor.scss';

export interface Dates {
  title: string;
  date: string;
}

const CalendarComponent: React.FunctionComponent<Dates> = ({
  title = 'test 3',
  date = '2023-03-15',
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const style = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div>
      <div className={style.test}>headline</div>
      <div className={style.calendar} style={{ margin: '50px' }}>
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[daygridPlugin, interactionPlugin]}
          dateClick={(arg) => {
            alert(arg.dateStr);
          }}
          eventClick={(arg) => {
            alert(arg.event.title + '\n' + arg.event.start);
          }}
          events={[
            { title: 'test 1', date: '2023-03-10' },
            { title: 'test 2', date: '2023-03-20' },
            { title: title, date: date },
          ]}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
