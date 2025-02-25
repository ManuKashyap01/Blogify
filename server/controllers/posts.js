import jwt from "jsonwebtoken"
import { Post } from "../models/post.model.js"
export const addPost = async (req,res)=>{
    const {title,desc,img,cat} = req.body
    try {
        const token = req.cookies.token
        if(!token)
            throw new Error("Authentication token is not valid")

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded)
            throw new Error("User not valid!")

        const userId = decoded.userId
        
        const post = new Post({
            title,
            desc,
            img,
            cat,
            userId
        })

        await post.save()

        res.status(201).json({success:true,message:"Post created successfully",post:post})


    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

export const getPost = async(req,res)=>{
    const postId = req.params.id

    try {
        const post = await Post.findOne({ _id: postId }).populate('userId', 'name email userImg')
    
        if(!post)
            throw new Error("Post not found")
        
        res.status(200).json({success:true,post:post})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

export const getPosts = async (req, res) => {
    try {
        const {cat} = req.query
        const query = cat ? {cat:cat} : {}
        const posts = await Post.find(query).populate('userId', 'name email userImg')
        
        res.status(200).json({ success: true, posts: posts })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const deletePost = async (req,res)=>{
    const postId = req.params.id
    try {
        const token = req.cookies.token
        if(!token)
            throw new Error("Authentication token is not valid")

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded)
            throw new Error("User not valid!")

        const deletedPost = await Post.findByIdAndDelete(postId)
        if(!deletedPost)
            throw new Error("Post not found")

        res.status(200).json({success:true,message:"Post has been deleted successfully"});
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }              
}

export const updatePost = async(req,res)=>{
    const postId = req.params.id
    const updateData = req.body
    try {
        const token = req.cookies.token
        if(!token)
            throw new Error("Authentication token is not valid")

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded)
            throw new Error("User not valid!")

        const updatedPost = await Post.findByIdAndUpdate(postId,{$set:updateData},{new:true,runValidators:true})

        if(!updatedPost)
            throw new Error("Post not updated")

        res.status(200).json({success:true,message:"Post updated successfully",post:updatedPost})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}