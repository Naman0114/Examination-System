import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ManageStudent() {
  // State to store the students
  const [students, setStudents] = useState([]);
  

  // API base URL from environment variable
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Fetch data from API
        const response = await fetch(`${url}/api/test2`);
        const data = await response.json();

        console.log('Fetched data1:', data);

        if (response.ok) {
          // Adjust this according to your actual API response
          setStudents(data.students || data.studentss || []);
        } else {
          console.error('Error fetching students:', data.error);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [url]);

  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="text-center text-primary">Manage Students</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover responsive className="text-center">
              <thead className="table-dark">
                <tr>
                  <th>S.N</th>
                  <th>Enrollment Number</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Result</th>
                  <th>Send Response</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="6">No students found</td>
                  </tr>
                ) : (
                  students.map((student, index) => (
                    <tr
                      key={student.enrollmentNumber || index}
                      className={student.result === 'Passed' ? 'bg-success text-white' : 'bg-danger text-white'}
                    >
                      <td>{index + 1}</td>
                      <td>{student.enrollmentNumber}</td>
                      <td>{student.NAME}</td>
                      <td>{student.COURSE}</td>
                      <td><Link
                to={`/StudentResult/${student.enrollmentNumber}`} // Passing the enrollment number
                style={{ textDecoration: 'underline' }}
              >
                View
              </Link></td>

                      <td>
                        <Button variant="info" size="sm" className="me-2">
                          Send
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ManageStudent;
