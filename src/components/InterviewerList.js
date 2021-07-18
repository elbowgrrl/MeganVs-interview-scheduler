import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

const InterviewerList = function (props) {
  const list = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      setInterviewer={() => props.setInterviewer(interviewer.id)}
      selected={interviewer.id === props.interviewer}
      key={interviewer.id}
      name={interviewer.name}
      list={interviewer}
      avatar={interviewer.avatar}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> {list} </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
