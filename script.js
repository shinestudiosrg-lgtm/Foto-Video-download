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
    // API 1
    let res = await fetch(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`);
    let data = await res.json();

    // Kalau gagal → pakai API 2
    if (!data.video && !data.images) {
      res = await fetch(`https://api.savetube.me/download?url=${encodeURIComponent(url)}`);
      data = await res.json();
    }

    loader.classList.add("hidden");

    if (data.video) {
      preview.innerHTML = `<video controls src="${data.video}"></video>`;
      downloads.innerHTML += `<a href="${data.video}" target="_blank">⬇️ Download Video</a>`;
    } 
    else if (data.images) {
      data.images.forEach(img => {
        preview.innerHTML += `<img src="${img}">`;
        downloads.innerHTML += `<a href="${img}" target="_blank">⬇️ Download Foto</a>`;
      });
    } 
    else {
      downloads.innerHTML = "❌ Link tidak support / API penuh";
    }

  } catch (err) {
    loader.classList.add("hidden");
    downloads.innerHTML = "❌ Semua API gagal. Coba lagi nanti.";
  }
}
