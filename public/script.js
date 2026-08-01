// public/script.js

// 1. JavaScript menyuntikkan kode CSS
const gayaCSS = document.createElement('style');
gayaCSS.innerHTML = `
    /* Reset & Dasar */
    body { 
        font-family: 'Segoe UI', Tahoma, sans-serif; 
        background-color: #f8f9fa; 
        margin: 0; 
        padding: 0; 
        color: #333; 
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    
    /* Header & Navigasi */
    header {
        background-color: #2c3e50;
        padding: 20px;
        text-align: center;
        color: white;
    }
    header h1 {
        margin: 0 0 10px 0;
        font-size: 28px;
        letter-spacing: 1px;
    }
    nav { 
        display: flex; 
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px; 
    }
    nav button { 
        background-color: transparent; 
        color: #ecf0f1; 
        border: 2px solid transparent; 
        padding: 8px 16px; 
        cursor: pointer; 
        font-size: 16px; 
        font-weight: bold;
        border-radius: 20px; 
        transition: all 0.3s ease;
    }
    nav button:hover, nav button.aktif { 
        border-color: #3498db;
        color: #3498db;
    }

    /* Desain khusus tombol Admin */
    .btn-admin {
        color: #f1c40f; /* Warna kuning emas */
    }
    .btn-admin:hover {
        border-color: #f1c40f;
        background-color: rgba(241, 196, 15, 0.1);
    }

    /* Konten Utama */
    #kontenUtama { 
        background-color: white; 
        padding: 40px; 
        margin: 30px auto; 
        width: 80%;
        max-width: 800px;
        border-radius: 12px; 
        box-shadow: 0 5px 15px rgba(0,0,0,0.05); 
        flex-grow: 1; 
        line-height: 1.6;
    }
    
    /* Tipografi Konten */
    h2 { color: #2c3e50; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px; margin-top: 0;}
    p { font-size: 16px; color: #555; }
    
    /* Profil Image Style */
    .profil-container { text-align: center; margin-bottom: 20px; }
    .foto-profil { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 4px solid #3498db; }

    /* Card Project */
    .card-project { 
        background-color: #ffffff; 
        border-left: 5px solid #3498db; 
        padding: 20px; 
        margin-bottom: 20px; 
        border-radius: 8px; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        transition: transform 0.2s;
    }
    .card-project:hover { transform: translateY(-3px); }
    .card-project h3 { margin-top: 0; color: #2980b9; font-size: 20px;}
    .card-project p { margin-bottom: 0; }

    /* Footer */
    footer {
        background-color: #2c3e50;
        color: #bdc3c7;
        text-align: center;
        padding: 15px;
        font-size: 14px;
        margin-top: auto;
    }
`;
document.head.appendChild(gayaCSS);

// 2. JavaScript membangun kerangka HTML
document.body.innerHTML = `
    <header>
        <h1>Portofolio JS</h1>
        <nav id="menuUtama">
            <button id="btn-beranda" onclick="bukaHalaman('beranda')">Beranda</button>
            <button id="btn-profil" onclick="bukaHalaman('profil')">Profil</button>
            <button id="btn-project" onclick="bukaHalaman('project')">Project</button>
            
            <!-- Tombol baru untuk pindah ke halaman Admin -->
            <button class="btn-admin" onclick="window.location.href='../admin/index.html'">Admin 🔒</button>
        </nav>
    </header>
    
    <div id="kontenUtama"></div>
    
    <footer>
        &copy; 2026 - Dibuat dengan 100% JavaScript.
    </footer>
`;

// 3. Data Konten Halaman
const kontenHalaman = {
    beranda: `
        <h2>Halo, Selamat Datang! 👋</h2>
        <p>Terima kasih sudah berkunjung ke halaman portofolio saya.</p>
        <p>Website ini dibangun menggunakan teknik yang unik, yaitu <strong>100% JavaScript</strong>. Tanpa menulis kode HTML yang panjang, semua elemen yang Anda lihat di-render langsung melalui script.</p>
        <p>Silakan jelajahi menu <em>Profil</em> untuk mengenal saya lebih jauh, atau lihat karya-karya saya di menu <em>Project</em>.</p>
    `,
    profil: `
        <h2>Tentang Saya</h2>
        <div class="profil-container">
            <img class="foto-profil" src="https://ui-avatars.com/api/?name=JS+Dev&background=3498db&color=fff&size=200" alt="Foto Profil">
        </div>
        <p>Saya adalah seorang pengembang yang bersemangat mempelajari teknologi web modern. Saat ini saya berfokus pada eksplorasi kemampuan JavaScript murni (Vanilla JS) untuk membangun antarmuka yang dinamis dan interaktif.</p>
        <h3>Keahlian (Skills)</h3>
        <ul>
            <li>HTML5 & CSS3</li>
            <li>JavaScript (ES6+)</li>
            <li>Manipulasi DOM</li>
            <li>Manajemen Local Storage</li>
        </ul>
        <p>Saya berbasis di Yogyakarta dan selalu terbuka untuk diskusi atau kolaborasi menarik!</p>
    `,
    project: `
        <h2>Project Saya</h2>
        <p>Berikut adalah beberapa project yang pernah saya kerjakan. Data ini diambil secara dinamis dari Local Storage (inputan Admin).</p>
        <div id="daftarProyek">
            <p>Memuat project...</p>
        </div>
    `
};

// 4. Fungsi JavaScript untuk mengganti halaman
function bukaHalaman(namaHalaman) {
    document.getElementById("kontenUtama").innerHTML = kontenHalaman[namaHalaman];
    
    // Reset warna semua tombol menu biasa
    document.getElementById("btn-beranda").classList.remove('aktif');
    document.getElementById("btn-profil").classList.remove('aktif');
    document.getElementById("btn-project").classList.remove('aktif');
    
    // Beri warna khusus pada tombol yang sedang diklik
    document.getElementById("btn-" + namaHalaman).classList.add('aktif');

    // Jika buka menu project, panggil fungsi load data
    if (namaHalaman === 'project') tampilkanPortofolio();
}

// 5. Fungsi JavaScript mengambil data dari halaman Admin
function tampilkanPortofolio() {
    const wadahProyek = document.getElementById("daftarProyek");
    let daftarProyek = JSON.parse(localStorage.getItem("proyek")) || [];
    
    if (daftarProyek.length === 0) {
        wadahProyek.innerHTML = "<p style='text-align:center; color:#7f8c8d; font-style:italic;'>Belum ada project yang ditambahkan.<br>Silakan masuk ke menu Admin untuk menambahkan.</p>";
        return;
    }
    
    wadahProyek.innerHTML = ""; 
    daftarProyek.forEach(proyek => {
        let card = document.createElement("div");
        card.className = "card-project";
        card.innerHTML = `
            <h3>${proyek.judul}</h3>
            <p>${proyek.deskripsi}</p>
        `;
        wadahProyek.appendChild(card);
    });
}

// Jalankan otomatis saat web dibuka
window.onload = () => bukaHalaman('beranda');
