import express from 'express';
import FileController from '../controllers/FileController.js';
import PermittedFileTypeController from '../controllers/FilePermittedController.js';

const router = express.Router();

// File routes
router.get('/api/files/uploadpermit', PermittedFileTypeController.getFileTypePerrmited);

router.post('/api/files/upload', FileController.uploadFile);
router.get('/api/files', FileController.getAllFilesByStudentId);
router.delete('/api/files/:student_id', FileController.deleteFileByStudentId);