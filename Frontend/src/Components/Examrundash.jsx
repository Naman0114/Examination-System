import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import '../css/Examrundash.css';

function Examrundash( props ) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesData, setSlidesData] = useState([]);
  const [storequestion, setStorequestion] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0); // Initialize timeLeft state
  const navigate = useNavigate();
  const location = useLocation();
  const { paperID, timeer,totalmark,papertitle } = location.state || {}; // Get paperID and timer from location state
  const num = paperID - 1;
  const url = process.env.REACT_APP_API_BASE_URL;

  
  // Fetch questions for the given paperID
  const fetchquestion = async () => {
    try {
      const response = await axios.get(`${url}/api/studentgiveexamrun/${paperID}`);
      const questions = response.data.questionfind;
      setStorequestion(questions);

      // Set timer based on paper's time limit (first question in the paper, assuming all have the same time limit)
      if (questions.length > 0) {
        const timeLimit = timeer || questions[0].timelimit; // Use 'timeer' from location state if available
        setTimeLeft(timeLimit * 60); // Convert minutes to seconds
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Fetch questions when the component mounts or paperID changes
  useEffect(() => {
    fetchquestion();
  }, [paperID]);

  // Format questions into slidesData for display
  useEffect(() => {
    if (storequestion.length > 0) {
      const formattedSlides = storequestion.map((question, index) => ({
        title: (index + 1).toString(),
        content: question.questionText,
        options: question.options,
        correctAnswer: question.correctAnswer,
      }));
      setSlidesData(formattedSlides);
    }
  }, [storequestion]);

  // Handle the answer selection
  const handleChange = (event) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentSlide]: event.target.value,
    });
  };

  // Go to the previous slide
  const goToPreviousSlide = () => {
    if (currentSlide > 0) setCurrentSlide((prev) => prev - 1);
  };

  // Go to the next slide
  const goToNextSlide = () => {
    if (currentSlide < slidesData.length - 1) setCurrentSlide((prev) => prev + 1);
  };

  // Submit the exam and navigate to the results
  const submitExam = () => {
    const resultsData = slidesData.map((slide, index) => ({
      papertitle:papertitle,
      paperID:paperID,
      totalmarks:totalmark,
      question: slide.content,
      correctAnswer: slide.correctAnswer,
      yourAnswer: selectedAnswers[index] || "Not Answered",
    }));
    navigate("/Result", { state: { resultsData } });
  };

  // Effect to update the countdown every second
  useEffect(() => {
    if (timeLeft <= 0) return; // Stop the countdown when it reaches 0 or less

    const timer = setInterval(() => {
      setTimeLeft(prevTime => Math.max(prevTime - 1, 0)); // Ensure timeLeft doesn't go below 0
    }, 1000); // Update every second

    // Cleanup function to clear the interval when the component unmounts or timeLeft reaches 0
    return () => clearInterval(timer);
  }, [timeLeft]); // Re-run effect when timeLeft changes

  // Ensure we have valid timeLeft before calculating minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <div className="dashboard">
        <Container>
          <Row>
            <Col sm={9}>
              <h1>Exam Running</h1>
              <p>Your Ultimate Destination For Online Assessment</p>
            </Col>
            <Col sm>
              <h1>Start Exam</h1>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="slide-container mt-5">
        <div>
          <div className="timerss">
            <div>
              <h5 className="question-title">Question {currentSlide + 1}/{slidesData.length}</h5>
            </div>
            <div>
              <h6 className="timer"> Time Left:
                {timeLeft <= 0 ? "Time's up!" : `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
              </h6>
            </div>
          </div>
          <hr />
          <h6 className="question-text">{slidesData[currentSlide]?.content}</h6>
          {/* Render options */}
          {slidesData[currentSlide]?.options?.map((option, idx) => (
            <div key={idx} className="option-container">
              <input
                type="radio"
                name={`question-${currentSlide}`}
                value={option}
                onChange={handleChange}
                checked={selectedAnswers[currentSlide] === option}
                id={`option-${currentSlide}-${idx}`}
              />
              <label htmlFor={`option-${currentSlide}-${idx}`} className="option-label">
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="navigation-buttons">
          <button
            className="nav-btn prev-btn"
            onClick={goToPreviousSlide}
            disabled={currentSlide === 0}
          >
            Previous
          </button>
          <button
            className="nav-btn next-btn"
            onClick={currentSlide === slidesData.length - 1 ? submitExam : goToNextSlide}
          >
            {currentSlide === slidesData.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Examrundash;
