import React from "react";

const RadioImageQuestion = ({
  question,
  images,
  onImageSelect,
  selectedValue,
}) => {
  return (
    <div>
      <p>{question}</p>
      <div>
        {images.map((image, index) => (
          <label key={index}>
            <input
              type="radio"
              name="diagram"
              value={image.value}
              onChange={() => onImageSelect(image.value)}
              checked={selectedValue === image.value}
            />
            <img src={image.src} alt={`Diagram ${image.value}`} />
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioImageQuestion;
