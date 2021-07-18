import React from "react";
import "components/InterviewerListItem.scss";

const classnames = require("classnames");

const InterviewerListItem = function (props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        data-testid="interview avatar"
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;
