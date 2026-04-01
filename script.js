async function getMedia() {
  const url = document.getElementById("url").value;
  const loader = document.getElementById("loader");
  const preview = document.getElementById("preview");
  const downloads = document.getElementById("downloads");

  if (!url) {
    alert("Masukkan link dulu!");
    return;
  }

  loader.classList.remove("hidden");
  preview.innerHTML = "";
  downloads.innerHTML = "";

  try {
    const res = await fetch(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    loader.classList.add("hidden");

    // Preview
    if (data.video) {
      preview.innerHTML = `<video controls src="${data.video}"></video>`;
      downloads.innerHTML += `<a href="${data.video}" target="_blank">⬇️ Download Video</a>`;
    } 
    else if (data.images && data.images.length > 0) {
      data.images.forEach(img => {
        preview.innerHTML += `<img src="${img}">`;
        downloads.innerHTML += `<a href="${img}" target="_blank">⬇️ Download Foto</a>`;
      });
    } 
    else {
      downloads.innerHTML = "❌ Tidak bisa ambil media dari link ini.";
    }

  } catch (err) {
    loader.classList.add("hidden");
    downloads.innerHTML = "❌ Error / API sedang down. Coba lagi nanti.";
  }
}
