import React, { useEffect, useState } from 'react';
import Navbar from '../../component/Navbar';
import img1 from "../../assests/image/img1.jpg";
import img2 from "../../assests/image/img2.jpeg";
import img3 from "../../assests/image/img3.png";
import axios from 'axios';
import { format } from "date-fns";
import eng from '../../component/language/English';
import sinhala from '../../component/language/Sinhalaln';


const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [gamedata, setGamedata] = useState([]);
  const [language, setLanguage] = useState("eng");

  const slides = [img1, img2, img3];
  const slideCount = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slideCount);
    }, 10000); 

    return () => {
      clearInterval(interval);
    };
  }, [slideCount]);

  const fetchdata=async () =>{
    try{
    const response = await axios.get("http://localhost:4000/");
    setGamedata(response.data);
    console.log(response.data);
    }catch(err){
      console.log(err);
    }
  }
useEffect(() => {
  fetchdata();
}, []);


const content = language === "eng" ? eng : sinhala;

const handleLanguageToggle = () => {
  setLanguage(prevLanguage => (prevLanguage === "eng" ? "sinhala" : "eng"));
};

  return (
    <div>
      <Navbar 
      language={language}
      onLanguageToggle={handleLanguageToggle}
      />

      <div className="carousel slide" data-bs-ride="false" id="carousel-1">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div key={index} className={`carousel-item${index === activeSlide ? ' active' : ''}`}>
              <img className="w-100 d-block" src={slide} alt="Slide Image" style={{ textShadow: '0px 0px' }} />
            </div>
          ))}
        </div>
      
      </div>
     <p className="form-control-plaintext d-lg-flex justify-content-center align-items-center justify-content-lg-center" 
      style={{textAlign: 'center', fontSize: 36, padding: '14px 0px'}} >
      {content.greeting} 
</p>
<div className="container py-4 py-xl-5">
  <div className="row mb-5">
    <div className="mx-auto">
      <h2 >{content.upcome}</h2>
    </div>
  </div>
  <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
    {gamedata.map((row) => (
    <div className="col" key={row.id}>
      <div className="card">
        <img className="card-img-top w-100 d-block fit-cover" style={{height: 200}} src={`http://localhost:4000/images/${row.imageurl}`} />
        <div className="card-body p-4 d-flex" style={{justifyContent:"space-between"}}>
          <p className="text-primary card-text mb-0">{row.gamename}</p>
          <p className="card-text">
          {format(new Date(row.gamedate),'dd MMM yyyy')}
          </p>
        </div>
      </div>
    </div>
    ))}
    
  </div>
</div>

    </div>
  );
};

export default Home;
