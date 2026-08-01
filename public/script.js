// public/script.js

// 1. Kita simpan semua konten halaman di dalam Object JavaScript
const kontenHalaman = {
    beranda: `
        <h2>Selamat Datang di Portofolio Saya!</h2>
        <p>Halo, senang kamu berkunjung. Jelajahi menu di atas untuk melihat profil dan project saya.</p>
    `,
    profil: `
        <h2>Profil Saya</h2>
        <p>Saya adalah seorang pengembang web yang antusias menggunakan JavaScript.</p>
    `,
    project: `
        <h2>Daftar Project</h2>
        <!-- Wadah ini akan diisi data dari halaman admin -->
        <div id="daftarProyek">
            <p>Memuat project...</p>
        </div>
    `,
    galeri: `
        <h2>Galeri Portofolio</h2>
        <p>Di sini nantinya akan berisi kumpulan foto-foto hasil karya atau kegiatan saya.</p>
    `,
    kontak: `
        <h2>Hubungi Saya</h2>
        <p>Silakan kirim pesan melalui email atau kunjungi media sosial saya.</p>
    `
};

// 2. Fungsi JavaScript untuk mengganti isi layar berdasarkan tombol yang diklik
function bukaHalaman(namaHalaman) {
    const wadah = document.getElementById("kontenUtama");
    
    // Memasukkan konten HTML dari objek ke dalam wadah di layar
    wadah.innerHTML = kontenHalaman[namaHalaman];

    // Khusus jika membuka halaman 'project', kita panggil fungsi untuk mengambil data
    if (namaHalaman === 'project') {
        tampilkanPortofolio();
    }
}

// 3. Fungsi untuk mengambil data project (yang diinput dari halaman Admin)
function tampilkanPortofolio() {
    const wadahProyek = document.getElementById("daftarProyek");
    
    // Ambil data dari Local Storage
    let daftarProyek = JSON.parse(localStorage.getItem("proyek")) || [];
    
    if (daftarProyek.length === 0) {
        wadahProyek.innerHTML = "<p>Belum ada project yang ditambahkan dari halaman Admin.</p>";
        return;
    }
    
    // Bersihkan teks "Memuat..."
    wadahProyek.innerHTML = ""; 
    
    // Gunakan perulangan JavaScript untuk menampilkan semua data
    daftarProyek.forEach(proyek => {
        let card = document.createElement("div");
        
        // Bagian ini sudah diperbarui untuk menampilkan judul dan deskripsi
        card.innerHTML = `<h3>${proyek.judul}</h3><p>${proyek.deskripsi}</p><hr>`;
        
        wadahProyek.appendChild(card);
    });
}

// 4. Perintah ini agar saat web pertama kali dibuka, langsung muncul halaman 'beranda'
window.onload = function() {
    bukaHalaman('beranda');
};
