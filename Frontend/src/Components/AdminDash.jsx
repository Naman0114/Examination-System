import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { enable_disabled } from '../Redux/CartSlice';

function AdminDash() {
  const [isEnabled, setIsEnabled] = useState(true); // Initial state: Enabled
  const [examCount, setExamCount] = useState(0); // State to store exam count
  const [examCount1, setExamCount1] = useState(0); // State to store exam count
  const [papers, setPapers] = useState([]); // State to store papers data
  const tests = useSelector((state) => state.cart.tests); // Get tests from Redux store
  const dispatch = useDispatch(); // Get dispatch function

  useEffect(() => {
    const fetchExamCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/exam-count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExamCount(data.examcount);
      } catch (error) {
        console.error('Error fetching exam count:', error);
      }
    };

    fetchExamCount();
  }, []);

  useEffect(() => {
    const fetchExamCount1 = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/test-count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExamCount1(data.examcount1);
      } catch (error) {
        console.error('Error fetching exam count:', error);
      }
    };

    fetchExamCount1();
  }, []);

  useEffect(() => {
    const fetchPaperDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/Admintable');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPapers(data.papers); // Store all paper details in state
        console.log('Fetched Paper Details:', data.papers);
      } catch (error) {
        console.error('Error fetching paper details:', error);
      }
    };

    fetchPaperDetails();
  }, []);

  const handleClick = (test) => {
    setIsEnabled(!isEnabled);

    if (isEnabled) {
      // dispatch(enable_disabled(test)); // Save the test data in the enabled/disabled list
    }
  };

  return (
    <div className="dark">
      <div className="p-3">
        <h5 className="text-start">Welcome back, Admin</h5>
        <p className="text-start">From here you can manage your tests</p>
      </div>
      <Container>
        <Row>
          <Col sm>
            <div className="total_s mt-3">
              <h6>{papers.length}</h6>
              <p>Total Tests</p>
            </div>
          </Col>
          <Col sm>
            <div className="total_s bg-success mt-3">
              <h6>{examCount}</h6> {/* Display exam count here */}
              <p>Total Students</p>
            </div>
          </Col>
          <Col sm>
            <div className="total_s bg-danger mt-3">
              <h6>{examCount1}</h6> {/* Display running exams count here */}
              <p>Total Running Exams</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="p-5">
        <div className="tested p-4">
          <h6 className="text-start">Tests</h6>
          <p className="text-start">Running and Continuing</p>
          <Table hover responsive="lg">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Name</th>
                <th>Course Name</th>
                <th>Total Ques</th>
                <th>Total Marks</th>
                <th>Time limit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper, index) => (
                <tr key={paper._id}>
                  <td>{index + 1}</td> {/* Serial number */}
                  <td>{paper.title}</td> {/* Test Title */}
                  <td>{paper.course}</td> {/* Course Name */}
                  <td>{paper.noofques}</td> {/* Total Questions */}
                  <td>{paper.Totalmarks}</td> {/* Total Marks */}
                  <td>{paper.timelimit} min</td> {/* Time Limit */}
                  <td>
                    <button
                      onClick={() => handleClick(paper)} // Pass paper data to handleClick
                      style={{
                        backgroundColor: isEnabled ? 'blue' : 'red',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      {isEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default AdminDash;
