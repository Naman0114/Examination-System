import React, { useState ,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './Dashboard';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [papers, setPapers] = useState([]); // State to store papers data
  // Get the tests that are enabled from the Redux store
  const enabledTests = useSelector((state) => state.cart.En_Dis);
   const tests = useSelector((state) => state.cart.tests); 
   const url='https://onine-exam.onrender.com';
  const addcards = (index,time,Totalmarks,papername) => {
    navigate('/giveexam', { state: { paperID:index ,timeer:time,totalmark:Totalmarks,papertitle:papername} });
  };
    useEffect(() => {
       const fetchPaperDetails = async () => {
         try {
           const response = await fetch(`${url}/api/Admintable`);
           if (!response.ok) {
             throw new Error('Network response was not ok');
           }
           const data = await response.json();
           setPapers(data.papers); // Store all paper details in state
           console.log('Fetched Paper Details:', data.papers);
         } catch (error) {
           console.error('Error fetching paper details:', error);
         }
       };
   
       fetchPaperDetails();
     }, []);
  return (
    <div>
      <Dashboard />
      <div className="homepadding">
        <div className="tested p-4">
          <h6 className="text-start ">Test</h6>
          <p className="text-start ">Running and Continue </p>
          <Table hover responsive="lg">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Name</th>
                <th>PaperID</th>
                <th>Course</th>
                <th>Total Ques</th>
                <th>Total Marks</th>
                <th>Time limit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {papers.map((paper, index) => (
                <tr key={paper._id}>
                  <td>{index + 1}</td> {/* Serial number */}
                  <td>{paper.title}</td> {/* Test Title */}
                  <td>{paper.paperID}</td> {/* Course Name */}
                  <td>{paper.course}</td> {/* Course Name */}
                  <td>{paper.noofques}</td> {/* Total Questions */}
                  <td>{paper.Totalmarks}</td> {/* Total Marks */}
                  <td>{paper.timelimit} min</td> {/* Time Limit */}
                  <td>
                    <Button onClick={ ()=>addcards(paper.paperID,paper.timelimit,paper.Totalmarks,paper.title)}>Start</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Home;
