// CheckboxQuestion.js

import React from "react";

const CheckboxQuestion = ({ question, answers, onCheckboxChange }) => {
  const renderCheckbox = (option, isChecked) => (
    <div key={option}>
      <label>
        <input
          type="checkbox"
          name={option}
          checked={isChecked}
          onChange={() => onCheckboxChange(option)}
        />
        {option}
      </label>
    </div>
  );

  // Map over the answers object to render all checkboxes
  const checkboxes = Object.entries(answers).map(([option, isChecked]) =>
    renderCheckbox(option, isChecked)
  );

  return (
    <div>
      <h5>{question}</h5> {/* Display the dynamic question */}
      <form>{checkboxes}</form>
    </div>
  );
};

export default CheckboxQuestion;
