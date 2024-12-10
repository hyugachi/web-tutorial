// Fungsi sederhana untuk menyalin kode
function copyCode() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const pre = button.closest('.code-block').querySelector('pre');
            const code = pre.textContent;

            navigator.clipboard.writeText(code).then(() => {
                button.classList.add('copied');
                button.querySelector('span').textContent = 'Copied!';

                setTimeout(() => {
                    button.classList.remove('copied');
                    button.querySelector('span').textContent = 'Copy';
                }, 2000);
            });
        });
    });
}

// Inisialisasi saat dokumen dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi highlight.js
    hljs.highlightAll();
    
    // Inisialisasi tombol copy
    copyCode();
});
