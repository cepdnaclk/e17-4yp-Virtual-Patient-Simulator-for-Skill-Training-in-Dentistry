import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import BlackBoxWithButton from "../Invest/Intra/BlackBoxWithButton";
import './Feed.css'; // Assuming you have a CSS file for styling
import Painfulteeth from "../Invest/Intra/images/Painfulteeth.jpeg";
import correctDentalChart from "../Invest/Intra/images/CorrectDentalChart.png";
const FeedbackEval = () => {
 
  const location = useLocation();
  const navigate = useNavigate();
  const {totalScore, CORRECT_ANSWERS, firstAttemptAnswers,CASE1_QUESTIONS,totalMarks } = location.state;
  const shouldRenderBlackBox = location.state?.showBlackBox !== false;

 

  const formatAnswer = (answer) => {
    // Check if the answer is an object and not an array
    if (typeof answer === 'object' && !Array.isArray(answer)) {
      // Join selected keys (for multi-select answers)
      return Object.keys(answer)
        .filter(key => answer[key])
        .join(', ');
    }
    // Handle single-choice answers as plain text
    return typeof answer === 'string' ? answer : JSON.stringify(answer);
  };
  

  const formatCorrectAnswer = (answer) => {
    if (Array.isArray(answer)) {
      return answer.join('\n');
    }
    return answer;
  };
  const goToHome = () => {
    navigate('/caseSelect'); // Navigate to home page
  };
  const scaledScore = Math.round(totalScore+totalMarks * (100 / 108));
  return (
    <>
      {shouldRenderBlackBox && (
        <BlackBoxWithButton/>
      )}
      <div className="feedback-container">
      <h2 className="feedback-heading">Feedback</h2>

         {/* Case Details Section */}
         <div className="case-details">
          <h4>Case Details</h4>
          <p><strong>Case Id:</strong> C001</p>
          <p><strong>Case Description:</strong> A 38-year-old patient presents with a painful tooth on the right side upper arch.</p>
          {/* <p><strong>Your Spent Time:</strong> 0:1:19hrs</p> */}
        </div>

        <table className="feedback-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>First Attempt Answer</th>
              <th>Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(CASE1_QUESTIONS).map((key, index) => (
              <tr key={key}>
                <td>{`Q${index + 1}: ${CASE1_QUESTIONS[key]}`}</td>
                <td>{formatAnswer(firstAttemptAnswers?.[key])}</td>
                <td>{formatCorrectAnswer(CORRECT_ANSWERS?.[key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
          <div>
          <h3>Correct Dental Chart for Case 1</h3>
          <img src={correctDentalChart} alt="Correct Dental Chart" />
          </div>
          <div>
          <h3>Correct Marking of the Tooth 25</h3>
          <img src={Painfulteeth} alt="Correct Marking of the Tooth 25" />
          </div>
          <div >
          <strong>Your Score for History Taking: {totalMarks}</strong>
          </div>
          <div className="total-score">
          <strong>Your Total Score: {scaledScore}</strong>
          </div>
         
          <button onClick={goToHome} className="go-home-button">Go Back to Home</button> {/* Add this button */}
      </div>
    </>
  );
};

export default FeedbackEval;