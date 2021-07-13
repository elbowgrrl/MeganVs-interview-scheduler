import React from "react";
import "components/Appointment/Appointment.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Confirm from "components/Appointment/Confirm.js";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";
// import { getInterviewersForDay } from "helpers/selectors";


const Appointment = function (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
 
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
  
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  };
  // console.log("props", props)

  function showConfirm(id) {
    console.log("in showconfirm", id)
    transition(CONFIRM);
  }

  function deleteApt(id) {
    console.log("deleteApt", id)
    props.onDelete(id).then(() => transition(EMPTY));
    
  };
  // console.log("props.id index", props.id)
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
            onDelete={showConfirm}
            id={props.id}
          />
        )}
        {mode === CREATE && <Form onSave={save} onCancel={back} interviewers={props.interviewers}/>}
        {mode === CONFIRM && <Confirm onCancel={back} onConfirm={() => deleteApt(props.id)}/>}
        
      </article>
    </>
  );
};

export default Appointment;
