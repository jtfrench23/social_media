import express from 'express';
import {commentOnPost, getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
//  Read
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

// Update

router.patch('/:id/like', verifyToken, likePost);
router.patch('/:id/comment', verifyToken, commentOnPost);
export default router;