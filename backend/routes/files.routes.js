import express from 'express';
import FileController from '../controllers/FileController.js';

import PermittedFileTypeController from '../controllers/FilePermittedController.js';


const router = express.Router();


router.get('/files/uploadpermit', PermittedFileTypeController.getFileTypePerrmited); // oke
router.post('/files/upload', FileController.uploadFile); //  oke
router.get('/files/:student_id', FileController.getAllFilesByStudentId); // oke 
// router.delete('/files/:student_id', FileController.deleteFileByStudentId);   
router.delete('/files/:file_id', FileController.deleteFileByFileId);   

export default router;
