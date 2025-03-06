import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addtempenrollmentnumber } from "../Redux/CartSlice";
import Dashboard from "../Components/Dashboard";
import QuesBank from "../Components/QuesBank";
import Home from "../Components/Home";
import Examrundash from "../Components/Examrundash";
import Logout from "../Components/Logout";
import profile from "../images/profile.jpeg";
import { useNavigate } from "react-router-dom";

function Mainpage(props) {
  const location = useLocation();
  const { users } = location.state || {};
  const name2 = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [user, setUser] = useState({ user: "login" });
  const [showLogout, setShowLogout] = useState(false);

  const logoutRef = useRef(null); // Reference for detecting outside clicks

  useEffect(() => {
    if (name2[0]?.value === "examdone") {
      setUser((previousState) => ({ ...previousState, user: "login2" }));
    }
  }, []);

  useEffect(() => {
    dispatch(addtempenrollmentnumber(users));
  }, []);

  // Handle Profile Click
  const handleProfileClick = () => {
    setShowLogout((prev) => !prev); // Toggle logout section
  };

  // Handle Click Outside to Close Logout Section
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
    const navigate = useNavigate();
    const handleLogout = () => {
      dispatch(addtempenrollmentnumber());  // Clear Redux state
      console.log("User logged out, enrollment number cleared");
      navigate("/Register");  // Redirect to register page
    };
    // useEffect(() => {
    //   handleLogout(); // Call logout function
    // }, []);
  return (
    <div>
      <div className="d-flex ">
        <div className="twopart2">
          <Container className="p-3">
          <Row>
            <Col sm>
          <h2 className="text-light">Online Exam</h2>
            </Col>
            <Col sm>
          
            <div className="d-flex profile align-items-center">
              <form className="rounded-pill profile2 me-3">
                <div className="d-flex searchbox">
                  <input type="text" placeholder="Searching" className="w-100" required />
                  <div className="mt-2 me-2">
                    <FaSearch />
                  </div>
                </div>
              </form>

              {/* Profile Image Clickable */}
              <div className="position-relative">
                <Image src={profile} className="rounded-circle profilestudent cursor-pointer" onClick={handleProfileClick} />
                
                {/* Logout Section */}
                {showLogout && (
                  <div ref={logoutRef} className="logout-section position-absolute bg-light shadow p-3 rounded" style={{ right: 0, top: "50px", width: "200px" }}>
                    <h6 className="text-center">Hello, {users?.NAME || "User"}</h6>
                    <Button variant="danger" className="w-100 mt-2" onClick={() => handleLogout()}>
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
            </Col>
          </Row>
          </Container>
        </div>
      </div>

      <div className="d-flex">
        <input type="checkbox" id="toggleCheckbox" />
        <label htmlFor="toggleCheckbox" className="toggle-button">
          ☰
        </label>

        <div className="sidebar p-2">
          <div className="studentprof mt-3">
            <div className="stuprof d-flex align-items-center">
              <Image src={profile} className="rounded-circle profilestudent me-2" />
              <div>
                <h5>{users?.NAME || "Default Name"}</h5>
                <div className="category">Student</div>
              </div>
            </div>
            <div className="options mt-4">
              <ul>
                <Link className="w-100" onClick={() => setUser({ user: "login2" })}>
                  Home
                </Link>
                <Link className="w-100" onClick={() => setUser({ user: "pythonpage" })}>
                  Questions
                </Link>
              </ul>
            </div>
          </div>
        </div>

        <div className="content w-100">
          {name2[0]?.value === "examdone" ? <Examrundash pp={users} /> : user.user === "login" ? <Home /> : ""}
          {user.user === "pythonpage" ? <QuesBank /> : user.user === "login2" ? <Home /> : null}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
