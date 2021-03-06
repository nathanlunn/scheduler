import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  console.log(props)
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const changeName = (event) => {
    return setStudent(event.target.value)
  }

  // clear the student input field and unselect any selected interviewer
  const reset = () => {
    setStudent('');
    setInterviewer(null);
  }

  // use reset, setError, and the given onCancel function to clear any alterations made in the form 
  const cancel = () => {
    reset();
    setError('');
    props.onCancel();
  }

  // validate that the student input field isn't blank and that a interviewer has been selected
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    setError('');
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={changeName}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers}
          onChange={(id) => setInterviewer(id)}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
};