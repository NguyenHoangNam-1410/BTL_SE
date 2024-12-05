USE hcmutdb;

INSERT INTO `printer` 
(printer_name, brand_name, model, description, campus_name, building_name, room_number, update_at, create_at, status) 
VALUES 
('Printer LTK 01', 'HP', 'LaserJet Pro M404dn', 'Main Campus Printer', 'Co So LTK', 'Main Building', 'G101', NOW(), NOW(), 'enabled'),
('Printer Di An 02', 'Canon', 'imageRUNNER C3226', 'Di An Campus Printer', 'Co So Di An', 'Science Building', 'A205', NOW(), NOW(), 'enabled');


INSERT INTO `print_config` 
(paper_size, pages_to_print, number_of_copies, create_at, duplex) 
VALUES 
('A4', 'all', 1, NOW(), TRUE);