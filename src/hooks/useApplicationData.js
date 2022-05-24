import {useState, useEffect} from 'react';
import axios from 'axios';
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {
  const [ state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  let dailyAppointments = [];

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      // console.log(all[1].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])

  const countSpots = (state) => {
    const { day, days, appointments } = state;

    const selectedDay = days.find(aDay => aDay.name === day);

    const appointmentIds = selectedDay.appointments

    const spots = appointmentIds.filter(id => !appointments[id].interview).length

    return spots
  }

  const updatedSpots = (state, appointments) => {
    const updatedState = {...state, appointments};
    const updatedDays = [...state.days];
    const updatedDay = {...state.days.find(day => day.name === state.day)};

    const spots = countSpots(updatedState);

    updatedDay.spots = spots;
    const updatedDayIndex = state.days.findIndex(day => day.name === state.day);

    updatedDays[updatedDayIndex] = updatedDay;
    updatedState.days = updatedDays;
    
    return updatedState.days;
  }

  const setDay = day => setState(prev => ({...prev, day: day }));

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
      
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const newDays = updatedSpots(state, appointments);

        setState({...state, days: newDays, appointments})
      })
  }

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        }
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }

        const newDays = updatedSpots(state, appointments);

        setState({...state, days: newDays, appointments})
      })
  }

  return {state, setDay, bookInterview, deleteInterview};
}
