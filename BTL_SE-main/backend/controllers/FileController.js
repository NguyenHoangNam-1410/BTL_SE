import FileRepository from "../repositories/FileRepository.js";

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

            const formattedFiles = files.map(file => ({
                fileId: file.fileId,
                studentId: file.studentId,
                fileTypeId: file.fileTypeId,
                filePath: file.filePath,
                filename: file.filename,
                status: file.status,
                sizeInBytes: file.sizeInBytes,
                uploadAt: file.uploadAt
            }));

            res.status(200).json(formattedFiles);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Failed to fetch files: ${error.message}`
            });
        }
    };

    getAllFiles = async (req, res) => {
        try {
            const files = await this.fileRepository.findAll();
            console.log(files)
            const formattedFiles = files.map(file => ({
                fileId: file.fileId,
                studentId: file.studentId,
                amountPaid: file.amountPaid,
                fileDate: file.fileDate,
                paymentMethod: file.paymentMethod
            }));
            res.status(200).json(formattedFiles);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Failed to fetch files: ${error.message}`
            });
        }
    };


    /**
   * Create file
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
    createFile = async (req, res) => {
        try {
            const {
                file_id,
                student_id,
                file_type_id,
                file_path,
                filename,
                status,
                size_in_bytes
            } = req.body;

            const newFile = await this.fileRepository.create({
                fileId: file_id,
                studentId: student_id,
                fileTypeId: file_type_id,
                filePath: file_path,
                filename: filename,
                status: status.toLowerCase(),
                sizeInBytes: size_in_bytes,
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
    
    deleteFileByID = async (req, res) => {
        try {
            const fileId = parseInt(req.params.file_id);
            const file = await this.fileRepository.delete(fileId);
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
};