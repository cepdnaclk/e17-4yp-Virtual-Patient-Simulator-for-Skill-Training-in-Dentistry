import React, { useState, useEffect, useRef } from "react";
import CheckBoxQuestion from "./CheckBoxQuestion";

const BlackBoxWithButton = ({ unityData, sendToUnity }) => {
  const [buttonText, setButtonText] = useState("Submit");
  const [step, setStep] = useState(0);
  const procedureNameInputRef = useRef(null);
  const [procedureName, setProcedureName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAdditionalButton, setShowAdditionalButton] = useState(true);
  const [showToolTrayQuestion, setShowToolTrayQuestion] = useState(false);
  const [answers, setAnswers] = useState({
    Tweezer: false,
    Mirror: false,
    "Sharp probe": false,
    "Naber’s probe": false,
    "Periodontal probe": false,
    "CPI probe": false,
  });
  const [periodontalScreeningOptions, setPeriodontalScreeningOptions] =
    useState({
      "A colour band from 4-5mm": false,
      "A colour band from 3.5mm to 5.5mm": false,
      "Blunt tip": false,
      "Ball ended tip": false,
      "Always only one colour band": false,
    });
  const [instruction, setInstruction] = useState(
    "Conduct the EXTRA ORAL VIEW EXAMINATION"
  );
  const [examination, setExamination] = useState("");

  const [questionMessage, setQuestionMessage] = useState(
    "Patient looks fit and healthy"
  ); // New state to hold the question message

  // Effect hook to listen for changes in unityData
  useEffect(() => {
    console.log("Unity data received in BlackBoxWithButton:", unityData); // Add this line for debugging
    if (unityData === "MessageFromUnity") {
      setQuestionMessage("Patient looks fit and healthy");
      // setShowQuestion(true);
      setInstruction("INTRA ORAL VIEW EXAMINATION");
      setExamination("Periodontal Screening");
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
  // Function to handle changes in the text input
  const handleProcedureNameChange = (event) => {
    setProcedureName(event.target.value);
  };

  // When the component mounts, add an event listener to the input

  // Function to render the question and input field
  const renderProcedureNameQuestion = () => {
    return (
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="procedureName">
          What is the name of this procedure?
        </label>
        <input
          type="text"
          id="procedureName"
          ref={procedureNameInputRef}
          value={procedureName}
          onChange={handleProcedureNameChange}
          style={{ marginLeft: "10px" }}
        />
      </div>
    );
  };
  // Render the checkbox question if showToolTrayQuestion is true
  const renderCheckBoxQuestion = () => {
    if (step === 0 && showToolTrayQuestion) {
      // Render the first set of checkboxes
      return (
        <CheckBoxQuestion
          question="Select the instruments needed to carry out the periodontal screening"
          answers={answers}
          onCheckboxChange={handleCheckboxChange}
        />
      );
    } else if (step === 2) {
      // Render the new question for step 2
      return (
        <CheckBoxQuestion
          question="Select the features of the instrument used for the periodontal screening."
          answers={periodontalScreeningOptions}
          onCheckboxChange={handleCheckboxChange} // You may need to create a new handler for this set of options
        />
      );
    }

    // Return null or another component for other steps
    return null;
  };

  const renderTable = () => {
    const tableStyle = {
      width: "100%", // Set the width of the table
      borderCollapse: "collapse", // Collapse borders so that they become single line instead of double
    };

    const cellStyle = {
      border: "1px solid black", // Add border to each cell
      padding: "8px", // Add some padding inside cells
      textAlign: "center", // Center the text inside cells
    };

    return (
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={cellStyle}>3</td>
            <td style={cellStyle}>2</td>
            <td style={cellStyle}>3</td>
          </tr>
          <tr>
            <td style={cellStyle}>3</td>
            <td style={cellStyle}>2</td>
            <td style={cellStyle}>2</td>
          </tr>
        </tbody>
      </table>
    );
  };

  // const handleSendToUnityClick = () => {
  //   console.log("handleSendToUnityClick triggered"); // Check if this function is called
  //   if (sendToUnity) {
  //     console.log("Sending message to Unity: MessageFromReact"); // This should log to the browser's console
  //     sendToUnity("MessageFromReact");
  //   } else {
  //     console.log("sendToUnity is not defined"); // Check if sendToUnity is not defined
  //   }
  // };

  const buttonStyle = {
    fontSize: "14px", // Set the font size to make the button smaller
    padding: "10px 20px", // Add padding to make the button look good
    backgroundColor: isSubmitted ? "green" : "blue", // Change button color after submission
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
    setShowToolTrayQuestion(false);
    // Increment step count on each submit
    setStep((prevStep) => prevStep + 1);

    // After step 2, you may want to change the buttonText to "Finish" or handle it differently
    if (step >= 2) {
      setButtonText("Finish");
    }
  };

  return (
    <div style={boxStyle}>
      <div style={instructionBoxStyle}>
        {/* Content for instruction box */}
        <p>{instruction}</p>
        <p>{examination}</p>
      </div>

      {/* Content for question box */}
      {/* Content for question box */}
      <div style={questionBoxStyle}>
        <div>
          {isSubmitted === true || step === 1 ? (
            <>
              {renderTable()}
              {renderProcedureNameQuestion()}{" "}
              {/* Call the function to render the input field */}
            </>
          ) : step === 0 && !showToolTrayQuestion ? (
            // If step is 0, display the default question message
            <p>{questionMessage}</p>
          ) : showToolTrayQuestion ? (
            // Otherwise, if showToolTrayQuestion is true, render the checkbox question
            renderCheckBoxQuestion()
          ) : null}

          {step === 2 && (
            // When step is 2, you can add the new components or logic here for future additions
            <div>{renderCheckBoxQuestion()}</div>
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
//   const getButtonText = () => (step < 3 ? "Submit" : "Finish");
//   return (
//     <div style={boxStyle}>
//       {/* Instruction Box */}
//       {step === 0 && (
//         <div style={instructionBoxStyle}>
//           <p>Press The TOOL TRAY VIEW button to see the dental tools</p>
//         </div>
//       )}

//       {/* Question Box */}
//       <div style={questionBoxStyle}>
//         {step === 1 && renderCheckBoxQuestion()}
//         {step === 2 && (
//           <>
//             {renderTable()}
//             {renderProcedureNameQuestion()}
//           </>
//         )}
//         {step === 3 && (
//           <div>{/* Render the final table or content here if necessary */}</div>
//         )}
//       </div>

//       {/* Button */}
//       <div>
//         <button style={buttonStyle} onClick={handleSubmit}>
//           {getButtonText()}
//         </button>
//       </div>
//     </div>
//   );
// };

export default BlackBoxWithButton;
