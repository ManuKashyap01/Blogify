import {mydb} from '../mydb.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const register=(req,res)=>{
    // CHECK IF USER ALREADY EXISTS
    const q='select * from users where email = ? or username = ?'

    mydb.query(q,[req.body.email,req.body.username],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json('User already exists!')

        // Hashing the password using bcryptjs and creating the user
        const salt=bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(req.body.password,salt)

        const q='insert into users(`username`,`email`,`password`) values (?)'
        const values=[
            req.body.username,
            req.body.email,
            hash
        ]

        mydb.query(q,[values],(err,data)=>{
            if(err) return res.json(err)
            return res.status(200).json('User created successfully')
        })
    })
}
export const login=(req,res)=>{
    // CHECK IF USER EXISTS
    const q='select * from users where username = ?'
    mydb.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err)
        if(data.length === 0) return res.status(404).json('User not found!')

        // CHECK PASSWORD
        // data is an array of objects which contains the user info and we this info to compare the passwords
        const isPasswordCorrect=bcrypt.compareSync(req.body.password,data[0].password)
        if(!isPasswordCorrect) return res.status(400).json('Wrong username or password')
        
        // jwt is used to generate a token that is unique to user id
        const token=jwt.sign({id:data[0].id},'secretkey')
        // separating password from userdata that is to be sent to the client
        const {password,...userdata}=data[0]
        // userdata['access_token']=token
        res.cookie('access_token',token,{
            httpOnly:true
        })
        res.status(200).json(userdata)
        // return res.status(200).json(data)
    })
}
export const logout=(req,res)=>{
    res.clearCookie('access_token',{
        sameSite:'none',
        secure:true
    }).status(200).json('User logged out')
}