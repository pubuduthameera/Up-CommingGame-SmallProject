import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from './pages/admin/AdminHome';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<AdminHome/>} />

        
      </Routes>
    </Router>
   </>
  );
}

export default App;
