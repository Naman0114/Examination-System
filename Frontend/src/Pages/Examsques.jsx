import React from 'react'
import { useLocation } from 'react-router-dom';

function Examsques() {
  const location = useLocation();
  const { name, age } = location.state || {};
  return (
    <div>
        <h1>exam Ques</h1>
        <h1>Next Page</h1>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
    </div>
  )
}

export default Examsques