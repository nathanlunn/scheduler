import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useApplicationData() {  
  const [ state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // populate the state object with the data fetched from the api
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      // console.log(all[1].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  // count the number of null interviews in a day's appointments
  const countSpots = (state) => {
    const { day, days, appointments } = state;

    const selectedDay = days.find(aDay => aDay.name === day);

    const appointmentIds = selectedDay.appointments;

    const spotsArray = appointmentIds.filter(id => !appointments[id].interview);

    const spotsNum = spotsArray.length;

    return spotsNum;
  }

  // return a state.days copy with an updated states.day.spots value
  const updatedSpots = (state, appointments) => {
    const updatedState = {...state, appointments};
    const updatedDays = [...state.days];
    const updatedDay = {...state.days.find(day => day.name === state.day)};

    const spots = countSpots(updatedState);

    updatedDay.spots = spots;
    const updatedDayIndex = state.days.findIndex(day => day.name === state.day);

    updatedDays[updatedDayIndex] = updatedDay;
    
    return updatedDays;
  }

  // set the state.day to the day that has been clicked by the user
  const setDay = day => setState(prev => ({...prev, day: day }));

  // update a new value of interview in the api and state
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

        setState({...state, days: newDays, appointments});
      })
  }

  // set a null value to an interview in the api and state
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

        setState({...state, days: newDays, appointments});
      })
  }

  return {state, setDay, bookInterview, deleteInterview};
}
