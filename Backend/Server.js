const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser') 
const {topRouter} = require('./Routes/Tops.routes')
const {startDatabase,isConnected} = require('./config/connection')
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.get("/",(req,res) =>{
    res.send("Hello world");
});
app.use(topRouter)
app.get('/', (req, res) => {
  res.send({message:'Welcome to the amazing world of Journal'})
})
app.get('/home', (req, res) => {
  res.json({
    message: isConnected() ? 'Database is connected' : 'Disconnected from database'
  })
  })
app.get('/ping',(req,res)=>{
    res.send({message:'pong!, Welcome to the amazing world of Journaling'})
})

startDatabase()
.then(()=>{
  app.listen(3000,async()=>{
    console.log('Starting Server ....🚀')
    console.log('Server started running on port 3000 🏃‍♂️')
})
})


