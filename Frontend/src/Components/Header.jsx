import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.bundle";
// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useEffect, useState } from 'react'
import { Form, Link, useLocation } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { Button, Container, Image } from 'react-bootstrap';
import { FaUserAlt } from "react-icons/fa";
import Dashboard from '../Components/Dashboard';
import profile from '../images/profile.jpeg'
import { IoHome } from "react-icons/io5";
import QuesBank from '../Components/QuesBank';
import Home from '../Components/Home';
import { useSelector } from 'react-redux';
import Examrundash from '../Components/Examrundash';
import Logout from '../Components/Logout';

function Header(props) {
  const location = useLocation();
  const { name, age } = location.state || {};
  console.log(name, age);
  console.log(props.cc, 'mainpagessss');
  const name2 = useSelector((state) => state.cart);
  console.log(name2[0]?.value, 'ss');


  const [user, setUser] = useState({
    user: "login"
  }
  )
  useEffect(() => {
    if (name2[0]?.value === "examdone") {
      console.log('yes examdone2');
      setUser(previousState => {
        return { ...previousState, user: "login2" }

      })


    }
    else {
      console.log('no');

    }
  },[])
  console.log(user,'currentuser');
  

  const py = () => {
    setUser(previousState => {
      return { ...previousState, user: "pythonpage" }

    })
  }
  const htm = () => {
    setUser(previousState => {
      return { ...previousState, user: "htmlpage" }

    })
  }
  const log = () => {
    setUser(previousState => {
      return { ...previousState, user: "login" }

    })
  }
  console.log(user.user)
  return (
    <div>
      <div className='d-flex'>
        <div className='twopart1 p-3'><h2 className='text-light'>Online Exam</h2></div>
        <div className='twopart2'>
          <Container className='p-3 '>

            <div className='d-flex profile'>
              <div>
                <form className='rounded-pill profile2' autocomplete="off" >
                  <div className='d-flex searchbox'>
                    <div>
                      <input
                        type="text"
                        placeholder=""
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        className='w-100 '
                        // ref={FirstName}
                        required
                      />
                    </div>
                    <div className='mt-2 me-2' >
                      <FaSearch />

                    </div>
                  </div>


                </form>
              </div>
              <div class="container mt-3">

              </div>

              {/* <!-- The Modal --> */}
              <div class="modal fade" id="myModal">
                <div class="modal-dialog">
                  <div class="modal-content">

                    {/* <!-- Modal Header --> */}
                    <div class="modal-header">
                      <h4 class="modal-title text-primary">Modal Heading</h4>

                      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div class="modal-body">
                      Modal body..
                    </div>

                    {/* <!-- Modal footer --> */}
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>

                  </div>
                </div>
              </div>

              <div data-bs-toggle="modal" data-bs-target="#myModal">
                <Image src={profile} className='rounded-circle profilestudent' />

              </div>
              {/* <div className='discount  p-2' style={{ display: showDiv ? 'block' : 'none' }} >
        
                      {

                      show4===true?<Logout className='logout' />:<></>
                      }
                      </div> */}
            </div>

          </Container>
        </div>
      </div>
      <div className='d-flex'>

        <input type="checkbox" id="toggleCheckbox" />
        <label for="toggleCheckbox" class="toggle-button">☰</label>

        <div className="sidebar">
          <div className='p-2'>
            <div className="studentprof mt-3">
              <div className='stuprof d-flex '>
                <div>
                  <Image src={profile} className='rounded-circle profilestudent' />

                </div>
                <div>
                  <div className="name"><h5>ZAFAR AHMAD</h5> </div>
                  <div className="Catofgory">Student</div>

                </div>
              </div>
              <div className='options mt-5'>
                <div>
                  <ul>
                    <Link to={'/q'} className='w-100'>Home</Link>
                    <Link onClick={py} className='w-100'>Questons</Link>


                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div class="content w-100">

          {

            name2[0]?.value === "examdone" ? <Examrundash /> : <></>
          }
          {

            user.user === 'pythonpage' ? <QuesBank /> : user.user === 'login' ? <Home /> : <></>
          }
        </div> */}

      </div>
        {/* <h1 className='bg-primary'>Hello</h1>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}
    </div>
  )
}

export default Header