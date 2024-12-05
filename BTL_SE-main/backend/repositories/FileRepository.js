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
    /**
     * Lấy tất cả file từ cơ sở dữ liệu của 1 student
     * @returns {Promise<Array<File>>} Mảng các đối tượng file
     * @throws {Error} Nếu truy vấn cơ sở dữ liệu thất bại
     */
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
    /**
     * Xoas tất cả file từ cơ sở dữ liệu của 1 student
     * @returns {Promise<Array<File>>} Mảng các đối tượng file
     * @throws {Error} Nếu truy vấn cơ sở dữ liệu thất bại
     */
    async deleteByStudentId(studentId) {
        try {
            const result = await this.db.query(`DELETE FROM ${this.tableName} WHERE student_id = ?`, [studentId]);
            console.log(`Deleted files for student ID ${studentId}.`);
            return result;
        } catch (error) {
            throw new Error(`Error deleting files for student ID ${studentId}: ${error.message}`);
        }
    }
}

export default FileRepository;