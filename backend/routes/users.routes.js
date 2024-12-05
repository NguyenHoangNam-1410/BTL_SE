import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

// User routes
// router.get('/users/:user_id', UserController.getUsersByID);  
router.get('/users/:username', UserController.getUsersByUsername);  
export default router;