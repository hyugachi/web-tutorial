
// Fungsi untuk menampilkan section yang sesuai
function showSection(sectionId) {
    // Sembunyikan semua section terlebih dahulu
    const sections = document.querySelectorAll('.tutorial-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Tampilkan section yang dipilih
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        // Scroll ke bagian atas section
        selectedSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Event listener untuk perubahan hash URL
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    showSection(hash || 'nmap'); // Default to nmap if no hash
});

// Tampilkan section berdasarkan hash saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.substring(1);
    showSection(hash || 'nmap'); // Default to nmap if no hash
});



function copyToClipboard(button) {
    // Temukan elemen code terdekat
    const codeBlock = button.closest('.code-container').querySelector('.code-content code');
    const text = codeBlock.textContent.trim();

    // Salin ke clipboard
    navigator.clipboard.writeText(text).then(() => {
        // Ubah teks tombol
        button.textContent = 'Copied!';
        button.classList.add('copied');

        // Kembalikan teks tombol setelah 2 detik
        setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Tambahkan container dan tombol copy ke semua blok kode
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi highlight.js
    hljs.highlightAll();
    
    // Cari semua elemen code yang belum memiliki container
    document.querySelectorAll('code').forEach(codeElement => {
        if (!codeElement.closest('.code-container')) {
            // Buat container baru
            const container = document.createElement('div');
            container.className = 'code-container';

            // Buat header
            const header = document.createElement('div');
            header.className = 'code-header';
            
            // Tambahkan label bahasa jika ada
            const language = codeElement.className.replace('language-', '');
            if (language) {
                const languageSpan = document.createElement('span');
                languageSpan.className = 'language';
                languageSpan.textContent = language;
                header.appendChild(languageSpan);
            }

            // Tambahkan tombol copy
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = 'Copy';
            copyButton.onclick = function() { copyToClipboard(this); };
            header.appendChild(copyButton);

            // Buat content container
            const content = document.createElement('div');
            content.className = 'code-content';

            // Pindahkan code ke dalam struktur baru
            const parent = codeElement.parentNode;
            parent.insertBefore(container, codeElement);
            content.appendChild(codeElement);
            container.appendChild(header);
            container.appendChild(content);
        }
    });
});
