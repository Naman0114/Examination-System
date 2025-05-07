import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../css/dashboard.css';

function Dashboard() {

  return (
    <div>
      <div>
        <div className="dashboard">
          <div className="p-4">
            <Container>
              <Row>
                <Col sm={6}>
                  <div>
                    <h1 className="text-light">DashBoard </h1>
                    <p className="text-light">Your Ultimate Destination For Online Assessment</p>
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
