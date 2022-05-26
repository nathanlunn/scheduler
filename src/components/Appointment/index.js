import React from 'react';
import './styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from 'hooks/useVisualMode';
// import axios from 'axios';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


export default function Appointment(props) {
  const { mode, transition, back} = useVisualMode( props.interview ? SHOW : EMPTY);
  // console.log(history)
  
  // save a newly made interview to the api and state
  function save(name, interviewer) {
    // create an interview object
    const interview = {
      student: name,
      interviewer
    };

    // set the appointment view to saving until the process is complete
    transition('SAVING', true);

    // update the api and state to have the new interview information in the correct appointment
    // transition to relevant error if any errors were thrown
    props.bookInterview(props.id, interview)
      .then(() => transition('SHOW'))
      .catch((err) => transition('ERROR_SAVE', true));
  }

  // delete an appointment from the api and state
  function onDelete() {
    // set the appointment view to deleting until the process is complete
    transition('DELETING', true);

    // update the api and state to delete the selected interview from the correct appointment
    // transition to relevant error if any errors were thrown
    props.deleteInterview(props.id)
      .then(() => transition('EMPTY'))
      .catch((err) => transition('ERROR_DELETE', true))
  }

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition('CONFIRM')}
          onEdit={() => transition('EDIT')}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
        )}
      {(mode === SAVING || mode === DELETING) && (
        <Status
          message={mode === SAVING ? 'SAVING' : 'DELETING'}
        />
       )}
       
      {mode === CONFIRM && (
        <Confirm 
          message={'Are you sure you would like to delete?'}
          onCancel={back}
          onConfirm={onDelete}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {(mode === ERROR_DELETE || mode === ERROR_SAVE) && (
        <Error
          onClose={back}
          message={mode === ERROR_DELETE ? 'could not delete interview' : 'could not save interview'}
        />
      )}
    </article>
  )
}