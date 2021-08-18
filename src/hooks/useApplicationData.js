import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = function () {
  //set initial state for application 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //set a new day, maintaining the rest of state
  const setDay = (day) => setState({ ...state, day });

  //counts number of spots remaining in a given day
  const getSpotsForDay = (day, appointments) => {
    let spots = 0;
    for (const id of day.appointments) {
      if (!appointments[id].interview) {
        spots++;
      }
    }
    return spots;
  };

  //updates remaining spots in all days
  const updateSpots = (dayName, days, appointments) => {
    const index = days.findIndex((day) => day.name === dayName);
    const day = days[index];

    const spots = getSpotsForDay(day, appointments);

    const newDays = [...days];
    newDays[index] = { ...day, spots };
    return newDays;
  };

  //make requests to api to use data for state
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;

      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  //On confirm, destroys an interview in the database and updates state
  function deleteInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };

    const appointments = { ...state.appointments, [id]: appointment };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = updateSpots(state.day, state.days, appointments);
      setState({ ...state, days, appointments });
    });
  }

  //Creates an interview and updates state
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const days = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days });
    });
  }

  return { state, setDay, deleteInterview, bookInterview };
};

export default useApplicationData;
