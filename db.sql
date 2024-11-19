CREATE DATABASE e_corn;
USE e_corn;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    PASSWORD VARCHAR(255) NOT NULL
);


CREATE TABLE about (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    judul VARCHAR(255) NOT NULL,       
    deskripsi_singkat TEXT,          
    deskripsi_panjang TEXT,            
    gambar VARCHAR(255),              
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL, -- Judul fitur
    DESCRIPTION TEXT NOT NULL,   -- Deskripsi fitur
    image_url VARCHAR(255) NOT NULL, -- URL gambar untuk fitur
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Waktu dibuat
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Waktu diperbarui
);

