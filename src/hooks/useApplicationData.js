import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = function () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  console.log("on render current state", state);

  const setDay = (day) => setState({ ...state, day });

  const getSpotsForDay = (day, appointments) => {
    let spots = 0;
    for (const id of day.appointments) {
      if (!appointments[id].interview) {
        spots++;
      }
    }
    return spots;
  };

  const updateSpots = (dayName, days, appointments) => {

    const index = days.findIndex((day) => day.name === dayName);
    const day = days[index];

    const spots = getSpotsForDay(day, appointments);

    const newDays = [...days];
    newDays[index] = {...day, spots};
    return newDays;
  };

  //make api requests to use data from endpoints for state
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

  function deleteInterview(id) {
    //the id that gets passed to this function is a number
    //id is an appmnt id in state at this level
    const appointment = { ...state.appointments[id], interview: null };

    const appointments = { ...state.appointments, [id]: appointment };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
      const days = updateSpots(state.day, state.days, appointments)
      setState({ ...state, days, appointments });
    });
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        console.log("before", state.days[0].spots);
        const days = updateSpots(state.day, state.days, appointments);
        setState({ ...state, appointments, days });
        console.log("after", state.days[0].spots);
      });
  }

  return { state, setDay, deleteInterview, bookInterview };
};

export default useApplicationData;
