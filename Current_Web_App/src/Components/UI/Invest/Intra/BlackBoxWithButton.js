import React, { useState, useEffect, useRef } from "react";
import CheckBoxQuestion from "./CheckBoxQuestion";
import RadioImageQuestion from "./RadioImageQuestion";
import imgplaqueChart from "./images/imgplaquechart.jpeg";
import RadioTextQuestion from "./RadioTextQuestion";
import img3 from "../../../../Images/200.png";

const BlackBoxWithButton = ({ unityData, sendToUnity }) => {
  const [buttonText, setButtonText] = useState("Submit");
  const [step, setStep] = useState(0);
  const procedureNameInputRef = useRef(null);
  const [procedureName, setProcedureName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDiagram, setSelectedDiagram] = useState("");
  const [showToolTrayQuestion, setShowToolTrayQuestion] = useState(false);

  // Add images for radio options
  const diagramOptions = [
    { src: "image1.jpg", value: "Diagram1" },
    { src: "image2.jpg", value: "Diagram2" },
    { src: "image3.jpg", value: "Diagram3" },
    { src: "image4.jpg", value: "Diagram4" },
  ];
  const [answers, setAnswers] = useState({
    Tweezer: false,
    Mirror: false,
    "Sharp probe": false,
    "Naber’s probe": false,
    "Periodontal probe": false,
    "CPI probe": false,
  });
  const [plaqscoreanswers, setplaqscoreAnswers] = useState({
    "54%": false,
    "72%": false,
    "78%": false,
    "85%": false,
  });
  const [periodontalScreeningOptions, setPeriodontalScreeningOptions] =
    useState({
      "A colour band from 4-5mm": false,
      "A colour band from 3.5mm to 5.5mm": false,
      "Blunt tip": false,
      "Ball ended tip": false,
      "Always only one colour band": false,
    });
  const [investigations, setInvestigations] = useState({
    Radiographs: false,
    "3D imaging": false,
    "Sensibility testing ": false,
    "Hematological investigations": false,
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

  // Render the RadioImageQuestion component
  const renderRadioImageQuestion = () => {
    if (step === 3) {
      return (
        <RadioImageQuestion
          question="Select the diagram which denotes code 3."
          images={diagramOptions}
          onImageSelect={handleImageSelect}
          selectedValue={selectedDiagram}
        />
      );
    }

    return null;
  };

  const renderRadioQuestion = () => {
    if (step === 11 || 12) {
      const radiographOptions = [
        "IOPA & DPT",
        "DPT & Bitewing",
        "IOPA only",
        "IOPA & CBCT",
      ];

      return (
        <RadioTextQuestion
          question="What radiographs would you take?"
          options={radiographOptions}
          selectedValue={selectedDiagram} // Assuming selectedDiagram stores the selected radio option
          onValueChange={handleImageSelect} // Reuse the same handler if appropriate, or create a new one if needed
        />
      );
    }

    return null;
  };

  // Handle radio button selection
  const handleImageSelect = (value) => {
    setSelectedDiagram(value);
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
    } else if (step === 5) {
      // Render the first set of checkboxes
      return (
        <CheckBoxQuestion
          question="Select the instruments needed to carry out the hard tissue assessment"
          answers={answers}
          onCheckboxChange={handleCheckboxChange}
        />
      );
    } else if (step === 8) {
      // Render the first set of checkboxes
      return (
        <CheckBoxQuestion
          question="Select the instruments needed to carry out the plaque score"
          answers={answers}
          onCheckboxChange={handleCheckboxChange}
        />
      );
    } else if (step === 9) {
      // Render the first set of checkboxes
      return (
        <CheckBoxQuestion
          question="What is the plaq score?"
          answers={plaqscoreanswers}
          onCheckboxChange={handleCheckboxChange}
        />
      );
    } else if (step === 10) {
      // Render the first set of checkboxes
      return (
        <CheckBoxQuestion
          question="Select the investigation/s you wish to proceed?"
          answers={investigations}
          onCheckboxChange={handleCheckboxChange}
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
    setStep((prevStep) => {
      const nextStep = prevStep + 1;

      // Check if the step is about to become 4
      if (nextStep === 4) {
        // If it's about to become 4, change the examination and set the question message
        setExamination("Soft Tissue Assessment");
        setQuestionMessage("Normal in color and texture");
      }
      if (nextStep === 5) {
        // If it's about to become 4, change the examination and set the question message
        setExamination("Hard Tissue Assessment");
      }
      if (nextStep === 10) {
        setInstruction("Investigation");
        setExamination("");
      }
      if (nextStep === 11) {
        setInstruction("Radiographs");
        setExamination("");
      }

      return nextStep;
    });

    // After step 2, you may want to change the buttonText to "Finish" or handle it differently
    // if (step === 3) {
    //   // This will become 4 after the increment
    //   setButtonText("Finish");
    // }
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
          {step === 3 && <div>{renderRadioImageQuestion()}</div>}
          {step === 4 && <p>{questionMessage}</p>}
          {step === 5 && (
            // When step is 2, you can add the new components or logic here for future additions
            <div>{renderCheckBoxQuestion()}</div>
          )}
          {step === 8 && (
            // When step is 2, you can add the new components or logic here for future additions
            <div>
              <div
                className="imageContainer"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              >
                <img
                  src={imgplaqueChart}
                  alt="description"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              {renderCheckBoxQuestion()}
            </div>
          )}
          {step === 9 && (
            // When step is 2, you can add the new components or logic here for future additions
            <div>
              <div
                className="imageContainer"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              >
                <img
                  src={imgplaqueChart}
                  alt="description"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              {renderCheckBoxQuestion()}
            </div>
          )}{" "}
          {step === 10 && <div>{renderCheckBoxQuestion()}</div>}
          {step === (11 || 12) && <div>{renderRadioQuestion()}</div>}
          {step === 12 && (
            <div
              className="imageContainer"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            >
              <img
                src={img3}
                alt="description"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
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
