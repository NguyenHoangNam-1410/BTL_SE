import express from 'express';
import FileController from '../controllers/FileController.js';

const router = express.Router();

// File routes
router.get('/api/files/uploadpermit', FileController.getUploadPermit);
router.post('/api/files/upload', FileController.uploadFile);
router.get('/api/files', FileController.getAllFilesByStudentId);
router.delete('/api/files/:file_id', FileController.deleteFile);