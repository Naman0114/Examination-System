import React, { useEffect, useState } from 'react';
import { Form, Link, useLocation } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { FaUserAlt } from "react-icons/fa";
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
import { FaFileWord } from "react-icons/fa";
import Course from './Course';
import Addtest from './Addtest';

function AdminPage(props) {
    const location = useLocation();
    const { name, age } = location.state || {};
    console.log(name, age);
    console.log(props.cc, 'mainpagessss');
    const name2 = useSelector((state) => state.cart);
    console.log(name2[0]?.value, 'ss');
    if (name2[0]?.value === "examdone") {
        console.log('yes examdone2');
    } else {
        console.log('no');
    }

    const [user, setUser] = useState({
        user: "login"
    });

    const py = () => {
        setUser(previousState => {
            return { ...previousState, user: "pythonpage" };
        });
    };

    const htm = () => {
        setUser(previousState => {
            return { ...previousState, user: "htmlpage" };
        });
    };

    const log = () => {
        setUser(previousState => {
            return { ...previousState, user: "loginpage" };
        });
    };

    const dashboard = () => {
        setUser(previousState => {
            return { ...previousState, user: "dashbord" };
        });
    };

    const course = () => {
        setUser(previousState => {
            return { ...previousState, user: "course" };
        });
    };

    const addtest = () => {
        setUser(previousState => {
            return { ...previousState, user: "addtest" };
        });
    };

    console.log(user.user);

    return (
        <div className='adminbg'>
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
                                <form className='rounded-pill profile2' autocomplete="off">
                                    <div className='d-flex searchbox'>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Searching"
                                                className='w-100 '
                                                required
                                            />
                                        </div>
                                        <div className='mt-2 me-2'>
                                            <FaSearch />
                                        </div>
                                    </div>
                                </form>
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
                <label for="toggleCheckbox" className="toggle-button">☰</label>
                <div className="sidebar sidbar2">
                    <div className='p-3'>
                        <div className="studentprof mt-3">
                            <div className='stuprof d-flex'>
                                <div>
                                    <Image src={profile} className='rounded-circle profilestudent' />
                                </div>
                                <div>
                                    <div className="name"><h5>Admin</h5> </div>
                                    <div className="Catofgory">Administrator</div>
                                </div>
                            </div>
                            <div className='options mt-5'>
                                <div>
                                    <ul>
                                        <Link onClick={dashboard} className='w-100'>
                                            <IoHome className='mt-1 me-2' /> Dashboard
                                        </Link>
                                        <hr />
                                        <h5 className='text-start'>Action</h5>
                                        <Link onClick={course} className='w-100'>
                                            <SiCoursera className='mt-1 me-2' /> Course
                                        </Link>
                                        <Link onClick={addtest} className='w-100'>
                                            <GiNotebook className='mt-1 me-2' /> Add Test
                                        </Link>
                                        <Link to="/products" className='w-100'>
                                            <FaFileWord className='mt-1 me-2' /> View Result
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content w-100">
                    {
                        user.user === 'dashbord' ? <AdminDash /> :
                            user.user === 'course' ? <Course /> :
                                user.user === 'login' ? <AdminDash /> :
                                    user.user === 'addtest' ? <Addtest /> : <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
