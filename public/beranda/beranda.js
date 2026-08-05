import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCaEQdi5jLRDEdjnMxTjOOv6fvYmjnxC24",
  authDomain: "portofilio-43df6.firebaseapp.com",
  projectId: "portofilio-43df6",
  storageBucket: "portofilio-43df6.firebasestorage.app",
  messagingSenderId: "139867674195",
  appId: "1:139867674195:web:07410e217a9b5586e198a6",
  measurementId: "G-BZZH0RWVCF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const gayaCSS = document.createElement('style');
gayaCSS.innerHTML = `
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f8f9fa; margin: 0; padding: 0; color: #333; display: flex; flex-direction: column; min-height: 100vh; }
    header { background-color: #2c3e50; padding: 20px; text-align: center; color: white; }
    header h1 { margin: 0 0 10px 0; font-size: 28px; letter-spacing: 1px; }
    nav { display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; }
    nav button { background-color: transparent; color: #ecf0f1; border: 2px solid transparent; padding: 8px 16px; cursor: pointer; font-size: 16px; font-weight: bold; border-radius: 20px; transition: all 0.3s ease; }
    nav button:hover, nav button.aktif { border-color: #3498db; color: #3498db; }
    .btn-admin { color: #f1c40f; }
    .btn-admin:hover { border-color: #f1c40f; background-color: rgba(241, 196, 15, 0.1); }
    #kontenUtama { background-color: white; padding: 40px; margin: 30px auto; width: 80%; max-width: 800px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); flex-grow: 1; line-height: 1.6; }
    h2 { color: #2c3e50; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px; margin-top: 0;}
    p { font-size: 16px; color: #555; }
    footer { background-color: #2c3e50; color: #bdc3c7; text-align: center; padding: 15px; font-size: 14px; margin-top: auto; }
`;
document.head.appendChild(gayaCSS);

document.body.innerHTML = `
    <header>
        <h1>Portofolio JS</h1>
        <nav id="menuUtama">
            <button class="aktif" onclick="window.location.href='index.html'">Beranda</button>
            <button onclick="window.location.href='../profil/index.html'">Profil</button>
            <button onclick="window.location.href='../project/index.html'">Project</button>
            <button class="btn-admin" onclick="window.loginAdmin()">Admin 🔒</button>
        </nav>
    </header>
    
    <div id="kontenUtama">
        <h2>Halo, Selamat Datang! 👋</h2>
        <p>Terima kasih sudah berkunjung ke halaman portofolio saya.</p>
        <p>Website ini dibangun menggunakan teknik <strong>100% JavaScript</strong> dengan struktur multi-folder.</p>
    </div>
    
    <footer>
        &copy; 2026 - Dibuat dengan 100% JavaScript.
    </footer>
`;

window.loginAdmin = function() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const emailUser = result.user.email;
            const emailSaya = "emailkamu@gmail.com"; // Ganti dengan email Google kamu

            if (emailUser === emailSaya) {
                window.location.href = '../../admin/index.html';
            } else {
                alert("Akses Ditolak! Akun Google ini tidak memiliki izin sebagai Admin.");
                auth.signOut(); 
            }
        }).catch((error) => console.error(error));
}
