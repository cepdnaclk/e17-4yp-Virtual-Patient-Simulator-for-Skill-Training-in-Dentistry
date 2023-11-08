import React, { useState, useEffect } from "react";
import CheckBoxQuestion from "./CheckBoxQuestion";

const BlackBoxWithButton = ({ unityData, sendToUnity }) => {
  const [buttonText, setButtonText] = useState("Submit");
  //const [buttonText, setButtonText] = useState("Next");
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedTool, setSelectedTool] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAdditionalButton, setShowAdditionalButton] = useState(true);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [showToolTrayQuestion, setShowToolTrayQuestion] = useState(false);
  const [answers, setAnswers] = useState({
    Tweezer: false,
    Mirror: false,
    "Sharp probe": false,
    "Naber’s probe": false,
    "Periodontal probe": false,
    "CPI probe": false,
  });
  const [instruction, setInstruction] = useState(
    "Conduct the EXTRA ORAL VIEW EXAMINATION"
  );

  const [questionMessage, setQuestionMessage] = useState(
    "Patient looks fit and healthy"
  ); // New state to hold the question message

  // Effect hook to listen for changes in unityData
  useEffect(() => {
    console.log("Unity data received in BlackBoxWithButton:", unityData); // Add this line for debugging
    if (unityData === "MessageFromUnity") {
      setQuestionMessage("Patient looks fit and healthy");
      // setShowQuestion(true);
      setInstruction(
        "INTRA ORAL VIEW EXAMINATION\nCarry out the periodontal screening."
      );
      setQuestionMessage(
        "Press The TOOL TRAY VIEW button to see the dental tools"
      );
    }
    if (unityData === "ToolTrayForPeriodontalScreening") {
      setShowToolTrayQuestion(true); // Show the question when this message is received
    }
  }, [unityData]);
  // Function to handle checkbox changes
  const handleCheckboxChange = (option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [option]: !prevAnswers[option],
    }));
  };

  // Render the checkbox question if showToolTrayQuestion is true
  const renderCheckBoxQuestion = () => {
    if (!showToolTrayQuestion) return null;

    // Generate your checkbox components based on answers
    // This is just an example. You'll need to create the CheckboxQuestion component
    return (
      <CheckBoxQuestion
        answers={answers}
        onCheckboxChange={handleCheckboxChange}
      />
    );
  };

  const handleSendToUnityClick = () => {
    console.log("handleSendToUnityClick triggered"); // Check if this function is called
    if (sendToUnity) {
      console.log("Sending message to Unity: MessageFromReact"); // This should log to the browser's console
      sendToUnity("MessageFromReact");
    } else {
      console.log("sendToUnity is not defined"); // Check if sendToUnity is not defined
    }
  };

  // const boxStyle = {
  //   width: "100%", // changed from 100px to be responsive
  //   backgroundColor: "black",
  //   height: "100vh",
  //   position: "relative", // to allow positioning the button inside it
  //   display: "flex",
  //   flexDirection: "column", // Align items in a column
  //   justifyContent: "center",
  //   alignItems: "center",
  // };

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
  const instructionBoxStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    fontSize: "14px",
    width: "300px", // You can adjust this width to suit your content
    minHeight: "100px", // Set a minimum height or set it as per your design requirements
    alignSelf: "flex-start", // Align this specific item to the start if needed
  };
  const questionBoxStyle = {
    border: "1px solid black",
    padding: "20px", // Increased padding for a bigger box
    fontSize: "16px", // Bigger font size for the content
    marginTop: "20px", // This will push the box a bit lower
    width: "300px",
    height: "400px",
  };

  // Modify the existing boxStyle to accommodate new layout
  const boxStyle = {
    width: "30%", // Adjust this to the desired width
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start", // Aligns items to the start of the flex container
    marginRight: "20px", // This creates a gap on the right side. Adjust as needed.
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
      <div style={instructionBoxStyle}>
        {/* Content for instruction box */}
        <p>{instruction}</p>
      </div>

      {/* Content for question box */}
      <div style={questionBoxStyle}>
        <div>
          {showToolTrayQuestion ? (
            renderCheckBoxQuestion()
          ) : (
            <p>{questionMessage}</p>
          )}
        </div>
      </div>

      <div>
        <button style={buttonStyle} onClick={handleButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default BlackBoxWithButton;
