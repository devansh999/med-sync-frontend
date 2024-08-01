import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterUser from './components/RegisterUser';
import GetUser from './components/GetUser';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='overflow-hidden'>
      <Navbar />
      <Routes>
        <Route path='/' element={<RegisterUser />} />
        <Route path='/view-records' element={<GetUser />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
