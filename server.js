require('dotenv').config()
const routes = require('./routes')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const PORT = process.env.PORT || 3001
const app = express()

mongoose.connect(process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017/social-network-api',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.set('debug',true)
app.listen(PORT,()=>console.log(`Server is now listening on ${PORT}`))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use(routes)