import React, { useState, useEffect } from "react";
import firebase from "../../../Config/Config";
import "firebase/compat/functions";

function TextInput() {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [toothNumber, setToothNumber] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  const dropdownStyle = {
    width: "50px",
    fontSize: "24px",
    margin: "40px 30px",
  };

  const inputStyle = {
    width: "600px",
    fontSize: "24px",
    margin: "0px 10px",
    height: "40px", // Smaller height
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleToothNumberChange = (event) => {
    setToothNumber(event.target.value);
  };

  const handleAdd = () => {
    setSelectedItems([
      ...selectedItems,
      `Tooth ${toothNumber}: '${userInput}'`,
    ]);
    setUserInput(""); // Clear the input field
  };

  useEffect(() => {
    console.log(userInput);
    if (userInput) {
      const getSuggestions = firebase
        .functions()
        .httpsCallable("getAutoCompleteSuggestions");

      getSuggestions({ text: userInput })
        .then((result) => {
          // Extract text values from the array of objects
          const suggestionTexts = result.data.map((item) => item.text);
          setSuggestions(suggestionTexts);
        })
        .catch((error) => {
          console.error("Error getting suggestions:", error);
        });
    }
  }, [userInput]);

  return (
    <div>
      <h1 className="chart">Caries Status</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        {/* Render the tooth number dropdown first */}
        <select
          value={toothNumber}
          onChange={handleToothNumberChange}
          style={dropdownStyle}
        >
          {[...Array(20)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        {/* Then render the text input field */}
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          list="suggestions"
          style={inputStyle}
        />
        {/* Finally, render the Add button */}
        <button
          onClick={handleAdd}
          style={{
            backgroundColor: "blue",
            color: "white",
            margin: "10px",
            padding: "3px 6px",
            border: "none",
            borderRadius: "5px",
            fontSize: "20px",
          }}
        >
          Add
        </button>
        {/* Render the list of suggestions */}
        <datalist id="suggestions">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
        {/* Render the selected items */}
      </div>
      <ul style={{ fontSize: "20px", margin: "0px 0px 400px 0px" }}>
        {selectedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default TextInput;
