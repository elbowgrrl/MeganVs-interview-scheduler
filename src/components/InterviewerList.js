import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = function(props) {
//   Props:
// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id

const list = props.interviewers.map(interviewer => (
  <InterviewerListItem
  setInterviewer = { () => props.setInterviewer(interviewer.id) }
  selected = { interviewer.id === props.interviewer }
  key= { interviewer.id }
  name= { interviewer.name }
  list= { interviewer }
  avatar= { interviewer.avatar }
  />
)) 

return (
  
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
   <ul className="interviewers__list"> { list } </ul>
</section>
);

};

export default InterviewerList;
