import React from "react";

const RadioTextQuestion = ({
  question,
  options,
  selectedValue,
  onValueChange,
}) => {
  return (
    <div>
      <p>{question}</p>
      {options.map((option) => (
        <div key={option}>
          {" "}
          {/* Wrap each input and label with a div */}
          <label>
            <input
              type="radio"
              name="radioQuestion"
              value={option}
              checked={selectedValue === option}
              onChange={(e) => onValueChange(e.target.value)}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioTextQuestion;
