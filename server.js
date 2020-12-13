//start server 
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.listen(3000,function(){
  console.log("connection established");
})
//mongodb connection
var db 
const MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'
MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology: true},(err, client) => {
  if (err) return console.log(err)
  console.log('##### database connection successful #####')
  db = client.db('nodeProject')
})
//home page
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
//checking login credentials 
app.post('/login',(req,res)=>{
    var query = {"phoneNumber": req.body.phoneNumber,"password": req.body.password};
    db.collection('users').findOne(query,(err,results)=>{
        if(err){
            return console.log(err);
        }
        console.log(results);
        if(results == null){
            console.error(new Error(`no user  found`));
            return res.end("No user Found");
        }
        res.redirect("/welcome")
    })
})
app.get('/loginUser',(req,res)=>{
    res.sendFile(__dirname+'/loginUser.html');
})
//Registeration of user
app.get('/register',(req,res)=>{
  res.sendFile(__dirname+"/registerUser.html");
})
app.post('/submit',(req,res)=>{
  console.log(req.body)
  db.collection('users').save(req.body,(error,result)=>{
    if(error) return console.log(error)
    console.log("collection inserted")
    res.redirect('/');
  })
})
app.get('/welcome',(req,res)=>{
    res.sendFile(__dirname+"/welcome.html");
}) 