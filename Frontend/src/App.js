import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from 'react';
import Header from './Components/Header';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import FrontPage from './Pages/FrontPage';
import Admin from './Pages/Admin';
import User from './Pages/User';
import UserLogin from './Components/UserLogin';
import Mainpage from './Pages/Mainpage';
import Home from './Components/Home';
import Examsques from './Pages/Examsques';
import AdminPage from './Pages/AdminPage';
import QuesBank from './Components/QuesBank';
import { Col, Row } from 'react-bootstrap';
import Examrundash from './Components/Examrundash';
import Test from './Components/Test';
import Result from './Pages/Result';
import Registerstudent from './Pages/Registerstudent';
import OTPverification from './Components/OTPverification';
import TRYCODE from './Pages/TRYCODE';
import SignUp from './Pages/SignUp';
import ResultPage from './Pages/ResultPage';
import CustomAlert from './Pages/CustomAlert';
import AdminSeeResult from './Pages/AdminSeeResult';
import AdminSignup from './Pages/AdminSignup';
import ForgotPassword from './Pages/ForgotPassword';
// import MyForm from './Pages/M';
function App( props) {
  // console.log(name,'appsss');
  const [hidee, setShowee] = useState(false);

  
  return (
    <div className="App">
        <BrowserRouter>
            {/* <Row>
              <Col>
                  <Header/>

              </Col>
            </Row> */}
            <Routes>
              <Route path='/' element={<FrontPage/>}/>
              <Route path='/Admin' element={<Admin/>}/>
              <Route path='/Users' element={<User/>}/>
              <Route path='/usersignup' element={<UserLogin/>}/>
              <Route path='/userloginsucc' element={<Mainpage/>}/>
              <Route path='/exam' element={<Mainpage/>}/>
              <Route path='/Adminpage' element={<AdminPage/>}/>
              <Route path='/q' element={<QuesBank/>}/>
              <Route path='/giveexam' element={<Examrundash/>}/>
              <Route path='/test' element={<Test/>}/>
              <Route path='/Result' element={<Result/>}/>
              <Route path='/Register' element={<Registerstudent/>}/>
              <Route path='/otpss' element={<OTPverification/>}/>
              <Route path='/user' element={<SignUp/>}/>
              <Route path='/try' element={<TRYCODE/>}/>
              <Route path="/allresult" element={<ResultPage />} />
              <Route path="/alert" element={<CustomAlert />} />
              <Route path="/StudentResult/:enrollmentNumber" element={<AdminSeeResult />} />
              <Route path="/AdminSignup" element={<AdminSignup />} />
              <Route path="/forgetpass" element={<ForgotPassword />} />
            
          
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
