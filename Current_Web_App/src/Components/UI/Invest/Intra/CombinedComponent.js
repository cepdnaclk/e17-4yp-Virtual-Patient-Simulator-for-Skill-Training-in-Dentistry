import React, { useState } from "react";
import ThreeD from "../../resources/ThreeD";
import BlackBoxWithButton from "./BlackBoxWithButton";

const CombinedComponent = () => {
  const [unityData, setUnityData] = useState(null);
  let sendToUnity;

  const handleUnityData = (data) => {
    console.log("Data received from Unity:", data);
    setUnityData(data);
  };

  const getSendMessageToUnity = (sendMessage) => {
    sendToUnity = sendMessage;
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "flex-start", // Align to the start of the container
    width: "100%",
    height: "1000px",
  };

  const blackBoxContainerStyle = {
    flex: 0.4, // Smaller flex value to make the component smaller
    marginRight: "30px", // Increase margin if you want to push it furthe33r to the left
    height: "500px",
    minWidth: "300px", // Ensure it doesn't get too small
  };

  const threeDContainerStyle = {
    flex: 3.5, // Increase the flex value here to fill the remaining space
    height: "800px",
  };

  return (
    <div style={containerStyle}>
      <div style={blackBoxContainerStyle}>
        <BlackBoxWithButton unityData={unityData} sendToUnity={sendToUnity} />
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
