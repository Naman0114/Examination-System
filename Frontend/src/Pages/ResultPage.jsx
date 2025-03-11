import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Container, Row, Col, Card } from 'react-bootstrap';

const ResultPage = () => {
  const [studentData, setStudentData] = useState([]);
  const tests = useSelector((state) => state.cart.enrollmentnum); 
  const enroll=tests[0].enrollmentNumber;
  const url='https://onine-exam.onrender.com';

  // Fetch data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/allresults`);
        const filteredData = response.data.filter(student => student.enrollmentNumber == enroll);
        console.log(filteredData,'filter');
        
        setStudentData(filteredData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [enroll]); // Runs when enrollmentNumber changesnts

  return (
    <div className="result-page">
      <Container>
        <Row className="justify-content-center my-4">
          <Col xs={12} md={8}>
            <Card className="shadow-lg">
              <Card.Body>
                <h1 className="page-title text-center text-primary mb-4">Student Result</h1>
                <div className="table-responsive">
                  <Table striped bordered hover variant="light" responsive>
                    <thead className="table-dark">
                      <tr>
                        <th>Enrollment Number</th>
                        <th>Paper Title</th>
                        <th>Marks</th>
                        <th>Paper ID</th>
                        <th>Total Marks</th>
                        <th>Grade</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.map((student, index) => (
                        <tr key={index}>
                          <td >{student.enrollmentNumber}</td>
                          <td>{student.papertitless}</td>
                          <td>
                            <ul>
                              {Object.keys(student.marks).map((key, i) => (
                                <li key={i}>{key}: {student.marks[key]}</li>
                              ))}
                            </ul>
                          </td>
                          <td>{student.paperidsss}</td>
                          <td>{student.totalMarks}</td>
                          <td>{student.grade}</td>
                          <td>{student.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResultPage;
