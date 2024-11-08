// steps to define express server
// loads .env file contents intp process.env
require('dotenv').config()
const express =require('express')
const cors =require('cors')
const pfServer=express()
const router = require('./routes/router')
require('./database/dbConnection')

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 ||process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`pfServer started at running ${PORT}`);
    
})

pfServer.get('/',(req,res)=>{
res.status(200).send(`<h1 style="color:red;">pfServer started at running ${PORT}!!!</h1>`)
})