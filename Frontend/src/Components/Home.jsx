import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useWeb3context } from "../contexts/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import Dashboard from './Dashboard';


function Home() {

  const { updateWeb3State, web3State } = useWeb3context();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const [filteredResults, setFilteredResults] = useState([]);
  const [papers, setPapers] = useState([]); // State to store papers data
  const [uniqpaperid, setuniqpaperid] = useState([]); // State to store papers data
  // Get the tests that are enabled from the Redux store
  const enabledTests = useSelector((state) => state.cart.En_Dis);
  const tests = useSelector((state) => state.cart.tests);
  const url = process.env.REACT_APP_API_BASE_URL;

  const handleFetchPaper = async (paper) => {

    console.log(paper.title)

    const encryptedHash = await getEncryptedIPFSHash(paper.title);
    const decrptedIPFSHash = encryptedHash;


    try {
      const url2 = `https://gateway.pinata.cloud/ipfs/${decrptedIPFSHash}`;
      const response = await axios.get(url2);
      console.log("data value:", response.data.testData);
      const { paperID, timelimit, Totalmarks, title } = response.data.testData;
      addCards(paperID, timelimit, Totalmarks, title);
      console.log(paperID, timelimit, Totalmarks, title);

    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch from Pinata');
    }
  }


  const getEncryptedIPFSHash = async (title) => {
    try {
      const { contractInstance, selectedAccount } = await connectWallet();
      updateWeb3State({ contractInstance, selectedAccount });
      console.log(contractInstance);

      const papers = await contractInstance.getAllPapers(selectedAccount);

      console.log("Papers for address:", selectedAccount);
      papers.forEach((p, i) => {
        console.log(`Paper #${i + 1} - Title: "${p.title}", IPFS: ${p.ipfsHash}`);
      });


      const encryptedHash = await contractInstance.getIPFSHashByTitle(selectedAccount, title);
      console.log(encryptedHash);

      return encryptedHash;

    } catch (error) {
      console.error("Error retrieving encrypted IPFS hash:", error);
      throw new Error('Failed to retrieve encrypted hash from the blockchain');
    }
  };

  const addCards = (index, time, Totalmarks, papername) => {

    navigate('/giveexam', { state: { paperID: index, timeer: time, totalmark: Totalmarks, papertitle: papername } });
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

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`${url}/api/results`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // ✅ Extract only paperidsss
        const allPaperIds = data.papers.map(item => item.paperidsss);


      } catch (error) {
        console.error('Error fetching result details:', error);
      }
    };

    fetchResults();
  }, []);

  // new result fetch
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
  }, [url]); // Fetch when the UR

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
    if (results.length > 0 && users[0]?.enrollmentNumber) {
      const filtered = results.filter(result => result.enrollmentNumber === users[0]?.enrollmentNumber);
      setFilteredResults(filtered);
      console.log("Filtered Results:", filtered);
      const allPaperIds = filtered.map(item => item.paperidsss);
      console.log(allPaperIds, 'mypaperidssss');
      const uniquePaperIds = [...new Set(allPaperIds)];
      setuniqpaperid(uniquePaperIds)



    }
  }, [results, users]);

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
              {papers.map((paper, index) => {
                // Check if the paperID exists in uniqpaperid (as string)
                const isDisabled = uniqpaperid.includes(String(paper.paperID));

                return (
                  <tr key={paper._id}>
                    <td>{index + 1}</td>
                    <td>{paper.title}</td>
                    <td>{paper.paperID}</td>
                    <td>{paper.course}</td>
                    <td>{paper.noofques}</td>
                    <td>{paper.Totalmarks}</td>
                    <td>{paper.timelimit} min</td>
                    <td>
                      <Button
                        onClick={() => handleFetchPaper(paper)
                        }
                        disabled={isDisabled}
                        variant={isDisabled ? 'secondary' : 'primary'}
                      >
                        {isDisabled ? 'Started' : 'Start'}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </Table>
        </div>
      </div>
    </div>
  );
}

export default Home;
