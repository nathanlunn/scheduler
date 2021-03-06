import React from "react";
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  // add class to interviewer if passed a truth value for the selected prop
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  })

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        data-testid={props.name}
        className='interviewers__item-image'
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}