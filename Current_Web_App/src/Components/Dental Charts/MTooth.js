import React, { useState, useEffect } from "react";
import "./Tooth.css"; // Assuming Tooth.css is appropriate for MTooth as well

const colorCodes = {
  Caries: "red",
  "Restoration (Amalgam)": "blue",
  "Traumatic Injury": "black",
  Discoloration: "green",
};

function MTooth({ toothNumber, onSelectionChange }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selections, setSelections] = useState({
    topTrapezoid: [],
    bottomTrapezoid: [],
    leftTrapezoid: [],
    rightTrapezoid: [],
    centerRectangle: [],
  });

  const handleButtonClick = (section) => {
    setActiveDropdown(activeDropdown === section ? null : section);
  };

  const handleOptionClick = (area, option) => {
    setSelections((prevSelections) => {
      // Determine the new selections based on the option chosen
      let newSelections = [];
      if (option === "Remove All") {
        newSelections = [];
      } else {
        const index = prevSelections[area].indexOf(option);
        if (index > -1) {
          // Option was already selected, remove it
          newSelections = [
            ...prevSelections[area].slice(0, index),
            ...prevSelections[area].slice(index + 1),
          ];
        } else {
          // Option is not selected, so add it
          newSelections = prevSelections[area].concat(option).slice(0, 2);
        }
      }

      // Only update if the selections for the area have changed
      if (
        JSON.stringify(prevSelections[area]) !== JSON.stringify(newSelections)
      ) {
        const updatedSelections = {
          ...prevSelections,
          [area]: newSelections,
        };

        // Call onSelectionChange here after the state has been updated
        onSelectionChange(toothNumber, updatedSelections);

        return updatedSelections;
      }

      // If there is no change, return the previous state to prevent a re-render
      return prevSelections;
    });
  };

  const renderDropdown = (area) => {
    if (activeDropdown === area) {
      return (
        <select
          className={`dropdown-${area}`}
          onChange={(e) => handleOptionClick(area, e.target.value)}
          value=""
        >
          <option value="" disabled>
            Select an option
          </option>
          {Object.keys(colorCodes).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          <option value="Remove All">Remove All</option>
        </select>
      );
    }
    return null;
  };

  useEffect(() => {
    const finalSelections = Object.entries(selections).flatMap(
      ([area, options]) => {
        return options.map((option) => `${area}-${option}`);
      }
    );

    if (finalSelections.length > 0) {
      console.log(finalSelections.join(", "));
    }
  }, [selections]);

  const renderDots = () => {
    return Object.entries(selections).flatMap(([area, options]) => {
      const center = getCircleCenter(area);
      return options.map((option, index) => {
        // Calculate positions for multiple dots
        let cx = parseInt(center.cx);
        let cy = parseInt(center.cy);
        if (options.length === 2) {
          cx += (index === 0 ? -1 : 1) * 4; // Offset the x position by 10 units
        }
        return (
          <circle
            key={`${area}-${option}-${index}`}
            cx={cx.toString()}
            cy={cy.toString()}
            r="3"
            fill={colorCodes[option]}
          />
        );
      });
    });
  };

  const getCircleCenter = (section) => {
    const centers = {
      topTrapezoid: { cx: "25", cy: "7" },
      bottomTrapezoid: { cx: "25", cy: "43" },
      leftTrapezoid: { cx: "7", cy: "25" },
      rightTrapezoid: { cx: "43", cy: "25" },
      centerRectangle: { cx: "25", cy: "25" },
    };
    return centers[section];
  };

  return (
    <div className="t-custom-shape-container">
      <svg width="50" height="50" viewBox="0 0 50 50">
        {/* Large Rectangle */}
        <rect x="0" y="0" width="50" height="50" fill="white" stroke="black" />

        {/* Small Rectangle */}
        <rect
          x="15"
          y="15"
          width="20"
          height="20"
          fill="white"
          stroke="black"
        />

        {/* Connecting Lines */}
        <line x1="0" y1="0" x2="15" y2="15" stroke="black" />
        <line x1="50" y1="0" x2="35" y2="15" stroke="black" />
        <line x1="0" y1="50" x2="15" y2="35" stroke="black" />
        <line x1="50" y1="50" x2="35" y2="35" stroke="black" />

        {/* Clickable regions for dropdowns with the respective shapes */}
        <polygon
          points="0,0 15,15 35,15 50,0"
          fill="transparent"
          onClick={() => handleButtonClick("topTrapezoid")}
        />
        <polygon
          points="0,50 15,35 35,35 50,50"
          fill="transparent"
          onClick={() => handleButtonClick("bottomTrapezoid")}
        />
        <polygon
          points="0,0 15,15 15,35 0,50"
          fill="transparent"
          onClick={() => handleButtonClick("leftTrapezoid")}
        />
        <polygon
          points="50,0 35,15 35,35 50,50"
          fill="transparent"
          onClick={() => handleButtonClick("rightTrapezoid")}
        />
        <rect
          x="15"
          y="15"
          width="20"
          height="20"
          fill="transparent"
          onClick={() => handleButtonClick("centerRectangle")}
        />

        {/* ... the rest of your shapes and lines ... */}
        {/* Circles indicating selection */}
        {renderDots("topTrapezoid")}
        {renderDots("bottomTrapezoid")}
        {renderDots("leftTrapezoid")}
        {renderDots("rightTrapezoid")}
        {renderDots("centerRectangle")}
      </svg>
      {renderDropdown("topTrapezoid")}
      {renderDropdown("bottomTrapezoid")}
      {renderDropdown("leftTrapezoid")}
      {renderDropdown("rightTrapezoid")}
      {renderDropdown("centerRectangle")}
    </div>
  );
}

export default MTooth;
