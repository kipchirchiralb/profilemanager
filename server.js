const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const upload = multer({
    dest: "profileImages/"
})

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'profilemanager'
})
db.connect((error)=>{
    if(error){
        console.log(error.message)
    }else{
        console.log("Connection to DB successful!!")
    }
})

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render('index')
})
app.post("/new-profile", upload.single("profileimage"), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.render('profiles')
})

app.listen(3000, ()=>console.log("server listening to port 3000"))