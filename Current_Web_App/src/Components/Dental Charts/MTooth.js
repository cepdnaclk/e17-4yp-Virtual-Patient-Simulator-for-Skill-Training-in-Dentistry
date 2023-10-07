import React, { useState } from "react";

function MTooth({ toothNumber, onSelectionChange }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selections, setSelections] = useState({
    topTrapezoid: null,
    bottomTrapezoid: null,
    leftTrapezoid: null,
    rightTrapezoid: null,
    centerRectangle: null,
  });

  const [lineData, setLineData] = useState(null);

  const handleButtonClick = (section) => {
    setActiveDropdown(activeDropdown === section ? null : section);
  };

  const handleDropdownChange = (option, section) => {
    setSelections((prev) => {
      const newSelections = { ...prev, [section]: option };
      onSelectionChange(toothNumber, newSelections);
      return newSelections;
    });
    if (
      option.includes("Left to Right") &&
      (section === "leftTrapezoid" || section === "rightTrapezoid")
    ) {
      setLineData({ color: getFillColor(option), section });
    }
  };

  const renderDropdown = (section) => {
    if (activeDropdown === section) {
      const positionAdjustments = {
        topTrapezoid: { top: "15%", left: "50%" },
        bottomTrapezoid: { top: "85%", left: "50%" },
        leftTrapezoid: { top: "50%", left: "15%" },
        rightTrapezoid: { top: "50%", left: "85%" },
        centerRectangle: { top: "50%", left: "50%" },
      };

      const styles = {
        position: "absolute",
        top: positionAdjustments[section].top,
        left: positionAdjustments[section].left,
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      };

      return (
        <select
          style={styles}
          onChange={(e) => handleDropdownChange(e.target.value, section)}
        >
          <option value="" disabled selected>
            Select an option
          </option>
          <option value="caries">Caries</option>
          <option value="fillings">Fillings</option>
          <option value="discolor">Discolor</option>
          <option value="Left to Right caries">Left to Right Caries</option>
          <option value="Left to Right fillings">Left to Right Fillings</option>
          <option value="Left to Right discolor">Left to Right Discolor</option>
        </select>
      );
    }
    return null;
  };

  const getFillColor = (option) => {
    const colorMapping = {
      caries: "red",
      fillings: "blue",
      discolor: "green",
      "Left to Right caries": "red",
      "Left to Right fillings": "blue",
      "Left to Right discolor": "green",
    };
    return colorMapping[option];
  };

  const getCircleCenter = (section) => {
    const centers = {
      topTrapezoid: { x: 50, y: 15 },
      bottomTrapezoid: { x: 50, y: 85 },
      leftTrapezoid: { x: 15, y: 50 },
      rightTrapezoid: { x: 85, y: 50 },
      centerRectangle: { x: 50, y: 50 },
    };
    return centers[section];
  };

  return (
    <div className="mtooth">
      <svg width="100" height="100" style={{ background: "lightgrey" }}>
        {/* Large Rectangle */}
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="white"
          stroke="black"
        />

        {/* Small Rectangle */}
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          fill="white"
          stroke="black"
        />

        {/* Connecting Lines */}
        <line x1="0" y1="0" x2="30" y2="30" stroke="black" />
        <line x1="100" y1="0" x2="70" y2="30" stroke="black" />
        <line x1="0" y1="100" x2="30" y2="70" stroke="black" />
        <line x1="100" y1="100" x2="70" y2="70" stroke="black" />

        {/* Clickable regions for dropdowns with the respective shapes */}
        <polygon
          points="0,0 30,30 70,30 100,0"
          fill="transparent"
          onClick={() => handleButtonClick("topTrapezoid")}
        />
        <polygon
          points="0,100 30,70 70,70 100,100"
          fill="transparent"
          onClick={() => handleButtonClick("bottomTrapezoid")}
        />
        <polygon
          points="0,0 30,30 30,70 0,100"
          fill="transparent"
          onClick={() => handleButtonClick("leftTrapezoid")}
        />
        <polygon
          points="100,0 70,30 70,70 100,100"
          fill="transparent"
          onClick={() => handleButtonClick("rightTrapezoid")}
        />
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          fill="transparent"
          onClick={() => handleButtonClick("centerRectangle")}
        />

        {/* ... the rest of your shapes and lines ... */}
        {/* Circles indicating selection */}
        {Object.keys(selections).map((section) => {
          const selection = selections[section];
          if (selection && !selection.includes("Left to Right")) {
            const center = getCircleCenter(section);
            return (
              <circle
                cx={center.x}
                cy={center.y}
                r="5"
                fill={getFillColor(selection)}
              />
            );
          }
          return null;
        })}

        {/* Line connecting left and right trapezoids */}
        {lineData && (
          <line
            x1="15"
            y1="50"
            x2="85"
            y2="50"
            stroke={lineData.color}
            strokeWidth="6"
          />
        )}
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
