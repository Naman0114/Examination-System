// import React, { useState } from 'react'
import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TRYCODE() {
  const slidesData = [
  { title: "1", content: "Choose your favorite Web language:", option1: "Html", option2: "CSS", option3: "JavaScript", option4: "React Js" },
  { title: "2", content: "Choose your favorite Player:", option1: "MOHD", option2: "ZAFAR", option3: "AHMAD", option4: "ANSARI" },
  { title: "3", content: "Choose your favorite Game:", option1: "Cricket", option2: "Badminton", option3: "Chess", option4: "Free Fire" },
  { title: "4", content: "Choose your favorite City:", option1: "Mumbai", option2: "Bangalore", option3: "Noida", option4: "Delhi" },
  { title: "5", content: "Choose your favorite Country:", option1: "India", option2: "USA", option3: "New York", option4: "California" },
];


const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Object to store selected answers

  // Update selected answer for the current slide
  const handleChange = (e) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentSlide]: e.target.value, // Store answer for the current slide
    });
  };

  // Navigate to the previous slide
  const goToPreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // Navigate to the next slide
  const goToNextSlide = () => {
    if (currentSlide < slidesData.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const [showTable, setShowTable] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const handleClose = () => {
    setShowTable(false);
  };

  const handleShowResult = () => {
    setShowResult((prevShowResult) => !prevShowResult);
  };

  const data = {
    totalQuestions: 10,
    rightAnswers: 7,
    wrongAnswers: 3,
    overallResult: "70%",
  };

  const questions = [
    { question: "Hello", yourAnswer: "wold", correctAnswer: "world" },
    { question: "Who are you?", yourAnswer: "me", correctAnswer: "you" },
    { question: "What are you doing?", yourAnswer: "home", correctAnswer: "working" },
    { question: "Where are you from?", yourAnswer: "india", correctAnswer: "India" },
  ];
  
  return (
    <div>
<Container className="mt-5">
      <div className="position-relative">
        <Button
          variant="danger"
          className="position-absolute top-0 end-0"
          onClick={handleClose}
        >
          X
        </Button>
        {showTable && (
          <div>
            <h1 className="text-center mb-4">Quiz Results</h1>
            <Table bordered className="mb-4">
              <tbody>
                <tr>
                  <td className="text-primary">Total Questions:</td>
                  <td>{data.totalQuestions}</td>
                </tr>
                <tr>
                  <td className="text-success">Right Answers:</td>
                  <td>{data.rightAnswers}</td>
                </tr>
                <tr>
                  <td className="text-danger">Wrong Answers:</td>
                  <td>{data.wrongAnswers}</td>
                </tr>
                <tr>
                  <td className="text-warning">Overall Result:</td>
                  <td>{data.overallResult}</td>
                </tr>
              </tbody>
            </Table>
            <Button variant="primary" onClick={handleShowResult}>
              {showResult ? "Hide Details" : "View Detailed Results"}
            </Button>
          </div>
        )}

        {showResult && (
          <div className="mt-4">
            <h2 className="text-center mb-4">Detailed Results</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Your Answer</th>
                  <th>Correct Answer</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{q.question}</td>
                    <td>{q.yourAnswer}</td>
                    <td>{q.correctAnswer}</td>
                    <td>
                      {q.yourAnswer === q.correctAnswer ? (
                        <span className="text-success">Correct</span>
                      ) : (
                        <span className="text-danger">Wrong</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </Container>
    </div>
  )
}

export default TRYCODE