import BaseRepository from './BaseRepository.js';
import FilePermitted from '../models/PermittedFileType.js';

/**
 * @extends BaseRepository
 */
class FilePermittedRepository extends BaseRepository {
    /**
     * Khởi tạo một instance
     */
    constructor() {
        super(FilePermitted, 'permitted_file_type');
    }

    /**
     * @returns {Promise<FilePermitted>} 
     * @throws {Error} 
     */
    getFilePermitted = async () => {
        try {

            const permittedFileTypes = await PermittedFileType.showPermittedFileType(this.db);
            return permittedFileTypes.length ? permittedFileTypes[0] : null;

            const [rows] = await this.db.query(
                `SELECT * FROM permitted_file_type ORDER BY file_type_id LIMIT 1`
            );
            
            return rows.length ? new FilePermitted(rows[0]) : FilePermitted.showPermittedFileType();

        } catch (error) {
            console.error(`Error getting permitted file type: ${error.message}`);
            throw new Error(`Failed to retrieve permitted file type: ${error.message}`);
        }

    };

}

export default FilePermittedRepository;