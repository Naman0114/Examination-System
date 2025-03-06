import React, { useState ,useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Table, Container, Button } from "react-bootstrap";
import '../css/style.css';
import { useDispatch, useSelector } from "react-redux";
import { resultss } from "../Redux/CartSlice";
import axios from "axios";

function Result() {
  const location = useLocation();
  const { resultsData } = location.state || { resultsData: [] };
   const tests = useSelector((state) => state.cart.enrollmentnum); 
   const enroll=tests[0].enrollmentNumber;
   
  const totalQuestions = resultsData.length;
  const Totalmarkss = resultsData.filter(item => item.totalmarks !== undefined);
  const paperTitle = resultsData.filter(item => item.papertitle !== undefined);
  const paperTitle1 = paperTitle.map(item => item.papertitle);
  const paperids = resultsData.filter(item => item.paperID !== undefined);
  const paperids1 = paperids.map(item => item.paperID);
  const totalMarksArray = Totalmarkss.map(item => item.totalmarks);
  const papertitless=paperTitle1[0] ||0;
  const paperidsss=paperids1[0] ||0;
  
  const totalMarks = totalMarksArray[0] || 0; // If no totalmarks available, fallback to 0

  // Calculate correct answers and wrong answers
  const correctAnswers = resultsData.filter((item) => item.yourAnswer === item.correctAnswer).length;
  const wrongAnswers = totalQuestions - correctAnswers;

  // Calculate obtained marks
  const obtainedMarks = correctAnswers * totalMarks;

  // Calculate overall result (percentage)
  const overallResult = `${Math.round((correctAnswers / totalQuestions) * 100)}%`;

  // Calculate the percentage
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  // Grading scale based on percentage
  let grade = "";
  if (percentage >= 90) {
    grade = "A+";
  } else if (percentage >= 80) {
    grade = "A";
  } else if (percentage >= 70) {
    grade = "B+";
  } else if (percentage >= 60) {
    grade = "B";
  } else if (percentage >= 50) {
    grade = "C+";
  } else if (percentage >= 40) {
    grade = "C";
  } else {
    grade = "Fail";
  }
  
  // Dispatching results data to the Redux store
  const dispatch = useDispatch();
  const testData = {
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    overallResult,
    obtainedMarks,
    grade,
    percentage,
  };
  dispatch(resultss(testData));

  // Fetching results from Redux store
  const res = useSelector((state) => state.cart.Result);
  // console.log(res, 'finalres');

  const submitResults = async () => {
    const enrollmentNumber = enroll; // Get this dynamically from your user data
    
    // Make sure the required variables (papertitless, paperidsss, etc.) are properly defined
    const payload = {
      enrollmentNumber,
      papertitless,  // Ensure this variable is defined and valid
      paperidsss,    // Ensure this variable is defined and valid
      totalMarks,    // Ensure this variable is defined and valid
      grade,         // Ensure this variable is defined and valid
      percentage,    // Ensure this variable is defined and valid
    };
  
    // Log the payload to make sure all data is correct before sending
    console.log("Sending request with the following data:", payload);
  
    try {
      // Send the results to the backend API
      const response = await axios.post("http://localhost:3000/api/results", payload);
      
      // Log the response from the server
      console.log("Response:", response.data.message);
  
      // Optionally, reset form fields after submission or handle success state
    } catch (error) {
      console.error("Error submitting results:", error.response ? error.response.data : error.message);
    }
  };
  
  

  return (
    <Container>
      <h1 className="text-center">Quiz Results</h1>
      <Table bordered className="mb-4">
        <tbody>
          <tr>
            <td>Paper Title:</td>
            <td>{papertitless}</td>
          </tr>
          <tr>
            <td>Paper ID:</td>
            <td>{paperidsss}</td>
          </tr>
          <tr>
            <td>Total Questions:</td>
            <td>{totalQuestions}</td>
          </tr>
          <tr>
            <td>Total Marks:</td>
            <td>{totalMarks}</td>
          </tr>
          <tr>
            <td>Right Answers:</td>
            <td>{correctAnswers}</td>
          </tr>
          <tr>
            <td>Wrong Answers:</td>
            <td>{wrongAnswers}</td>
          </tr>
          <tr>
            <td>Obtained Marks:</td>
            <td>{obtainedMarks}</td> {/* Display obtained marks */}
          </tr>
          <tr>
            <td>Overall Result:</td>
            <td>{overallResult}</td>
          </tr>
          <tr>
            <td>Grade:</td>
            <td>{grade}</td> {/* Display grade */}
          </tr>
        </tbody>
      </Table>

      <h2 className="text-center mt-4">Detailed Results</h2>
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
          {resultsData.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result.question}</td>
              <td>{result.yourAnswer}</td>
              <td>{result.correctAnswer}</td>
              <td>
                {result.yourAnswer === result.correctAnswer ? (
                  <span className="text-success">Correct</span>
                ) : (
                  <span className="text-danger">Wrong</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={submitResults}>Submit Results</Button>
    </Container>
  );
}

export default Result;
