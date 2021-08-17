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
  const ERROR_EDIT = "ERROR_EDIT";

  let interview = props.interview;

  //switches between appointment views using custom hook from /hooks
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function saveApt(name, interviewer) {
    transition(SAVING);
    interview = {
      student: name,
      interviewer,
    };

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  const destroyApt = function () {
    transition(DELETING, true);
    props
      .onDelete(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => {
        transition(ERROR_DELETE, true);
        console.log("error", err);
      });
  };

  //{mode === VIEWNAME} syntax switches between appointment views.
  //ERROR views can be tested with the associated API in error mode "npm run error"
  return (
    <>
      <article className="appointment" data-testid="appointment">
        <Header time={props.time}></Header>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status message="Saving" />}
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
            onDelete={() => {
              transition(CONFIRM);
            }}
            onEdit={() => {
              transition(EDIT);
            }}
            id={props.id}
          />
        )}
        {mode === CREATE && (
          <Form
            onSave={saveApt}
            onCancel={back}
            interviewers={props.interviewers}
            data-testid="interviewer avatar"
          />
        )}
        {mode === CONFIRM && <Confirm onCancel={back} onConfirm={destroyApt} />}
        {mode === EDIT && (
          <Form
            name={interview.student}
            interviewers={props.interviewers}
            interviewer={interview.interviewer.id}
            onSave={saveApt}
            onCancel={back}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error message={"Could not save"} onClose={back} />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message={"Could not delete"}
            onClose={() => {
              transition(SHOW);
            }}
          />
        )}
        {mode === ERROR_EDIT && (
          <Error message={"Could not save"} onClose={back} />
        )}
        {mode === DELETING && <Status message="Deleting" />}
      </article>
    </>
  );
};

export default Appointment;
