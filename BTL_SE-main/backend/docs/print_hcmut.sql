DROP DATABASE IF EXISTS hcmutdb;
CREATE DATABASE hcmutdb;
USE hcmutdb;

CREATE TABLE `user` (
  `user_id` int AUTO_INCREMENT PRIMARY KEY,
  `user_name` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `role` ENUM('student', 'spso'),
  `create_at` datetime
);

CREATE TABLE `student` (
  `student_id` int PRIMARY KEY,
  `user_id` int,
  `default_page_allocation` int,
  `page_balance` int,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `transaction` (
  `transaction_id` int PRIMARY KEY,
  `student_id` int,
  `amount_paid` decimal(10,2),
  `transaction_date` datetime,
  `payment_method` varchar(255),
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `printer` (
  `printer_id` int AUTO_INCREMENT PRIMARY KEY,
  `printer_name` varchar(255),
  `brand_name` varchar(255),
  `model` varchar(255),
  `description` varchar(255),
  `campus_name` varchar(255),
  `building_name` varchar(255),
  `room_number` varchar(255),
  `update_at` datetime,
  `create_at` datetime,
  `status` enum('enabled', 'disabled')
);

CREATE TABLE `file` (
  `file_id` int AUTO_INCREMENT PRIMARY KEY,
  `student_id` int,
  `file_type_id` int,
  `file_path` varchar(255),
  `filename` varchar(255),
  `status` varchar(255),
  `size_in_bytes` int,
  `upload_at` datetime,
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`file_type_id`) REFERENCES `permitted_file_type`(`file_type_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `permitted_file_type` (
  `file_type_id` int AUTO_INCREMENT PRIMARY KEY,
  `mime_type` varchar(255)
);

CREATE TABLE `print_jobs` (
  `print_jobs_id` int AUTO_INCREMENT PRIMARY KEY,
  `print_config_id` int,
  `printer_id` int,
  `student_id` int,
  `submit_time` datetime,
  `total_printed_side` int,
  `print_start_time` datetime,
  `print_end_time` datetime,
  FOREIGN KEY (`print_config_id`) REFERENCES `print_config`(`print_config_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`printer_id`) REFERENCES `printer`(`printer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `print_jobs_file` (
  `print_jobs_id` int,
  `file_id` int,
  FOREIGN KEY (`print_jobs_id`) REFERENCES `print_jobs`(`print_jobs_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`file_id`) REFERENCES `file`(`file_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `print_config` (
  `print_config_id` int AUTO_INCREMENT PRIMARY KEY,
  `pages_in_a4` int,
  `pages_in_a3` int,
  `pages_to_print` enum('even', 'odd'),
  `number_of_copies` int,
  `create_at` datetime,
  `duplex` boolean
);