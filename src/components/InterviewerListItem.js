import React from "react";
import "components/InterviewerListItem.scss";

const classnames = require("classnames");

const InterviewerListItem = function (props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  //   props:
  //   id:number - the id of the interviewer
  // name:string - the name of the interviewer
  // avatar:url - a url to an image of the interviewer
  // selected:boolean - to determine if an interview is selected or not
  // setInterviewer:function - sets the interviewer upon selection

  return (
    <li className={interviewerClass} onClick={ props.setInterviewer }>
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
