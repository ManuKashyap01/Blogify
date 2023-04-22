import { mydb } from "../mydb.js"
import jwt from 'jsonwebtoken'
export const getPosts=(req,res)=>{
    const q=req.query.cat
        ?'select * from posts where cat = ?'
        :'select * from posts'
    
        mydb.query(q,[req.query.cat],(err,data)=>{
            if(err) return res.status(500).json(err)

            return res.status(200).json(data)
        })
}
export const getPost=(req,res)=>{
    const id=req.params.id
    const q="select u.username,p.id,u.img as userimg,p.title,p.desc,p.img,p.cat,p.date from users as u join posts as p on u.id=p.uid where p.id = ?"
    mydb.query(q,[id],(err,data)=>{
        if(err) return res.status(500).json('post not found',err);
        return res.status(200).json(data[0])
    })
}
export const addPost=(req,res)=>{
    res.json('from controller')
}
export const deletePost=(req,res)=>{
    // check for authentication using cookies
    const token=req.cookies.access_token
    if(!token) return res.status(401).json('Not authenticated')

    // verify valid jsonwebtoken
    jwt.verify(token,'secretkey',(err,userdata)=>{
        if(err) return res.status(403).json('Token is not valid',err)

        const id=req.params.id
        const q='delete from posts where id = ? and uid = ?'

        mydb.query(q,[id,userdata.id],(err,data)=>{
            if(err) return res.status(403).json('You cannot delete this post',err)

            return res.json('Your post has been deleted')
        })
    })

}
export const updatePost=(req,res)=>{
    res.json('from controller')
}