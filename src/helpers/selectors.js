
// export function getAppointmentsForDay(state, day) {
//   const days = state.days;

//   if (days.length === 0) {
//     return [];
//   }

//   const appointments = Object.values(state.appointments);
//   // console.log(appointments)

//   const selectedDay = days.find(item => item.name === day);

//   if (!selectedDay) {
//     return [];
//   }

//   const filteredAppointments = selectedDay.appointments;
//   // console.log('filteredAppointments = ', filteredAppointments);
//   const appointmentsInfo = appointments.filter(appointment => filteredAppointments.includes(appointment.id));

//   return appointmentsInfo;
// }


// export function getInterview(state, interview) {
//   if (!interview) {
//     return null;
//   }

//   const interviewers = Object.values(state.interviewers);

//   interview.interviewer = interviewers.find(item => item.id === interview.interviewer)
//   console.log(interview)
//   return interview;
// }

// export function getInterviewersForDay(state, day) {
//   const days = state.days;

//   if (days.length === 0) {
//     return [];
//   }

//   const interviewers = Object.values(state.interviewers);
//   console.log(interviewers);
//   // console.log(appointments)

//   const selectedDay = days.find(item => item.name === day);
//   // console.log(selectedDay)

//   if (!selectedDay) {
//     return [];
//   }

//   const filteredInterviewers = selectedDay.interviewers;
//   // console.log('filteredAppointments = ', filteredInterviewers);
//   const interviewersInfo = interviewers.filter(interviewer => filteredInterviewers.includes(interviewer.id));
//   // const interviewersInfo = filteredInterviewers.map(
//   //   interview => interviewers[interview]
//   // )
//   console.log(interviewersInfo)

//   return interviewersInfo;
// }

export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  const filteredDay = days.find(item => day === item.name);
  if (days.length < 1 || filteredDay === undefined) {
    return [];
  }
  const daysAppointment = filteredDay.appointments.map(id => appointments[id]);
  return daysAppointment;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewObject = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return interviewObject;
}

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  const filteredDay = days.find(item => day === item.name);
  if (days.length < 1 || filteredDay === undefined) {
    return [];
  }
  const daysInterviewers = filteredDay.interviewers.map(
    interview => interviewers[interview]
  );
  return daysInterviewers;
}