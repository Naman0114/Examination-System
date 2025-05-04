import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/style.css';

function FrontPage() {
  return (
    <div className="full-page">
      
      {/* Header */}
      <header className="navbarheading">
        <h4>Test Your Skill</h4>
      </header>

      {/* Hero Section */}
      <section className="bg-primary">
        <h1>Online Examination System</h1>
      </section>

      {/* Main Content */}
      <main className="image-section">
        <div className="overlay">
          <Container className="button-container">
            <Button className="custom-btn mb-3" as={Link} to="/Admin" aria-label="Go to Admin Login">
              Admin
            </Button>
            <Button className="custom-btn" as={Link} to="/Register" aria-label="Go to User Registration">
              User
            </Button>
          </Container>
        </div>
      </main>

    </div>
  );
}

export default FrontPage;