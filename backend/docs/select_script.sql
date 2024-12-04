USE hcmutdb;

SELECT * FROM print_jobs_file;

SELECT * FROM print_jobs;


SELECT f.* FROM FILE f JOIN print_jobs_file pjf ON f.file_id = pjf.file_id where pjf.print_jobs_id = 1;