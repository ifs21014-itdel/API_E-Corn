const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Fungsi untuk membuat tabel
const migrate = async () => {
    try {
      const connection = await pool.getConnection();
  
      console.log("Connected to database:", process.env.DB_DATABASE); // Debug log
  
      // Tabel `users`
      await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
        );
      `);
  
      // Tabel `about`
      await connection.query(`
        CREATE TABLE IF NOT EXISTS about (
          id INT AUTO_INCREMENT PRIMARY KEY, 
          judul VARCHAR(255) NOT NULL,       
          deskripsi_singkat TEXT,          
          deskripsi_panjang TEXT,            
          gambar VARCHAR(255),              
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `);
  
      // Tabel `features`
      await connection.query(`
        CREATE TABLE IF NOT EXISTS features (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          image_url VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `);
  
      console.log("All tables created successfully.");
      connection.release();
    } catch (error) {
      console.error("Error while creating tables:", error.message);
    } finally {
      process.exit();
    }
  };
  
  // Jalankan migrasi
  migrate();
  