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

const educations = [
  {
    title: 'Solusi Limbah Pertanian untuk Peningkatan Kualitas Tanah',
    content:
      'Biochar adalah bahan kaya karbon yang dihasilkan melalui proses pirolisis, yaitu pembakaran bahan organik (seperti limbah tanaman, kayu, atau biomassa) pada suhu tinggi dalam kondisi minim oksigen. Biochar mirip dengan arang, tetapi berbeda dalam penggunaannya, terutama untuk meningkatkan kualitas tanah dan menyimpan karbon dalam jangka panjang.',
    audio_url: null,
    video_url: 'https://www.youtube.com/watch?v=jz-LwOKuMPM',
    image: 'edukasi1.jpeg',
  },
  {
    title: 'Pengolahan Limbah Jerami Jagung Menjadi Pakan Ternak',
    content:
      'Jerami jagung, yang biasanya dianggap sebagai limbah setelah panen, sebenarnya memiliki potensi besar sebagai sumber pakan ternak. Pengolahan limbah jerami jagung menjadi pakan ternak tidak hanya mengurangi pemborosan tetapi juga menguntungkan bagi petani dan peternak.',
    audio_url: null,
    video_url: 'https://youtu.be/P1c6Q7ApZzs?si=otc5DF_5skNOiHZg',
    image: 'edukasi2.jpeg',
  },
  {
    title: 'Biogas dari Limbah Pertanian',
    content:
      'Limbah pertanian, yang sering kali dianggap sebagai produk sampingan tak berguna, sebenarnya memiliki potensi besar untuk diolah menjadi sumber energi terbarukan, yaitu biogas. Biogas merupakan gas yang dihasilkan dari proses fermentasi anaerobik (tanpa oksigen).',
    audio_url: null,
    video_url: 'https://youtu.be/fKddqY-oFf4?si=un_U_65l9m4qbRXQ',
    image: 'edukasi3.jpeg',
  },
];

// Loop untuk memasukkan data ke dalam tabel educations
for (const education of educations) {
  await connection.query(
    `
    INSERT INTO educations (title, content, audio_url, video_url, image)
    VALUES (?, ?, ?, ?, ?)
  `,
    [
      education.title,
      education.content,
      education.audio_url,
      education.video_url,
      education.image,
    ]
  );
}

console.log('Education data seeded successfully.');

const newsData = [
  {
    title: 'Sumatera Utara ekspor pakan ternak dari limbah jagung ke Korea Selatan',
    content: `Medan (ANTARA) - Sumatera Utara mulai mengekspor pakan ternak dari bahan limbah jagung ke Korea Selatan. "Untuk tahap awal ekspor pakan ternak dari limbah jagung ke Korea Selatan itu sebanyak 190,4 ton," ujar Kepala Karantina Pertanian Belawan Belawan, Andi Yusmanto di Medan, Senin.

Ekspor pakan ternak yang dilakukan PT Sumatra Harapan Niaga itu tercatat senilai Rp559 juta.

"Sebelum diekspor ke Korea Selatan telah dilakukan serangkaian tindakan karantina pertanian untuk memastikan komoditas itu aman dan sehat sampai di negara tujuan," ujar Andi Yusmanto.

Menurut Andi, pakan ternak asal sub sektor peternakan yang diekspor tersebut merupakan komoditas baru karena bahannya terbuat dari limbah jagung dalam bentuk pellet "Corn Mixed Fiber Pellet".

Karantina Pertanian terus mendorong ekspor pakan ternak dari limbah jagung itu karena potensinya yang masih cukup besar.

Karantina Pertanian terus melakukan pendampingan kepada pelaku usaha, dengan melakukan bimbingan teknis sanitari dan fitosanitari sebagai persyaratan negara tujuan ekspor.

Kemudian meningkatkan sinergisitas dengan entitas terkait serta memberikan percepatan layanan karantina guna meningkatkan nilai daya saing komoditas ekspor.

"Ekspor pakan ternak dari limbah jagung itu juga akan memberi arti positif bagi petani jagung yakni mendapat tambahan pendapatan," katanya.

Kepala Badan Karantina Pertanian (Barantan), Bambang, mengatakan, ekspor pakan ternak Sumut itu mendukung Gerakan Tiga Kali yang digagas Menteri Pertanian Syahrul Yasin Limpo.

"Barantan mengapresiasi pengusaha Sumut yang bisa mengekspor pakan ternak dari bahan limbah jagung karena ikut mendorong ekspor komoditas pertanian," katanya.`,
    image_url: 'news.jpeg',
    date: new Date('2024-12-15T00:00:00'), // Sesuaikan tanggal sesuai kebutuhan
    source_url: 'https://sumut.antaranews.com/berita/483529/sumatera-utara-ekspor-pakan-ternak-dari-limbah-jagung-ke-korea-selatan',
  },
];

// Loop untuk memasukkan data ke dalam tabel news
for (const news of newsData) {
  await connection.query(
    `
    INSERT INTO news (title, content, image_url, date, source_url)
    VALUES (?, ?, ?, ?, ?)
  `,
    [news.title, news.content, news.image_url, news.date, news.source_url]
  );
}

console.log('News data seeded successfully.');

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
