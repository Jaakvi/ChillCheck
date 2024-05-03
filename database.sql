DROP DATABASE IF EXISTS ChillCheck;
-- muista pääset data baseen "use ChillCheck"
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
<<<<<<< HEAD
('mike_smith','Mike','Smith', 'temp-pw-3', 'mike@example.com','moderator');
=======
('mike_smith','Mike','Smith', 'temp-pw-3', 'mike@example.com','moderator');
>>>>>>> 82a4ce269e0b24231835d8c192a0f40bc6075843
