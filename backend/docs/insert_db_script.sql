-- Insert an SPSO user
USE hcmutdb;
INSERT INTO `user` (user_name, email, password, role, create_at)
VALUES ('SPSO Admin', 'spso@example.com', 'securepassword', 'spso', NOW());

-- Insert student users
INSERT INTO `user` (user_name, email, password, role, create_at)
VALUES 
('Student One', 'student1@example.com', 'password123', 'student', NOW()),
('Student Two', 'student2@example.com', 'password123', 'student', NOW());


INSERT INTO `SEMESTER_PAGE_ALLOCATION` (semester_name, create_at, start_date, end_date, page_allocated)
VALUES 
('HK241', '2024-07-01 12:00:00', '2024-08-01', '2024-12-30', 400);

-- Insert students
INSERT INTO `student` (student_id, user_id, allocation_id, page_balance)
VALUES 
(1, 2, 1, 500), 
(2, 3, 1, 500);

-- Insert permitted file types
INSERT INTO `permitted_file_type` (mime_type)
VALUES 
('application/pdf'), 
('image/png'), 
('image/jpeg');

-- Insert files associated with the students
INSERT INTO `file` (student_id, file_type_id, file_path, filename,  upload_at)
VALUES 
(1, 1, '/uploads/student1/', 'document1.pdf',  NOW()),
(1, 2, '/uploads/student1/', 'image1.png', NOW()),
(2, 1, '/uploads/student2/', 'document2.pdf', NOW());

-- Insert printers
INSERT INTO `printer` (printer_name, brand_name, model, campus_name, building_name, room_number, update_at, create_at, status)
VALUES 
('Printer 1', 'HP', 'LaserJet 1020', 'LTK Campus', 'B4', 'Room 101', NOW(), NOW(), 'enabled'),
('Printer 2', 'Canon', 'PIXMA G3010', 'Di An Campus', 'C5', 'Room 202', NOW(), NOW(), 'enabled');

-- Insert default print configuration
INSERT INTO `print_config` (paper_size, pages_to_print, number_of_copies, create_at, duplex)
VALUES 
('A4', 'all', 1, NOW(), TRUE);




-- Insert print jobs and associated files
-- INSERT INTO `print_jobs` (print_config_id, printer_id, student_id, print_start_time, print_end_time)
-- VALUES 
-- (1, 1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 10 MINUTE)),
-- (1, 2, 2, NOW(), DATE_ADD(NOW(), INTERVAL 15 MINUTE));

-- INSERT INTO `print_jobs_file` (print_jobs_id, file_id)
-- VALUES 
-- (1, 1), 
-- (1, 2), 
-- (2, 3);
