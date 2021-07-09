export function getAppointmentsForDay(state, day) {
  let appointments = [];
  let appointmentsArray = [];

  const daysArray = state.days;
  for (const days of daysArray) {
    if (days.name === day) {
      appointments = days.appointments;
    }
  }
  for (const appointment of appointments) {
    appointmentsArray.push(state.appointments[appointment]);
  }
  return appointmentsArray;
}

export function getInterview(state, interview) {
  if (interview) {
    //grab id of interview object
    const interviewID = interview.interviewer;
    //match with state.interviewers at key
    interview.interviewer = state.interviewers[interviewID];
    return interview;
  }
      return null;
}


