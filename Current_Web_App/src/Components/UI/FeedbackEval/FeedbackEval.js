import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BlackBoxWithButton from "../Invest/Intra/BlackBoxWithButton";
import './Feed.css'; // Assuming you have a CSS file for styling
import Painfulteeth from "../Invest/Intra/images/Painfulteeth.jpeg";

const FeedbackEval = () => {
  const [evaluationData, setEvaluationData] = useState({});
  const location = useLocation();
  const {finalScore, CORRECT_ANSWERS, firstAttemptAnswers,CASE1_QUESTIONS } = location.state;
  const shouldRenderBlackBox = location.state?.showBlackBox !== false;

  const handleEvaluationDataChange = (data) => {
    console.log("Data received:", data);
    setEvaluationData(data);
  };

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

  return (
    <>
      {shouldRenderBlackBox && (
        <BlackBoxWithButton onEvaluationDataChange={handleEvaluationDataChange} />
      )}
      <div className="feedback-container">
        <h3>Feedback</h3>
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
        <div className="total-score">
          <strong>Total Score: {finalScore}</strong>
        </div>
        <div className="dental-chart">
          <h3>Correct Dental Chart for Case 1</h3>
          <img src={Painfulteeth} alt="Correct Dental Chart" />
        </div>
      </div>
    </>
  );
};

export default FeedbackEval;