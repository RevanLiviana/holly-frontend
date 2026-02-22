// frontendotp.js — Holly Frontend OTP Handler

async function kirimOTP() {
  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!nama || !email || !password) {
    alert('Nama, email, dan password wajib diisi!');
    return;
  }

  const tombol = document.getElementById('btnKirimOTP');
  if (tombol) {
    tombol.disabled = true;
    tombol.innerText = 'Mengirim...';
  }

  try {
    const res = await fetch('http://localhost:3001/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, email, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert('✅ Kode OTP berhasil dikirim ke ' + email);

      // Tampilkan form OTP jika ada
      const formOTP = document.getElementById('formOTP');
      if (formOTP) formOTP.style.display = 'block';

      const formRegister = document.getElementById('formRegister');
      if (formRegister) formRegister.style.display = 'none';
    } else {
      alert('❌ Gagal: ' + data.message);
    }
  } catch (err) {
    alert('❌ Server tidak bisa dijangkau. Pastikan server berjalan di port 3001.');
    console.error(err);
  } finally {
    if (tombol) {
      tombol.disabled = false;
      tombol.innerText = 'Kirim Kode OTP';
    }
  }
}

async function verifikasiOTP() {
  const email = document.getElementById('email').value.trim();
  const otp = document.getElementById('otp').value.trim();

  if (!email || !otp) {
    alert('Email dan kode OTP wajib diisi!');
    return;
  }

  const tombol = document.getElementById('btnVerifikasiOTP');
  if (tombol) {
    tombol.disabled = true;
    tombol.innerText = 'Memverifikasi...';
  }

  try {
    const res = await fetch('http://localhost:3001/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (data.success) {
      alert('✅ Registrasi berhasil! Selamat datang, ' + data.nama + '!');
      // Redirect ke halaman login atau dashboard
      window.location.href = 'index.html';
    } else {
      alert('❌ ' + data.message);
    }
  } catch (err) {
    alert('❌ Server tidak bisa dijangkau. Pastikan server berjalan di port 3001.');
    console.error(err);
  } finally {
    if (tombol) {
      tombol.disabled = false;
      tombol.innerText = 'Verifikasi OTP';
    }
  }
}

async function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Email dan password wajib diisi!');
    return;
  }

  const tombol = document.getElementById('btnLogin');
  if (tombol) {
    tombol.disabled = true;
    tombol.innerText = 'Masuk...';
  }

  try {
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert('✅ Login berhasil! Selamat datang, ' + data.nama + '!');
      // Simpan data user ke localStorage
      localStorage.setItem('holly_user', JSON.stringify({ nama: data.nama, email: data.email }));
      // Redirect ke halaman utama
      window.location.href = 'index.html';
    } else {
      alert('❌ ' + data.message);
    }
  } catch (err) {
    alert('❌ Server tidak bisa dijangkau. Pastikan server berjalan di port 3001.');
    console.error(err);
  } finally {
    if (tombol) {
      tombol.disabled = false;
      tombol.innerText = 'Login';
    }
  }
}