const express = require("express")
const productRouter = require("./routes/products")
const authRouter = require("./routes/auth")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const verifyToken = require("./middleware/verifyToken")
require("dotenv").config();

const app = express();

//db
const MONGO_URI = `mongodb+srv://root:${process.env.DB_PASSWORD}@cluster0.ralsg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(MONGO_URI, (err)=>{
    if(err){
        console.log(err);
    } else {
        console.log("connected to database");
    }
})

//app.use
app.use("/v1/products",verifyToken,productRouter)
app.use("/auth",authRouter)
app.use(bodyParser.json())
app.use(cors());

//main page
app.get("/",(req,res)=>{
    res.send("hello world!")
})

const port=3002
app.listen(port, ()=>{
    console.log("port is running on " + port);
})