const Post = require('../models/Post')
const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

class PostController {
    async createPost(req,res,next){
        const {title, description,url, status} = req.body;

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
            
            res.json({success: true, message: "Welcome to LEARN HEAR", postOut})
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

		res.json({
			success: true,
			message: 'Excellent progress!',
			post: updatedPost
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
            res.json({success: true, postFind})
        }catch(e){
            console.log(err)
            res.status(500).json({success: false, message:'Interal server error'})
        }
    }
}

module.exports = new PostController()