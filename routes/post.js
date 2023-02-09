const router = require("express").Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');


router.post('/post', async (req, res) => {
    try {
        console.log(req.body);
        const newPost = new Post(req.body);
        console.log('newPost', newPost);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }
    
})

router.put('/post/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        if (req.body.username === post.username) {
            const updatedPost = await Post.findByIdAndUpdate(req.params.postId,
            { ...req.body }, { new: true})
            res.status(200).json(updatedPost);
        } else {
            res.status(401).json("You can update your posts only")
        }    
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/post/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (req.body.username === post.username) {
            await Post.findByIdAndDelete(req.params.postId);
            res.status(200).json('post deleted successfully');
        } else {
            res.status(401).json("You can delete your posts only")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})
router.get('/post/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})
router.get('/post', async (req, res) => {
    const user = req.query.username;
    const category = req.query.category;
    try {
        let posts;
        if (user) {
            console.log(user);
            posts = await Post.find({username: user })
        } else if (category) {
            console.log(typeof category);
            try {
                posts = await Post.find({categories:{
                    $in:[category]
                }})
                // in postman in body :  "categories": ["sport"]
            } catch (err) {
                console.log('err', err);
                res.status(500).json(err);
            }
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;