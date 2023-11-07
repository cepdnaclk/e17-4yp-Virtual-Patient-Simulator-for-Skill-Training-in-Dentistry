import React, { useState, useEffect } from "react";

const BlackBoxWithButton = ({ unityData, sendToUnity }) => {
  const [buttonText, setButtonText] = useState("Next");
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedTool, setSelectedTool] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAdditionalButton, setShowAdditionalButton] = useState(true);
  const [taskCompleted, setTaskCompleted] = useState(false);

  // Effect hook to listen for changes in unityData
  useEffect(() => {
    console.log("Unity data received in BlackBoxWithButton:", unityData); // Add this line for debugging
    if (unityData === "MessageFromUnity") {
      // Make sure this matches the string sent from Unity
      setTaskCompleted(true);
    }
  }, [unityData]);

  const handleSendToUnityClick = () => {
    if (sendToUnity) {
      sendToUnity("MessageFromReact");
    }
  };

  const boxStyle = {
    width: "100%", // changed from 100px to be responsive
    backgroundColor: "black",
    height: "100vh",
    position: "relative", // to allow positioning the button inside it
    display: "flex",
    flexDirection: "column", // Align items in a column
    justifyContent: "center",
    alignItems: "center",
  };

  const buttonStyle = {
    fontSize: "14px", // Set the font size to make the button smaller
    padding: "10px 20px", // Add padding to make the button look good
    backgroundColor: isSubmitted ? "green" : "blue", // Change button color after submission
  };

  const questionStyle = {
    fontSize: "14px", // Set the font size for the question and select box
    color: "white",
    textAlign: "center",
  };

  const submitButtonStyle = {
    fontSize: "14px",
    backgroundColor: "blue",
    color: "white",
    marginTop: "10px",
  };

  const additionalButtonStyle = {
    fontSize: "14px",
    backgroundColor: "red", // Customize the color of the additional button
    color: "white",
    marginTop: "10px",
  };

  const handleButtonClick = () => {
    if (buttonText === "Next") {
      setShowQuestion(true);
      setButtonText("Submit");
    } else if (buttonText === "Submit" && selectedTool) {
      // Handle submission logic here
      setIsSubmitted(true);
      setShowAdditionalButton(false); // Hide the additional button
      // You can perform additional actions after submission
    }
  };

  const handleToolSelect = (event) => {
    setSelectedTool(event.target.value);
  };

  return (
    <div style={boxStyle}>
      <button style={buttonStyle} onClick={handleSendToUnityClick}>
        Send to Unity
      </button>
      {taskCompleted && (
        <p style={{ color: "white" }}>Task Completed</p> // This message will be displayed when the task is completed
      )}
      {showQuestion && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={questionStyle}>
            <p>What tool did you use in the process?</p>
            <select value={selectedTool} onChange={handleToolSelect}>
              <option value="">Select an option</option>
              <option value="mirror">Mirror</option>
              <option value="Tool1">Tool1</option>
              <option value="Tool2">Tool2</option>
              <option value="Tool3">Tool3</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <button style={buttonStyle} onClick={handleButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default BlackBoxWithButton;
