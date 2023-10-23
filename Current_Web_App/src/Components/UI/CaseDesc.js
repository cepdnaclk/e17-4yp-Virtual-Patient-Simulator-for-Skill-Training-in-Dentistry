import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import background from "../../Images/DentistryBackgound.jpg";
import React, { useEffect, useState, Fragment } from "react";
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

function CaseDesc() {
  const [questions, setQuestions] = useState([]);
  const [selectedQId, setSelectedQId] = useState([]);
  const { userInfomation } = useSelector((state) => state.user);
  const { sectionOrder } = useSelector((state) => state.historyQ);
  const classes = useStyles();
  const navigate = useNavigate();
  const [qId, setIdOfQ] = useState("");
  const [value, setValue] = useState("");
  const [Section, setSection] = useState("");
  const [ans, setAns] = useState("");
  const [selectedQ, setSelectedQ] = useState("");

  const { selectedQdata } = useSelector((state) => state.historyQ);
  const { selectedCaseDetails } = useSelector((state) => state.caseSelected);
  const { isSubmitDiagnosis } = useSelector((state) => state.diagnosisQ);
  const dispatch = useDispatch();

  const initialState = {};
  const resetState = () => {
    setQuestions(initialState);
  };
  const mapValuesToState = (qArray) => {
    console.log("qarray:", qArray);
    // setQuestions(initialState)
    qArray.map((item) => setQuestions(item));

    console.log(questions);
  };

  useEffect(() => {
    setSelectedQ(selectedQdata);
    fetchQuestions(selectedQdata);
  }, []);

  const fetchQuestions = async () => {
    console.log(selectedCaseDetails.caseId);
    const snapshot = await firebase
      .firestore()
      .collection(selectedCaseDetails.caseId)
      .get();
    const qArray = snapshot.docs.map((doc) => doc.data());
    dispatch(historyTakingActions.addAllHTQdata(qArray));
    if (questions.length < qArray.length) {
      setQuestions(questions.concat(qArray));
    }
  };

  const handleSelect = (e) => {
    setValue(e);
    setIdOfQ(e);
    for (let item of questions) {
      // let num= e.toString()
      if (item.id == e.toString() && !isSubmitDiagnosis) {
        setSelectedQ(
          // Replace the state
          [
            // with a new array
            ...selectedQ, // that contains all the old items
            item, // and one new item at the end
          ]
        );
        dispatch(historyTakingActions.addselectedQdata(item));
      }
    }
    setSelectedQId(
      // Replace the state
      [
        // with a new array
        ...selectedQId, // that contains all the old items
        e.toString(), // and one new item at the end
      ]
    );

    console.log(selectedQId);

    if (e === "Question-1") {
      setAns("Ans1");
    }
  };

  const displayq = (e) => {
    const QList = questions;
  };

  const handleSection = (e) => {
    setSection(e);
    displayq(e);
    if (!isSubmitDiagnosis) {
      dispatch(historyTakingActions.setSelectionOrder(e));
    }
    // if(isSubmitDiagnosis){
    //   dispatch(ExaminationActions.clearhistory())
    //   dispatch(CaseActions.clearhistory())
    //   dispatch(DiagnosisActions.clearhistory())
    //   dispatch(DentalSheetActions.clearhistory())
    //   dispatch(historyTakingActions.clearhistory())
    //   dispatch(InvestigationActions.clearhistory())
    //   dispatch(ScoreActions.clearhistory())
    //   dispatch(TimeActions.clearhistory())
    // }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Delay the navigation slightly to allow the scroll to happen
    setTimeout(() => {
      navigate("/page4");
    }, 500); // 500ms delay
  };

  const handleClick1 = () => {
    navigate("/caseSelect");
    if (isSubmitDiagnosis) {
      dispatch(ExaminationActions.clearhistory());
      dispatch(CaseActions.clearhistory());
      dispatch(DiagnosisActions.clearhistory());
      dispatch(DentalSheetActions.clearhistory());
      dispatch(historyTakingActions.clearhistory());
      dispatch(InvestigationActions.clearhistory());
      dispatch(ScoreActions.clearhistory());
      dispatch(TimeActions.clearhistory());
    }
  };
  console.log(userInfomation.name);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
                    {Section &&
                      questions
                        .filter((question) => question.cat.includes(Section))
                        .map((filteredName) => (
                          <li>
                            <Dropdown.Item
                              onClick={handleSelect}
                              eventKey={filteredName.id}
                            >
                              {filteredName.q}
                            </Dropdown.Item>
                          </li>
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
