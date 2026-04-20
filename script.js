const preview = document.getElementById('preview');
const statusEl = document.getElementById('status');
const downloadBox = document.getElementById('downloadBox');
const downloadLink = document.getElementById('downloadLink');
const openLink = document.getElementById('openLink');
const metaStatus = document.getElementById('metaStatus');
const metaType = document.getElementById('metaType');
const metaFile = document.getElementById('metaFile');

function setStatus(message, mode = '') {
  statusEl.textContent = message;
  statusEl.className = 'status' + (mode ? ' ' + mode : '');
}

function sanitizeFilename(name) {
  return (name || 'shine-media')
    .trim()
    .replace(/[\\/:*?"<>|]+/g, '-')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function detectType(url) {
  const cleanUrl = url.split('?')[0].toLowerCase();
  if (/\.(mp4|webm|mov|m4v)$/.test(cleanUrl)) return 'video';
  if (/\.(jpg|jpeg|png|webp|gif)$/.test(cleanUrl)) return 'image';
  if (/\.(mp3|wav|ogg|m4a)$/.test(cleanUrl)) return 'audio';
  return 'unknown';
}

function extensionFromUrl(url, type) {
  const cleanUrl = url.split('?')[0];
  const ext = cleanUrl.includes('.') ? cleanUrl.split('.').pop().toLowerCase() : '';
  if (ext) return ext;
  if (type === 'video') return 'mp4';
  if (type === 'image') return 'jpg';
  if (type === 'audio') return 'mp3';
  return 'bin';
}

function resetApp() {
  document.getElementById('url').value = '';
  document.getElementById('filename').value = '';
  document.getElementById('type').value = 'auto';
  preview.className = 'preview empty';
  preview.innerHTML = 'Preview media akan tampil di sini setelah URL valid dimasukkan.';
  downloadBox.style.display = 'none';
  metaStatus.textContent = 'Menunggu URL';
  metaType.textContent = '-';
  metaFile.textContent = '-';
  setStatus('Belum ada media yang dimuat.');
}

function validHttpUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function loadMedia() {
  const url = document.getElementById('url').value.trim();
  const manualType = document.getElementById('type').value;
  const autoType = detectType(url);
  const finalType = manualType === 'auto' ? autoType : manualType;

  if (!url) {
    setStatus('Masukkan URL media dulu.', 'error');
    return;
  }

  if (!validHttpUrl(url)) {
    setStatus('URL tidak valid. Gunakan http:// atau https://', 'error');
    return;
  }

  if (manualType === 'auto' && autoType === 'unknown') {
    setStatus('Format file tidak terdeteksi. Pilih jenis media secara manual.', 'error');
    return;
  }

  const fileBase = sanitizeFilename(document.getElementById('filename').value || 'shine-media');
  const ext = extensionFromUrl(url, finalType);
  const finalName = `${fileBase}.${ext}`;

  preview.className = 'preview';

  if (finalType === 'video') {
    preview.innerHTML = `<video controls playsinline src="${url}"></video>`;
  } else if (finalType === 'image') {
    preview.innerHTML = `<img src="${url}" alt="Preview media">`;
  } else if (finalType === 'audio') {
    preview.innerHTML = `<audio controls src="${url}"></audio>`;
  } else {
    setStatus('Jenis media belum didukung untuk preview.', 'error');
    return;
  }

  downloadLink.href = url;
  downloadLink.setAttribute('download', finalName);
  openLink.href = url;
  downloadBox.style.display = 'grid';

  metaStatus.textContent = 'Siap diunduh';
  metaType.textContent = finalType;
  metaFile.textContent = finalName;
  setStatus('Media berhasil dimuat.', 'ok');
}
