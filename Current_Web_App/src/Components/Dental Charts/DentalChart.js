import React, { useState, useCallback } from "react";
import Tooth from "./Tooth"; // Your Tooth component
import MTooth from "./MTooth"; // Your MTooth component
import "./Chart.css";

const answer = {
  17: { leftTrapezoid: ["Caries", "Discoloration"] },
  48: { leftTrapezoid: ["Caries"] },
  47: { centerRectangle: ["Caries"] },
  16: {
    rightTrapezoid: ["Restoration (Amalgam)"],
    topTrapezoid: ["Restoration (Amalgam)"],
    bottomTrapezoid: ["Restoration (Amalgam)"],
    centerRectangle: ["Restoration (Amalgam)"],
  },
  14: {
    leftTrapezoid: ["Discoloration"],
  },
  24: {
    rightTrapezoid: ["Restoration (Amalgam)"],
  },
  25: {
    centerRectangle: ["Restoration (Amalgam)"],
    rightTrapezoid: ["Restoration (Amalgam)"],
  },
  26: {
    leftTrapezoid: ["Discoloration"],
    rightTrapezoid: ["Caries"],
  },
  27: {
    rightTrapezoid: ["Discoloration", "Caries"],
  },
};

const DentalChart = ({ onScoreSubmit }) => {
  const [toothSelections, setToothSelections] = useState({});
  const [allToothSelections, setAllToothSelections] = useState({});

  const handleSelectionChange = useCallback((toothId, newSelections) => {
    setAllToothSelections((prev) => {
      // Filter out the parts with no selections
      const filteredSelections = Object.entries(newSelections)
        .filter(([_, selections]) => selections.length > 0)
        .reduce((acc, [part, selections]) => {
          acc[part] = selections;
          return acc;
        }, {});

      // Now check if there are any selections to update
      if (Object.keys(filteredSelections).length > 0) {
        return {
          ...prev,
          [toothId]: filteredSelections,
        };
      }

      // If there are no selections, do not create an empty object entry
      // Remove the toothId entry if it exists
      const { [toothId]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const calculateScore = (userSelections, correctAnswers) => {
    let score = 0;
    let totalCorrectAnswers = 0;

    // Calculate the total number of correct answers first
    Object.values(correctAnswers).forEach((parts) => {
      Object.values(parts).forEach((conditions) => {
        totalCorrectAnswers += conditions.length;
      });
    });

    for (const [toothId, parts] of Object.entries(correctAnswers)) {
      const userParts = userSelections[toothId] || {};

      for (const [part, correctConditions] of Object.entries(parts)) {
        const userConditions = userParts[part] || [];

        // Count how many conditions the user got right for each part
        correctConditions.forEach((condition) => {
          if (userConditions.includes(condition)) {
            score += 1;
          }
        });
      }
    }

    return { score, totalCorrectAnswers };
  };

  const handleSubmit = () => {
    const { score, totalCorrectAnswers } = calculateScore(
      allToothSelections,
      answer
    );
    console.log(`The user's score is ${score} out of ${totalCorrectAnswers}.`);
    
    // Call the onScoreSubmit callback with the score data
    onScoreSubmit(score, totalCorrectAnswers);
  };

  // Function to decide if it's a Tooth or MTooth based on number
  const isTooth = (number) => {
    return (
      (number >= 14 && number <= 19) ||
      (number >= 24 && number <= 29) ||
      (number >= 34 && number <= 39) ||
      (number >= 44 && number <= 49)
    );
  };

  // Create a component array for a row
  const createRow = (numbers, rowPosition) => {
    return numbers.map((num) => (
      <div key={num} className="tooth-container">
        {rowPosition === "top" && <div className="tooth-number">{num}</div>}
        {isTooth(num) ? (
          <MTooth
            toothNumber={num}
            onSelectionChange={(num, selections) =>
              handleSelectionChange(num, selections)
            }
          />
        ) : (
          <Tooth
            toothNumber={num}
            onSelectionChange={(num, selections) =>
              handleSelectionChange(num, selections)
            }
          />
        )}
        {rowPosition === "bottom" && <div className="tooth-number">{num}</div>}
      </div>
    ));
  };

  // Numbers for the top and bottom rows
  const topRowNumbers = [
    18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
  ];
  const bottomRowNumbers = [
    48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
  ];

  return (
    <div className="dental-chart">
      <div className="dental-row top-row">
        {createRow(topRowNumbers, "top")}
      </div>
      <div className="dental-row bottom-row">
        {createRow(bottomRowNumbers, "bottom")}
      </div>
      <button onClick={handleSubmit} className="chrt-submit-btn">
        Submit
      </button>
    </div>
  );
};

export default DentalChart;
