import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import 'components/InterviewerList.scss';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  // create an InterviewerListItem component for each interviewer in the interviewers array prop
  const interviewersArray = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersArray}
      </ul>
    </section>
  );

}
// test to make sure the interviewers prop is an array
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};