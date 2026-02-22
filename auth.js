// auth.js — Frontend Holly (Universal)
const BACKEND_URL = 'https://holly-backend2-production-d4f9.up.railway.app';

const isNavFlex = !!document.querySelector('nav .nav-links');

// ===== BUAT ELEMEN NAVBAR USER =====
function buatNavbarUser() {
  if (document.getElementById('navbar-user')) return;

  const div = document.createElement('div');
  div.id = 'navbar-user';

  if (isNavFlex) {
    // bantuan.html — masuk ke dalam .nav-links
    div.style.cssText = `display:none; align-items:center; gap:10px; font-family:'Plus Jakarta Sans',sans-serif;`;
    div.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;background:rgba(108,79,232,0.15);border:1px solid rgba(155,123,255,0.35);border-radius:999px;padding:5px 14px 5px 6px;">
        <div id="navbar-avatar" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#4c1d95);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700;flex-shrink:0;"></div>
        <span id="navbar-nama" style="font-size:.85rem;font-weight:600;color:#9B7BFF;white-space:nowrap;"></span>
      </div>
      <button onclick="logout()" style="
        font-size:.8rem; font-weight:600;
        color:#fff; cursor:pointer;
        background:linear-gradient(135deg,#7c3aed,#4c1d95);
        border:none; border-radius:999px;
        padding:6px 14px; white-space:nowrap;
        font-family:'Plus Jakarta Sans',sans-serif;
        transition:opacity 0.2s;
      " onmouseover="this.style.opacity='.8'" onmouseout="this.style.opacity='1'">Sign Out</button>
    `;
    document.querySelector('nav .nav-links')?.appendChild(div);
  } else {
    // index.html
    div.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      height: 64px;
      z-index: 100000;
      display: none;
      align-items: center;
      gap: 10px;
      padding-right: 20px;
      font-family: "Inter", Helvetica;
      isolation: isolate;
    `;
    div.innerHTML = `
      <div style="
        display:flex; align-items:center; gap:8px;
        background:#fff;
        border-radius:999px;
        padding:5px 14px 5px 6px;
        box-shadow:0 2px 12px rgba(0,0,0,0.12);
      ">
        <div id="navbar-avatar" style="
          width:30px; height:30px; border-radius:50%;
          background:linear-gradient(135deg,#7c3aed,#4c1d95);
          display:flex; align-items:center; justify-content:center;
          color:#fff; font-size:13px; font-weight:700; flex-shrink:0;
        "></div>
        <span id="navbar-nama" style="
          font-size:14px; font-weight:700;
          color:#4c1d95; white-space:nowrap;
        "></span>
      </div>
      <div onclick="logout()" style="
        display:flex; align-items:center; gap:8px;
        background:#fff;
        border-radius:999px;
        padding:5px 14px 5px 10px;
        box-shadow:0 2px 12px rgba(0,0,0,0.12);
        cursor:pointer;
        transition:opacity 0.2s;
      " onmouseover="this.style.opacity='.8'" onmouseout="this.style.opacity='1'">
        <span style="font-size:14px;font-weight:700;color:#7c3aed;white-space:nowrap;">Sign Out</span>
      </div>
    `;
    document.body.appendChild(div);
  }
}

// ===== CEK SESI =====
function cekSesi() {
  try {
    const raw = localStorage.getItem('holly_user');
    if (!raw) return;
    const user = JSON.parse(raw);
    if (user && user.nama && typeof user.nama === 'string') {
      tampilkanUserNavbar(user.nama);
    } else {
      localStorage.removeItem('holly_user');
    }
  } catch (e) {
    localStorage.removeItem('holly_user');
  }
}

// ===== TAMPILKAN NAMA USER =====
function tampilkanUserNavbar(nama) {
  const btnSignIn = document.getElementById('btn-signin');
  const btnSignUp = document.getElementById('btn-signup');
  if (btnSignIn) btnSignIn.style.display = 'none';
  if (btnSignUp) btnSignUp.style.display = 'none';

  document.querySelectorAll('.text-wrapper, .text-wrapper-3').forEach(el => {
    const t = el.textContent.trim();
    if (t === 'Sign In' || t === 'Sign Up') el.style.display = 'none';
  });

  const navbarNama = document.getElementById('navbar-nama');
  const navbarAvatar = document.getElementById('navbar-avatar');
  const navbarUser = document.getElementById('navbar-user');
  if (navbarNama) navbarNama.textContent = nama;
  if (navbarAvatar) navbarAvatar.textContent = nama.charAt(0).toUpperCase();
  if (navbarUser) navbarUser.style.display = 'flex';
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem('holly_user');

  const btnSignIn = document.getElementById('btn-signin');
  const btnSignUp = document.getElementById('btn-signup');
  if (btnSignIn) btnSignIn.style.display = '';
  if (btnSignUp) btnSignUp.style.display = '';

  document.querySelectorAll('.text-wrapper, .text-wrapper-3').forEach(el => {
    const t = el.textContent.trim();
    if (t === 'Sign In' || t === 'Sign Up') el.style.display = '';
  });

  const navbarUser = document.getElementById('navbar-user');
  if (navbarUser) navbarUser.style.display = 'none';
}

// ===== BUAT MODAL =====
function buatModal(mode = 'register') {
  document.getElementById('holly-modal-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'holly-modal-overlay';
  overlay.style.cssText = `
    position:fixed; inset:0; background:rgba(0,0,0,0.5);
    display:flex; align-items:center; justify-content:center;
    z-index:9999; backdrop-filter:blur(4px); animation:fadeIn 0.2s ease;
  `;

  overlay.innerHTML = `
    <style>
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      .holly-modal {
        background:#fff; border-radius:16px; padding:36px;
        width:90%; max-width:440px; position:relative;
        box-shadow:0 20px 60px rgba(0,0,0,0.2); animation:slideUp 0.25s ease;
      }
      .holly-modal h2 { margin:0 0 4px; color:#1e1b4b; font-size:22px; }
      .holly-modal p.sub { margin:0 0 20px; color:#6b7280; font-size:13px; }
      .holly-modal .error-box {
        background:#fef2f2; border:1px solid #fecaca; color:#dc2626;
        border-radius:8px; padding:12px 14px; font-size:13px; margin-bottom:16px; display:none;
      }
      .holly-modal .success-box {
        background:#f0fdf4; border:1px solid #bbf7d0; color:#16a34a;
        border-radius:8px; padding:12px 14px; font-size:13px; margin-bottom:16px; display:none;
      }
      .holly-modal label { display:block; font-size:13px; color:#374151; margin-bottom:6px; font-weight:500; }
      .holly-modal input {
        width:100%; box-sizing:border-box; border:1.5px solid #e5e7eb; border-radius:8px;
        padding:11px 14px; font-size:14px; margin-bottom:16px; outline:none; transition:border 0.2s;
      }
      .holly-modal input:focus { border-color:#7c3aed; }
      .holly-modal .btn-primary {
        width:100%; background:linear-gradient(135deg,#7c3aed,#4c1d95);
        color:#fff; border:none; border-radius:8px; padding:13px;
        font-size:15px; font-weight:600; cursor:pointer; transition:opacity 0.2s;
      }
      .holly-modal .btn-primary:hover { opacity:0.9; }
      .holly-modal .btn-primary:disabled { opacity:0.6; cursor:not-allowed; }
      .holly-modal .link-bawah { text-align:center; margin-top:16px; font-size:13px; color:#6b7280; }
      .holly-modal .link-bawah a { color:#7c3aed; text-decoration:none; font-weight:600; cursor:pointer; }
      .holly-modal .close-btn {
        position:absolute; top:16px; right:18px; background:none; border:none;
        font-size:20px; cursor:pointer; color:#9ca3af; line-height:1;
      }
      .holly-modal .otp-input {
        font-size:28px !important; letter-spacing:10px !important;
        text-align:center !important; font-weight:bold !important;
      }
      .holly-modal .countdown { font-size:12px; color:#9ca3af; text-align:center; margin-top:-10px; margin-bottom:14px; }
      .holly-modal .resend-link { color:#7c3aed; cursor:pointer; text-decoration:underline; }
      .pass-wrap { position:relative; margin-bottom:16px; }
      .pass-wrap input { margin-bottom:0 !important; padding-right:46px !important; }
      .pass-wrap .toggle-pass {
        position:absolute; right:12px; top:50%; transform:translateY(-50%);
        background:none; border:none; cursor:pointer; color:#9ca3af; padding:0; display:flex; align-items:center;
      }
      .pass-wrap .toggle-pass:hover { color:#7c3aed; }
    </style>

    <!-- FORM REGISTRASI -->
    <div class="holly-modal" id="form-register" style="display:${mode==='register'?'block':'none'};">
      <button class="close-btn" onclick="tutupModal()">✕</button>
      <h2>Buat Akun Baru</h2>
      <p class="sub">Bergabung dengan Holly sekarang</p>
      <div class="error-box" id="reg-error"></div>
      <label>Nama Lengkap</label>
      <input type="text" id="reg-nama" placeholder="Nama Anda..." />
      <label>Email</label>
      <input type="email" id="reg-email" placeholder="email@contoh.com" />
      <label>Kata Sandi</label>
      <div class="pass-wrap">
        <input type="password" id="reg-password" placeholder="Min. 8 karakter" />
        <button type="button" class="toggle-pass" onclick="togglePassword('reg-password','eye1','eyeoff1')">
          <svg id="eye1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          <svg id="eyeoff1" style="display:none;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
        </button>
      </div>
      <button class="btn-primary" id="btn-kirim-otp" onclick="kirimOTP()">Kirim Kode OTP ke Email</button>
      <div class="link-bawah">Sudah punya akun? <a onclick="tampilkanLogin()">Masuk</a></div>
    </div>

    <!-- FORM LOGIN -->
    <div class="holly-modal" id="form-login" style="display:${mode==='login'?'block':'none'};">
      <button class="close-btn" onclick="tutupModal()">✕</button>
      <h2>Masuk ke Holly</h2>
      <p class="sub">Selamat datang kembali!</p>
      <div class="error-box" id="login-error"></div>
      <div class="success-box" id="login-success"></div>
      <label>Email</label>
      <input type="email" id="login-email" placeholder="email@contoh.com" />
      <label>Kata Sandi</label>
      <div class="pass-wrap">
        <input type="password" id="login-password" placeholder="Kata sandi Anda" />
        <button type="button" class="toggle-pass" onclick="togglePassword('login-password','eye2','eyeoff2')">
          <svg id="eye2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          <svg id="eyeoff2" style="display:none;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
        </button>
      </div>
      <button class="btn-primary" id="btn-login" onclick="prosesLogin()">Masuk</button>
      <div class="link-bawah">Belum punya akun? <a onclick="tampilkanRegister()">Daftar</a></div>
    </div>

    <!-- FORM OTP -->
    <div class="holly-modal" id="form-otp" style="display:none;">
      <button class="close-btn" onclick="tutupModal()">✕</button>
      <h2>Verifikasi Email</h2>
      <p class="sub" id="otp-sub">Masukkan kode 6 digit yang dikirim ke email Anda</p>
      <div class="error-box" id="otp-error"></div>
      <div class="success-box" id="otp-success"></div>
      <label>Kode OTP</label>
      <input type="text" id="otp-input" class="otp-input" maxlength="6" placeholder="000000" />
      <div class="countdown" id="otp-countdown"></div>
      <button class="btn-primary" id="btn-verifikasi" onclick="verifikasiOTP()">Verifikasi & Daftar</button>
      <div class="link-bawah">
        Tidak menerima kode?
        <span class="resend-link" id="resend-btn" onclick="kirimUlangOTP()" style="display:none;">Kirim Ulang</span>
        <span id="resend-tunggu"></span>
      </div>
    </div>
  `;

  overlay.addEventListener('click', (e) => { if (e.target === overlay) tutupModal(); });
  document.body.appendChild(overlay);
}

function tampilkanLogin() {
  document.getElementById('form-register').style.display = 'none';
  document.getElementById('form-login').style.display = 'block';
}
function tampilkanRegister() {
  document.getElementById('form-login').style.display = 'none';
  document.getElementById('form-register').style.display = 'block';
}

function togglePassword(inputId, eyeId, eyeOffId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const eye = document.getElementById(eyeId);
  const eyeOff = document.getElementById(eyeOffId);
  if (input.type === 'password') {
    input.type = 'text';
    if (eye) eye.style.display = 'none';
    if (eyeOff) eyeOff.style.display = 'block';
  } else {
    input.type = 'password';
    if (eye) eye.style.display = 'block';
    if (eyeOff) eyeOff.style.display = 'none';
  }
}

let emailTerdaftar = '', namaTerdaftar = '', countdownInterval = null;

async function kirimOTP() {
  const nama = document.getElementById('reg-nama').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const errBox = document.getElementById('reg-error');
  errBox.style.display = 'none';
  if (!nama || !email || !password) { errBox.textContent = 'Semua field wajib diisi.'; errBox.style.display = 'block'; return; }
  if (password.length < 8) { errBox.textContent = 'Kata sandi minimal 8 karakter.'; errBox.style.display = 'block'; return; }
  const btn = document.getElementById('btn-kirim-otp');
  btn.disabled = true; btn.textContent = 'Mengirim...';
  try {
    const res = await fetch(`${BACKEND_URL}/send-otp`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, email, password }),
    });
    const data = await res.json();
    if (data.success) {
      emailTerdaftar = email; namaTerdaftar = nama;
      document.getElementById('form-register').style.display = 'none';
      document.getElementById('form-otp').style.display = 'block';
      document.getElementById('otp-sub').textContent = `Kode dikirim ke ${email}`;
      mulaiCountdown(600);
    } else { errBox.textContent = data.message || 'Gagal mengirim OTP.'; errBox.style.display = 'block'; }
  } catch { errBox.textContent = 'Server tidak dapat dijangkau. Pastikan backend berjalan.'; errBox.style.display = 'block'; }
  btn.disabled = false; btn.textContent = 'Kirim Kode OTP ke Email';
}

async function verifikasiOTP() {
  const otp = document.getElementById('otp-input').value.trim();
  const errBox = document.getElementById('otp-error');
  const sucBox = document.getElementById('otp-success');
  errBox.style.display = 'none'; sucBox.style.display = 'none';
  if (otp.length !== 6) { errBox.textContent = 'Masukkan 6 digit kode OTP.'; errBox.style.display = 'block'; return; }
  const btn = document.getElementById('btn-verifikasi');
  btn.disabled = true; btn.textContent = 'Memverifikasi...';
  try {
    const res = await fetch(`${BACKEND_URL}/verify-otp`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailTerdaftar, otp }),
    });
    const data = await res.json();
    if (data.success) {
      clearInterval(countdownInterval);
      const namaUser = data.nama || namaTerdaftar;
      localStorage.setItem('holly_user', JSON.stringify({ nama: namaUser, email: emailTerdaftar }));
      sucBox.textContent = `✅ Registrasi berhasil! Selamat datang, ${namaUser}!`;
      sucBox.style.display = 'block'; btn.style.display = 'none';
      setTimeout(() => { tutupModal(); tampilkanUserNavbar(namaUser); }, 2000);
    } else { errBox.textContent = data.message || 'OTP salah.'; errBox.style.display = 'block'; }
  } catch { errBox.textContent = 'Server tidak dapat dijangkau.'; errBox.style.display = 'block'; }
  btn.disabled = false; btn.textContent = 'Verifikasi & Daftar';
}

async function prosesLogin() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errBox = document.getElementById('login-error');
  const sucBox = document.getElementById('login-success');
  errBox.style.display = 'none'; sucBox.style.display = 'none';
  if (!email || !password) { errBox.textContent = 'Email dan password wajib diisi.'; errBox.style.display = 'block'; return; }
  const btn = document.getElementById('btn-login');
  btn.disabled = true; btn.textContent = 'Masuk...';
  try {
    const res = await fetch(`${BACKEND_URL}/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      const namaUser = data.nama || email;
      localStorage.setItem('holly_user', JSON.stringify({ nama: namaUser, email: data.email }));
      sucBox.textContent = `✅ Selamat datang kembali, ${namaUser}!`;
      sucBox.style.display = 'block'; btn.style.display = 'none';
      setTimeout(() => { tutupModal(); tampilkanUserNavbar(namaUser); }, 1500);
    } else { errBox.textContent = data.message || 'Login gagal.'; errBox.style.display = 'block'; }
  } catch { errBox.textContent = 'Server tidak dapat dijangkau.'; errBox.style.display = 'block'; }
  btn.disabled = false; btn.textContent = 'Masuk';
}

async function kirimUlangOTP() {
  document.getElementById('resend-btn').style.display = 'none';
  try {
    const res = await fetch(`${BACKEND_URL}/send-otp`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama: namaTerdaftar, email: emailTerdaftar, password: '________' }),
    });
    const data = await res.json();
    if (data.success) mulaiCountdown(600);
  } catch (err) { console.error(err); }
}

function mulaiCountdown(detik) {
  clearInterval(countdownInterval);
  document.getElementById('resend-btn').style.display = 'none';
  let sisa = detik;
  const el = document.getElementById('otp-countdown');
  countdownInterval = setInterval(() => {
    const m = Math.floor(sisa / 60), s = sisa % 60;
    el.textContent = `Kode kadaluarsa dalam ${m}:${s.toString().padStart(2,'0')}`;
    sisa--;
    if (sisa < 0) {
      clearInterval(countdownInterval);
      el.textContent = 'Kode OTP sudah kadaluarsa.';
      document.getElementById('resend-btn').style.display = 'inline';
    }
  }, 1000);
}

function tutupModal() {
  clearInterval(countdownInterval);
  document.getElementById('holly-modal-overlay')?.remove();
}

document.addEventListener('DOMContentLoaded', () => {
  buatNavbarUser();
  cekSesi();

  document.getElementById('btn-signin')?.addEventListener('click', () => buatModal('login'));
  document.getElementById('btn-signup')?.addEventListener('click', () => buatModal('register'));

  document.querySelectorAll('.text-wrapper, .text-wrapper-3').forEach(el => {
    const t = el.textContent.trim();
    if (t === 'Sign In') el.addEventListener('click', () => buatModal('login'));
    if (t === 'Sign Up') el.addEventListener('click', () => buatModal('register'));
  });
});