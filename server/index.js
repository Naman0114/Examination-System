const express = require("express");
const bodyParser = require('body-parser');

const authRouter = require('./routers/authenticationRoute');
const uploadFileRouter = require('./routers/uploadRoute');
const encryptRouter = require('./routers/encryptionRoute');

const cors = require('cors');
const connectedDB = require("./config/db");
const users = require("./routers/route");


const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;
app.use(bodyParser.json());

connectedDB();

app.use('/api',users)

app.use('/api',authRouter);
app.use('/api',uploadFileRouter);
app.use('/api',encryptRouter);

const sendMail=require('./Controller/sendMail');

app.get("/sendemail",sendMail)

app.get('/', (req,res)=>{
      res.send("hello")
})

app.listen(port,()=>{
      console.log("server is start",port);
      
})