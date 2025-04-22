import React, { useEffect, useState } from 'react';
import { Form, Link, useLocation } from 'react-router-dom';
import { FaSearch, FaUserAlt, FaFileWord } from "react-icons/fa";
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import Dashboard from '../Components/Dashboard';
import profile from '../images/profile.jpeg';
import { IoHome } from "react-icons/io5";
import QuesBank from '../Components/QuesBank';
import Home from '../Components/Home';
import { useSelector } from 'react-redux';
import Examrundash from '../Components/Examrundash';
import Logout from '../Components/Logout';
import AdminDash from '../Components/AdminDash';
import { SiCoursera } from "react-icons/si";
import { IoIosPeople } from "react-icons/io";
import { BsQuestionCircleFill } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import Course from './Course';
import Addtest from './Addtest';
import ManageStudent from './ManageStudent';
import axios from "axios";

import '../css/style2.css'; // ✅ Import your background CSS

function AdminPage(props) {
    const location = useLocation();
    const { name, age } = location.state || {};
    const admin = location.state?.admin;

    const name2 = useSelector((state) => state.cart);
    const url = process.env.REACT_APP_API_BASE_URL;

    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const response = await axios.get(`${url}/api/admins`);
                if (response.data.success) {
                    setAdmins(response.data.admins);
                    const filteredAdmin = response.data.admins.find(a => a.email === admin.email);
                    if (filteredAdmin) {
                        setSelectedAdmin(filteredAdmin);
                    }
                }
            } catch (err) {
                console.error("Error fetching admin:", err);
            }
        };
        fetchAdminDetails();
    }, []);

    const [user, setUser] = useState({ user: "login" });

    const py = () => setUser(prev => ({ ...prev, user: "pythonpage" }));
    const htm = () => setUser(prev => ({ ...prev, user: "htmlpage" }));
    const log = () => setUser(prev => ({ ...prev, user: "loginpage" }));
    const dashboard = () => setUser(prev => ({ ...prev, user: "dashbord" }));
    const course = () => setUser(prev => ({ ...prev, user: "course" }));
    const addtest = () => setUser(prev => ({ ...prev, user: "addtest" }));
    const managestudent = () => setUser(prev => ({ ...prev, user: "managestudent" }));

    return (
        <div className='adminbg'> {/* ✅ Background applied here */}
            <div className='d-flex'>
                <div className='twopart2'>
                    <Container className='p-3 '>
                        <Row>
                            <Col sm>
                                <h2 className='text-light'>Online Exam</h2>
                            </Col>
                            <Col sm>
                                <div className='d-flex profile'>
                                    <div>
                                        {/* Optional: Admin name or greeting */}
                                    </div>
                                    <div>
                                        <Image src={profile} className='rounded-circle profilestudent' />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <div className='d-flex'>
                <input type="checkbox" id="toggleCheckbox" />
                <label htmlFor="toggleCheckbox" className="toggle-button">☰</label>

                <div className="sidebar sidbar2">
                    <div className='p-3'>
                        <div className="studentprof mt-3">
                            <div className='stuprof d-flex'>
                                <div>
                                    <Image src={profile} className='rounded-circle profilestudent' />
                                </div>
                                <div>
                                    <div className="name"><h5>{selectedAdmin?.fullName}</h5></div>
                                    <div className="Catofgory">Administrator</div>
                                </div>
                            </div>
                            <div className='options mt-5'>
                                <ul>
                                    <Link onClick={dashboard} className='w-100'>
                                        <IoHome className='mt-1 me-2' /> Dashboard
                                    </Link>
                                    <hr />
                                    <h5 className='text-start'>Action</h5>
                                    <Link onClick={addtest} className='w-100'>
                                        <GiNotebook className='mt-1 me-2' /> Add Test
                                    </Link>
                                    <Link onClick={managestudent} className='w-100'>
                                        <FaFileWord className='mt-1 me-2' /> Manage Student
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content w-100">
                    {user.user === 'dashbord' ? <AdminDash /> :
                        user.user === 'course' ? <Course /> :
                            user.user === 'login' ? <AdminDash /> :
                                user.user === 'managestudent' ? <ManageStudent /> :
                                    user.user === 'addtest' ? <Addtest /> : <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
