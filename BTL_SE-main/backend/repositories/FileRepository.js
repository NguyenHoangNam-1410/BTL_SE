import BaseRepository from './BaseRepository.js';
import File from '../models/File.js';

/**
 * Lớp Repository để xử lý cấu hình in ấn
 * @extends BaseRepository
 */
class FileRepository extends BaseRepository {
    /**
     * Khởi tạo một instance
     */
    constructor() {
        super(File, 'file');
    }

    async findByStudentId(studentId) {
        try {
            const [rows] = await this.db.query(`SELECT * FROM ${this.tableName} WHERE student_id = ?`, [studentId]);
            console.log(`Files for student ID ${studentId}: `, rows);
            const objectFiles = rows.map(row => new File(row));
            return objectFiles;
        } catch (error) {
            throw new Error(`Error fetching files for student ID ${studentId}: ${error.message}`);
        }
    }
   
}

export default FileRepository;