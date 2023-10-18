const express = require('express');
const mysql = require('mysql');
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const path = require('path');
const port = 4000; 


app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false ,
        maxAge: 1000 * 60 * 60 * 24 
      }
  })
);

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: '',
  database: 'novatec',
});

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  }));

  app.get('/session', (req, res) => {
    if (req.session.user) {
        
       return res.json({
            valid:true ,
            user: req.session.user,
          }); 
    }else{
        return res.json({
            valid:false ,
            user: null,
          });
    }
  });

app.post("/login", function (req, res) {
    const {username,password} = req.body;
   
  
    connection.query(
      "Select * from login where UserName=? and Password=?",
      [username, password],
      (err, result) => {
        if (err) {
          throw err;
        } else {
          if (result.length > 0) { 
            req.session.user =  result[0].UserName; 
            res.json({ success: true});
          } else {
            res.json({
              success: false,
              message: "Incorrect username or password",
            });
          }
        }
      }
    );
  });



  app.post("/logout", (req, res) => {
    req.session.destroy(function (err) {
      if (err) throw err;
      res.json({ success: true, message: "Logout Successful!" });
    });
  });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')},
    filename:  (req, file, cb)=> {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });

  app.post('/addgame', upload.single('image'), (req, res) => {
    const  filenam  = req.file.filename;
    const { gamename,gamedate } = req.body;
    console.log(req.file);
  
    // Save image data in the database (you'll need to create a suitable table)
    const query = 'INSERT INTO games (gamename, gamedate, imageurl) VALUES (?, ?, ?)';
    connection.query(query, [gamename, gamedate, filenam], (err, result) => {
      if (err) {
        console.error('Error saving image data:', err);
        res.status(500).json({ success: false, message: 'Failed to save image data' });
      } else {
        res.json({ success: true, message: 'Image data saved successfully' });
      }
    });
  });
  
  app.get("/", function (req, res) {
    connection.query("Select * from games ", (error, results) => {
      if (error) {
        throw error;
      } else {
        res.json(results);
        console.log(results);
      }
    });
  });

  app.delete("/game/:id", (req, res) => {
    const id = req.params.id;
        const deleteGame = "DELETE FROM games WHERE id = ?";
        connection.query(deleteGame, [id], (error, results) => {
          if (error) throw error;
          res.json({ message: "Successfully deleted" });
        });
      });

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
