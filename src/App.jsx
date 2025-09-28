import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AOS from "aos";
import "aos/dist/aos.css";
import Subscription from './Pages/Subscription';
import { ToastContainer } from 'react-toastify';

const App = () => {
   useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,     
      offset: 100,   
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </Router>
       <ToastContainer
        position="top-center" // 👈 change to top-center if you want it at the top middle
        autoClose={2000}
        newestOnTop
      />
    </>
  );
}

export default App;
