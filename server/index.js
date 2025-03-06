const express = require("express");
const bodyParser = require('body-parser');

const cors = require('cors');
const connectedDB = require("./config/db")
const users = require("./routers/route")
const add = require("./routers/route")


const app = express();
//body parser
app.use(cors());
app.use(express.json());

const port = 3000;
app.use(bodyParser.json());

connectedDB();

app.use('/api',users)

const sendMail=require('./Controller/sendMail');

app.get("/sendemail",sendMail)

app.get('/', (req,res)=>{
      res.send("hello")
})

app.listen(port,()=>{
      console.log("server is start",port);
      
})