function Tooth() {
  // ... existing state declarations ...
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selections, setSelections] = useState({
    TopTrapezoid: null,
    BottomTrapezoid: null,
    LeftTriangle: null,
    RightTriangle: null,
  });
  const [lines, setLines] = useState([]);

  // ... existing function declarations ...
  const handleButtonClick = (region) => {
    setActiveDropdown(activeDropdown === region ? null : region);
  };

  const handleDropdownChange = (option, quadrant) => {
    setSelections((prev) => ({
      ...prev,
      [quadrant]: option,
    }));

    // check if the option requires drawing a line and update the lines state accordingly
    if (option.startsWith("markLR") || option.startsWith("markTB")) {
      setLines((prev) => [
        ...prev,
        {
          option,
          start: getCircleCenter(quadrant),
          end: getCircleCenter(getOppositeQuadrant(option, quadrant)),
          color: getFillColor(quadrant),
        },
      ]);
    }

    console.log(`${quadrant} region selected option:`, option);
  };

  const getCircleCenter = (region) => {
    const centers = {
      TopTrapezoid: { x: 100, y: 25 },
      BottomTrapezoid: { x: 100, y: 75 },
      LeftTriangle: { x: 15, y: 50 },
      RightTriangle: { x: 185, y: 50 },
    };
    return centers[region];
  };

  const getOppositeQuadrant = (option, quadrant) => {
    const mappings = {
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
  const getFillColor = (region) => {
    switch (selections[region]) {
      case "caries":
        return "red";
      case "fillings":
        return "blue";
      case "discolor":
        return "green";
      default:
        return null;
    }
  };
  const renderDropdown = (quadrant) => {
    if (activeDropdown === quadrant) {
      return (
        <select
          onChange={(e) => handleDropdownChange(e.target.value, quadrant)}
        >
          <option value="" disabled selected>
            Select an option
          </option>
          <option value="caries">Caries</option>
          <option value="fillings">Fillings</option>
          <option value="discolor">Discolor</option>
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
          {/* ... other options ... */}
        </select>
      );
    }
    return null;
  };

  return (
    <div className="tooth">
      <svg width="200" height="100">
        {/* ... existing polygon and circle elements ... */}
        {/* Top Trapezoid */}
        <polygon
          points="0,0 50,50 150,50 200,0"
          fill="white"
          stroke="black"
          onClick={() => handleButtonClick("TopTrapezoid")}
        />
        {/* Circle indicating selection */}
        {selections.TopTrapezoid && (
          <circle cx="100" cy="25" r="10" fill={getFillColor("TopTrapezoid")} />
        )}

        {/* Bottom Trapezoid */}
        <polygon
          points="0,100 50,50 150,50 200,100"
          fill="white"
          stroke="black"
          onClick={() => handleButtonClick("BottomTrapezoid")}
        />
        {/* Circle indicating selection */}
        {selections.BottomTrapezoid && (
          <circle
            cx="100"
            cy="75"
            r="10"
            fill={getFillColor("BottomTrapezoid")}
          />
        )}

        {/* Left Triangle */}
        <polygon
          points="0,0 50,50 0,100"
          fill="white"
          stroke="black"
          onClick={() => handleButtonClick("LeftTriangle")}
        />
        {/* Circle indicating selection */}
        {selections.LeftTriangle && (
          <circle cx="15" cy="50" r="10" fill={getFillColor("LeftTriangle")} />
        )}

        {/* Right Triangle */}
        <polygon
          points="200,0 150,50 200,100"
          fill="white"
          stroke="black"
          onClick={() => handleButtonClick("RightTriangle")}
        />
        {/* Circle indicating selection */}
        {selections.RightTriangle && (
          <circle
            cx="185"
            cy="50"
            r="10"
            fill={getFillColor("RightTriangle")}
          />
        )}

        {/* Draw lines between shapes based on the lines state */}
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            stroke={line.color}
            strokeWidth="2"
          />
        ))}
      </svg>
      {/* ... existing renderDropdown calls ... */}
      {renderDropdown("TopTrapezoid")}
      {renderDropdown("BottomTrapezoid")}
      {renderDropdown("LeftTriangle")}
      {renderDropdown("RightTriangle")}
    </div>
  );
}
