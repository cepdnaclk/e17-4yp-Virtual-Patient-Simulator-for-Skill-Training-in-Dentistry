import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BlackBoxWithButton from "../Invest/Intra/BlackBoxWithButton";
import './Feed.css'; // Assuming you have a CSS file for styling

const FeedbackEval = () => {
  const [evaluationData, setEvaluationData] = useState({});
  const location = useLocation();
  const { totalScore, CORRECT_ANSWERS, firstAttemptAnswers,CASE1_QUESTIONS } = location.state;
  const shouldRenderBlackBox = location.state?.showBlackBox !== false;

  const handleEvaluationDataChange = (data) => {
    console.log("Data received:", data);
    setEvaluationData(data);
  };

  const formatAnswer = (answer) => {
    if (typeof answer === 'object' && !Array.isArray(answer)) {
      return Object.keys(answer)
        .filter(key => answer[key])
        .join(', ');
    }
    return JSON.stringify(answer);
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
        <h3>Evaluation Data</h3>
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>First Attempt Answer</th>
              <th>Correct Answer</th>
            </tr>
          </thead>
          <tbody>
  {Object.keys(CASE1_QUESTIONS).map((key) => (
    <tr key={key}>
      <td>{CASE1_QUESTIONS[key]}</td>
      <td>{formatAnswer(firstAttemptAnswers?.[key])}</td>
      <td>{formatCorrectAnswer(CORRECT_ANSWERS?.[key])}</td>
    </tr>
  ))}
</tbody>
        </table>
        <div className="total-score">
          <strong>Total Score: {totalScore}</strong>
        </div>
      </div>
    </>
  );
};

export default FeedbackEval;