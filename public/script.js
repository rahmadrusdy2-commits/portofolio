// Mengubah Judul Tab Browser menggunakan JavaScript
document.title = "Portofolio Keren | Nama Kamu"; 

// 1. JavaScript menyuntikkan kode CSS (Desain)
const gayaCSS = document.createElement('style');
gayaCSS.innerHTML = `
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333; }
    nav { background-color: #2c3e50; padding: 15px; border-radius: 8px; display: flex; gap: 10px; }
    nav button { background-color: transparent; color: white; border: none; padding: 10px 15px; cursor: pointer; font-size: 16px; border-radius: 4px; }
    nav button:hover { background-color: #34495e; }
    #kontenUtama { background-color: white; padding: 30px; margin-top: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); min-height: 300px; }
    .card-project { background-color: #fdfdfd; border-left: 5px solid #3498db; padding: 15px; margin-bottom: 15px; border-radius: 4px; }
    .card-project h3 { margin-top: 0; color: #2980b9; }
`;
document.head.appendChild(gayaCSS);

// 2. JavaScript membangun kerangka HTML
document.body.innerHTML = `
    <nav id="menuUtama">
        <button onclick="bukaHalaman('beranda')">Beranda</button>
        <button onclick="bukaHalaman('profil')">Profil</button>
        <button onclick="bukaHalaman('project')">Project</button>
    </nav>
    <div id="kontenUtama"></div>
`;

// 3. Data Konten Halaman
const kontenHalaman = {
    beranda: `<h2>Selamat Datang!</h2><p>Ini adalah web portofolio yang dibangun 100% menggunakan JavaScript.</p>`,
    profil: `<h2>Profil Saya</h2><p>Saya suka bereksperimen dengan kode JavaScript.</p>`,
    project: `<h2>Daftar Project</h2><div id="daftarProyek"><p>Memuat...</p></div>`
};

// 4. Fungsi JavaScript untuk mengganti halaman
function bukaHalaman(namaHalaman) {
    document.getElementById("kontenUtama").innerHTML = kontenHalaman[namaHalaman];
    if (namaHalaman === 'project') tampilkanPortofolio();
}

// 5. Fungsi JavaScript mengambil data dari halaman Admin
function tampilkanPortofolio() {
    const wadahProyek = document.getElementById("daftarProyek");
    let daftarProyek = JSON.parse(localStorage.getItem("proyek")) || [];
    
    if (daftarProyek.length === 0) {
        wadahProyek.innerHTML = "<p>Belum ada project.</p>";
        return;
    }
    
    wadahProyek.innerHTML = ""; 
    daftarProyek.forEach(proyek => {
        let card = document.createElement("div");
        card.className = "card-project";
        card.innerHTML = `<h3>${proyek.judul}</h3><p>${proyek.deskripsi}</p>`;
        wadahProyek.appendChild(card);
    });
}

// Jalankan otomatis saat web dibuka
window.onload = () => bukaHalaman('beranda');
