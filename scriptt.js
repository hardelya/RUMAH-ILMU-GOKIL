document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnMateri").addEventListener("click", function() {
        let pelajaran = document.getElementById("pelajaran").value;
        let output = document.getElementById("output");

        if (!pelajaran) {
            output.innerHTML = "<p>Silakan pilih Materi</p>";
            return;
        }

        let url = `https://id.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&titles=${pelajaran}&origin=*`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let pages = data.query.pages;
                let pageId = Object.keys(pages)[0]; 
                let extract = pages[pageId].extract || "Data tidak tersedia.";

                let Materi = formatMateri(extract, pelajaran);
                output.innerHTML = `<h3>${pelajaran.replace(/_/g, " ")}</h3>${Materi}`;
            })
            .catch(error => {
                output.innerHTML = "<p>Terjadi kesalahan saat mengambil data.</p>";
                console.error("Error:", error);
            });
    });

    function formatMateri(text, pelajaran) {
        let sentences = text.split(". ");
        let pengertian = sentences[0] ? `<div class="section"><h4>Pengertian</h4><p>${sentences[0]}</p></div>` : "";
        let jenis = sentences.slice(1, 3).join(". ") ? `<div class="section"><h4>Jenis</h4><p>${sentences.slice(1, 3).join(". ")}</p></div>` : "";
        let unsur = sentences.slice(3, 5).join(". ") ? `<div class="section"><h4>Unsur</h4><p>${sentences.slice(3, 5).join(". ")}</p></div>` : "";
        let contoh = sentences.slice(5, 7).join(". ") ? `<div class="section"><h4>Contoh</h4><p>${sentences.slice(5, 7).join(". ")}</p></div>` : "";

        if (!pengertian && !jenis && !unsur && !contoh) {
            return `<p>Rangkuman tidak lengkap. Silakan coba materi lain.</p>`;
        }

        return pengertian + jenis + unsur + contoh;
    }
});
