import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3context } from "../contexts/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";
function Addtest() {

  const { updateWeb3State } = useWeb3context();
  const url = process.env.REACT_APP_API_BASE_URL;
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.cart.tests);
  // console.log(tests);

  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [testTitle, setTestTitle] = useState('');
  const [course, setCourse] = useState('');
  const [courseUnit, setCourseUnit] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [paperId, setpaperId] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState({
    paperID: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });
  console.log(currentQuestion.paperID, 'paperid');

  // Prevent scroll on number inputs
  const preventScroll = (e) => {
    if (e.target.type === 'number') {
      e.preventDefault(); // Prevent the scroll action only for number inputs
      e.stopPropagation();
    }
  };
  useEffect(() => {
    console.log(paperId, 'paperid');

    setCurrentQuestion((prev) => ({ ...prev, paperID: paperId }));
    console.log(currentQuestion.paperID + "asdfasdf")

  }, [paperId]);

  // Input handlers
  const handleTestTitleChange = (e) => setTestTitle(e.target.value);
  const handlepaperID = (e) => {
    setpaperId(e.target.value);

  }
  const handleCourseChange = (e) => setCourse(e.target.value);
  const handleCourseUnitChange = (e) => setCourseUnit(e.target.value);
  const handleTimeLimitChange = (e) => setTimeLimit(e.target.value);
  const handleTotalMarksChange = (e) => setTotalMarks(e.target.value);

  const handleTotalQuestions = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 10) {
      setTotalQuestions(value);
    } else {
      alert('Please enter a number between 1 and 10');
    }
  };

  const handleQuestionChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, question: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const handleCorrectAnswerChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value });
  };

  const handleNext = () => {
    if (
      !currentQuestion.question.trim() ||
      currentQuestion.options.some((opt) => !opt.trim()) ||
      !currentQuestion.correctAnswer.trim()
    ) {
      alert('Please fill all fields before proceeding.');
      return;
    }

    setQuestions([...questions, currentQuestion]);  // Add the current question to the questions array
    setCurrentQuestion({ question: '', options: ['', '', '', ''], correctAnswer: '', paperID: paperId });

    if (questions.length + 1 === totalQuestions) {
      setStep(3);  // Proceed to the review step
    }
  };


  const handleSubmit = async () => {
    // Ensure all questions are collected in the format the backend expects
    const testData = {
      title: testTitle, // Title of the test
      noofques: totalQuestions, // Total number of questions
      paperID: paperId,
      course: course, // Course name
      timelimit: timeLimit, // Time limit for the test
      Totalmarks: totalMarks, // Total marks for the test
      questions: questions, // All questions in the current state
    };

    console.log('Test Data Submitted:', testData);

    try {
      // Send the data to the backend using axios
      const response = await axios.post(`${url}/api/ques`, testData);
      console.log('Backend Response:', response.data);

      alert('Test submitted successfully! Check the console for details.');
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('Failed to submit test. Please try again.');
    }

    // Reset form state after submitting
    setStep(1);
    setTestTitle('');
    setCourse('');
    setTimeLimit('');
    setTotalMarks('');
    setTotalQuestions(0);
    setQuestions([]);

    // calling to metamask interaction 
    const { contractInstance, selectedAccount } = await connectWallet();
    updateWeb3State({ contractInstance, selectedAccount });


    const res = await axios.post(url + "/api/uploadFile");
    console.log(res.data);

    const result = await axios.post(url + "/api/uploadPaper", { testData });
    console.log(result.data.ipfsHash);
    console.log(testData.title);

    await storeEncryptedIPFSHash(testData.title, result.data.ipfsHash);

  }
  const storeEncryptedIPFSHash = async (title, encryptedHash) => {

    const { contractInstance, selectedAccount } = await connectWallet();
    updateWeb3State({ contractInstance, selectedAccount });

    const tx = await contractInstance.storePaper(title, encryptedHash);

    const receipt = await tx.wait();
    console.log(receipt);
  }


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }} className="addtestes">
      {step === 1 && (
        <div>
          <h2>Add Test Details</h2>
          <input
            type="text"
            value={testTitle}
            onChange={handleTestTitleChange}
            placeholder="Enter Title of Test"
          />
          <input
            type="number"
            min="1"
            max="10"

            value={totalQuestions || ''}
            onChange={handleTotalQuestions}
            onWheel={preventScroll} // Prevent scroll on number input
            placeholder="Enter the number of Questions (1-10)"
          />
          <input
            type="number"
            value={paperId}
            onChange={handlepaperID}
            placeholder="Enter the Paper ID"
          />
          <select className="form-select mt-2" value={course} onChange={handleCourseChange}>
            <option value="" disabled>
              --- Course ---
            </option>
            <option value="BTECH">B-TECH</option>
            <option value="BCA">B.CA</option>
            <option value="MCA">M.CA</option>
            <option value="MTECH">M-TECH</option>
          </select>

          <input
            type="number"
            value={timeLimit}
            onChange={handleTimeLimitChange}
            onWheel={preventScroll} // Prevent scroll on number input
            placeholder="Enter Time Limit (minutes)"
          />
          <input
            type="number"
            value={totalMarks}
            onChange={handleTotalMarksChange}
            onWheel={preventScroll} // Prevent scroll on number input
            placeholder="Enter Total Marks"
          />
          <button onClick={() => totalQuestions > 0 && setStep(2)}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Question {questions.length + 1}</h2>
          <div>
            <label>Question:</label>
            <input
              type="text"
              value={currentQuestion.question}
              onChange={handleQuestionChange}
              placeholder="Enter your question"
            />
            <hr />
          </div>
          <div>
            {currentQuestion.options.map((option, index) => (
              <div key={index}>
                <label>Option {index + 1}:</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Enter option ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <hr />
          <div>
            <label>Correct Answer:</label>
            <input
              type="text"
              value={currentQuestion.correctAnswer}
              onChange={handleCorrectAnswerChange}
              placeholder="Enter the correct answer"
            />
          </div>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Review and Submit</h2>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default Addtest;
