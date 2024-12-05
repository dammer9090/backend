const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const router = require('./routes/router');
app.use(router);

app.use(express.static(path.join(__dirname, 'public'))) 
app.use(express.static(path.join(__dirname, 'public', 'views'))) 

const DBconnect = require("./database/mongodb");
DBconnect();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

app.get('/',(req, res) => {
  res.render('index');   
}) 
 
app.get('/CreateClub',(req, res) => {
  res.render('CreateClub');   
})

app.get('/updateClub',(req, res) => {
  res.render('updateClub');   
})


 
app.listen(4000, () => {
  console.log("server listening on http://127.0.0.1:4000", 4000);
});


 