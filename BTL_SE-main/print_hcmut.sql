DROP DATABASE IF EXISTS hcmutdb;
CREATE DATABASE hcmutdb;
USE hcmutdb;

CREATE TABLE `user` (
`user_id` int AUTO_INCREMENT PRIMARY KEY,
`user_name` varchar(255) NOT NULL,
`email` varchar(255) NOT NULL UNIQUE,
`password_hash` varchar(255) NOT NULL, 
`role` ENUM('student', 'spso') NOT NULL,
`created_at` datetime DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `semester_page_allocation` (
	`allocation_id` int auto_increment primary key,
	`semester_name` varchar(255) NOT NULL,
    `start_date` date NOT NULL,
	`end_date` date NOT NULL,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `page_allocated` INT not null,
    CONSTRAINT `check_dates` CHECK (`end_date` >= `start_date`)
);

CREATE TABLE `permitted_file_type` (
`file_type_id` int AUTO_INCREMENT PRIMARY KEY,
`mime_type` varchar(255) NOT NULL UNIQUE,
`description` varchar(255),
`max_file_size` int,  -- in bytes
`enabled` boolean DEFAULT true,
`created_at` datetime DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE `printer` (
`printer_id` int AUTO_INCREMENT PRIMARY KEY,
`printer_name` varchar(255) NOT NULL,
`brand_name` varchar(255) NOT NULL,
`model` varchar(255) NOT NULL,
`description` text,
`campus_name` varchar(255) NOT NULL,
`building_name` varchar(255) NOT NULL,
`room_number` varchar(255) NOT NULL,
`status` ENUM('enabled', 'disabled', 'maintenance') NOT NULL DEFAULT 'enabled',
`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`last_maintenance_date` datetime
);

CREATE TABLE `print_config` (
`print_config_id` int AUTO_INCREMENT PRIMARY KEY,
`paper_size` ENUM('A3', 'A4') NOT NULL,
`page_ranges` text NOT NULL,  -- Stores comma-separated page ranges (e.g., "1-5,7,9-12")
`pages_per_sheet` int DEFAULT 1,
`orientation` ENUM('portrait', 'landscape') NOT NULL DEFAULT 'portrait',
`color_mode` ENUM('color', 'grayscale') NOT NULL DEFAULT 'grayscale',
`duplex` boolean NOT NULL DEFAULT false,
`copies` int NOT NULL DEFAULT 1,
`created_at` datetime DEFAULT CURRENT_TIMESTAMP
);





CREATE TABLE `student` (
  `student_id` int PRIMARY KEY,
  `allocation_id` int,
  `user_id` int NOT NULL ,
  `page_balance` int NOT NULL DEFAULT 0,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`allocation_id`) REFERENCES `semester_page_allocation`(`allocation_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `transaction` (
`transaction_id` int AUTO_INCREMENT PRIMARY KEY,
`student_id` int NOT NULL,
`amount_paid` decimal(10,2) NOT NULL,
`pages_purchased` int NOT NULL,
`transaction_date` datetime DEFAULT CURRENT_TIMESTAMP,
`payment_method` ENUM('bank', 'momo', 'cash') NOT NULL,
`payment_status` ENUM('pending', 'completed', 'failed') NOT NULL,
FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`)
);



CREATE TABLE `file` (
`file_id` int AUTO_INCREMENT PRIMARY KEY,
`student_id` int NOT NULL,
`file_type_id` int NOT NULL,
`file_path` varchar(255) NOT NULL,
`filename` varchar(255) NOT NULL,
`original_filename` varchar(255) NOT NULL,
`status` ENUM('pending', 'processed', 'deleted') NOT NULL DEFAULT 'pending',
`size_in_bytes` int NOT NULL,
`page_count` int,  -- Total number of pages in the document
`upload_at` datetime DEFAULT CURRENT_TIMESTAMP,
`deleted_at` datetime,
FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`),
FOREIGN KEY (`file_type_id`) REFERENCES `permitted_file_type`(`file_type_id`)
);



CREATE TABLE `print_jobs` (
`print_job_id` int AUTO_INCREMENT PRIMARY KEY,
`student_id` int NOT NULL,
`printer_id` int NOT NULL,
`status` ENUM('pending', 'processing', 'completed', 'failed', 'canceled') NOT NULL DEFAULT 'pending',
`total_pages` int NOT NULL,
`total_sheets` int NOT NULL,
`total_cost` decimal(10,2) NOT NULL,
`submit_time` datetime DEFAULT CURRENT_TIMESTAMP,
`print_start_time` datetime,
`print_end_time` datetime,
`canceled_at` datetime,
`error_message` text,
FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`),
FOREIGN KEY (`printer_id`) REFERENCES `printer`(`printer_id`)
);

CREATE TABLE `print_job_files` (
`print_job_id` int NOT NULL,
`file_id` int NOT NULL,
`print_config_id` int NOT NULL,
PRIMARY KEY (`print_job_id`, `file_id`),
FOREIGN KEY (`print_job_id`) REFERENCES `print_jobs`(`print_job_id`),
FOREIGN KEY (`file_id`) REFERENCES `file`(`file_id`),
FOREIGN KEY (`print_config_id`) REFERENCES `print_config`(`print_config_id`)
);
	

