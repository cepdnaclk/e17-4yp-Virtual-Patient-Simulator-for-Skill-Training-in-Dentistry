import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";

function DrawingCanvas({ expectedColor, expectedArea }) {
  const [drawingData, setDrawingData] = useState([]);
  const [currentColor, setCurrentColor] = useState("black");
  const stageRef = useRef(null);

  const checkDrawing = () => {
    let correctlyColoredArea = 0;

    drawingData.forEach(({ color, area }) => {
      if (color === expectedColor) {
        correctlyColoredArea += area;
      }
    });

    if (correctlyColoredArea >= expectedArea) {
      console.log("Area marked correctly");
    } else {
      console.log("Area not marked correctly");
    }
  };

  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    setDrawingData((prevData) => [
      ...prevData,
      { x: pos.x, y: pos.y, color: currentColor, area: 0 },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!e.evt.buttons) return;

    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    setDrawingData((prevData) => {
      const lastData = prevData[prevData.length - 1];
      const area = Math.sqrt(
        Math.pow(lastData.x - pos.x, 2) + Math.pow(lastData.y - pos.y, 2)
      );
      return [
        ...prevData.slice(0, -1),
        { ...lastData, x: pos.x, y: pos.y, area: lastData.area + area },
      ];
    });
  };

  const handleMouseUp = () => {
    checkDrawing();
  };

  useEffect(() => {
    if (stageRef.current) {
      const stage = stageRef.current;
      stage.on("mousedown", handleMouseDown);
      stage.on("mousemove", handleMouseMove);
      stage.on("mouseup", handleMouseUp);
    }
    return () => {
      if (stageRef.current) {
        const stage = stageRef.current;
        stage.off("mousedown", handleMouseDown);
        stage.off("mousemove", handleMouseMove);
        stage.off("mouseup", handleMouseUp);
      }
    };
  }, [stageRef, drawingData]);

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        Select Color:
        <input
          type="color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
        />
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
      >
        <Layer>
          {drawingData.map((data, idx) => (
            <Rect
              key={idx}
              x={data.x}
              y={data.y}
              width={5}
              height={5}
              fill={data.color}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default DrawingCanvas;
