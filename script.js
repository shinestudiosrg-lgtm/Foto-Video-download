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
    // API multi platform (contoh gratis)
    const res = await fetch(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    loader.classList.add("hidden");

    // Preview
    if (data.video) {
      preview.innerHTML = `<video controls src="${data.video}"></video>`;
    } else if (data.image) {
      preview.innerHTML = `<img src="${data.image}">`;
    }

    // Download options
    if (data.video) {
      downloads.innerHTML += `<a href="${data.video}" target="_blank">Download Video</a>`;
    }

    if (data.music) {
      downloads.innerHTML += `<a href="${data.music}" target="_blank">Download Audio</a>`;
    }

  } catch (err) {
    loader.classList.add("hidden");
    downloads.innerHTML = "Gagal mengambil data. Coba link lain.";
  }
}
