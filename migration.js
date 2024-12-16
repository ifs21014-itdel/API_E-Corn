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
    await connection.query("DROP TABLE IF EXISTS comments;");
    await connection.query("DROP TABLE IF EXISTS topics;");
    await connection.query("DROP TABLE IF EXISTS users;");
    await connection.query("DROP TABLE IF EXISTS about;");
    await connection.query("DROP TABLE IF EXISTS features;");
    await connection.query("DROP TABLE IF EXISTS educations;");
    await connection.query("DROP TABLE IF EXISTS news;");
   
  

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
         gambar1 VARCHAR(255), -- Gambar pertama
          gambar2 VARCHAR(255), -- Gambar kedua
          gambar3 VARCHAR(255), -- Gambar ketiga
          gambar4 VARCHAR(255), -- Gambar keempat
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
        image VARCHAR(255), -- URL untuk gambar pendukung
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
        image VARCHAR(255) NOT NULL,
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
        date DATETIME,
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

    // Tambahkan data ke tabel about
    await connection.query(`
      INSERT INTO about (judul, deskripsi_singkat, deskripsi_panjang, gambar1, gambar2, gambar3, gambar4)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      'Tentang Kami',
      'Platform ini bertujuan untuk meningkatkan pengetahuan petani dalam pengelolaan limbah pertanian, sehingga mereka dapat memanfaatkannya secara lebih efektif dan berkelanjutan. Melalui edukasi platform ini akan membantu petani mengolah limbah organik menjadi sumber daya yang berguna, seperti pupuk kompos atau bahan pakan ternak, yang tidak hanya mendukung produktivitas pertanian, tetapi juga berkontribusi pada pelestarian lingkungan.',
      'Platform ini didedikasikan untuk memberikan edukasi praktis kepada petani mengenai cara-cara pengelolaan limbah pertanian yang efektif dan ramah lingkungan. Dengan meningkatnya kesadaran akan pentingnya keberlanjutan, platform ini membantu petani mengolah limbah organik menjadi produk yang memiliki nilai tambah, seperti pupuk kompos, yang tidak hanya mendukung produktivitas pertanian tetapi juga berperan dalam mengurangi dampak negatif terhadap lingkungan. Kami percaya bahwa melalui pendidikan yang tepat, para petani dapat memanfaatkan potensi limbah mereka untuk menciptakan solusi yang saling menguntungkan bagi mereka dan lingkungan sekitar. Dengan demikian, platform ini tidak hanya fokus pada peningkatan hasil pertanian tetapi juga mendorong petani untuk berperan aktif dalam pelestarian alam.',
      'pic1.png',
      'pic2.png',
      'pic3.png',
      'pic15.jpeg'
    ]);



console.log("About entry added successfully.");

const features = [
  { title: 'Mengapa E-Corn?', description: 'Video tutorial yang mudah dipahami', image: 'pic1.png' },
  { title: 'Mengapa E-Corn?', description: 'Berita terkini mengenai pertanian jagung di Sumatera Utara', image: 'pic2.png' },
  { title: 'Mengapa E-Corn?', description: 'Forum diskusi untuk saling berdiskusi dengan sesama petani jagung.', image: 'pic3.png' },
  { title: 'Mengapa E-Corn?', description: 'MP3 untuk membantu memahami teks tutorial.', image: 'pic15.jpeg' },
];

for (const feature of features) {
  await connection.query(`
    INSERT INTO features (title, description, image) VALUES (?, ?, ?)
  `, [feature.title, feature.description, feature.image]);
}

console.log("Features seeded successfully.");


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
