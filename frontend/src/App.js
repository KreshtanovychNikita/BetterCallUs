// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
   const {data} =  axios.get('http://localhost:3005')
     console.log(data)
  }, []);

  return (
    <div className="App">
      <h1>Повідомлення з сервера:</h1>
      <h1>Повідомлення з сервера:</h1>
      <h1>Повідомлення з сервера:</h1>
      <p>data</p>
    </div>
  );
}

export default App;
