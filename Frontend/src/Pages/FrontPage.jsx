import React from 'react'
import '../css/style.css'
import { Link } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'

function FrontPage() {
  return (
    <div className='full-page'>

      {/* Navbar */}
      <div className='navbarheading bg-primary p-4 text-white text-center'>
        <h4>Test Your Skill</h4>
      </div>

      {/* Heading */}
      <div className='bg-primary p-5 text-center text-white'>
        <h1>Online Examination System</h1>
      </div>

      {/* Main Section */}
      <section className='image-section'>
        <div className='overlay text-center'>
          <Container className="button-container">
            <Button className='custom-btn mb-4' as={Link} to='/Admin'>
              <h4 className='mb-0'>Admin</h4>
            </Button>
            <Button className='custom-btn' as={Link} to='/Register'>
              <h4 className='mb-0'>User</h4>
            </Button>
          </Container>
        </div>
      </section>
      
    </div>
  )
}

export default FrontPage
