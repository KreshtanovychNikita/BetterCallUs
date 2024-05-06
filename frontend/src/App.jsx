// frontend/src/App.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HeroSection from './components/Main/HeroSection';
import MainSection from './components/Main/MainSection';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';
import Order from './components/Order/Order';
import LogIn from './components/Login/LogIn';
import Cabinet from './components/Cabinet/Cabinet';
import Orders from './components/Cabinet/Orders';
import CalculationPage from './components/Order/CalculationPage';

function App() {
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //  const {data} =  axios.get('http://localhost:3005')
  //    console.log(data)
  // }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainSection /> <HeroSection />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/cabinet" element={<Cabinet />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/calculation" element={<CalculationPage />} />
          <Route path="*" element={<h1>Такої сторінки не існує!</h1>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;