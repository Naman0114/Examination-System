import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWeb3context } from "../contexts/useWeb3Context";
import '../css/AdminSeeResult.css';
import { connectWallet } from "../utils/connectWallet";

const AdminSeeResult = () => {

  const { updateWeb3State } = useWeb3context();
  const { enrollmentNumber } = useParams();
  console.log(enrollmentNumber, 'en');

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]); // State to store final merged results
  const [ipfsPapers, setIpfsPapers] = useState([]); // State to store IPFS paper data
  const [filteredResults, setFilteredResults] = useState([]);
  const url = process.env.REACT_APP_API_BASE_URL;

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${url}/api/loginedusercurrent`);
        console.log("Fetched Users:", response.data);
        if (response.data.users) {
          setUsers(response.data.users);
        } else {
          setError('No users found in the response');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, [url]);

  // Fetch all results
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

  // Filter results for specific enrollment number
  useEffect(() => {
    if (results.length > 0 && enrollmentNumber) {
      const filtered = results.filter(
        (result) => result.enrollmentNumber === enrollmentNumber
      );
      setFilteredResults(filtered);
      console.log("Filtered Results:", filtered);
    }
  }, [results, enrollmentNumber]);

  // Fetch Encrypted IPFS Hash
  const getEncryptedIPFSHash = async () => {
    try {
      const { contractInstance, selectedAccount } = await connectWallet();
      updateWeb3State({ contractInstance, selectedAccount });

      console.log("Contract Instance:", contractInstance);

      const encryptedHash = await contractInstance.getAllResultHashes(selectedAccount);
      console.log("Encrypted IPFS Hashes:", encryptedHash);

      return encryptedHash;
    } catch (error) {
      console.error("Error retrieving encrypted IPFS hash:", error);
      throw new Error('Failed to retrieve encrypted hash from blockchain');
    }
  };

  const fetchIPFSPapers = async () => {
    try {
      const encryptedHashes = await getEncryptedIPFSHash();
      const ipfsData = [];

      for (const paper of encryptedHashes) {
        const ipfsHash = paper.ipfsHash;
        const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

        const response = await axios.get(url);
        console.log("Fetched Paper from IPFS:", response.data);

        ipfsData.push(response.data);
      }

      setIpfsPapers(ipfsData); // Save fetched papers to state
    } catch (error) {
      console.error("Failed to fetch papers from IPFS:", error);
      setError("Error fetching papers from IPFS");
    }
  };

  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        // Fetch papers from IPFS on page load
        await fetchIPFSPapers();
      } catch (error) {
        console.error("Error fetching results:", error);
        setError("Failed to fetch results.");
      }
    };

    fetchAllResults();
  }, []);

  useEffect(() => {
    if (ipfsPapers.length > 0) {
      const mergedResults = ipfsPapers.map(paper => {
        const result = { ...paper, paperidsss: paper.paperID }; // Combine IPFS data with result
        return result;
      });

      setResults(mergedResults); // Set the merged data to results state
    }
  }, [ipfsPapers]);

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
          {results.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Auto-increment serial number */}
              <td>{result.papertitless || 'N/A'}</td>
              <td>{result.totalMarks || 'N/A'}</td>
              <td>{result.paperidsss || 'N/A'}</td>
              <td>{result.grade || 'N/A'}</td>
              <td>{result.percentage ? `${result.percentage}%` : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSeeResult;
