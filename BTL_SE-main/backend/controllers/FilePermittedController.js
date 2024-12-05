import FilePermittedRepository from "../repositories/FilePermittedRepository.js";

/**
 * Controller handling print configuration operations
 */
class FilePermittedController {
    constructor() {
        this.filePermittedRepository = new FilePermittedRepository();
    }

    async getFileTypePerrmited(req, res) {
        try {
            const fileType = await this.filePermittedRepository.getFilePermitted();
            
            return res.status(200).json({
                file_type_id: fileType.file_type_id,
                mime_type: fileType.mime_type
            });
        } catch (error) {
            console.error(`Error in getFileTypePermitted: ${error.message}`);
            res.status(500).json({
                success: false,
                message: `Failed to fetch file type permitted: ${error.message}`
            });
        }
    }
}

export default  new FilePermittedController();