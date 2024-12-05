import FileRepository from "../repositories/FileRepository.js";

// const fs = require('fs');
import fs from 'fs'


function getFileSizeInBytes(filePath) {
    const stats = fs.statSync(filePath);
    return stats.size;
}


/**
 * Controller handling File-related operations
 */
class FileController {
    constructor() {
        this.fileRepository = new FileRepository();
    }

    /**
     * Get file by id
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getAllFilesByStudentId = async (req, res) => {
        try {
            const studentId = parseInt(req.params.student_id);
            const files = await this.fileRepository.findByStudentId(studentId);
            

            if (files.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No files found for this student"
                });
            }
            
            // const formattedFiles = files.map(file => ({
            //     fileId: file.fileId,
            //     studentId: file.studentId,
            //     fileTypeId: file.fileTypeId,
            //     filePath: file.filePath,
            //     filename: file.filename,
            //     status: file.status,
            //     sizeInBytes: getFileSizeInBytes(file_path),
            //     uploadAt: new Date()
            // }));

            res.status(200).json(files);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Failed to fetch files: ${error.message}`
            });
        }
    };

    /**
   * Upload file
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
    uploadFile = async (req, res) => {
        try {
            const {
                student_id,
                file_type_id,
                file_path,
                filename
            } = req.body;


            const newFile = await this.fileRepository.create({
                student_id: student_id,
                file_type_id: file_type_id,
                file_path: file_path,
                filename: filename,
                upload_at: new Date()
            });

            res.status(200).json({
                success: true,
                message: "File created successfully",
                file: newFile
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Failed to create file: ${error.message}`
            })
        }
    };


    /**
   * Delete file
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
    deleteFileByStudentId = async (req, res) => {
        try {
            const studentId = parseInt(req.params.student_id);
            const file = await this.fileRepository.deleteByStudentId(studentId);
            if (!file) {
                return res.status(404).json({
                    success: false,
                    message: "File not found"
                })
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Failed to fetch file: ${error.message}`
            })
        }
    };

     /**
   * Delete file
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
    deleteFileByFileId = async (req, res) => {
        try {
            const fileId = parseInt(req.params.file_id);
            const file = await this.fileRepository.deleteByFileId(fileId);
            if (!file) {
                return res.status(404).json({
                    success: false,
                    message: "File not found"
                })
            }

            res.status(200).json({
                success:true,
                message:"File deleted successfully"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Failed to fetch file: ${error.message}`
            })
        }
    };


};

export default new FileController();