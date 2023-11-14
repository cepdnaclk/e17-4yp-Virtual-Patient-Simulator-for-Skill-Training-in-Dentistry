import React, { useContext, useState, useEffect, useRef } from "react";
import CheckBoxQuestion from "./CheckBoxQuestion";
import RadioImageQuestion from "./RadioImageQuestion";
import imgplaqueChart from "./images/imgplaquechart.jpeg";
import imgplaquechartempty from "./images/imgplaquechartempty.jpg";
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";
import image4 from "./images/image4.jpg";
import RadioTextQuestion from "./RadioTextQuestion";
import img3 from "../../../../Images/200.png";
import img4 from "../../../../Images/80.png";
import { useNavigate } from "react-router-dom";
import Test from "../../../Drawing/Test";
import { CaseDataContext } from '../../../../CaseDataContext'; 
import DentalChart from "../../../Dental Charts/DentalChart";

// Define correct answers for each step
const CORRECT_ANSWERS = {
  0: ["Mouth Mirror", "CPI probe"],
  1: "20-25g", // or "BPE"
  2: ["A colour band from 3.5mm to 5.5mm", "Ball ended tip"],
  3: "Diagram2", // Assuming the value for the second diagram is 'Diagram2'
  5: ["Mouth Mirror", "Periodontal probe"],
  8: ["Periodontal probe"],
  9: "78%",
  10: ["Radiographs", "Sensibility testing"],
  11: "IOPA & DPT",
  13: "17 & 27",
  14: "Poor",
  15: ["Pulpal status", "Caries extension", "Peri-apical infection"],
};
const CASE1_QUESTIONS = {
  // Example structure, adjust based on your actual questions
  0: "Select the instruments needed to carry out the periodontal screening",
  1: "According to the guidelines, what is the force that should be applied on the instrument during BPE?",
  2: "Select the features of the instrument used for the periodontal screening.",
  3: "Select the diagram which denotes code 3",
  5: "Select the instruments needed to carry out the hard tissue assessment",
  8: "Select the instruments needed to record the plaque score",
  9: "What is the plaq score?",
  10: "Select the investigation/s you wish to proceed?",
  11: "What radiographs would you take?",
  13: "Select the tooth/teeth you would proceed sensibility recording?",
  14: "What is the prognosis for tooth 17?",
  15: "What factors contributed to determine the prognosis of the tooth 17?",
};

const BlackBoxWithButton = ({ unityData, sendMessageToUnity }) => {
  const { caseData } = useContext(CaseDataContext);
  const totalMarks = caseData.totalMarks;
  const [buttonText, setButtonText] = useState("Submit");
  const [step, setStep] = useState(-1);
  const procedureNameInputRef = useRef(null);
  const [procedureName, setProcedureName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDiagram, setSelectedDiagram] = useState("");
  const [showToolTrayQuestion, setShowToolTrayQuestion] = useState(false);
  const [selectedPrognosis, setSelectedPrognosis] = useState(""); // Initial value can be an empty string or a default value
  const [selectedTooth, setSelectedTooth] = useState("");
  const [firstAttemptAnswers, setFirstAttemptAnswers] = useState({});
  const [marks, setMarks] = useState({ mark1: null, mark2: null });
  const [instructionsText, setInstructionsText] = useState(
    `1. Scroll down and find the dental chart.\n` +
    `2. Click the "Enter Intra Oral View" button.\n` +
    `3. Press "1" to use the dental mirror tool.\n` +
    `4. By observing the intra-oral view, mark the dental chart accordingly.\n` +
    `5. Submit your assessment.`
  );
  const [instructionsText2, setInstructionsText2] = useState(
    `1. Scroll down.\n` +
    `2. Click the "Enter Intra Oral View" button.\n` +
    `3. Press "1" to use the dental mirror tool.\n` +
    `4. By observing the intra-oral view, mark the defect of tooth 25 accordingly.\n` +
    `5. Submit your assessment.`
  );

  // Inside your component
  const navigate = useNavigate();
  const handlePrognosisSelect = (newValue) => {
    setSelectedPrognosis(newValue);
  };

  const [scoreData, setScoreData] = useState(null);
  // Add new states for attempts and scores
  const [attempts, setAttempts] = useState({});
  const [scores, setScores] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  // New state to hold the correct answer message
  const [correctAnswerMessage, setCorrectAnswerMessage] = useState("");
  // Add images for radio options
  const diagramOptions = [
    { src: image1, value: "Diagram1" },
    { src: image2, value: "Diagram2" },
    { src: image3, value: "Diagram3" },
    { src: image4, value: "Diagram4" },
  ];
  const [answers, setAnswers] = useState({
    "1. Tweezer": false,
    "2. Mouth Mirror": false,
    "3. Sharp probe": false,
    "4. Naber’s probe": false,
    "5. Periodontal probe": false,
    "6. CPI probe": false,
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
    "Sensibility testing": false,
    "Hematological investigations": false,
  });
  const [prognosis, setPrognosis] = useState({
    "Bone levels": false,
    "Pulpal status": false,
    "Periodontal status ": false,
    "Caries extension": false,
    "Peri-apical infection": false,
  });
  const [instruction, setInstruction] = useState(
    "EXTRA ORAL VIEW EXAMINATION"
  );
  const [examination, setExamination] = useState("");

  const [questionMessage, setQuestionMessage] = useState(
    "Since Patient looks fit and healthy , please click Enter INTRA ORAL View button to proceed with the rest of the examination."
  ); // New state to hold the question message
  // Define the options for the single-choice question
  const forceOptions = [
    "45-50g",
    "35-40g",
    "20-25g",
    "15-20g",
  ];

  // Add a new state for the selected force
  const [selectedForce, setSelectedForce] = useState("");

  const handleMarks = (mark1, mark2) => {
    setMarks({ mark1, mark2 });
    setStep(currentStep => currentStep + 1);
    // Additional code to test the received data (e.g., logging it to the console)
    console.log(`Received marks: mark1 = ${mark1}, mark2 = ${mark2}`);
  };
  // Effect hook to listen for changes in unityData
  useEffect(() => {
    console.log("Unity data received in BlackBoxWithButton:", unityData); // Add this line for debugging
    if (unityData === "MessageFromUnity") {

      // setShowQuestion(true);
      setInstruction("INTRA ORAL EXAMINATION");
      setExamination("Periodontal Screening");
      setQuestionMessage(
        "Press The TOOL TRAY VIEW button to see the dental tools"
      );
    }
    if (unityData === "Tool tray toggled: Active") {
      setShowToolTrayQuestion(true); // Show the question when this message is received
      setStep(0);
    }
  }, [unityData]);

  // Callback function to be passed to DentalChart
  const handleScoreData = (score, totalCorrectAnswers) => {
    setScoreData({ score, totalCorrectAnswers });
    setStep(currentStep => currentStep + 1);
  };
  // Function to handle checkbox changes


  const handleCheckboxChange = (option) => {
    console.log(`handleCheckboxChange called with option: ${option}`);
    if (step === 2) {
      setPeriodontalScreeningOptions((prevAnswers) => {
        const newAnswers = { ...prevAnswers, [option]: !prevAnswers[option] };
        console.log(`Option changed: ${option}, New state:`, newAnswers);
        return newAnswers;
      });
    }
    if (step === 9) {
      setplaqscoreAnswers((prevAnswers) => {
        const newAnswers = { ...prevAnswers, [option]: !prevAnswers[option] };
        console.log(`Option changed: ${option}, New state:`, newAnswers);
        return newAnswers;
      });
    } else if (step === 10) {
      setInvestigations((prevAnswers) => {
        const newAnswers = { ...prevAnswers, [option]: !prevAnswers[option] };
        console.log(`Option changed: ${option}, New state:`, newAnswers);
        return newAnswers;
      });
    } else if (step === 15) {
      setPrognosis((prevAnswers) => {
        const newAnswers = { ...prevAnswers, [option]: !prevAnswers[option] };
        console.log(`Option changed: ${option}, New state:`, newAnswers);
        return newAnswers;
      });
    } else {
      setAnswers((prevAnswers) => {
        const newAnswers = { ...prevAnswers, [option]: !prevAnswers[option] };
        console.log(`Option changed: ${option}, New state:`, newAnswers);
        return newAnswers;
      });
    }
  };
  useEffect(() => {
    console.log("Total Marks: ", totalMarks);
}, [totalMarks]); 

  const renderRadioImageQuestion = () => {
    if (step === 3) {
      return (
        <div>
          <p>Select the diagram which denotes code 3.</p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {diagramOptions.map((image, index) => (
              <div
                key={index}
                style={{
                  flexBasis: "50%",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                <img
                  src={image.src}
                  alt={`Diagram ${index + 1}`}
                  style={{
                    width: "65%",
                    height: "auto",
                    objectFit: "contain",
                    maxWidth: "300px",
                  }}
                />
                <div>
                  <input
                    type="radio"
                    name="diagramSelection"
                    value={image.value}
                    checked={selectedDiagram === image.value}
                    onChange={() => handleImageSelect(image.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const renderRadioQuestion = () => {
    if (step === 11) {
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
    if (step === 13) {
      const toothOptions = ["45", "11 & 21", "17", "24 & 35", "17 & 27"];

      return (
        <RadioTextQuestion
          question="Select the tooth/teeth you would proceed sensibility recording?"
          options={toothOptions}
          selectedValue={selectedTooth}
          onValueChange={setSelectedTooth}
        />
      );
    } else if (step === 14) {
      const prognosisOptions = ["Poor", "Questionable", "Good", "Hopeless"];

      return (
        <RadioTextQuestion
          question="What is the prognosis for tooth 17?"
          options={prognosisOptions}
          selectedValue={selectedPrognosis} // Define selectedPrognosis to store the selected option
          onValueChange={handlePrognosisSelect} // Define handlePrognosisSelect to handle the option change
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
    console.log("handleProcedureNameChange called"); // Debug statement 1
    console.log("Current input value:", event.target.value); // Debug statement 2
    setProcedureName(event.target.value);
  };

  useEffect(() => {
    switch (step) {
      case 0:
      case 5:
      case 8:
        setAnswers({
          Tweezer: false,
          "Mouth Mirror": false,
          "Sharp probe": false,
          "Naber’s probe": false,
          "Periodontal probe": false,
          "CPI probe": false,
        });
        break;
      case 2:
        setPeriodontalScreeningOptions({
          "A colour band from 4-5mm": false,
          "A colour band from 3.5mm to 5.5mm": false,
          "Blunt tip": false,
          "Ball ended tip": false,
          "Always only one colour band": false,
        });
        break;
      case 9:
        setplaqscoreAnswers({
          "54%": false,
          "72%": false,
          "78%": false,
          "85%": false,
        });
        break;
      case 10:
        setInvestigations({
          Radiographs: false,
          "3D imaging": false,
          "Sensibility testing": false,
          "Hematological investigations": false,
        });
        break;

      // Add cases for other steps as needed
      default:
        setAnswers({});
    }
  }, [step]);
  // When the component mounts, add an event listener to the input

  // Function to render the question and input field
  // Modify the renderProcedureNameQuestion function
  const renderProcedureNameQuestion = () => {
    return (
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="forceQuestion">
          According to the guidelines, what is the force that should be applied on the instrument during BPE?
        </label>
        <div>
          {forceOptions.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`forceOption${index}`}
                name="forceQuestion"
                value={option}
                checked={selectedForce === option}
                onChange={(e) => setSelectedForce(e.target.value)}
              />
              <label htmlFor={`forceOption${index}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };
  // Render the checkbox question if showToolTrayQuestion is true
  const renderCheckBoxQuestion = () => {
    console.log("renderCheckBoxQuestion called with step:", step);
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
          question="Select the instruments needed to record the plaque score"
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
    } else if (step === 15) {
      // Render the first set of checkboxes
      return (
        <CheckBoxQuestion
          question="What factors contributed to determine the prognosis of the tooth 17?"
          answers={prognosis}
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
    width: "300px",
    padding: "10px 20px", // Add padding to make the button look good
    backgroundColor: isSubmitted ? "lightgreen" : "dodgerblue", // Change button color after submission
  };

  const instructionBoxStyle = {
    backgroundColor: "snow",
    border: "1px solid black",
    color: "black",
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
  console.log("test");
  // Modify the existing boxStyle to accommodate new layout
  const boxStyle = {
    width: "30%", // Adjust this to the desired width
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start", // Aligns items to the start of the flex container
    marginRight: "300px", // This creates a gap on the right side. Adjust as needed.
  };
  const messageBoxStyle = {
    border: '1px solid #ddd', // Light grey border
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9', // Light background
    fontSize: '14px',
    borderRadius: '5px', // Rounded corners
    width: '300px', // Maximum width
    wordWrap: 'break-word', // Ensures text wraps to avoid overflow
  };
  let messageBoxDynamicStyle = { ...messageBoxStyle };

  if (correctAnswerMessage.includes("Correct")) {
    messageBoxDynamicStyle.backgroundColor = 'lightgreen';
  } else if (correctAnswerMessage.includes("Wrong")) {
    messageBoxDynamicStyle.backgroundColor = 'salmon';
  } else if (correctAnswerMessage) {
    messageBoxDynamicStyle.backgroundColor = 'royalblue';
  }
  // Function to check if the answer is correct
  const isAnswerCorrect = (currentStep) => {
    let userAnswers;
    switch (currentStep) {
      case 1:
        return selectedForce === CORRECT_ANSWERS[currentStep];
      case 9:
        userAnswers = plaqscoreanswers;
        return userAnswers[CORRECT_ANSWERS[currentStep]];
      case 10:
        userAnswers = investigations;
        break;
      case 13:
        return selectedTooth === CORRECT_ANSWERS[currentStep];
      case 14:
        return selectedPrognosis === CORRECT_ANSWERS[currentStep];
      case 15:
        userAnswers = prognosis;
        break;
      default:
        userAnswers = answers;
    }

    console.log(`Checking answers for step ${currentStep}`);
    console.log("User answers:", userAnswers);
    console.log("Correct answers:", CORRECT_ANSWERS[currentStep]);

    if (Array.isArray(CORRECT_ANSWERS[currentStep])) {
      return CORRECT_ANSWERS[currentStep].every(
        (answer) => userAnswers[answer]
      );
    } else {
      return (
        selectedDiagram === CORRECT_ANSWERS[currentStep] ||
        procedureName === CORRECT_ANSWERS[currentStep]
      );
    }
  };

  const handleButtonClick = () => {
    console.log("handleButtonClick called with step:", step);
    // Add a call to sendMessageToUnity here
    console.log("submit");
    if (sendMessageToUnity) {
      console.log("submit");
      sendMessageToUnity("ToggleToolTray");
    }
    // Directly proceed to the next step for steps 4, 6, and 7
    if (step === 4 || step === 6 || step === 7 || step === 12) {
      proceedToNextStep();
      return;
    }
    const correct = isAnswerCorrect(step);
    console.log(`Step ${step} answer correct:`, correct);
    const currentAttempts = attempts[step] || 0;

    // Save first attempt answer
    if (currentAttempts === 0) {
      let firstAttemptAnswer;
      switch (step) {
        case 0:
          firstAttemptAnswer = answers;
          break;
        case 1:
          firstAttemptAnswer = selectedForce;
          break;
        case 2:
          firstAttemptAnswer = periodontalScreeningOptions;
          break;
        case 3:
          firstAttemptAnswer = selectedDiagram;
          break;
        case 5:
          firstAttemptAnswer = answers;
          break;
        case 8:
          firstAttemptAnswer = answers;
          break;
        case 9:
          firstAttemptAnswer = plaqscoreanswers;
          break;
        case 10:
          firstAttemptAnswer = investigations;
          break;
        case 11:
          firstAttemptAnswer = selectedDiagram;
          break;
        case 13:
          firstAttemptAnswer = selectedTooth;
          break;
        case 14:
          firstAttemptAnswer = selectedPrognosis; // Corrected to selectedPrognosis
          break;
        case 15:
          firstAttemptAnswer = prognosis;
          break;
        default:
          firstAttemptAnswer = answers;
      }

      setFirstAttemptAnswers((prevAnswers) => ({
        ...prevAnswers,
        [step]: firstAttemptAnswer,
      }));
    }

    if (correct) {
      setScores({ ...scores, [step]: (scores[step] || 0) + 5 });
      setTotalScore((prevTotalScore) => prevTotalScore + 5);
      setCorrectAnswerMessage("Correct answer! +5 points");
      proceedToNextStep();
    } else {
      setAttempts({ ...attempts, [step]: currentAttempts + 1 });
      if (currentAttempts < 2) {
        // Allow 3 attempts, so check if the current attempt is less than 2
        setCorrectAnswerMessage("Wrong answer! Try again.");
      } else {
        setScores({ ...scores, [step]: (scores[step] || 0) - 5 });
        setTotalScore((prevTotalScore) => prevTotalScore - 5);
        setCorrectAnswerMessage(
          `Incorrect. The correct answer is: ${Array.isArray(CORRECT_ANSWERS[step])
            ? CORRECT_ANSWERS[step].join(", ")
            : CORRECT_ANSWERS[step]
          }`
        );
        proceedToNextStep();
      }
    }

    // Reset the correct answer message after a delay
    setTimeout(() => {
      setCorrectAnswerMessage("");
    }, 3000);
    const finalScore = totalScore + (marks.mark1 || 0) + (marks.mark2 || 0);
    if (scoreData && scoreData.score) {
      finalScore += scoreData.score;
    }
    if (step === 15) {

      setButtonText("Finish");
    }
    // Show review page when "Finish" button is clicked
    if (step === 15 && buttonText === "Finish") {
      navigate('/feedback', {
        state: {
          totalScore: finalScore, // Pass the final score
          CORRECT_ANSWERS,
          firstAttemptAnswers,
          showBlackBox: false,
          CASE1_QUESTIONS,
          totalMarks
        }
      });
      return; // Exit the function to prevent further execution
    }

  };

  const proceedToNextStep = () => {
    const totalSteps = 15; // Total number of steps in the simulation
    if (step < totalSteps) {
      setShowToolTrayQuestion(false);
      setStep((prevStep) => {
        const nextStep = prevStep + 1;

        // Update the examination and question message based on the next step
        switch (nextStep) {
          case 4:
            setExamination("Soft Tissue Assessment");
            setQuestionMessage("It looks normal in color and texture , Optional : You could futher verify it by having a look at the INTRA ORAL View");
            setButtonText("Next");
            break;
          case 5:
            setExamination("Hard Tissue Assessment");
            setButtonText("Submit");
            break;

          case 6:
            setQuestionMessage("")

            break;
          case 10:
            setInstruction("Investigation");
            setExamination("");
            break;
          case 11:
            setInstruction("Radiographs");
            setExamination("");
            break;
            case 12:
              setButtonText("Next");
              break;
          case 13:
            setInstruction("Sensibility recordings");
            setButtonText("Submit");
            break;
          default:
            break;
        }
        if (nextStep === 14) {
          setInstruction("Prognosis");
        }

        return nextStep;
      });
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
      <div style={questionBoxStyle}>
        <div>
          {isSubmitted === true || step === 1 ? (
            <>
              {renderTable()}
              {renderProcedureNameQuestion()}{" "}
              {/* Call the function to render the input field */}
            </>
          ) : step === (-1 || 0) && !showToolTrayQuestion ? (
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
          {step === 6 && (
            <div>
              {/* Render the instructions text */}
              <div className="instructions">
                {instructionsText.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>

              {/* DentalChart component */}
              <DentalChart onScoreSubmit={handleScoreData}></DentalChart>
            </div>
          )}
          {step === 7 && (
            <div>
              {/* Render the instructions text */}
              <div className="instructions">
                {instructionsText2.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />

              {/* Container for the Test component */}
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginLeft: '500px' }}>
                <Test onSubmit={handleMarks} />
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>

          )}

          {step === 8 && (
            // When step is 2, you can add the new components or logic here for future additions
            <div>
              <div
                className="imageContainer"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              >
                <img
                  src={imgplaquechartempty}
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
          {step === 11 && <div>{renderRadioQuestion()}</div>}
          {step === 12 && (
            <div
              className="imageContainer"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1px",
                overflowY: "auto",
                paddingTop: "1px", // Reduced top padding
                paddingRight: "10px",
                paddingBottom: "1px",
                paddingLeft: "10px",
              }}
            >
              <div
                style={{ textAlign: "center", width: "100%", marginTop: "0" }}
              >
                {" "}
                {/* Removed top margin from the first image container */}
                <img
                  src={img3}
                  alt="IOPA 17"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "190px",
                    objectFit: "contain",
                  }}
                />
                <p style={{ fontSize: "smaller" }}>IOPA 17</p>
              </div>
              <div style={{ textAlign: "center", width: "100%" }}>
                <img
                  src={img4}
                  alt="DPT"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "190px",
                    objectFit: "contain",
                  }}
                />
                <p style={{ fontSize: "smaller", marginTop: "5px" }}>DPT</p>{" "}
                {/* Label for the second image */}
              </div>
            </div>
          )}
          {step === 13 && <div>{renderRadioQuestion()}</div>}
          {step === 14 && <div>{renderRadioQuestion()}</div>}
          {step === 15 && <div>{renderCheckBoxQuestion()}</div>}
        </div>
      </div>
      <button style={buttonStyle} onClick={handleButtonClick} disabled={step === -1 || step === 6 ||step === 7}>
        {buttonText}
      </button>

      <div>

        {correctAnswerMessage && <p style={messageBoxDynamicStyle}>{correctAnswerMessage}</p>}

      </div>



    </div>
  );
};

export default BlackBoxWithButton;