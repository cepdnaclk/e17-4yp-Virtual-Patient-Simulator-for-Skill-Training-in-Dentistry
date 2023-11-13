import React , { useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function ThreeD({ onUnityData, onSendMessageToUnity,}) {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "/assets/Build/webgl.loader.js",
    dataUrl: "/assets/Build/webgl.data",
    frameworkUrl: "/assets/Build/webgl.framework.js",
    codeUrl: "/assets/Build/webgl.wasm",
  });

  // Function to be called from Unity
  window.handleUnityData = (data) => {
    onUnityData(data);
  };

  // Define sendMessageToUnity using useCallback
  const sendMessageToUnity = useCallback((message) => {
    if (unityProvider && unityProvider.current) {
      unityProvider.current.sendMessage(
        "MessageHandler", // Updated GameObject name
        "TriggerToolSceneToggle", // Updated method name
        message
      );
    }
  }, [unityProvider]);
  // Pass the sendMessageToUnity function to the parent component
  React.useEffect(() => {
    console.log(isLoaded);
    if (isLoaded) {
      onSendMessageToUnity(sendMessageToUnity);
    }
  }, [isLoaded, onSendMessageToUnity, sendMessageToUnity]);

  const blackBoxContainerStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%", // Take the full width of the container
    flex: 1, // Use flexbox to divide space with the 3D component
    alignItems: "center", // Center the content
    justifyContent: "center", // Center the content vertically
  };

  const threeDContainerStyle = {
    width: "100%", // Take the full width of the container
    flex: 3, // Larger flex value to give more space to the 3D view
  };

  // Adjust the Unity component style to be responsive within its container
  const unityStyle = {
    width: "100%", // Take the full width of the container
    height: "100%", // Set to full height of the flex container
  };

  // Update the Unity component return statement to use the new style
  return (
    <>
      {!isLoaded && (
        <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
      )}
      <Unity
        unityProvider={unityProvider}
        style={unityStyle} // Updated style
      />
    </>
  );
}

export default ThreeD;
