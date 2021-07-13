import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

export default function Application(props) {
  //set initial state for app

  //move state function to custom hook
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  // console.log("on render current state", state);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const setDay = (day) => setState({ ...state, day });

  //move to custom hook
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

  //move to custom hook
  function deleteInterview(id) {
    //the id that gets passed to this function is a number
    //id is an appmnt id in state at this level
    let appointment = { ...state.appointments, [id]: null };
    // console.log("in deleteInterview", appointment);

    return axios.delete(`/api/appointments/${id}`, { appointment }).then(() => {
      setState({ ...state, appointment });
    });
  }

  //move to custom hook
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

  const list = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        onDelete={deleteInterview}
      />
    );
  });

  // console.log("list", list);

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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>
          {list}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
};


