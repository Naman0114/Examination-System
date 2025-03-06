import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for programmatic navigation

function Dashboard() {
  const navigate = useNavigate();  // Initialize navigate function

  // Function to navigate to the result page when button is clicked
  const handleViewResult = () => {
    navigate('/allresult');  // Redirect to the result page
  };

  return (
    <div>
      <div>
        <div className="dashboard">
          <div className="p-4">
            <Container>
              <Row>
                <Col sm={6}>
                  <div>
                    <h1>DashBoard</h1>
                    <p className="text-light">Your Ultimate Destination For Online Assessment</p>
                  </div>
                </Col>
                <Col sm>
                  <div className="mt-4">
                    <Button className="w-100 rounded-pill">Start Exam</Button>
                    <br />
                  </div>
                </Col>
                <Col sm>
                  <div className="mt-4">
                    {/* On button click, navigate to the result page */}
                    <Button
                      className="w-100 rounded-pill"
                      onClick={handleViewResult}  // Trigger navigation on click
                    >
                      View Result
                    </Button>
                    <br />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
