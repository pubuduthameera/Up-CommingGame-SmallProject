import React, { useState,useEffect } from 'react'
import Navbar from '../../component/Navbar'
import axios from 'axios';
import Asd from '../../component/Asd';
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [language, setLanguage] = useState("eng");
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;
  const handleSubmit=(e)=>{
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:4000/login',{
      username: username,
    password: password
})
    .then((response)=>{
      if(response.data.success==true){
        setTimeout(() => {
          setLoading(false);
         window.location.href='/admin';
        }, 2000);
      }else{ 
      setLoading(false);
      toast.error('Your account login details are wrong! Please try again”',{position: "top-center",autoClose:2000});
      } 
    }).catch((err)=>{
      console.log(err);
    })

  }
  const handleLanguageToggle = () => {
    setLanguage(prevLanguage => (prevLanguage === "eng" ? "sinhala" : "eng"));
  };

  useEffect(() => {
  
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);



  return (
    <div>
    <Navbar 
      language={language}
      onLanguageToggle={handleLanguageToggle}
      />
     {loading ? (
     <Asd/> 
     ):(
      <section className="py-4 py-xl-5">
  <div className="container">
 
    <div className="row d-flex justify-content-center" style={{marginTop: 58}}>
      <div className="col-md-6 col-xl-4">
        <div className="card mb-5">
          <div className="card-body d-flex flex-column align-items-center" style={{marginTop: 37}}>
            <p className="fs-4 fw-bold text-success">Welcome Back</p>
            <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
            <FaUserCircle style={{fontSize:'75px'}}/>
            </div>
            <form className="text-center" onSubmit={handleSubmit} style={{width: '250.8px'}}>
              <div className="mb-3">
                <input className="form-control" type="text" required  placeholder="UserName" onChange={(e)=>{setUsername(e.target.value)}}/>
              </div>
              <div className="mb-3">
                <input className="form-control" type="password" name="password" required placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary d-block w-100" type="submit" style={{background: 'rgb(57, 154, 102)'}}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
     
  </div>
</section>
     )}
    </div>
  )
}

export default Login
