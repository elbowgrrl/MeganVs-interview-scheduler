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
  if (!interview) {
    return }
  //grab id of interview object
  const id = interview.interviewer;
  //match with state.interviewers at key
  const interviewer = state.interviewers[id];

  const result = { ...interview, interviewer }
    
  return result;
}


export function getInterviewersForDay(state, day) {
  const results = [];
  const dayObj = state.days.find((d) => d.name === day);
  if (!dayObj || !dayObj.interviewers) {
    return [];
  }
  for (const id of dayObj.interviewers) {
    const interviewer = state.interviewers[id];
    results.push(interviewer);
  }
  return results;
}
