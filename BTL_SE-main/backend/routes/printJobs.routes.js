import express from 'express';
import PrintJobController from '../controllers/PrintJobController.js';

const router = express.Router();

// Print job routes
router.post('/print-jobs', PrintJobController.createPrintJob);
router.get('/print-jobs/:student_id', PrintJobController.getPrintJobByID); 
router.get('/print-jobs', PrintJobController.getAllPrintJobs); 

export default router;