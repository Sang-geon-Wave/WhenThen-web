import React, { Component } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './dateColor.scss';

const CalendarComponent = () => {
  const CalendarStyle = stylesDesktopDefault;

  return (
    <div>
      <div className={CalendarStyle.test}>headline</div>
      <div className={CalendarStyle.calendar} style={{ margin: '50px' }}>
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
          ]}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
