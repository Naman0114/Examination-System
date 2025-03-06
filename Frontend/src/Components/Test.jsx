// import React from 'react'
import React, { useState } from "react";

function Test() {
  const slidesData = [
    {
      title: "1",
      content: "Choose your favorite Web language:",
      option1: "Html",
      option2: "CSS",
      option3: "Javascripts",
      option4: "Javascripts",
    },
    {
      title: "2",
      content: "Choose your favorite Web Player:",
      option1: "Virat",
      option2: "Rohit",
      option3: "CR7",
      option4: "CR7",
    },
    {
      title: "3",
      content: "Choose your favorite Web Game:",
      option1: "Cricket",
      option2: "Badminton",
      option3: "Chess",
      option4: "Chess",
    },
    {
      title: "4",
      content: "Choose your favorite city:",
      option1: "Mumbai",
      option2: "Banglore",
      option3: "Delhi",
      option4: "Delhi",
    },
    {
      title: "5",
      content: "Choose your favorite country:",
      option1: "Mumbai",
      option2: "Banglore",
      option3: "zafar",
      option4: "zafar",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Navigate to the previous slide
  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slidesData.length - 1));
  };

  // Navigate to the next slide
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  // Log the selected option for the current slide
  const logCurrentSelection = () => {
    const selectedOption = document.querySelector(
      `input[name="slide${currentSlide}"]:checked`
    );
    console.log(
      `Slide ${slidesData[currentSlide].title}: ${
        selectedOption ? selectedOption.value : "No selection"
      }`
    );
  };
  return (
    <div>
        <h6>{slidesData[currentSlide].content}</h6>
      <div>
      
        <input
          type="radio"
          id={`option1_${currentSlide}`}
          name={`slide${currentSlide}`}
          value={slidesData[currentSlide].option1}
        />
        <label htmlFor={`option1_${currentSlide}`}>
          {slidesData[currentSlide].option1}
        </label>

        <input
          type="radio"
          id={`option2_${currentSlide}`}
          name={`slide${currentSlide}`}
          value={slidesData[currentSlide].option2}
        />
        <label htmlFor={`option2_${currentSlide}`}>
          {slidesData[currentSlide].option2}
        </label>

        <input
          type="radio"
          id={`option3_${currentSlide}`}
          name={`slide${currentSlide}`}
          value={slidesData[currentSlide].option3}
        />
        <label htmlFor={`option3_${currentSlide}`}>
          {slidesData[currentSlide].option3}
        </label>

        <input
          type="radio"
          id={`option4_${currentSlide}`}
          name={`slide${currentSlide}`}
          value={slidesData[currentSlide].option4}
        />
        <label htmlFor={`option4_${currentSlide}`}>
          {slidesData[currentSlide].option4}
        </label>
      </div>

      <div className="slide-navigation">
        <button onClick={goToPreviousSlide} className="nav-button">
          Previous
        </button>
        <button onClick={goToNextSlide} className="nav-button">
          Next
        </button>
        <button onClick={logCurrentSelection} className="nav-button">
          Log Selection
        </button>
      </div>
    </div>
  )
}

export default Test