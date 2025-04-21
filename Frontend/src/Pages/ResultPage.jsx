import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Table, Container, Row, Col, Card } from 'react-bootstrap';

const ResultPage = () => {
  const [studentData, setStudentData] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  // Try to get from Redux, fallback to localStorage
  const tests = useSelector((state) => state.cart.enrollmentnum || []);
  console.log(tests);

  

  const url = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${url}/api/loginedusercurrent`);
        console.log("Fetched Response Data:", response.data); // Log the full response
        if (response.data.users) {
          setUsers(response.data.users); // Save the fetched users in state
        } else {
          setError('No users found in the response');
        }
      } catch (err) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', err);
      }
    };
  
    fetchUsers();
  }, [url]); // Fetch when the URL changes

  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const response = await axios.get(`${url}/api/allresults`);
        console.log("Fetched Results:", response.data);
        setResults(response.data);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to fetch results.");
      }
    };

    fetchAllResults();
  }, [url]);
 console.log(results);
 useEffect(() => {
  if (results.length > 0 && users[0]?.enrollmentNumber) {
    const filtered = results.filter(result => result.enrollmentNumber === users[0]?.enrollmentNumber);
    setFilteredResults(filtered);
    console.log("Filtered Results:", filtered);
  }
}, [results, users]);
 

  
  

  return (
    <div className="result-page">
      <Container>
        <Row className="justify-content-center my-4">
          <Col xs={12} md={10}>
            <Card className="shadow-lg">
              <Card.Body>
                <h1 className="page-title text-center text-primary mb-4">Student Result</h1>
                <div className="table-responsive">
                  <Table striped bordered hover responsive>
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
                      {filteredResults.map((student, index) => (
                        <tr key={index}>
                          <td>{student.enrollmentNumber}</td>
                          <td>{student.papertitless}</td>
                          <td>
                            <ul style={{ paddingLeft: '1rem' }}>
                              {student.marks &&
                                Object.entries(student.marks).map(([subject, mark], i) => (
                                  <li key={i}>{subject}: {mark}</li>
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
                  {studentData.length === 0 && (
                    <p className="text-center mt-3">No result data available. or Refresh this page</p>
                  )}
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
