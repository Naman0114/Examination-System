import React, { useEffect, useState } from 'react';
import '../css/AdminSeeResult.css'; // Add the CSS file for styling
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AdminSeeResult = () => {
  const { enrollmentNumber } = useParams();
  console.log(enrollmentNumber, 'en');

  const [studentData, setStudentData] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${url}/api/loginedusercurrent`);
        console.log("Fetched Response Data:", response.data); // Log the full response
        if (response.data.users) {
          setUsers(response.data.users); // Save the fetched users in state
        } else {
          setError('No users found in the response');
        }
      } catch (err) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, [url]); // Fetch when the URL changes

  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const response = await axios.get(`${url}/api/allresults`);
        console.log("Fetched Results:", response.data);
        setResults(response.data);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to fetch results.");
      }
    };

    fetchAllResults();
  }, [url]);

  console.log(results);

  useEffect(() => {
    if (results.length > 0 && enrollmentNumber) {
      const filtered = results.filter(result => result.enrollmentNumber === enrollmentNumber);
      setFilteredResults(filtered);
      console.log("Filtered Results:", filtered);
    }
  }, [results, enrollmentNumber]); // Add enrollmentNumber to the dependency array

  return (
    <div className="result-container">
      <h2>Exam Results</h2>
      <table className="result-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Exam Name</th>
            <th>Total Marks</th>
            <th>Paper ID</th>
            <th>Grade</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Auto-incrementing SN */}
              <td>{result.papertitless}</td>
              <td>{result.totalMarks}</td>
              <td>{result.paperidsss}</td>
              <td>{result.grade}</td>
              <td>{result.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSeeResult;
