import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { genTokenAndSaveCookie } from "../utils/jwtTokenAndSaveCookie.js";
export const register = async (req,res)=>{
    const {email,password,name} = req.body
    try {
        if(!email || !password || !name){
            throw new Error("All fields are required!")
        }

        const userExists = await User.findOne({
            $or:[{email},{name}]})
        if(userExists){
            throw new Error("User already exists!")
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const user = new User({
            email:email,
            password:hashedPassword,
            name:name
        })
        await user.save()
        genTokenAndSaveCookie(res,user._id)

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,message:error.message})
    }
}

export const login = async (req,res)=>{
    const {name,password} = req.body
    try {
        const user = await User.findOne({name})
        if(!user)
            throw new Error("Username does not exist!")

        const matchPassword = await bcrypt.compare(password,user.password)
        if(!matchPassword)
            throw new Error("Wrong password!")

        genTokenAndSaveCookie(res,user._id)
        
        res.status(200).json({success:true,message:"Login successful",user:{...user._doc,password:undefined}})
    } catch (error) {
        console.log("Login failed",error)
        res.status(400).json({success:false,message:error.message})
    }
}

export const logout = async (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({success:true,message:"Logout successful"})
}