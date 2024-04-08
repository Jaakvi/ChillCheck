DROP DATABASE IF EXISTS ChillCheck;
-- muista pääset data baseen "use HealthDiary "
CREATE DATABASE ChillCheck;

USE ChillCheck;

CREATE TABLE Users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password  VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR (10) NOT NULL DEFAULT 'regular'
);


CREATE TABLE StressHistory (
    test_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    stress VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Professionals (
    pro_id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY ,
    user_id INT NOT NULL,
    test_id INT NOT NULL,
    pro_username VARCHAR(50) NOT NULL UNIQUE,
    FOREIGN KEY (test_id) REFERENCES StressHistory(test_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)

);

-- saa ehdottaa taulu nimiä ja mahdollisia muita nimiä taulun elementeille.
-- muutoksia vielä tulossa
CREATE TABLE ProfessionalHistory (
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50),
    frequency VARCHAR(50),
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);