import React from "react";

import DayList from "./DayList";
import Appointment from './Appointment/index';
import useApplicationData from '../hooks/useApplicationData';
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  } = useApplicationData();

  // grab list of interviewers that are found in the selected day's interviewer array
  const interviewers = getInterviewersForDay(state, state.day);

  let dailyAppointments = [];

  // grav list of appointments that are found in the selected day's appointments array
  dailyAppointments = getAppointmentsForDay(state, state.day);

  // create an array of appointment componenents for each appointment found
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
