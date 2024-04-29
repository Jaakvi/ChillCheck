
DROP DATABASE IF EXISTS ChillCheck;
-- muista pääset data baseen "use ChillCheck"
-- PATCH /v2/user/ae4e3b6e-babf-4b11-918e-09d2d7e5b2b6 HTTP/1.1
-- Content-Type: application/json
-- Authorization: ...

-- {
--   "email": "test-user@kubioscloud.com",
--   "given_name": "Firstname",
--   "family_name": "Lastname",
--   "phone_number": "+358555555555",
--   "weight": 80.0,
--   "height": 1.80,
--   "hr_max": 200,
--   "hr_rest": 60,
--   "vo2max": 50.5,
--   "gender": "male",
--   "birthdate": "1980-01-01",
--   "company_name": "My Company"
-- }

-- lisää osa näistä database sekä put user/post user kohtaan
CREATE DATABASE ChillCheck;

USE ChillCheck;

CREATE TABLE Users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    Firstname TEXT(30) NOT NULL,
    Lastname TEXT(30) NOT NULL,
    password  VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR (10) NOT NULL DEFAULT 'regular'
);


CREATE TABLE StressHistory (
    user_id INT NOT NULL,
    test_id INT AUTO_INCREMENT PRIMARY KEY,
    entry_date DATE NOT NULL,
    stress_index DECIMAL,
    highHR DECIMAL,
    lowHR DECIMAL,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Professionals (
    pro_id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY ,
    user_id INT NOT NULL,
    test_id INT NOT NULL,
    pro_username VARCHAR(50) NOT NULL UNIQUE,
    Firstname TEXT(30) NOT NULL,
    Lastname TEXT(30) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    FOREIGN KEY (test_id) REFERENCES StressHistory(test_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)

);

-- saa ehdottaa taulu nimiä ja mahdollisia muita nimiä taulun elementeille.
-- muutoksia vielä tulossa
CREATE TABLE ProfessionalHistory (
    user_id INT NOT NULL PRIMARY KEY,
    pro_id INT NOT NULL,
    Firstname TEXT(30) NOT NULL,
    Lastname TEXT(30) NOT NULL,
    dosage VARCHAR(50),
    frequency VARCHAR(50),
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (pro_id) REFERENCES  Professionals(pro_id)
);



Insert into Users(username, Firstname, Lastname, password, email, user_level) values
('johndoe','John','Doe','temp-pw-1', 'johndoe@example.com','regular'),
('janedoe','Jane','Doe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
('mike_smith','Mike','Smith', 'temp-pw-3', 'mike@example.com','moderator');
