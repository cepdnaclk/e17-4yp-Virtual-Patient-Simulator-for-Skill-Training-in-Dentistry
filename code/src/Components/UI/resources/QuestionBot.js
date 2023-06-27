import React, { useState, useEffect } from "react";
import firebase from "../../../Config/Config";
import "firebase/compat/functions";

const SECTIONS = [
  "Habits",
  "Plaque_Control",
  "Medical_History",
  "Previous dental treatments",
  "Social history",
  "Dietary history",
  "History of the presenting complaint",
];

function PatientHistoryTasking() {
  const [selectedSection, setSelectedSection] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [typing, setTyping] = useState(false);

  const dropdownStyle = {
    width: "200px",
    height: "30px",
    fontSize: "16px",
    margin: "50px 0px 50px 80px",
  };

  const answerStyle = {
    color: "black",
    fontSize: "18px",
    margin: "5px 0px 5px 50px",
    fontWeight: "bold",
  };
  const questionStyle = {
    color: "brown",
    fontSize: "18px",
    margin: "5px 0px 5px 50px",
    fontWeight: "bold",
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
    setSelectedQuestion("");
  };

  const handleQuestionChange = (event) => {
    setSelectedQuestion(event.target.value);
  };

  useEffect(() => {
    if (selectedSection) {
      const getSectionQuestions = firebase
        .functions()
        .httpsCallable("getSectionQuestions");

      getSectionQuestions({ section: selectedSection })
        .then((result) => {
          setQuestions(result.data);
          setError(null);
        })
        .catch((error) => {
          console.error("Error getting questions:", error);
          setError("Error getting questions");
        });
    }
  }, [selectedSection]);

  useEffect(() => {
    if (selectedQuestion) {
      setLoading(true);
      const getReply = firebase.functions().httpsCallable("getReply");

      getReply({ question: selectedQuestion })
        .then((result) => {
          const newMessage = {
            question: selectedQuestion,
            answer: String(result.data),
            typingAnswer: "",
          };
          setConversation((prev) => [...prev, newMessage]);
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          console.error("Error getting reply:", error);
          setLoading(false);
          setError("Error getting reply");
        });
    }
  }, [selectedQuestion]);

  useEffect(() => {
    if (
      conversation.length > 0 &&
      conversation[conversation.length - 1].answer !==
        conversation[conversation.length - 1].typingAnswer
    ) {
      setTyping(true);
      const timer = setTimeout(() => {
        setConversation((prev) => {
          const updatedConversation = [...prev];
          const lastMessage =
            updatedConversation[updatedConversation.length - 1];
          lastMessage.typingAnswer +=
            lastMessage.answer[lastMessage.typingAnswer.length];
          return updatedConversation;
        });
        setTyping(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [conversation]);

  return (
    <div>
      <select
        style={dropdownStyle}
        value={selectedSection}
        onChange={handleSectionChange}
      >
        <option value="" disabled selected>
          Select the section
        </option>
        {SECTIONS.map((section, index) => (
          <option key={index} value={section}>
            {section}
          </option>
        ))}
      </select>

      <select
        style={dropdownStyle}
        value={selectedQuestion}
        onChange={handleQuestionChange}
      >
        <option value="" disabled selected>
          Select the question
        </option>
        {questions.map((question, index) => (
          <option key={index} value={question}>
            {question}
          </option>
        ))}
      </select>

      <div style={answerStyle}>
        {conversation.map((msg, index) => (
          <div key={index}>
            <p style={answerStyle}>You: {msg.question}</p>
            <p style={questionStyle}>Patient: {msg.typingAnswer}</p>
          </div>
        ))}
        {loading ? <p style={answerStyle}>Loading...</p> : null}
        {error ? <p>{error}</p> : null}
        {typing && <p style={answerStyle}>...</p>}
      </div>
    </div>
  );
}

export default PatientHistoryTasking;
