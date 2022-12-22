const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'/public/images/profileImages'))
    },
    filename: function (req, file, cb) {
      const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePreffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

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
// app.use(express.static("public"))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/profiles', (req, res) => {
    db.query(`SELECT * FROM profiles`, (err, result)=>{
        res.render('profiles', {profiles: result})                
    })
})

app.post("/new-profile", upload.single("profileimage"), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    let sql = `INSERT INTO profiles(fullName, email,imageOriginalName, imageName, bio) VALUES('${req.body.fullname}','${req.body.email}','${req.file.originalname}','${req.file.filename}','${req.body.bio}')`
    db.query(sql, (err)=>{
        if(err){
            res.redirect('/')
        }else{
            res.redirect('/profiles')
        }
    })
})

app.listen(3000, ()=>console.log("server listening to port 3000"))