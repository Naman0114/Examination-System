import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Examrundash from "../Components/Examrundash";
import Home from "../Components/Home";
import '../css/adminDash.css';
import profile from "../images/profile.jpeg";
import { addtempenrollmentnumber } from "../Redux/CartSlice";

function Mainpage() {

  const location = useLocation();
  const { users } = location.state || {};
  const url = process.env.REACT_APP_API_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({ user: "login" });
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef(null);
  const name2 = useSelector((state) => state.cart);


  useEffect(() => {
    const saveLoginedUser = async () => {
      if (!users?.enrollmentNumber) return;

      const Loginedstudentdetails = {
        enrollmentnumber: users.enrollmentNumber,
        name: users.NAME,
        gender: users.GENDER,
        age: users.AGE,
        course: users.COURSE,
        password: users.PASSWORD,
      };

      try {
        await axios.post(`${url}/api/loginedusercurrent`, Loginedstudentdetails);
      } catch (error) {
        console.error("Error saving user:", error);
      }
    };

    if (users?.enrollmentNumber) saveLoginedUser();
    dispatch(addtempenrollmentnumber(users));
  }, [users, dispatch, url]);

  useEffect(() => {
    if (name2[0]?.value === "examdone") {
      setUser({ user: "login2" });
    }
  }, [name2]);

  const handleProfileClick = () => setShowLogout(!showLogout);
  const handleLogout = () => {
    dispatch(addtempenrollmentnumber());
    navigate("/Register");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (logoutRef.current && !logoutRef.current.contains(e.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <header className="dark d-flex justify-content-between align-items-center px-4 py-2">
        <h2 className="text-dark m-0">Online Exam</h2>
        <div className="position-relative">
          <Image
            src={profile}
            alt="Profile"
            className="rounded-circle profilestudent cursor-pointer"
            onClick={handleProfileClick}
          />
          {showLogout && (
            <div
              ref={logoutRef}
              className="logout-section position-absolute bg-light shadow p-3 rounded"
              style={{ right: 0, top: "60px", width: "200px" }}
            >
              <h6 className="text-center">Hello, {users?.NAME}</h6>
              <Button variant="danger" className="w-100 mt-2" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>
      <div className="d-flex">
        <div className="sidebar p-3 bg-white shadow-sm" style={{ minWidth: "250px" }}>
          <div className="studentprof">
            <div className="stuprof d-flex align-items-center mb-3">
              <Image src={profile} className="rounded-circle profilestudent me-2" />
              <div>
                <h5 className="mb-0">{users?.NAME || "Student"}</h5>
                <small className="category">Student</small>
              </div>
            </div>
            <ul className="list-unstyled">
              <li>
                <Link to="#" className="text-dark d-block py-2" onClick={() => setUser({ user: "login2" })}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="#" className="text-dark d-block py-2" onClick={() => setUser({ user: "pythonpage" })}>
                  Result
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <main className="content w-100 p-3">
          {name2[0]?.value === "examdone" ? (
            <Examrundash pp={users} />
          ) : user.user === "pythonpage" ? (
            navigate('/allresult')
          ) : (
            <Home />
          )}
        </main>
      </div>
    </div>
  );
}

export default Mainpage;
