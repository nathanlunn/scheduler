import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "./DayList";
import Appointment from './Appointment/index';
import useApplicationData from '../hooks/useApplicationData';
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  } = useApplicationData();


  const interviewers = getInterviewersForDay(state, state.day);

  let dailyAppointments = [];

  dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentsArray = dailyAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview)
    
    return(
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />
    )
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
            />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
