-- Sample data for students

BEGIN;
DROP TABLE IF EXISTS students;
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
	first_name text NOT NULL,
	age integer NOT NULL
);

INSERT INTO students (first_name,age) 
VALUES ('John', 20),
('Mary', 21),
('Peter', 19),
('Ann', 20),
('Tom', 22),
('Bob', 20),
('Kate', 19),
('Pam', 20),
('Rick', 22),
('Ben', 20);





COMMIT;