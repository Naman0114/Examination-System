import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import '../css/adminDash.css';

function AdminDash() {
  const [examCount, setExamCount] = useState(0);
  const [examCount1, setExamCount1] = useState(0);
  const [papers, setPapers] = useState([]);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchExamCount = async () => {
      try {
        const response = await fetch(`${url}/api/exam-count`);
        const data = await response.json();
        setExamCount(data.examcount);
      } catch (error) {
        console.error('Error fetching exam count:', error);
      }
    };

    const fetchTestCount = async () => {
      try {
        const response = await fetch(`${url}/api/test-count`);
        const data = await response.json();
        setExamCount1(data.examcount1);
      } catch (error) {
        console.error('Error fetching test count:', error);
      }
    };

    const fetchPapers = async () => {
      try {
        const response = await fetch(`${url}/api/Admintable`);
        const data = await response.json();
        setPapers(data.papers);
      } catch (error) {
        console.error('Error fetching paper details:', error);
      }
    };

    fetchExamCount();
    fetchTestCount();
    fetchPapers();
  }, []);

  const handleDeletePaper = async (paperID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this test?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${url}/api/ques/${paperID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (response.ok) {
        alert(data?.message || 'Deleted!');
        setPapers((prev) => prev.filter((paper) => paper.paperID !== paperID));
      } else {
        alert(`Failed to delete: ${data?.message || data?.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error deleting paper:', err);
      alert('An error occurred while deleting the paper.');
    }
  };

  return (
    <div className="dark">
      <div className="welcome-text">
        <h5>Welcome back, Admin</h5>
        <p>From here you can manage your tests</p>
      </div>

      <div className="stats-container">
        <div className="total_s">
          <h6>{papers.length}</h6>
          <p>Total Tests</p>
        </div>
        <div className="total_s bg-success text-white">
          <h6>{examCount}</h6>
          <p>Total Students</p>
        </div>
        <div className="total_s bg-danger text-white">
          <h6>{examCount1}</h6>
          <p>Total Running Exams</p>
        </div>
      </div>

      <Container className="table-container">
        <div className="tested">
          <h6>Tests</h6>
          <p>Running and Continuing</p>

          <Table hover responsive="lg">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Name</th>
                <th>Paper ID</th>
                <th>Course Name</th>
                <th>Total Ques</th>
                <th>Total Marks</th>
                <th>Time Limit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {papers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">No tests available.</td>
                </tr>
              ) : (
                papers.map((paper, index) => (
                  <tr key={paper._id}>
                    <td>{index + 1}</td>
                    <td>{paper.title}</td>
                    <td>{paper.paperID}</td>
                    <td>{paper.course}</td>
                    <td>{paper.noofques}</td>
                    <td>{paper.Totalmarks}</td>
                    <td>{paper.timelimit} min</td>
                    <td>
                      <button onClick={() => handleDeletePaper(paper.paperID)} className="btn btn-danger btn-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default AdminDash;
