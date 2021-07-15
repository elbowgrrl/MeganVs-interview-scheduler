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
  };

  function showConfirm(id) {
    transition(CONFIRM);
  };

  function showEdit() {
    transition(EDIT);
  };

  function showEmpty() {
    transition(EMPTY);
  };

  function showShow() {
    transition(SHOW);
  };

  function deleteApt() {
    transition(DELETING, true);
    // console.log("deleteApt", id);
    props.onDelete(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => {transition(ERROR_DELETE, true);
         console.log("error", err)})
  }

  // console.log("props.id index", props.id)
  return (
    <>
      <article className="appointment" data-testid="appointment">
        <Header time={props.time}></Header>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status message="Saving" />}
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
            data-testid="interviewer avatar"
          />
        )}
        {mode === CONFIRM && (
          <Confirm onCancel={back} onConfirm={deleteApt} />
        )}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            onSave={save}
            onCancel={back}
          />
        )}
        {mode === ERROR_SAVE && <Error message={"Could not save"} onClose={showEmpty} />}
        {mode === ERROR_DELETE && <Error message={"Could not delete"} onClose={showShow} />}
        {mode === DELETING && <Status message="Deleting"/>}
      </article>
    </>
  );
};

export default Appointment;
