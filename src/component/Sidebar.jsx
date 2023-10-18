import React from 'react'
import logoimg from '../assests/image/logo.png'
import axios from 'axios';
import { RiCustomerService2Fill } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";

const Sidebar = ({username}) => {

    const handleLogout = async () => {
        try {
          const response = await axios.post('http://localhost:4000/logout');
          if (response.data.success === true) {
            window.location.href = '/login'; 
          } else {
            console.log('Logout failed:', response.data.message);
          }
        } catch (err) {
          console.log('Logout error:', err);
        }
      };

  return (
   
       <><nav className="navbar navbar-light navbar-expand-md" style={{ background: '#000000' }}>
          <div className="container-fluid">
              <img src={logoimg} alt="" />
              <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                  <span className="visually-hidden">Toggle navigation</span>
                  <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse justify-content-between" id="navcol-1" style={{ background: '#000000' }}>
                  <ul className="navbar-nav">
                   
                      <h3 style={{ marginLeft: "50px", color: "white" }}>Welcome {username}</h3>
                  </ul>
                  <ul className="navbar-nav d-flex float-start">
                     
                      <li className="nav-item">
                        <a className="nav-link" style={{ color: 'rgba(255, 255, 255, 0.9)' }} href="#" onClick={handleLogout}>LogOut</a>
                      </li>

                  </ul>
              </div>
          </div>
      </nav>
      <div className="d-flex flex-column mx-auto" style={{float:"left"}} >
              <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion "
                  style={{ height: "100vh" ,background:"gray"}}>
                  <div className="container-fluid d-flex flex-column p-0">
                      <hr className="sidebar-divider my-0" />
                      <ul className="navbar-nav text-light" id="accordionSidebar">
                          <li className="nav-item mt-3">
                              <button className="nav-link active mb-2" style={{border:'none',background:'transparent'}}>
                              <i class="fas fa-gamepad" style={{marginLeft:'10px'}}/>
                                  <span style={{marginLeft:'10px'}}>Games</span>
                              </button>
                              <button className="nav-link active mb-2" style={{border:'none',background:'transparent'}}>
                                 <RiCustomerService2Fill  style={{marginLeft:'10px'}}/>
                                  <span style={{marginLeft:'10px'}}>Customer</span>
                              </button>
                              <button className="nav-link active mb-2" style={{border:'none',background:'transparent'}}>
                              <i class="fas fa-clipboard" style={{marginLeft:'10px'}}/>
                                  <span style={{marginLeft:'15px'}}>Reports</span>
                              </button>
                            
                              <button className="nav-link active " style={{ marginRight: "100px" ,border:"none", background:'transparent',}} 
                              onClick={handleLogout}>
                              <AiOutlineLogout  style={{marginLeft:'10px'}}/>
                                  <span style={{marginLeft:'10px'}}  >LogOut</span>
                              </button>
                          </li>
                      </ul>
                      <div className="text-center d-none d-md-inline" />
                  </div>
              </nav>
          </div></>
   
  )
}

export default Sidebar
