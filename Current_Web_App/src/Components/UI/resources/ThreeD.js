import React, { Suspense } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function ThreeD() {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "/assets/Build/webgl.loader.js",
    dataUrl: "/assets/Build/webgl.data",
    frameworkUrl: "/assets/Build/webgl.framework.js",
    codeUrl: "/assets/Build/webgl.wasm",
  });

  return (
    <>
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
