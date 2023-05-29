import express from 'express'
import cors from 'cors'
import postsRoute from './routes/posts.js'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import { mydb } from './mydb.js'
import cookieParser from 'cookie-parser'
// import multer from 'multer'

const app=express()

// to send data to our database we use express.json()
// express.json() is built-in middleware function. It parses incoming request with JSON payloads
app.use(express.json())

// used to parse cookies coming from the backend
app.use(cookieParser())

// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./uploads/')
//     },
//     filename:function(req,file,cb){
//         cb(null,Date.now()+file.originalname)
//     }
// })

// it will create a folder named uploads to upload images
// const upload=multer({storage})

// set up cors for cross-origin requests. currently, it is set to work with all the cross-origin i.e. '*'
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin:'https://blogigy.netlify.app',
    credentials:true,
}))
// different routes
app.use('/api/posts',postsRoute)
app.use('/api/auth',authRoute)
app.use('/api/users',usersRoute)
app.get('/',(req,res)=>{
    res.status(200).send('Hello from server')
})
// app.post('/api/upload',upload.single('img'),(req,res)=>{
//     const file=req.file.filename
//     // console.log('upload path',file)
//     res.status(200).json(file)
// })

// connected to mysql database to reflect the changes in mysql test bench
mydb.connect((err)=>{
    if(err){
        return console.log('err',err)
    }
    console.log('db connected')
})

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0",()=>{
    console.log('connected')
})
