import React from "react";
import "components/Appointment/Appointment.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";
// import { getInterviewersForDay } from "helpers/selectors";


const Appointment = function (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
 
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
  // console.log("interview", interview)
    props.bookInterview(props.id, interview)//with a then
      .then(() => transition(SHOW))

    // transition(SHOW); // Make me a callback
  }
  
  
  return (
    <>
      <article className="appointment">
        <Header time={props.time}></Header>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status message="saving" />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && <Form onSave={save} onCancel={back} interviewers={props.interviewers}/>}
      </article>
    </>
  );
};

export default Appointment;
