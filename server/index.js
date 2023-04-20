import express from 'express'
import cors from 'cors'
import postsRoute from './routes/posts.js'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import { mydb } from './mydb.js'
import cookieParser from 'cookie-parser'
const app=express()

// to send data to our database we use express.json()
// express.json() is built-in middleware function. It parses incoming request with JSON payloads
app.use(express.json())

// used to parse cookies coming from the backend
app.use(cookieParser())


// set up cors for cross-origin requests. currently, it is set to work with all the cross-origin i.e. '*'
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin:'http://127.0.0.1:5173',
    credentials:true,
}))
// different routes
app.use('/api/posts',postsRoute)
app.use('/api/auth',authRoute)
app.use('/api/users',usersRoute)

// connected to mysql database to reflect the changes in mysql test bench
mydb.connect((err)=>{
    if(err){
        return console.log('err',err)
    }
    console.log('db connected')
})
app.listen(8080,()=>{
    console.log('connected')
})