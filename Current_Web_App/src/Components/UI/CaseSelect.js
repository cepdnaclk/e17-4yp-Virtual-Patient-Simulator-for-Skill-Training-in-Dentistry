import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import background from "../../Images/DentistryBackgound.jpg";
import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Case.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useNavigate, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import firebase from "../../Config/Config";
import img1 from "../../Images/case1.png";
import img2 from "../../Images/case2.jpg";
import img3 from "../../Images/newBack.jpg";
import Navbar from "../Navbar";
import CaseCard from "./caseSelect/CaseCard";
import { CaseActions } from "../../Actions/Case/CaseActions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "transparent",
        width: "40px",
        height: "40px",
        zIndex: 1000,
        left: "0px",
      }}
      onClick={onClick}
    />
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "transparent",
        width: "40px",
        height: "40px",
        zIndex: 5,
        right: "-5px",
      }}
      onClick={onClick}
    />
  );
}

function CaseSelect() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const { userInfomation } = useSelector((state) => state.user);
  const { allCaseData } = useSelector((state) => state.caseSelected);

  const navigate = useNavigate();
  const [cases, setCase] = useState([]);
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("  button clicked");
    navigate("/historyTaking");
  };
  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 3,
    speed: 500,
    focusOnSelect: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    // Add other settings as needed
  };

  useEffect(() => {
    fetchCase();
  }, []);

  const fetchCase = async () => {
    const snapshot = await firebase.firestore().collection("Cases").get();
    const qArray = snapshot.docs.map((doc) => doc.data());
    console.log(qArray);
    if (cases.length < qArray.length) {
      setCase(qArray);
      dispatch(CaseActions.setAllCases(qArray));
    }

    console.log(cases);
  };
  console.log(userInfomation.name);
  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${img3})`,
        backgroundSize: "cover", // Make sure the background covers the entire component
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat", // Do not repeat the background image
        height: "100vh", // Take up the full height of the viewport
        width: "100vw", // Take up the full width of the viewport
        marginTop: "0px",
        fontSize: "50px",
      }}
    >
      <div className="navText">
        <Navbar />
      </div>

      <div className="cstopic1">Case Selection</div>
      <div className="CScases">
        <Slider {...settings}>
          {cases.map(function (object) {
            return (
              <div className="CScards">
                <CaseCard caseSelectedInUI={object} />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default CaseSelect;
