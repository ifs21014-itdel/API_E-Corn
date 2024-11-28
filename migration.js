const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

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

// Fungsi untuk migrasi dan seeding
const migrateAndSeed = async () => {
  try {
    const connection = await pool.getConnection();

    console.log("Connected to database:", process.env.DB_DATABASE);

    // Drop tabel jika ada
    await connection.query("DROP TABLE IF EXISTS users;");
    await connection.query("DROP TABLE IF EXISTS about;");
    await connection.query("DROP TABLE IF EXISTS features;");
    await connection.query("DROP TABLE IF EXISTS educations;");
    await connection.query("DROP TABLE IF EXISTS news;");
   
    await connection.query("DROP TABLE IF EXISTS comments;");
    await connection.query("DROP TABLE IF EXISTS topics;");

    // Tabel `users`
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
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

    await connection.query(`
      CREATE TABLE IF NOT EXISTS educations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL, -- Judul edukasi
        content TEXT NOT NULL, -- Konten teks edukasi
        audio_url VARCHAR(255), -- URL untuk file audio tutorial
        video_url VARCHAR(255), -- URL untuk video tutorial
        image_url VARCHAR(255), -- URL untuk gambar pendukung
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Waktu pembuatan
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Waktu update
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

    await connection.query(`
      CREATE TABLE IF NOT EXISTS news (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL, -- Judul berita
        content TEXT NOT NULL, -- Konten berita
        image_url VARCHAR(255), -- URL untuk gambar berita
        source_url VARCHAR(255), -- URL sumber berita
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Waktu pembuatan berita
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Waktu update berita
      );
    `); 

    await connection.query(`
      CREATE TABLE IF NOT EXISTS topics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL, -- Judul topik diskusi
        content TEXT NOT NULL, -- Konten topik diskusi
        user_id INT NOT NULL, -- ID pengguna sebagai penulis
        image_url VARCHAR(255), -- URL untuk gambar yang diunggah
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Waktu pembuatan
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Waktu update
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Relasi ke tabel users
      );
    `);
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        topic_id INT NOT NULL, -- ID topik diskusi terkait
        user_id INT NOT NULL, -- ID pengguna sebagai penulis komentar
        content TEXT NOT NULL, -- Konten komentar
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Waktu pembuatan komentar
        FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE, -- Relasi ke tabel topics
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Relasi ke tabel users
      );
    `);
    

    console.log("All tables created successfully.");

    // Seeder untuk admin
    const adminPassword = "admin123"; // Password default
    const hashedPassword = await bcrypt.hash(adminPassword, 10); // Hash password
    await connection.query(`
      INSERT INTO users (username, email, password, role) VALUES
      ('admin', 'admin@example.com', ?, 'admin')
    `, [hashedPassword]);

    console.log("Admin user created successfully.");

    connection.release();
  } catch (error) {
    console.error("Error during migration and seeding:", error.message);
  } finally {
    process.exit();
  }
};

// Jalankan migrasi dan seeding
migrateAndSeed();
