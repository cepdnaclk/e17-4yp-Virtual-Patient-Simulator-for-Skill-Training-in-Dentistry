import React from "react";

const CheckboxQuestion = ({ answers, onCheckboxChange }) => {
  const renderCheckbox = (option, isChecked) => (
    <div key={option}>
      {" "}
      {/* Use a div to make each label appear on a new line */}
      <label>
        <input
          type="checkbox"
          name={option}
          checked={isChecked}
          onChange={() => onCheckboxChange(option)} // Pass the option name to the change handler
        />
        {option} {/* Display the option name next to the checkbox */}
      </label>
    </div>
  );

  // Render all checkboxes by mapping over the answers object
  const checkboxes = Object.entries(answers).map(([option, isChecked]) =>
    renderCheckbox(option, isChecked)
  );

  return (
    <div>
      <h5>
        Select the instruments needed to carry out the periodontal screening
      </h5>
      <form>{checkboxes}</form>
    </div>
  );
};

export default CheckboxQuestion;
