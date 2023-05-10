import React, { Component, useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './dateColor.scss';
import dateList from '../../assets/strings/CalendarComponent/dateDummy';

const CalendarComponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const style = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div>
      <div className={style.calendar}>
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[daygridPlugin, interactionPlugin]}
          dateClick={(arg) => {
            alert(arg.dateStr);
          }}
          eventClick={(arg) => {
            alert(arg.event.title + '\n' + arg.event.start);
          }}
          events={dateList.map(({ title, date }) => ({
            title: title,
            date: date,
          }))}
          themeSystem="bootstrap"
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
