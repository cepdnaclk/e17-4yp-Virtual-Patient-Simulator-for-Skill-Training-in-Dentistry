import React from "react";
import ThreeD from "../../resources/ThreeD";
import BlackBoxWithButton from "./BlackBoxWithButton";
const CombinedComponent = () => {
  const containerStyle = {
    display: "flex", // flex layout
    justifyContent: "space-between", // space out the children components
    width: "100%", // take up the full width of the parent
    height: "1000px",
  };

  const blackBoxContainerStyle = {
    flex: 1, // take up 1 fraction of the space
    marginRight: "10px", // give it a small margin so it doesn't touch the ThreeD component
    height: "800px",
  };

  const threeDContainerStyle = {
    flex: 3, // take up 3 fractions of the space (3 times more than the BlackBox)
    height: "800px  ",
  };

  return (
    <div style={containerStyle}>
      <div style={blackBoxContainerStyle}>
        <BlackBoxWithButton />
      </div>
      <div style={threeDContainerStyle}>
        <ThreeD />
      </div>
    </div>
  );
};

export default CombinedComponent;
