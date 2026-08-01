// public/script.js

// === 1. IMPORT FIREBASE (Sistem Keamanan Google) ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// KONFIGURASI FIREBASE (Nanti kamu harus ganti dengan kodemu sendiri dari web Firebase)
const firebaseConfig = {
  apiKey: "KODE_API_KAMU_NANTI",
  authDomain: "nama-project.firebaseapp.com",
  projectId: "nama-project",
  storageBucket: "nama-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// === 2. INJEKSI CSS ===
const gayaCSS = document.createElement('style');
gayaCSS.innerHTML = `
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f8f9fa; margin: 0; padding: 0; color: #333; display: flex; flex-direction: column; min-height: 100vh; }
    header { background-color: #2c3e50; padding: 20px; text-align: center; color: white; }
    header h1 { margin: 0 0 10px 0; font-size: 28px; }
    nav { display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; }
    nav button { background-color: transparent; color: #ecf0f1; border: 2px solid transparent; padding: 8px 16px; cursor: pointer; font-size: 16px; font-weight: bold; border-radius: 20px; transition: all 0.3s ease; }
    nav button:hover, nav button.aktif { border-color: #3498db; color: #3498db; }
    .btn-admin { color: #f1c40f; }
    .btn-admin:hover { border-color: #f1c40f; background-color: rgba(241, 196, 15, 0.1); }
    #kontenUtama { background-color: white; padding: 40px; margin: 30px auto; width: 80%; max-width: 800px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); flex-grow: 1; line-height: 1.6; }
    .profil-container { text-align: center; margin-bottom: 20px; }
    .foto-profil { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 4px solid #3498db; }
    .card-project { background-color: #ffffff; border-left: 5px solid #3498db; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: transform 0.2s; }
    .card-project h3 { margin-top: 0; color: #2980b9; font-size: 20px;}
    footer { background-color: #2c3e50; color: #bdc3c7; text-align: center; padding: 15px; font-size: 14px; margin-top: auto; }
`;
document.head.appendChild(gayaCSS);

// === 3. MEMBANGUN HTML ===
document.body.innerHTML = `
    <header>
        <h1>Portofolio JS</h1>
        <nav id="menuUtama">
            <button id="btn-beranda" onclick="window.bukaHalaman('beranda')">Beranda</button>
            <button id="btn-profil" onclick="window.bukaHalaman('profil')">Profil</button>
            <button id="btn-project" onclick="window.bukaHalaman('project')">Project</button>
            <button class="btn-admin" onclick="window.loginAdmin()">Admin 🔒</button>
        </nav>
    </header>
    <div id="kontenUtama"></div>
    <footer>&copy; 2026 - Dibuat dengan 100% JavaScript.</footer>
`;

// === 4. DATA KONTEN ===
const kontenHalaman = {
    beranda: `<h2>Halo, Selamat Datang! 👋</h2><p>Website ini dibangun menggunakan teknik <strong>100% JavaScript</strong> yang terhubung dengan autentikasi keamanan Google.</p>`,
    profil: `<h2>Tentang Saya</h2><div class="profil-container"><img class="foto-profil" src="https://ui-avatars.com/api/?name=JS+Dev&background=3498db&color=fff&size=200"></div><p>Saya adalah pengembang web yang berbasis di Yogyakarta.</p>`,
    project: `<h2>Project Saya</h2><div id="daftarProyek"><p>Memuat project...</p></div>`
};

// === 5. FUNGSI NAVIGASI ===
window.bukaHalaman = function(namaHalaman) {
    document.getElementById("kontenUtama").innerHTML = kontenHalaman[namaHalaman];
    document.getElementById("btn-beranda").classList.remove('aktif');
    document.getElementById("btn-profil").classList.remove('aktif');
    document.getElementById("btn-project").classList.remove('aktif');
    document.getElementById("btn-" + namaHalaman).classList.add('aktif');
    if (namaHalaman === 'project') window.tampilkanPortofolio();
}

window.tampilkanPortofolio = function() {
    const wadahProyek = document.getElementById("daftarProyek");
    let daftarProyek = JSON.parse(localStorage.getItem("proyek")) || [];
    if (daftarProyek.length === 0) {
        wadahProyek.innerHTML = "<p style='text-align:center;'>Belum ada project.</p>";
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

// === 6. FUNGSI LOGIN ADMIN DENGAN GOOGLE ===
window.loginAdmin = function() {
    // 1. Tampilkan Pop-up Login resmi Google
    signInWithPopup(auth, provider)
        .then((result) => {
            // 2. Ambil email yang berhasil login
            const emailUser = result.user.email;
            
            // TULIS EMAIL ASLIMU DI BAWAH INI (Hanya email ini yang boleh masuk)
            const emailSaya = "emailkamu@gmail.com"; 

            // 3. Cek apakah emailnya cocok
            if (emailUser === emailSaya) {
                alert(`Selamat datang kembali, ${result.user.displayName}!`);
                window.location.href = '../admin/index.html';
            } else {
                alert("Akses Ditolak! Anda tidak memiliki izin mengakses panel Admin.");
                // Keluarkan akun yang salah dari sistem
                auth.signOut(); 
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Login dibatalkan atau terjadi kesalahan.");
        });
}

// Jalankan otomatis
window.onload = () => window.bukaHalaman('beranda');
