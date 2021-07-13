import React from "react";
import "components/Appointment/Appointment.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Confirm from "components/Appointment/Confirm.js";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";
// import { getInterviewersForDay } from "helpers/selectors";

const Appointment = function (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }
  // console.log("props", props)

  function showConfirm(id) {
    console.log("in showconfirm", id);
    transition(CONFIRM);
  }

  function showEdit() {
    transition(EDIT);
  }

  function deleteApt(id) {
    transition(DELETING, true);
    // console.log("deleteApt", id);
    props
      .onDelete(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

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
            onEdit={showEdit}
            id={props.id}
          />
        )}
        {mode === CREATE && (
          <Form
            onSave={save}
            onCancel={back}
            interviewers={props.interviewers}
          />
        )}
        {mode === CONFIRM && (
          <Confirm onCancel={back} onConfirm={() => deleteApt(props.id)} />
        )}
        {
          mode === EDIT && (
            <Form
              student={props.interview.student}
              interviewers={props.interviewers}
              onSave={save}
              onCancel={back}
            />
          ) /* pass different props for show view*/
        }
        {mode === ERROR_SAVE && <Error onClose={back} />}
        {mode === ERROR_DELETE && <Error onClose={back} />}
        {mode === DELETING && <Status />}
      </article>
    </>
  );
};

export default Appointment;
