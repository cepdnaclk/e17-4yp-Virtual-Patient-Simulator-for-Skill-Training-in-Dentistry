import React, { useState, useRef } from "react";
import ThreeD from "../../resources/ThreeD";
import BlackBoxWithButton from "./BlackBoxWithButton";



const CombinedComponent = () => {
  

  const [unityData, setUnityData] = useState(null);
  const sendToUnityRef = useRef(null);
  const [isUnityReady, setIsUnityReady] = useState(false);

  const handleUnityData = (data) => {
    console.log("Data received from Unity:", data);
    setUnityData(data);
  };
  



  const getSendMessageToUnity = (sendMessage) => {
    sendToUnityRef.current = sendMessage;
    setIsUnityReady(true); // This will trigger a re-render
    console.log("getSendMessageToUnity called, function: ", sendMessage);
};
  // Adjust the main container to lay out items horizontally
  const containerStyle = {
    display: "flex",
    flexDirection: "row", // Side-by-side layout
    width: "100%",
    height: "100vh", // Fill the viewport height
    alignItems: "stretch", // Stretch children to fill the height
  };

  // Define the left side container that will hold both instruction and question components
  const leftContainerStyle = {
    display: "flex",
    flexDirection: "column", // Children will be laid out vertically
    width: "30%", // Adjust width as needed
    borderRight: "2px solid black", // Add border to separate from the Unity component
  };

  // Define styles for the instruction box and question box
  const instructionBoxStyle = {
    flexGrow: 1, // Allow it to grow and fill the space
    overflow: "auto", // Add scroll if content is too long
    // Add additional styling here
  };

  const questionBoxStyle = {
    flexGrow: 1, // Allow it to grow and fill the space
    // Add additional styling here
  };

  // Adjust the ThreeD container style
  // Adjust the ThreeD container style
  const threeDContainerStyle = {
    flexGrow: 2, // Unity WebGL will take up the remaining space after the left side
    width: "calc(70% - 20px)", // Subtract the desired margin from the width
    marginRight: "20px", // Add a margin to the right of the Unity component
  };

  return (
    <div style={containerStyle}>
      <div style={leftContainerStyle}>
        <div style={instructionBoxStyle}>
          {/* Place the instruction components here */}
        </div>
        <div style={questionBoxStyle}>
          {/* Here we call the function to render our question */}
 {isUnityReady && <BlackBoxWithButton unityData={unityData} sendToUnity={sendToUnityRef.current} />}

         
          
         
        </div>
      </div>
      <div style={threeDContainerStyle}>
        <ThreeD
          onUnityData={handleUnityData}
          onSendMessageToUnity={getSendMessageToUnity}
        />
      </div>
    </div>
  );
};

export default CombinedComponent;