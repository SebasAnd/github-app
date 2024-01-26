const express = require('express')
var bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 3000
const axios = require('axios');
const cors = require('cors');
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(bodyParser.json());

app.use(cors(corsOptions));

app.get('/', async (req, res) => {
  try {
    let apiUrl="";
    console.log(req)
    if(req.query.user){
      apiUrl = "https://api.github.com/search/repositories?q="+req.query.user+"&stars:>=1&sort=stars&order=desc&per_page=5";
    }else{
      apiUrl = "https://api.github.com/search/repositories?q="+"google"+"&stars:>=1&sort=stars&order=desc&per_page=5";
    }
    await axios.get(apiUrl)
    .then(ret => {
      res.send(JSON.stringify(ret.data))        
    })
    .catch(err => {
      console.log('Error: ', err);
    });    
  } catch (error) {
    res.send({'error':error}); 
  }
})

app.get('/oddarray', async (req, res) => {
  try {
    let returnArray = [];
    let limit = parseInt(req.query.limit);
    for(let i = 1; i <= limit; i++){
      if(i%2 != 0){
        returnArray.push(i);
      }
    }
    res.send(JSON.stringify(returnArray))  
  } catch (error) {
    res.send({'error':error}); 
  }
})



/*
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, POST"
}*/




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})