// Konfigurasi Firebase (SESUAIKAN DENGAN KONFIGURASI PROYEKMU)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    // Masukkan API Key dan konfigurasi Firebase kamu di sini
    apiKey: "API_KEY_KAMU",
    authDomain: "DOMAIN_KAMU.firebaseapp.com",
    projectId: "PROJECT_ID_KAMU",
    storageBucket: "BUCKET_KAMU.appspot.com",
    messagingSenderId: "SENDER_ID_KAMU",
    appId: "APP_ID_KAMU"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === ANIMASI REVEAL SAAT SCROLL ===
function revealElement() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', revealElement);
revealElement(); // Panggil saat pertama kali load

// === FUNGSI FLIP KARTU ANGGOTA ===
window.flipCard = function(element) {
    const card = element.querySelector('.transform-style-3d');
    if (card.classList.contains('rotate-y-180')) {
        card.classList.remove('rotate-y-180');
    } else {
        card.classList.add('rotate-y-180');
    }
}

// === KOMPONEN KARTU ANGGOTA (Dibuat via string) ===
function createMemberCard(member, role, isMain = false) {
    const f1 = member.foto1 || `https://ui-avatars.com/api/?name=${member.nama}&background=991b1b&color=fff&size=256`;
    const f2 = member.foto2 || f1; 
    const sizeClasses = isMain ? "w-48 h-48 md:w-56 md:h-56" : "w-36 h-36 md:w-44 md:h-44";
    const isKoordinator = role === "Koordinator";
    const titleClass = isMain ? 'text-xl' : 'text-base';
    const roleClass = isMain ? 'text-xs text-red-800' : 'text-[10px]';
    const roleBadge = isKoordinator ? 'text-amber-600 bg-amber-50 px-2 py-0.5 rounded' : 'text-stone-400';

    return `
    <div class="flex flex-col items-center perspective-1000 group">
      <div onclick="flipCard(this)" class="relative ${sizeClasses} rounded-xl shadow-lg border-4 border-white mb-4 cursor-pointer transform-style-3d transition-transform duration-700 ease-in-out hover:shadow-2xl hover:-translate-y-1">
        <div class="absolute inset-0 backface-hidden bg-stone-100 rounded-lg overflow-hidden z-10">
           <img src="${f1}" class="w-full h-full object-cover" alt="${member.nama}" />
        </div>
        <div class="absolute inset-0 backface-hidden rotate-y-180 bg-stone-100 rounded-lg overflow-hidden">
           <img src="${f2}" class="w-full h-full object-cover" alt="${member.nama} Alternate" />
        </div>
      </div>
      <h4 class="font-bold text-stone-900 text-center leading-tight mb-1 ${titleClass}">${member.nama}</h4>
      ${role ? `<p class="font-bold uppercase tracking-widest font-sans ${roleClass} ${roleBadge}">${role}</p>` : ''}
    </div>
    `;
}


// === LOGIKA UTAMA AMBIL DATA FIREBASE ===
async function fetchData() {
    try {
        // 1. Ambil Foto Hero
        const snapFoto = await getDoc(doc(db, "pengaturan", "tampilan"));
        if (snapFoto.exists() && snapFoto.data().profil) {
            const images = snapFoto.data().profil;
            const container = document.getElementById('hero-backgrounds');
            let bgHtml = '';
            images.forEach((bg, i) => {
                bgHtml += `<div class="hero-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === 0 ? 'opacity-70' : 'opacity-0'}" style="background-image: url('${bg}')"></div>`;
            });
            bgHtml += `<div class="absolute inset-0 bg-gradient-to-t from-[#171412] via-[#171412]/80 to-[#171412]/40 backdrop-blur-[1px] z-10"></div>`;
            container.innerHTML = bgHtml;

            // Logika Slider Hero
            let currentIndex = 0;
            const slides = document.querySelectorAll('.hero-slide');
            if(slides.length > 1) {
                setInterval(() => {
                    slides[currentIndex].classList.remove('opacity-70');
                    slides[currentIndex].classList.add('opacity-0');
                    currentIndex = (currentIndex + 1) % slides.length;
                    slides[currentIndex].classList.remove('opacity-0');
                    slides[currentIndex].classList.add('opacity-70');
                }, 4000);
            }
        }

        // 2. Ambil Visi Misi
        const snapText = await getDoc(doc(db, "pengaturan", "profilText"));
        if (snapText.exists()) {
            document.getElementById('teks-visi').innerText = snapText.data().visi;
            document.getElementById('teks-misi').innerText = snapText.data().misi;
        }

        // 3. Ambil Sejarah
        const sejSnap = await getDocs(query(collection(db, "sejarah_asrama"), orderBy("createdAt", "asc")));
        let sejarahData = [];
        sejSnap.forEach((doc) => sejarahData.push({ id: doc.id, ...doc.data() }));
        
        let halAktif = 0;
        if(sejarahData.length === 0) sejarahData = [{ judul: "Bagian 1", isi: "Belum ada catatan sejarah." }];
        
        const renderSejarah = () => {
            document.getElementById('sejarah-judul').innerText = sejarahData[halAktif].judul;
            document.getElementById('sejarah-isi').innerText = sejarahData[halAktif].isi;
            document.getElementById('sejarah-indikator').innerText = `${halAktif + 1} / ${sejarahData.length}`;
            
            const btnPrev = document.getElementById('btn-prev-sejarah');
            const btnNext = document.getElementById('btn-next-sejarah');
            
            if(halAktif === 0) {
                btnPrev.className = "flex items-center gap-2 text-stone-300 cursor-not-allowed";
                btnPrev.disabled = true;
            } else {
                btnPrev.className = "flex items-center gap-2 text-stone-500 hover:text-red-800 transition-colors";
                btnPrev.disabled = false;
            }

            if(halAktif === sejarahData.length - 1) {
                btnNext.className = "flex items-center gap-2 text-stone-300 cursor-not-allowed";
                btnNext.disabled = true;
            } else {
                btnNext.className = "flex items-center gap-2 text-stone-900 hover:text-amber-600 transition-colors";
                btnNext.disabled = false;
            }
        };
        renderSejarah();

        document.getElementById('btn-prev-sejarah').addEventListener('click', () => { if(halAktif > 0) { halAktif--; renderSejarah(); } });
        document.getElementById('btn-next-sejarah').addEventListener('click', () => { if(halAktif < sejarahData.length - 1) { halAktif++; renderSejarah(); } });


        // 4. Ambil Timeline (Scroll)
        const timeSnap = await getDocs(query(collection(db, "timeline_sejarah"), orderBy("tahun", "asc")));
        let timelineHtml = '';
        let idxTime = 0;
        timeSnap.forEach((doc) => {
            const item = doc.data();
            timelineHtml += `
            <div class="relative pl-8 md:pl-10 group animate-[fadeIn_0.5s_ease-out]" style="transition-delay: ${idxTime * 100}ms">
                <div class="absolute -left-[9px] top-1.5 w-4 h-4 bg-amber-500 rounded-full border-4 border-[#f9f8f6] group-hover:scale-150 group-hover:bg-red-800 transition-all duration-300"></div>
                <div class="bg-white p-5 rounded-sm border border-stone-100 shadow-sm group-hover:shadow-md group-hover:border-amber-200 transition-all duration-300 transform group-hover:translate-x-2">
                    <div class="mb-2"><span class="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold tracking-widest rounded-sm">${item.tahun}</span></div>
                    <h3 class="text-lg font-bold text-stone-900 font-playfair mb-2 group-hover:text-amber-600 transition-colors">${item.judul}</h3>
                    <p class="text-stone-600 text-sm leading-relaxed">${item.deskripsi}</p>
                </div>
            </div>`;
            idxTime++;
        });
        document.getElementById('timeline-container').innerHTML = timelineHtml || '<p class="text-stone-500">Belum ada catatan waktu.</p>';

        // 5. Ambil Kepengurusan
        const docInti = await getDoc(doc(db, "pengaturan", "pengurus_inti"));
        if (docInti.exists()) {
            const dataInti = docInti.data();
            document.getElementById('pengurus-inti-container').classList.remove('hidden');
            
            document.getElementById('ketua-container').innerHTML = createMemberCard({ nama: dataInti.ketuaNama, foto1: dataInti.ketuaFoto, foto2: dataInti.ketuaFoto2 }, "Ketua Asrama", true);
            
            document.getElementById('sekre-bendum-container').innerHTML = 
                createMemberCard({ nama: dataInti.sekreNama, foto1: dataInti.sekreFoto, foto2: dataInti.sekreFoto2 }, "Sekretaris", true) +
                createMemberCard({ nama: dataInti.bendaharaNama, foto1: dataInti.bendaharaFoto, foto2: dataInti.bendaharaFoto2 }, "Bendahara", true);
        }

        // Ambil Divisi dan Anggota
        const divSnap = await getDocs(query(collection(db, "divisi_asrama"), orderBy("createdAt", "asc")));
        let dataDivisi = [];
        divSnap.forEach((doc) => dataDivisi.push({ id: doc.id, ...doc.data() }));

        const angSnap = await getDocs(query(collection(db, "anggota_divisi"), orderBy("createdAt", "asc")));
        let dataAnggota = [];
        angSnap.forEach((doc) => dataAnggota.push({ id: doc.id, ...doc.data() }));

        let htmlDivisi = '';
        dataDivisi.forEach(div => {
            const anggotaDivisiIni = dataAnggota.filter(a => a.divisiId === div.id);
            const koordinators = anggotaDivisiIni.filter(a => a.peran === "Koordinator");
            const anggotas = anggotaDivisiIni.filter(a => a.peran !== "Koordinator");

            let kontenAnggota = '';
            if(anggotaDivisiIni.length === 0) {
                kontenAnggota = `<p class="text-sm text-stone-400 text-center italic">Belum ada anggota</p>`;
            } else {
                let htmlKoor = koordinators.map(k => createMemberCard({ nama: k.nama, foto1: k.foto, foto2: k.foto2 }, k.peran, false)).join('');
                let htmlAng = anggotas.map(a => createMemberCard({ nama: a.nama, foto1: a.foto, foto2: a.foto2 }, a.peran || "Anggota", false)).join('');
                
                kontenAnggota = `
                <div class="flex flex-col gap-10">
                    ${koordinators.length > 0 ? `<div class="flex justify-center flex-wrap gap-8">${htmlKoor}</div>` : ''}
                    ${anggotas.length > 0 ? `<div class="grid grid-cols-2 gap-8 justify-items-center">${htmlAng}</div>` : ''}
                </div>`;
            }

            htmlDivisi += `
            <div class="bg-white rounded-sm shadow-[4px_4px_0px_0px_rgba(23,20,18,0.05)] border border-[#e8e4db] overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 w-full">
                <div class="bg-[#171412] py-4 px-6 text-center border-b-2 border-red-800">
                    <h4 class="text-white font-bold tracking-wider font-sans uppercase">${div.namaDivisi}</h4>
                </div>
                <div class="p-8 flex-grow">
                    ${kontenAnggota}
                </div>
            </div>`;
        });
        document.getElementById('list-divisi').innerHTML = htmlDivisi;

    } catch (error) {
        console.error("Gagal mengambil data dari Firebase:", error);
    }
}

// Jalankan pengambilan data saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchData);
