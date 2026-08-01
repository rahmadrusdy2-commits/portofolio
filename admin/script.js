// Ambil elemen HTML yang dibutuhkan
const formProject = document.getElementById("formProject");
const listProjectAdmin = document.getElementById("listProjectAdmin");

// 1. Fungsi JS untuk menampilkan daftar project di halaman admin
function tampilkanProjectAdmin() {
    // Mengambil data dari Local Storage
    let daftarProyek = JSON.parse(localStorage.getItem("proyek")) || [];
    
    // Kosongkan list sebelum diisi ulang agar tidak ganda
    listProjectAdmin.innerHTML = "";
    
    // Gunakan perulangan JS untuk membuat daftar (li)
    daftarProyek.forEach((proyek, index) => {
        let li = document.createElement("li");
        li.style.marginBottom = "10px";
        
        // Memasukkan Judul, Deskripsi, dan Tombol Hapus
        li.innerHTML = `
            <strong>${proyek.judul}</strong> <br> 
            ${proyek.deskripsi} <br>
            <button onclick="hapusProject(${index})">Hapus</button>
        `;
        listProjectAdmin.appendChild(li);
    });
}

// 2. Fungsi JS saat tombol "Simpan Project" ditekan
formProject.addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah website reload
    
    // Mengambil teks dari form inputan
    const judul = document.getElementById("judulInput").value;
    const deskripsi = document.getElementById("deskripsiInput").value;
    
    // Ambil data lama, masukkan data baru, lalu simpan lagi
    let daftarProyek = JSON.parse(localStorage.getItem("proyek")) || [];
    daftarProyek.push({ judul: judul, deskripsi: deskripsi });
    localStorage.setItem("proyek", JSON.stringify(daftarProyek));
    
    alert("Project berhasil disimpan dengan JS!");
    
    // Kosongkan form inputan
    formProject.reset();
    
    // Perbarui daftar tampilan secara otomatis
    tampilkanProjectAdmin();
});

// 3. Fungsi JS untuk menghapus project
function hapusProject(index) {
    let daftarProyek = JSON.parse(localStorage.getItem("proyek")) || [];
    
    // Menghapus 1 item dari array berdasarkan urutannya (index)
    daftarProyek.splice(index, 1); 
    
    // Simpan kembali data yang sudah diperbarui
    localStorage.setItem("proyek", JSON.stringify(daftarProyek));
    
    // Perbarui daftar tampilan
    tampilkanProjectAdmin(); 
}

// 4. Jalankan fungsi tampilkan saat halaman pertama kali dibuka
window.onload = function() {
    tampilkanProjectAdmin();
};
