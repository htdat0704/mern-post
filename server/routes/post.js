var express = require('express');
const router = express.Router();
const verifyToken = require('../app/middleware/auth')

const PostController = require('../app/controllers/PostController');

router.post('/create',verifyToken,PostController.createPost)
router.delete('/delete/:id',verifyToken,PostController.deletePost)
router.put('/update/:id',verifyToken,PostController.updatePost)
router.get('/user',verifyToken,PostController.seeUserPost)
router.get('/get/:slug',PostController.getOnePost)
router.get('/',PostController.seePost)

module.exports = router