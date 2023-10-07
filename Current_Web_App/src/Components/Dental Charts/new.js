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
      const updatedSelections = {
        ...prev,
        [quadrant]: option,
      };

      onSelectionChange(toothNumber, updatedSelections);

      return updatedSelections;
    });

    // ... (rest of the existing code)
  };

  // ... (rest of the existing code)
}

export default Tooth;
