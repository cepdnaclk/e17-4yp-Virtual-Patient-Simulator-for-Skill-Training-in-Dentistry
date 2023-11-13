import React, { useState, useEffect } from "react";
import "./Tooth.css";
const colorCodes = {
  Caries: "red",
  "Restoration (Amalgam)": "blue",
  "Traumatic Injury": "black",
  Discoloration: "green",
};

function Tooth({ toothNumber, onSelectionChange }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selections, setSelections] = useState({
    TopTriangle: [],
    BottomTriangle: [],
    LeftTriangle: [],
    RightTriangle: [],
  });

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

  // Function to handle the area click, toggling the dropdown
  const handleAreaClick = (area, event) => {
    event.stopPropagation();
    console.log(`Triangle clicked: ${area}`);
    setActiveDropdown(activeDropdown === area ? null : area);
  };

  // Modify the handleOptionClick function to handle multiple selections
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

  // Function to render the dropdown menu
  // Function to render the dropdown menu
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

  // Modify the renderDots function to render multiple dots
  const renderDots = () => {
    return Object.entries(selections).flatMap(([area, options]) => {
      const center = getTriangleCenter(area);
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

  // Helper function to get the center of a triangle
  const getTriangleCenter = (area) => {
    const centers = {
      TopTriangle: { cx: "25", cy: "12.5" },
      BottomTriangle: { cx: "25", cy: "37.5" },
      LeftTriangle: { cx: "12.5", cy: "25" },
      RightTriangle: { cx: "37.5", cy: "25" },
    };
    return centers[area];
  };

  return (
    <div className="t-custom-shape-container">
      {renderDots()}
      <svg width="50" height="50" viewBox="0 0 50 50">
        {/* Square */}
        <rect
          x="0"
          y="0"
          width="50"
          height="50"
          fill="transparent"
          stroke="black"
          strokeWidth="1"
        />
        {/* Diagonal Line Top Left to Bottom Right */}
        <line x1="0" y1="0" x2="50" y2="50" stroke="black" strokeWidth="1" />
        {/* Diagonal Line Top Right to Bottom Left */}
        <line x1="50" y1="0" x2="0" y2="50" stroke="black" strokeWidth="1" />

        {/* Clickable areas for the triangles */}
        {/* Top Triangle */}
        {/* Top Triangle */}
        {/* Top Triangle */}
        <polygon
          points="0,0 50,0 25,25"
          fill="transparent"
          onClick={(event) => handleAreaClick("TopTriangle", event)}
        />
        {/* Bottom Triangle */}
        <polygon
          points="0,50 50,50 25,25"
          fill="transparent"
          onClick={(event) => handleAreaClick("BottomTriangle", event)}
        />
        {/* Left Triangle */}
        <polygon
          points="0,0 0,50 25,25"
          fill="transparent"
          onClick={(event) => handleAreaClick("LeftTriangle", event)}
        />
        {/* Right Triangle */}
        <polygon
          points="50,0 50,50 25,25"
          fill="transparent"
          onClick={(event) => handleAreaClick("RightTriangle", event)}
        />

        {/* Render dots */}
        {renderDots("TopTriangle")}
        {renderDots("BottomTriangle")}
        {renderDots("LeftTriangle")}
        {renderDots("RightTriangle")}
      </svg>
      {renderDropdown("TopTriangle")}
      {renderDropdown("BottomTriangle")}
      {renderDropdown("LeftTriangle")}
      {renderDropdown("RightTriangle")}
    </div>
  );
}

export default Tooth;
