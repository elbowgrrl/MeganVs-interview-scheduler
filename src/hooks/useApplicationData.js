import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = function () {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  // console.log("on render current state", state);

  const setDay = (day) => setState({ ...state, day });

  //make api requests to use data ffrom endpoints for state
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
    let appointment = { ...state.appointments, [id]: null };

    return axios.delete(`/api/appointments/${id}`, { appointment })
      .then(() => {
        setState({ ...state, appointment });
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

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments });
    });
  }

  return { state, setDay, deleteInterview, bookInterview };
};

export default useApplicationData;


