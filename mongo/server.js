const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3040


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/students')
const db = mongoose.Connection
mongoose.connection.once('open',()=>{
    console.log("Mongodb connection successful")
})

const userschema = new mongoose.Schema({
    username:String,
    email:String,
    regno:String,
    contactno:String,
    branch:String
})

const users = mongoose.model("data",userschema)


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'newregister.html'))
})

app.post('/post',async (req,res)=>{
    const {username,email,regno,contactno,branch} = req.body
    const user = new users({
        username,
        email,
        regno,
        contactno,
        branch
    })
    await user.save()
    console.log(user)
    res.send("Form Submission Successful")
})

app.listen(port,()=>{
    console.log("server started")
})