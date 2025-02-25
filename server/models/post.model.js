import mongoose from "mongoose";
import { User } from "./user.model.js";
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    img:String,
    cat:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    }
},{timestamps:true})

export const Post = mongoose.model('Post',postSchema)