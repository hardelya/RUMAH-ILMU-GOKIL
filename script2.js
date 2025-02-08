function navigate(subject) {
  const pages = {
    "Bahasa-Indonesia": "./Bahasa-Indonesia/indexx.html",
    "Bahasa-Inggris": "./Bahasa-Inggris/index.html",
    "Sejarah: "./Sejarah/indexxx.html",
  }

  if (pages[subject]) {
    window.location.href = pages[subject]
  } else {
    alert("Halaman tidak ditemukan!")
  }
}
