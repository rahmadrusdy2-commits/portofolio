// Mengubah Judul Tab Browser menggunakan JavaScript
document.title = "Panel Admin | Kelola Portofolio";

// 1. JavaScript menyuntikkan CSS Admin
const cssAdmin = document.createElement('style');
cssAdmin.innerHTML = `
    body { font-family: sans-serif; background: #ececec; padding: 20px; }
    .container { background: white; padding: 20px; border-radius: 8px; max-width: 500px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    input, textarea { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    button { background: #27ae60; color: white; border: none; padding: 10px 15px; cursor: pointer; border-radius: 4px; }
    button:hover { background: #2ecc71; }
    .btn-hapus { background: #e74c3c; margin-top: 10px; padding: 5px 10px; }
    ul { list-style-type: none; padding: 0; }
    li { background: #f9f9f9; padding: 10px; margin-bottom: 10px; border-left: 4px solid #3498db; }
`;
document.head.appendChild(cssAdmin);

// 2. JavaScript membangun form HTML di layar
document.body.innerHTML = `
    <div class="container">
        <h2>Panel Admin (100% JS)</h2>
        <p><a href="../public/index.html">Lihat Halaman Pengunjung</a></p>
        
        <form id="formProject">
            <input type="text" id="judulInput" placeholder="Judul Project" required>
            <textarea id="deskripsiInput" placeholder="Deskripsi Singkat" rows="4" required></textarea>
            <button type="submit">Simpan Data JS</button>
        </form>

        <hr>
        <h3>Data Tersimpan:</h3>
        <ul id="listProjectAdmin"></ul>
    </div>
`;

// 3. Logika JavaScript untuk menyimpan dan menampilkan data
const formProject = document.getElementById("formProject");
const listProjectAdmin = document.getElementById("listProjectAdmin");

function tampilkanProjectAdmin() {
    let daftarProyek = JSON.parse(localStorage.getItem("proyek")) || [];
    listProjectAdmin.innerHTML = "";
    
    daftarProyek.forEach((proyek, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <strong>${proyek.judul}</strong><br>${proyek.deskripsi}<br>
            <button class="btn-hapus" onclick="hapusProject(${index})">Hapus</button>
        `;
        listProjectAdmin.appendChild(li);
    });
}

formProject.addEventListener("submit", function(event) {
    event.preventDefault();
    let judul = document.getElementById("judulInput").value;
    let deskripsi = document.getElementById("deskripsiInput").value;
    
    let daftarProyek = JSON.parse(localStorage.getItem("proyek")) || [];
    daftarProyek.push({ judul: judul, deskripsi: deskripsi });
    localStorage.setItem("proyek", JSON.stringify(daftarProyek));
    
    formProject.reset();
    tampilkanProjectAdmin();
});

// Perlu mengaitkan fungsi hapus ke object window agar terbaca oleh onclick di HTML buatan JS
window.hapusProject = function(index) {
    let daftarProyek = JSON.parse(localStorage.getItem("proyek")) || [];
    daftarProyek.splice(index, 1);
    localStorage.setItem("proyek", JSON.stringify(daftarProyek));
    tampilkanProjectAdmin();
};

window.onload = tampilkanProjectAdmin;
