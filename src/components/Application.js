import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";


export default function Application(props) {
  //set initial state for app
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //make api requests to use data ffrom endpoints for state
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
    ]).then((all) => {

      const [days, appointments, interviewers] = all;

      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      }));

    });
  }, []);
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
 

  const setDay = (day) => setState({ ...state, day });
  // console.log("state.appointments", state.appointments)

// const list = dailyAppointments.map(appointment =>
// <Appointment key={appointment.id} {...appointment} />)

  const list = dailyAppointments.map(
    (appointment) => {
      const interview = getInterview(state, appointment.interview);
      return(
        <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview} />
      )
    }
  );

  console.log("list", list);

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
}


// const useVisualMode = function(initial) {
//   const [history, setHistory] = useState([initial])

//   const transition = function(newMode) {
//     setHistory([...history, newMode])
//   }
//   const back = function {
//     //didn't get this part
//   }
//   const mode = history[history.length]
//   return {mode, transition}
// }