import React from 'react'
import "components/Appointment/Appointment.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";

const Appointment = function(props) {
console.log("index props", props)
  return (
    <>
    <article className="appointment">
     <Header time={ props.time }>
      </Header>
      {props.interview ? <Show/> : <Empty/>}
    </article>
    </>
  );
};

export default Appointment;

       
