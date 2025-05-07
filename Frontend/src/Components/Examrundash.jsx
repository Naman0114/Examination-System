import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/Examrundash.css';

function Examrundash(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesData, setSlidesData] = useState([]);
  const [storequestion, setStorequestion] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerInitialized, setTimerInitialized] = useState(false); // NEW
  const navigate = useNavigate();
  const location = useLocation();
  const { paperID, timeer, totalmark, papertitle } = location.state || {};
  const url = process.env.REACT_APP_API_BASE_URL;

  const fetchquestion = async () => {
    try {
      const response = await axios.get(`${url}/api/studentgiveexamrun/${paperID}`);
      const questions = response.data.questionfind;
      setStorequestion(questions);

      if (questions.length > 0) {
        const timeLimit = timeer || questions[0].timelimit;
        setTimeLeft(timeLimit * 60); // seconds
        setTimerInitialized(true);   // ✅ mark timer as initialized
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchquestion();
  }, [paperID]);

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

  // ✅ Timer effect
  useEffect(() => {
    if (!timerInitialized || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleTimeout();  // ✅ trigger timeout handling
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerInitialized, timeLeft]);

  // ✅ Timeout logic
  const handleTimeout = () => {
    alert("Time's up! Redirecting to the homepage.");
    navigate("/userloginsucc", { replace: true });
  };

  const handleChange = (event) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentSlide]: event.target.value,
    });
  };

  const goToPreviousSlide = () => {
    if (currentSlide > 0) setCurrentSlide((prev) => prev - 1);
  };

  const goToNextSlide = () => {
    if (currentSlide < slidesData.length - 1) setCurrentSlide((prev) => prev + 1);
  };

  const submitExam = () => {
    const resultsData = slidesData.map((slide, index) => ({
      papertitle,
      paperID,
      totalmarks: totalmark,
      question: slide.content,
      correctAnswer: slide.correctAnswer,
      yourAnswer: selectedAnswers[index] || "Not Answered",
    }));
    navigate("/Result", { state: { resultsData } });
  };

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
