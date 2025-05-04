import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { FaFileWord } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

import AdminDash from "../Components/AdminDash";
import profile from "../images/profile.jpeg";
import Addtest from "./Addtest";
import Course from "./Course";
import ManageStudent from "./ManageStudent";

import "../css/style.css";

const AdminPage = () => {
  const location = useLocation();
  const admin = location.state?.admin;
  const url = process.env.REACT_APP_API_BASE_URL;

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/admins`);
        if (response.data.success) {
          const matchedAdmin = response.data.admins.find(
            (a) => a.email === admin?.email
          );
          setSelectedAdmin(matchedAdmin || null);
        }
      } catch (err) {
        console.error("Error fetching admin:", err);
      }
    };
    fetchAdminDetails();
  }, [admin, url]);

  return (
    <div className="adminbg">
      {/* Top Bar */}
      <div className="twopart2">
        <Container className="p-3">
          <Row className="d-flex align-items-center">
            <Col sm>
              <h2 className="text-light">Online Exam</h2>
            </Col>
            <Col sm className="profile d-flex justify-content-end">
              <Image src={profile} className="profilestudent" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Sidebar & Main Content */}
      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar p-3">
          <div className="studentprof mt-3">
            <div className="stuprof d-flex align-items-center">
              <Image src={profile} className="profilestudent me-3" />
              <div>
                <h5>{selectedAdmin?.fullName || "Administrator"}</h5>
                <div className="Category">Administrator</div>
              </div>
            </div>

            <div className="options mt-4">
              <ul>
                <Link onClick={() => setActivePage("dashboard")}>
                  <IoHome className="mt-1 me-2" /> Dashboard
                </Link>
                <hr />
                <h5 className="text-start">Actions</h5>
                <Link onClick={() => setActivePage("addtest")}>
                  <GiNotebook className="mt-1 me-2" /> Add Test
                </Link>
                <Link onClick={() => setActivePage("managestudent")}>
                  <FaFileWord className="mt-1 me-2" /> Manage Student
                </Link>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Main Content */}
        <div className="content w-100 p-4">
          {activePage === "dashboard" && <AdminDash />}
          {activePage === "course" && <Course />}
          {activePage === "managestudent" && <ManageStudent />}
          {activePage === "addtest" && <Addtest />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
