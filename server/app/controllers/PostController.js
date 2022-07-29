const Post = require('../models/Post')
const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const Comment = require('../models/Comment')

class PostController {
    async createPost(req,res,next){
        const {title, description,url, status} = req.body;
        console.log(req.body);
        console.log(req.userId);

        if(!title){
            return res.status(400).json({success: false, message: 'Missing Tittle'})
        }

        try{
            const newPost = new Post({
                title,
                description,
                url: url,
                status: status || 'TRAVEL',
                user: req.userId
            })

            await newPost.save()
                
            const user = await User.findOne({_id: req.userId}).lean()
            const postFind = await Post.findOne({title: title}).lean()

            const postOut = {
                ...postFind,
                username: user.username
            }

            console.log(postOut)
            
            res.json({success: true, message: "Welcome to Post HEAR", postOut})
        }catch(e){
            console.log(e)
            return res.status(400).json({success: false, message: "ERROR"})
        }
    }

   seePost = async (req,res,next) => {
        try{
            const posts = await Post.find({}).lean()
            const users = await User.find({}).lean()
            const postHaveUser = await posts.map( post => {
                let username = null;
                users.forEach( user => {
                    if (user._id.equals(post.user)){
                        username = user.username
                    }
                })
                return {
                    ...post,
                    username
                }
            })
            res.json({success: true, postHaveUser})
        }catch(error){
            console.log(error)
            return res.status(400).json({success: false, message: "ERROR"})
        }
    }

    seeUserPost = async (req,res,next) => {
        try{
            const posts = await Post.find({ user: req.userId }).populate('user', [
                'username'
            ])
            res.json({success: true, posts})
        }catch(error){
            console.log(error)
            return res.status(500).json({success: false, message: "ERROR"})
        }
    }

    updatePost = async (req,res) =>{
        const { title, description, url, status } = req.body

	    // Simple validation
        if (!title)
            return res
                .status(400)
                .json({ success: false, message: 'Title is required' })

        try {
            let updatedPost = {
                title,
                description: description || '',
                url: url || '',
                status: status || 'TRAVEL'
            }

            const postUpdateCondition = { _id: req.params.id, user: req.userId }

            updatedPost = await Post.findOneAndUpdate(
                postUpdateCondition,
                updatedPost,
                { new: true }
            )

            // User not authorised to update post or post not found
            if (!updatedPost)
                return res.status(401).json({
                    success: false,
                    message: 'Post not found or user not authorised',
                })

            const postFind = await Post.findOne({_id: req.params.id}).populate('user', [
                    'username'
            ])
            
            res.json({
                success: true,
                message: 'Excellent progress!',
                post: postFind
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    deletePost = async (req,res) => {
        try{
            const postDeleteCondition = { _id: req.params.id, user: req.userId }
            const deletedPost = await Post.findOneAndDelete(postDeleteCondition)
            if (!deletedPost)
                return res.status(401).json({
                    success: false,
                    message: 'Post not found or user not authorised'
                })
            res.json({ success: true, post: deletedPost }) 
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message:'Interal server error'})
        }
    }

    getOnePost = async (req,res) => {
        try{
            const postFind = await Post.findOne({slug: req.params.slug}).populate('user', [
                'username'
            ])
            const commentFind = await Comment.find({post: postFind._id}).populate('user',[
                'username'
            ])
            res.json({success: true, postFind, commentFind})
        }catch(e){
            console.log(err)
            res.status(500).json({success: false, message:'Interal server error'})
        }
    }

    addComment = async (req,res) => {
        const {body, parentId, postId} = req.body;
        try{
            const newComment = new Comment({
                body,
                parentId: parentId || null,
                user: req.userId,
                post: postId
            })
            newComment.save()
            const postFind = await Post.findOne({_id: postId})
            const commentFind = await Comment.find({post: postFind._id}).populate('user',[
                'username'
            ])
            
            res.json({success: true, commentFind})
        }catch(e){
            console.log(e)
            res.status(500).json({success: false, message:'ERROR'})
        }
    }

    deleteComment = async (req,res) => {
        try{
            const commentDeleteCondition = { _id: req.params.id, user: req.userId }
            const findCommentDelete = await Comment.findOne({_id: req.params.id}).lean()
            const deleteChildComment = await Comment.deleteMany({parentId : findCommentDelete._id })
            const deleteComment = await Comment.findOneAndDelete(commentDeleteCondition)
            if (!deleteComment || !deleteChildComment)
                return res.status(401).json({
                    success: false,
                    message: 'Comment not found or user not authorised'
                })
            res.json({ success: true }) 
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message:'Interal server error'})
        }
    }

    updateComment = async (req,res) => {
    
        const { body } = req.body
        console.log(body)

        if(!body){
            console.log(body)
            return res.status(401).json({
                success: true,
                message: 'No comment update',
            })
        }

        try {
            let updatedComment = {
                body,
            }
            
            const commentUpdateCondition = { _id: req.params.id }
    
            updatedComment = await Comment.findOneAndUpdate(
                commentUpdateCondition,
                updatedComment,
                { new: true }
            )

            // User not authorised to update post or post not found
            if (!updatedComment)
                return res.status(401).json({
                    success: false,
                    message: 'Post not found or user not authorised',
                })
    
            res.json({
                success: true,
                message: 'Excellent progress!',
                comment: updatedComment
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
            
        
    }
}

module.exports = new PostController()