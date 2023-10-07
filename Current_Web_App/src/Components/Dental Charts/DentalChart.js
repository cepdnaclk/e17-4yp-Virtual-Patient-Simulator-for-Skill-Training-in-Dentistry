import MTooth from "./MTooth";
import Tooth from "./Tooth";
import "./DentalChart.css";
import React, { useState } from "react";

function DentalChart() {
  const upperRowNumbers = [
    3, 3, 18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26,
  ];
  const lowerRowNumbers = [
    3, 3, 48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36,
  ];
  const dentalTerms = [
    "Caries",
    "Fillings",
    "Gingivitis",
    "Braces",
    "Retainers",
    "Extraction",
  ];

  const [activeTextbox, setActiveTextbox] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selections, setSelections] = useState({});
  const [textboxValues, setTextboxValues] = useState({});

  const handleTextboxClick = (num) => {
    setActiveTextbox(activeTextbox === num ? null : num);
  };

  const handleDropdownChange = (event, num) => {
    setTextboxValues({ ...textboxValues, [num]: event.target.value });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleSelectionChange = (toothNumber, selection) => {
    setSelections((prev) => ({ ...prev, [toothNumber]: selection }));
  };

  const renderRow = (isUpperRow, numbers) => {
    return numbers.map((num, index) => (
      <div className={index < 8 ? "mtooth" : "tooth"} key={index}>
        <div
          className="tooth-number"
          style={isUpperRow ? { bottom: "120%" } : { top: "120%" }}
        >
          {num}
        </div>
        <div
          className="text-box"
          style={isUpperRow ? { bottom: "100%" } : { top: "100%" }}
          onClick={() => handleTextboxClick(num)}
        >
          <input type="text" value={textboxValues[num] || ""} readOnly />
          {activeTextbox === num && (
            <select onChange={(e) => handleDropdownChange(e, num)}>
              {dentalTerms.map((term, i) => (
                <option key={i} value={term}>
                  {term}
                </option>
              ))}
            </select>
          )}
        </div>
        {index < 8 ? (
          <MTooth toothNumber={num} onSelectionChange={handleSelectionChange} />
        ) : (
          <Tooth toothNumber={num} onSelectionChange={handleSelectionChange} />
        )}
      </div>
    ));
  };

  return (
    <div className="dental-chart">
      <div className="dental-row">{renderRow(true, upperRowNumbers)}</div>
      <div className="dental-row">{renderRow(false, lowerRowNumbers)}</div>
      <button onClick={handleSubmit}>Submit</button>

      {isSubmitted && (
        <div className="selection-list">
          Submitted
          {/* <ul>
            {Object.entries(selections).map(
              ([toothNumber, selection], index) => (
                <li key={index}>
                  Tooth {toothNumber}: {JSON.stringify(selection)}
                </li>
              )
            )}
          </ul> */}
        </div>
      )}
    </div>
  );
}

export default DentalChart;
