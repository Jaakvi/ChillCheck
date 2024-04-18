CREATE USER 'auras'@'localhost' IDENTIFIED BY 'admin122!';
GRANT ALL PRIVILEGES ON `ChillCheck`.* TO 'auras'@'localhost';
FLUSH PRIVILEGES;