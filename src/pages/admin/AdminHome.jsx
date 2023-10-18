import React,{useState,useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from "../../component/Sidebar";
import { format } from "date-fns";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import axios from "axios";


const AdminHome = () => {
  const [open, setopen] = useState(false);
  const [whologedin,setWhologedin]=useState('');
  const [gamename,setGamename]=useState('');
  const [gamedate,setGamedate]=useState('');
  const [image,setimage]=useState('');
  const [gamedata, setGamedata] = useState([]);
  const [search, setSearch] = useState('');

 

  const handleClose = () => {
    setopen(false);
  };

  const handlclickopen = () => {
    setopen(true);
  };

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:4000/session')
    .then(res =>{
  if (res.data.valid) {
    console.log(res.data.user);
    setWhologedin(res.data.user);
   
  }else{
    window.location.href='/';
  }
    })
    .catch(err=> console.log(err));
  },[]);

  const handleimage=(e)=>{
    const file=e.target.files[0];
    setimage(file);
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('gamename', gamename);
    formData.append('gamedate', gamedate);
    console.log(image);
    try{
    const response=await axios.post('http://localhost:4000/addgame',formData);
    if (response.data.success===true) {
      toast.success('Data Added Successfully',{position: "top-center",autoClose:2000});
      fetchdata();
      setTimeout(() => {
        handleClose();
      }, 2000);
      
    }else{
      alert('failed');
    }
    }catch(err){
      console.log(err);
    }
  } 

  
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
 
  const handldelete = (id) => {
    axios.delete(`http://localhost:4000/game/${id}`)
      .then((res) => {
        console.log(res.data);
        fetchdata();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredGameData = gamedata.filter((game) =>
  game.gamename.toLowerCase().includes(search.toLowerCase())
);


  return (
     <>
     <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Item Order</DialogTitle>
        <DialogContent>
          <InputLabel >Game Name</InputLabel>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label=""
            type="text"
            onChange={(e)=>{setGamename(e.target.value)}}
            fullWidth />
          <InputLabel >Game Date</InputLabel>
          <TextField
            margin="dense"
            type="date"
            label=""
            onChange={(e)=>{setGamedate(e.target.value)}}
            fullWidth />
          <InputLabel >Game Image</InputLabel>
          <TextField
          margin="dense"
            type="file"
            label=""
           onChange={handleimage}
            fullWidth />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
    
        <Sidebar username={whologedin}/>
        <div className="d-flex flex-column mt-4 mx-auto" id="content-wrapper">
          <div id="content">
            <h3 className="text-dark mb-4" style={{ marginLeft: 28 }}>Manage Games</h3>
            <input className="bg-light border-0 small" type="text" placeholder="Search for ..." 
            style={{ background: 'rgb(255, 255, 255)', height: 38, marginLeft: 28, width: "20%" }} 
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}/>
            <button className="btn btn-primary" onClick={handlclickopen} style={{ marginLeft: '10px' }}>Add New Game</button>
            <div className="container-fluid">
              <div className="card shadow" style={{ marginTop: 20 }}>
                <div className="card-header py-3" style={{ marginTop: 0 }}>
                  <p className="text-primary m-0 fw-bold" />
                </div>
                <div className="card-body">
                  <div className="table-responsive table mt-2" id="dataTable" role="grid">
                    <table className="table  mx-auto" id="dataTable">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Game Name</th>
                          <th>Game Date</th>
                          <th>Image</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredGameData.map((row) => (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row.gamename}</td>
                          <td>{format(new Date(row.gamedate),'dd MMM yyyy')}</td>
                          <td>
                            <img src={`http://localhost:4000/images/${row.imageurl}`} alt="" style={{width:'60px',height:'50px'}} />
                          </td>
                          <td>
                            <button className="btn btn-danger" onClick={() => handldelete(row.id)}>Delete</button>
                          </td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default AdminHome;
