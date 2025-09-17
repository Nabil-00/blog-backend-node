import express from 'express';
import { addComment, listComments } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', addComment);
router.get('/:post_id', listComments);

export default router;
