import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import background from "../../Images/DentistryBackgound.jpg";
import React, { useContext, useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import "./Case.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardHeader } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import "./SelectedQ";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { maxHeight } from "@mui/system";
import img1 from "../../Images/case1.png";
import img2 from "../../Images/bkk.jpg";
import { QuestionAnswer } from "@mui/icons-material";
import firebase from "../../Config/Config";
import Qcard from "./questionCards/Qcard";
import QcardPack from "./questionCards/QcardPack";
import { useDispatch } from "react-redux";
import { historyTakingActions } from "../../Actions/historyTakingQ/historyTakingActions";
import Navbar from "../Navbar";
import { ExaminationActions } from "../../Actions/Examination/ExaminationActions";
import { CaseActions } from "../../Actions/Case/CaseActions";
import { DiagnosisActions } from "../../Actions/Diagnosis/DiagnosisActions";
import { DentalSheetActions } from "../../Actions/DentalSheet/DentalSheetActions";
import { InvestigationActions } from "../../Actions/Investigation/InvestigationActions";
import { ScoreActions } from "../../Actions/Score/ScoreActions";
import { TimeActions } from "../../Actions/Time/TimeActions";
import { List, ListItem } from "@mui/material";
import Typed from "react-typed";
import ThreeD from "./resources/ThreeD";
import { CaseDataContext } from '../../CaseDataContext'

import imagedoc from "../../Images/doc.gif";
import imagepet from "../../Images/pat.gif";

const useStyles = makeStyles({
  label: {
    color: "black",
    "&.Mui-focused": {
      color: "black",
    },
  },
});

const questions = {
  complaint: [
    {
      q: "Can you point to the tooth which is painful?",
      correctness: true,
      a: "Here it is",
      image:
        "https://firebasestorage.googleapis.com/v0/b/vitual-patient.appspot.com/o/Cases%2FC001%2FpointToothC001.jfif?alt=media&token=c2071e16-4945-4106-841c-34f5fe72265c",
      cat: "complaint",
      id: "35",
    },
    {
      q: "How many days have you had pain on the tooth?",
      cat: "complaint",
      image: "",
      correctness: true,
      a: "Three days",
      id: "5",
    },
    {
      a: "Yes. Sometimes get earache",
      cat: "complaint",
      q: "Does the pain radiate?",
      correctness: true,
      id: "10",
      image: "",
    },
    {
      image: "",
      a: "Yes. I had pain from time to time. But for the last three days I had continuous pain and could not sleep at night due to the pain",
      correctness: true,
      cat: "complaint",
      q: "Have you had any pain before?",
      id: "6",
    },
    {
      cat: "complaint",
      id: "41",
      correctness: false,
      q: "Have you got any restorations done on that tooth?",
      image: "",
      a: "No",
    },
    {
      correctness: true,
      q: "Do you have pain when biting on that tooth?",
      a: "Yes difficult to eat from that side",
      id: "8",
      image: "",
      cat: "complaint",
    },
    {
      image: "",
      a: "I bought some tablets from the pharmacy. But the pain did not reduce much",
      cat: "complaint",
      id: "11",
      q: "Have you taken any treatments before for the pain?",
      correctness: true,
    },
    {
      correctness: false,
      image: "",
      a: "Don't know",
      id: "40",
      q: "Is it on a molar tooth?",
      cat: "complaint",
    },
    {
      image: "",
      a: "No",
      q: "Do you have pain on percussion?",
      correctness: false,
      id: "7",
      cat: "complaint",
    },
    {
      q: "Can you point to the tooth which is painful?",
      correctness: true,
      a: "This is it",
      image:
        "https://firebasestorage.googleapis.com/v0/b/vitual-patient.appspot.com/o/Cases%2FC001%2FpointToothC001.jfif?alt=media&token=c2071e16-4945-4106-841c-34f5fe72265c",
      cat: "complaint",
      id: "35",
    },
    // More items would be here...
  ],
  plaque: [
    {
      image: "",
      cat: "plaque",
      a: "A normal toothbrush",
      q: "What is the brush type you use?",
      correctness: true,
      id: "18",
    },
    {
      correctness: true,
      cat: "plaque",
      id: "20",
      q: "Do you use toothpaste?",
      a: "Yes",
      image: "",
    },
    {
      id: "21",
      a: "I am not sure",
      image: "",
      cat: "plaque",
      q: "Do you know whether it contains fluoride?",
      correctness: true,
    },
    {
      correctness: true,
      a: "I brush with toothpaste ",
      q: "How do you clean your mouth?",
      image: "",
      id: "3",
      cat: "plaque",
    },
    {
      correctness: true,
      id: "17",
      image: "",
      cat: "plaque",
      q: "How many times do you brush per day?",
      a: "Two times. Sometimes miss during the night",
    },
    {
      correctness: true,
      id: "22",
      image: "",
      cat: "plaque",
      q: "Do you use any other tools other than the toothbrush to clean the mouth?",
      a: "no",
    },
    {
      cat: "plaque",
      a: "I am not sure",
      correctness: true,
      image: "",
      id: "19",
      q: "What is the bristle type of the toothbrush?",
    },
    {
      image: "",
      cat: "plaque",
      a: "A normal toothbrush",
      q: "What is the brush type you use?",
      correctness: true,
      id: "18",
    },
    // More items would be here...
  ],
  dhistory: [
    {
      image: "",
      a: "When hungry in between meals Eat biscuits with tea in the evening",
      cat: "dhistory",
      correctness: true,
      q: "When do you usually eat sugary or sweet foods?",
      id: "24",
    },
    {
      id: "24",
      a: "When hungry in between meals Eat biscuits with tea in the evening",
      cat: " dhistory",
      correctness: true,
      q: "When do you usually eat sugary or sweet foods?",
      image: "",
    },
    {
      a: "Most of the days yes",
      cat: "dhistory",
      correctness: true,
      id: "23",
      q: "Do you eat sugary food/sweets daily?",
      image: "",
    },
    // More items would be here...
  ],
  // Other categories would be here...
  medicalH: [
    {
      q: "Are you attending a medical clinic?",
      a: "no",
      cat: "medicalH",
      correctness: true,
      id: "4",
      image: "",
    },
    {
      a: "no",
      id: "15",
      cat: "medicalH",
      q: "Do you have any allergies? ",
      image: "",
      correctness: true,
    },
    {
      image: "",
      id: "14",
      cat: "medicalH",
      correctness: true,
      q: "Are you taking regular drugs for any disease?",
      a: "no",
    },
    {
      q: "Have you had any operations or hospitalizations?",
      cat: "medicalH",
      correctness: true,
      image: "",
      id: "13",
      a: "no",
    },
  ],
  habits: [
    {
      id: "2",
      correctness: true,
      a: "no",
      cat: "habits",
      image: "",
      q: "Do you chew betel or areca nuts?",
    },
    {
      image: "",
      a: "no",
      cat: "habits",
      q: "Do you smoke or use any form of tobacco?",
      correctness: true,
      id: "1",
    },
    {
      image: "",
      a: "no",
      q: "Do you drink alcohol?",
      cat: "habits",
      id: "0",
      correctness: true,
    },
  ],
  shistory: [
    {
      cat: "shistory",
      id: "30",
      image: "",
      q: "Are you doing a job?",
      a: "Yes doing business. Have a grocery shop",
      correctness: true,
    },
  ],
  pretreate: [
    {
      q: "What dental treatments have you had before?",
      id: "28",
      cat: "pretreate",
      image: "",
      a: "Teeth cleaning and fillings. Could not attend a dental clinic for a long time",
      correctness: true,
    },
  ],
};

function CaseDesc() {
  const { setCaseData } = useContext(CaseDataContext);
  const [selectedQId, setSelectedQId] = useState([]);
  const { userInfomation } = useSelector((state) => state.user);
  const { sectionOrder } = useSelector((state) => state.historyQ);
  const classes = useStyles();
  const navigate = useNavigate();
  const [qId, setIdOfQ] = useState("");
  const [value, setValue] = useState("");
  const [Section, setSection] = useState("");
  const [ans, setAns] = useState("");

  const { selectedQdata } = useSelector((state) => state.historyQ);
  const { selectedCaseDetails } = useSelector((state) => state.caseSelected);
  const { isSubmitDiagnosis } = useSelector((state) => state.diagnosisQ);
  const dispatch = useDispatch();

  const [selectedSection, setSelectedSection] = useState(null);
  const [questionsForDropdown, setQuestionsForDropdown] = useState([]);

  const [selectedQ, setSelectedQ] = useState([]);
  const [selectedQIds, setSelectedQIds] = useState([]);

  const handleSection = (eventKey) => {
    // Set the selected section state
    setSelectedSection(eventKey);

    // Extract the questions for the selected section from the questions object
    const filteredQuestions = questions[eventKey].map((item) => ({
      id: item.id,
      q: item.q,
    }));

    // Update the state to hold the filtered questions for the second dropdown
    setQuestionsForDropdown(filteredQuestions);
    console.log(questionsForDropdown);
  };

  const handleSelect = (eventKey, event) => {
    console.log(eventKey);
    // Find the selected question object using the eventKey which is the id
    const selectedQuestion = questions[selectedSection].find(
      (q) => q.id == eventKey
    );

    console.log(selectedQuestion);

    // Update the selected questions array and the selected question ids array
    setSelectedQ((prevSelectedQ) => [...prevSelectedQ, selectedQuestion]);
    setSelectedQIds((prevSelectedQIds) => [
      ...prevSelectedQIds,
      selectedQuestion.id,
    ]);
  };

  const handleClick = () => {
    let totalMarks = 0;

    // Assume 'questions' is an object with categories as keys and arrays of question objects as values.
    selectedQIds.forEach((id) => {
      // Find the question object by id in the 'questions' object
      for (const category in questions) {
        const question = questions[category].find((q) => q.id === id);

        // If the question is found and correctness is defined
        if (question && question.correctness !== undefined) {
          // Update the total marks based on correctness
          totalMarks += question.correctness ? 10 : -5;
        }
      }
    });

    const sel = selectedQ.map((item) => item.q);

    const correctAnswersArray = [];

    // Iterate over each category in the questions object
    for (const category in questions) {
      // Filter out questions with correctness set to True within the category
      const correctAnswers = questions[category].filter(
        (question) => question.correctness
      );

      // Concatenate the correct answers to the correctAnswersArray
      correctAnswersArray.push(...correctAnswers);
    }

    // Log the total marks
    console.log("Total Marks:", totalMarks);
    console.log("slected ans", sel);
    console.log("correct ans", correctAnswersArray);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Delay the navigation slightly to allow the scroll to happen
    setTimeout(() => {
      navigate("/page4");
    }, 500); // 500ms delay

    setCaseData(previousData => ({ ...previousData, totalMarks }));
  };

  const handleClick1 = () => {
    navigate("/caseSelect");
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${img2})`,
        minHeight: "100vh",
        fontSize: "50px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="navText">
        <Navbar />
      </div>
      <div></div>
      <div className="phtopic1">Patient History Taking</div>

      <div className="phtopic2">Case ID: {selectedCaseDetails.caseId}</div>
      {/* three colomn grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "20px 1fr 20px",
          gridGap: 20,
        }}
      >
        <div className="left-column"></div>
        <div className="middle-column">
          <div className="phcardDesc">
            <Card sx={{ maxWidth: 800 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  alt="Case Description"
                  image={selectedCaseDetails.frontImage}
                />
                <CardContent>
                  <div className="case">Case {selectedCaseDetails.name}</div>
                  <div className="casedes">
                    {selectedCaseDetails.description}
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
          <Card
            sx={{
              maxWidth: 500,
              maxHeight: 1000,
              elevation: 3,
              backgroundColor: "#645bea", // setting light blue background
            }}
          >
            <CardActionArea>
              <CardContent
                sx={{
                  maxHeight: 500,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // centering content horizontally
                }}
              >
                <Card
                  className="choose"
                  sx={{
                    maxWidth: 450,
                    maxHeight: 400,
                    // backgroundColor: "#C3C6C4",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // centering content horizontally
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Instructions:
                  </Typography>
                  <List>
                    <ListItem>
                      <Typography variant="body1">
                        Select the sections according to the correct order of
                        patient examination.
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography variant="body1">
                        From each section, select only the relevant questions.
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography variant="body1">
                        Wrong section order and irrelevant questions will carry
                        negative marks.
                      </Typography>
                    </ListItem>
                  </List>
                </Card>
              </CardContent>
            </CardActionArea>
          </Card>
          <div>
            <Grid container spacing={2}>
              <Grid Item xs={6}>
                <Dropdown
                  className="phddown1"
                  title="Select the Section"
                  id="dropdown-menu-align-right"
                  onSelect={handleSection}
                >
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select the section
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="dhistory">
                      Dietary history
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="habits">Habits</Dropdown.Item>
                    <Dropdown.Item eventKey="complaint">
                      History of the presenting complaint
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="medicalH">
                      Medical history
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="plaque">
                      Plaque control
                    </Dropdown.Item>
                    {selectedCaseDetails.caseId == "C001" ? (
                      <Dropdown.Item eventKey="pretreate">
                        Previous dental treatments
                      </Dropdown.Item>
                    ) : null}
                    <Dropdown.Item eventKey="shistory">
                      Social history
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Grid>
              <Grid Item xs={6}>
                <div className="phddown2">
                  <DropdownButton
                    className="ddown1"
                    alignRight
                    title="Select the question"
                    id="dropdown-menu-align-right1"
                    onSelect={handleSelect}
                    variant="success"
                  >
                    {questionsForDropdown.map((question, index) => (
                      <Dropdown.Item eventKey={question.id} key={question.id}>
                        {question.q}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className="phsect2" style={{ fontSize: "60px" }}>
            {Section === "complaint" ? (
              <div className="phsect2">History of the presenting complaint</div>
            ) : null}
            {Section === "habits" ? (
              <div className="phsect2">Habits</div>
            ) : null}
            {Section === "medicalH" ? (
              <div className="phsect2">Medical history</div>
            ) : null}
            {Section === "plaque" ? (
              <div className="phsect2">Plaque control</div>
            ) : null}
            {Section === "dhistory" ? (
              <div className="phsect2">Dietary history</div>
            ) : null}
            {Section === "pretreate" ? (
              <div className="phsect2">Previous dental treatments</div>
            ) : null}
            {Section === "shistory" ? (
              <div className="phsect2">Social history</div>
            ) : null}
          </div>
          {/* <div className="phsect1">
            <Grid container spacing={5}>
              <Grid Item xs={5}>
                <div className="phcardsd">
                  <div sx={{ maxWidth: 600, maxHeight: 1000 }}></div>
                </div>
              </Grid>
              <Grid Item xs={7}></Grid>
            </Grid>
          </div> */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 800px 1fr",
              gridGap: 20,
            }}
          >
            <div className="left-column1">
              {selectedQ && selectedQ.length > 0 ? (
                <img
                  className="docimage"
                  src={imagedoc}
                  style={{
                    width: "200px",
                    height: "200px",
                    marginRight: "-200px",
                  }}
                  alt="Doctor gif"
                />
              ) : null}
            </div>
            <div className="middle-column1">
              <div className="phqna">
                <Card sx={{ maxWidth: 740 }}>
                  <CardActionArea>
                    <CardHeader
                      title="Conversation"
                      style={{ textAlign: "center" }}
                    />
                    <CardMedia height="500" alt="Case Description" />
                    <CardContent
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      {/* Display the contents of selectedQ */}
                      {selectedQ &&
                        selectedQ.map((question) => (
                          <div
                            key={question.id}
                            style={{ marginBottom: "16px" }}
                          >
                            {" "}
                            {/* Gap between each Q&A set */}
                            {/* Question */}
                            <div
                              style={{
                                textAlign: "left",
                                display: "flex",
                                justifyContent: "flex-start",
                                marginBottom: "8px", // Gap between the question and answer
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "#e1ffc7", // Light green bubble for the question
                                  borderRadius: "12px 12px 12px 0", // Rounded corners except top-right
                                  padding: "8px 12px",
                                  maxWidth: "80%", // To ensure the bubble doesn't span the full width
                                  wordBreak: "break-word", // Break words to prevent overflow
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <Typed
                                    strings={[question.q]}
                                    typeSpeed={40}
                                  />
                                </Typography>
                              </div>
                            </div>
                            {/* Answer */}
                            <div
                              style={{
                                textAlign: "right",
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "#d9edfd", // Light blue bubble for the answer
                                  borderRadius: "12px 12px 0 12px", // Rounded corners except bottom-right
                                  padding: "8px 12px",
                                  maxWidth: "80%", // To ensure the bubble doesn't span the full width
                                  wordBreak: "break-word", // Break words to prevent overflow
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <Typed
                                    strings={[question.a]}
                                    typeSpeed={40}
                                    startDelay={2000}
                                  />
                                </Typography>
                              </div>
                            </div>
                          </div>
                        ))}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </div>

            <div className="right-column1">
              {selectedQ && selectedQ.length > 0 ? (
                <img
                  className="petimage"
                  src={imagepet}
                  style={{ width: "200px", height: "200px" }}
                  alt="patient gif"
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="right-column"></div>
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "200px 1fr 200px",
          gridGap: 20,
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <div className="bleft">
          <button className="custom-button1" onClick={handleClick1}>
            Back
          </button>
        </div>
        <div className="bmid">Click next after completing the conversation</div>
        <div className="bright">
          <button className="custom-button2" onClick={handleClick}>
            Next
          </button>
        </div>
      </div>

      {isSubmitDiagnosis ? (
        <div id="warningMsg" style={{ fontSize: "15px" }}>
          <div class="alert alert-dismissible alert-danger">
            <strong>Allready submitted the answers.</strong> Can not modify
            Answers.
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default CaseDesc;
