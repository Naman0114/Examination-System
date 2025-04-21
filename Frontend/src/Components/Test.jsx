import React, { useState } from 'react';

const Test = () => {
  const data = [
    { id: 1, paperId: 'P001', name: 'Math' },
    { id: 2, paperId: 'P001', name: 'Math' },
    { id: 3, paperId: 'P002', name: 'Science' },
    { id: 4, paperId: 'P003', name: 'English' },
    { id: 5, paperId: 'P002', name: 'Science' },
  ];

  const [disabledPaperIds, setDisabledPaperIds] = useState({});

  const handleStart = (paperId) => {
    setDisabledPaperIds((prev) => ({
      ...prev,
      [paperId]: true,
    }));
  };

  return (
    <div>
      <h2>Paper List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Paper ID</th>
            <th>Paper Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((paper) => {
            const isDisabled = !!disabledPaperIds[paper.paperId];
            return (
              <tr key={paper.id}>
                <td>{paper.id}</td>
                <td>{paper.paperId}</td>
                <td>{paper.name}</td>
                <td>
                  <button
                    onClick={() => handleStart(paper.paperId)}
                    disabled={isDisabled}
                    style={{
                      backgroundColor: isDisabled ? '#ccc' : '#4CAF50',
                      color: isDisabled ? '#666' : '#fff',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      padding: '8px 12px',
                      border: 'none',
                      borderRadius: '4px',
                    }}
                  >
                    {isDisabled ? 'Started' : 'Start'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Test;
