import React, { Suspense } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import BlackBoxWithButton from "../Invest/Intra/BlackBoxWithButton";

function ThreeD({ onUnityData, onSendMessageToUnity }) {
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

  // Define sendMessageToUnity inside ThreeD where unityProvider is available
  const sendMessageToUnity = (message) => {
    if (unityProvider && unityProvider.current) {
      unityProvider.current.sendMessage(
        "UnityMessageReceiver",
        "ReceiveMessageFromReact",
        message
      );
    }
  };

  // Pass the sendMessageToUnity function to the parent component
  onSendMessageToUnity(sendMessageToUnity);

  return (
    <>
      {/* <BlackBoxWithButton
        onUnityData={onUnityData}
        sendToUnity={sendMessageToUnity}
      /> */}
      {!isLoaded && (
        <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
      )}
      <Unity
        unityProvider={unityProvider}
        style={{
          visibility: isLoaded ? "visible" : "hidden",
          width: "100%", // changed from fixed 1000px to be responsive
          height: "100vh",
        }}
      />
    </>
  );
}

export default ThreeD;
