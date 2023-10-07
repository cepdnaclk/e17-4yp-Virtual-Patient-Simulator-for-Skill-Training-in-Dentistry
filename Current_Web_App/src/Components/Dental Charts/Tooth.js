import React, { useState } from "react";

function Tooth({ toothNumber, onSelectionChange }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selections, setSelections] = useState({
    TopTrapezoid: null,
    BottomTrapezoid: null,
    LeftTriangle: null,
    RightTriangle: null,
  });

  const [lines, setLines] = useState([]);

  const handleButtonClick = (quadrant) => {
    setActiveDropdown(activeDropdown === quadrant ? null : quadrant);
  };

  const handleDropdownChange = (option, quadrant) => {
    setSelections((prev) => {
      const newSelections = { ...prev, [quadrant]: option };
      onSelectionChange(toothNumber, newSelections);
      return newSelections;
    });

    if (option.startsWith("markLR") || option.startsWith("markTB")) {
      setLines((prev) => [
        ...prev,
        {
          option,
          start: getCircleCenter(quadrant),
          end: getCircleCenter(getOppositeQuadrant(option, quadrant)),
          color: getFillColor(option),
        },
      ]);
    }

    console.log(`${quadrant} region selected option:`, option);
  };

  const getFillColor = (option) => {
    const colorMapping = {
      caries: "red",
      fillings: "blue",
      discolor: "green",
      markLR_Caries: "red",
      markLR_Fillings: "blue",
      markLR_Discolor: "green",
      markTB_Caries: "red",
      markTB_Fillings: "blue",
      markTB_Discolor: "green",
    };
    return colorMapping[option];
  };

  const getCircleCenter = (quadrant) => {
    const centers = {
      TopTrapezoid: { x: 50, y: 25 },
      BottomTrapezoid: { x: 50, y: 75 },
      LeftTriangle: { x: 12, y: 50 },
      RightTriangle: { x: 88, y: 50 },
    };
    return centers[quadrant];
  };

  const getOppositeQuadrant = (option, quadrant) => {
    const mappings = {
      markLR_Caries: {
        LeftTriangle: "RightTriangle",
        RightTriangle: "LeftTriangle",
      },
      markLR_Fillings: {
        LeftTriangle: "RightTriangle",
        RightTriangle: "LeftTriangle",
      },
      markLR_Discolor: {
        LeftTriangle: "RightTriangle",
        RightTriangle: "LeftTriangle",
      },
      markTB_Caries: {
        TopTrapezoid: "BottomTrapezoid",
        BottomTrapezoid: "TopTrapezoid",
      },
      markTB_Fillings: {
        TopTrapezoid: "BottomTrapezoid",
        BottomTrapezoid: "TopTrapezoid",
      },
      markTB_Discolor: {
        TopTrapezoid: "BottomTrapezoid",
        BottomTrapezoid: "TopTrapezoid",
      },
    };

    return mappings[option][quadrant];
  };

  const renderDropdown = (quadrant) => {
    if (activeDropdown === quadrant) {
      const positionAdjustments = {
        TopTrapezoid: { top: "20%", left: "50%" },
        BottomTrapezoid: { top: "80%", left: "50%" },
        LeftTriangle: { top: "50%", left: "15%" },
        RightTriangle: { top: "50%", left: "85%" },
      };

      const styles = {
        position: "absolute",
        top: positionAdjustments[quadrant].top,
        left: positionAdjustments[quadrant].left,
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      };

      return (
        <select
          style={styles}
          onChange={(e) => handleDropdownChange(e.target.value, quadrant)}
        >
          <option value="" disabled selected>
            Select an option
          </option>
          <option value="caries">Caries</option>
          <option value="fillings">Fillings</option>
          <option value="discolor">Discolor</option>
          <option value="markLR_Caries">
            Mark between Left and Right (Caries)
          </option>
          <option value="markLR_Fillings">
            Mark between Left and Right (Fillings)
          </option>
          <option value="markLR_Discolor">
            Mark between Left and Right (Discolor)
          </option>
          <option value="markTB_Caries">
            Mark between Top and Bottom (Caries)
          </option>
          <option value="markTB_Fillings">
            Mark between Top and Bottom (Fillings)
          </option>
          <option value="markTB_Discolor">
            Mark between Top and Bottom (Discolor)
          </option>
        </select>
      );
    }
    return null;
  };

  return (
    <div className="tooth">
      <svg width="100" height="100">
        <polygon
          points="0,0 25,50 75,50 100,0"
          fill="white"
          stroke="black"
          onClick={() => handleButtonClick("TopTrapezoid")}
        />
        {selections.TopTrapezoid &&
          !selections.TopTrapezoid.startsWith("mark") && (
            <circle
              cx="50"
              cy="25"
              r="10"
              fill={getFillColor(selections.TopTrapezoid)}
            />
          )}
        <polygon
          points="0,100 25,50 75,50 100,100"
          fill="white"
          stroke="black"
          onClick={() => handleButtonClick("BottomTrapezoid")}
        />
        {selections.BottomTrapezoid &&
          !selections.BottomTrapezoid.startsWith("mark") && (
            <circle
              cx="50"
              cy="75"
              r="10"
              fill={getFillColor(selections.BottomTrapezoid)}
            />
          )}
        <polygon
          points="0,0 25,50 0,100"
          fill="white"
          stroke="black"
          onClick={() => handleButtonClick("LeftTriangle")}
        />
        {selections.LeftTriangle &&
          !selections.LeftTriangle.startsWith("mark") && (
            <circle
              cx="12"
              cy="50"
              r="10"
              fill={getFillColor(selections.LeftTriangle)}
            />
          )}
        <polygon
          points="100,0 75,50 100,100"
          fill="white"
          stroke="black"
          onClick={() => handleButtonClick("RightTriangle")}
        />
        {selections.RightTriangle &&
          !selections.RightTriangle.startsWith("mark") && (
            <circle
              cx="88"
              cy="50"
              r="10"
              fill={getFillColor(selections.RightTriangle)}
            />
          )}
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            stroke={line.color}
            strokeWidth="8"
          />
        ))}
      </svg>

      {renderDropdown("TopTrapezoid")}
      {renderDropdown("BottomTrapezoid")}
      {renderDropdown("LeftTriangle")}
      {renderDropdown("RightTriangle")}
    </div>
  );
}

export default Tooth;
