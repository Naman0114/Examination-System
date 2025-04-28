import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useWeb3context } from "../contexts/useWeb3Context";
import '../css/AdminSeeResult.css';
import { connectWallet } from "../utils/connectWallet";

const AdminSeeResult = () => {
  const { updateWeb3State } = useWeb3context();

  const [ipfsPapers, setIpfsPapers] = useState([]);
  const [error, setError] = useState(null);

  const getEncryptedIPFSHash = async () => {
    try {
      const { contractInstance, selectedAccount } = await connectWallet();
      updateWeb3State({ contractInstance, selectedAccount });

      const encryptedHashes = await contractInstance.getAllResultHashes(selectedAccount);
      console.log("Encrypted IPFS Hashes:", encryptedHashes);

      return encryptedHashes;
    } catch (error) {
      console.error("Error retrieving encrypted IPFS hash:", error);
      throw new Error('Failed to retrieve encrypted hash from blockchain');
    }
  };

  const fetchIPFSPapers = async () => {
    try {
      const encryptedHashes = await getEncryptedIPFSHash();
      const ipfsData = [];

      for (const ipfsHash of encryptedHashes) {
        const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
        const response = await axios.get(url);
        console.log("Fetched Paper from IPFS:", response.data);
        ipfsData.push(response.data);
      }

      setIpfsPapers(ipfsData);
    } catch (error) {
      console.error("Failed to fetch papers from IPFS:", error);
      setError("Error fetching papers from IPFS");
    }
  };

  useEffect(() => {
    fetchIPFSPapers();
  }, []);

  return (
    <div className="result-container">
      <h2>Exam Results</h2>
      {error && <p className="error">{error}</p>}
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
          {ipfsPapers.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
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
