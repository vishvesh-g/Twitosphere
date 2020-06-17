const express=require('express')
var path=require('path');
var bodyParser = require('body-parser');
var spawn = require("child_process").spawn; 
let {PythonShell} = require('python-shell')
let pyshell = new PythonShell('model.py');


var app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(express.static(path.join(__dirname,'public')));
app.engine('.html',require('ejs').__express);
app.set('views',__dirname+'/views');
app.set('view engine','html');


app.get('/',function(req,res){
    res.render('index');
});

app.get('/upload',function(req,res){
  res.render('index');
});

app.post('/upload', function(req, res) {
   console.log(req.body.data);
   pyshell.send(req.body.data);
   pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
    res.send(message);
  });
  pyshell.end(function (err,code,signal) {
    if (err) throw err;
    console.log('finished');
  });
  });

const port=8000;
app.listen(port,()=>console.log(`Server Started on port${port}`));
