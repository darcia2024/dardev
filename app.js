/**
 * QOHIROH DIGITAL ECOSYSTEM - PRESENTATION LANDING PAGE LOGIC
 * Dynamic tabs, interactive flow simulators, database search, prototype switcher, modal feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPrototypeTabs();
  initDatabaseExplorer();
  initFlowSimulator();
  initModalActions();
  initSmoothScroll();
  initPitchBarScroll();
});

function initPitchBarScroll() {
  const navLinks = document.querySelectorAll('.nav-links-clean a, .hero-actions-row a');
  
  window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 200;
    
    navLinks.forEach(link => {
      const targetHref = link.getAttribute('href');
      if (targetHref && targetHref.startsWith('#')) {
        const section = document.querySelector(targetHref);
        if (section) {
          if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
          ) {
            navLinks.forEach(b => b.classList.remove('active'));
            link.classList.add('active');
          }
        }
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 1. INTERACTIVE PROTOTYPE TAB SWITCHER                                      */
/* -------------------------------------------------------------------------- */
function initPrototypeTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const protoViews = document.querySelectorAll('.proto-view');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      protoViews.forEach(v => v.classList.remove('active'));

      btn.classList.add('active');
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 2. DATABASE SCHEMA EXPLORER SEARCH & FILTER                                */
/* -------------------------------------------------------------------------- */
const databaseTablesData = [
  {
    name: 'users',
    badge: 'Autentikasi & Akun',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'email', type: 'VARCHAR(255)' },
      { name: 'password_hash', type: 'TEXT' },
      { name: 'full_name', type: 'VARCHAR(150)' },
      { name: 'role', type: 'ENUM (wali, santri, pengajar, admin)' },
      { name: 'phone', type: 'VARCHAR(20)' },
      { name: 'created_at', type: 'TIMESTAMP' }
    ]
  },
  {
    name: 'programs',
    badge: 'Akademik',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'name', type: 'VARCHAR(100)' },
      { name: 'description', type: 'TEXT' },
      { name: 'level', type: 'VARCHAR(50)' },
      { name: 'duration', type: 'VARCHAR(50)' }
    ]
  },
  {
    name: 'classes',
    badge: 'Akademik',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'name', type: 'VARCHAR(100)' },
      { name: 'program_id', type: 'UUID (FK)' },
      { name: 'teacher_id', type: 'UUID (FK)' },
      { name: 'academic_year', type: 'VARCHAR(20)' }
    ]
  },
  {
    name: 'registrations',
    badge: 'Pendaftaran',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'program_id', type: 'UUID (FK)' },
      { name: 'santri_name', type: 'VARCHAR(150)' },
      { name: 'birth_date', type: 'DATE' },
      { name: 'guardian_name', type: 'VARCHAR(150)' },
      { name: 'guardian_phone', type: 'VARCHAR(20)' },
      { name: 'guardian_email', type: 'VARCHAR(100)' },
      { name: 'status', type: 'ENUM (pending, approved, rejected)' }
    ]
  },
  {
    name: 'registration_documents',
    badge: 'Pendaftaran',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'registration_id', type: 'UUID (FK)' },
      { name: 'document_type', type: 'VARCHAR(50)' },
      { name: 'file_url', type: 'TEXT' },
      { name: 'uploaded_at', type: 'TIMESTAMP' }
    ]
  },
  {
    name: 'santri',
    badge: 'Profil Santri',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'user_id', type: 'UUID (FK)' },
      { name: 'program_id', type: 'UUID (FK)' },
      { name: 'class_id', type: 'UUID (FK)' },
      { name: 'full_name', type: 'VARCHAR(150)' },
      { name: 'student_number', type: 'VARCHAR(50)' },
      { name: 'birth_date', type: 'DATE' },
      { name: 'enrollment_date', type: 'DATE' }
    ]
  },
  {
    name: 'teachers',
    badge: 'Pengajar',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'user_id', type: 'UUID (FK)' },
      { name: 'employee_number', type: 'VARCHAR(50)' },
      { name: 'specialization', type: 'VARCHAR(100)' }
    ]
  },
  {
    name: 'guardian_santri',
    badge: 'Portal Wali',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'guardian_user_id', type: 'UUID (FK)' },
      { name: 'santri_id', type: 'UUID (FK)' },
      { name: 'relationship', type: 'VARCHAR(50)' }
    ]
  },
  {
    name: 'schedules',
    badge: 'Akademik',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'class_id', type: 'UUID (FK)' },
      { name: 'subject', type: 'VARCHAR(100)' },
      { name: 'day_of_week', type: 'VARCHAR(20)' },
      { name: 'start_time', type: 'TIME' },
      { name: 'end_time', type: 'TIME' },
      { name: 'teacher_id', type: 'UUID (FK)' },
      { name: 'location', type: 'VARCHAR(100)' }
    ]
  },
  {
    name: 'attendances',
    badge: 'Monitoring Wali',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'santri_id', type: 'UUID (FK)' },
      { name: 'schedule_id', type: 'UUID (FK)' },
      { name: 'date', type: 'DATE' },
      { name: 'status', type: 'ENUM (hadir, izin, sakit, alpa)' },
      { name: 'note', type: 'TEXT' }
    ]
  },
  {
    name: 'materials',
    badge: 'LMS Campus',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'class_id', type: 'UUID (FK)' },
      { name: 'subject', type: 'VARCHAR(100)' },
      { name: 'title', type: 'VARCHAR(200)' },
      { name: 'file_url', type: 'TEXT' },
      { name: 'created_at', type: 'TIMESTAMP' }
    ]
  },
  {
    name: 'assignments',
    badge: 'LMS Campus',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'class_id', type: 'UUID (FK)' },
      { name: 'subject', type: 'VARCHAR(100)' },
      { name: 'title', type: 'VARCHAR(200)' },
      { name: 'due_date', type: 'TIMESTAMP' }
    ]
  },
  {
    name: 'assignment_submissions',
    badge: 'LMS Campus',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'assignment_id', type: 'UUID (FK)' },
      { name: 'santri_id', type: 'UUID (FK)' },
      { name: 'file_url', type: 'TEXT' },
      { name: 'submitted_at', type: 'TIMESTAMP' },
      { name: 'score', type: 'INT' }
    ]
  },
  {
    name: 'grades',
    badge: 'Portal Wali & Campus',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'santri_id', type: 'UUID (FK)' },
      { name: 'subject', type: 'VARCHAR(100)' },
      { name: 'term', type: 'VARCHAR(50)' },
      { name: 'score', type: 'INT' },
      { name: 'note', type: 'TEXT' }
    ]
  },
  {
    name: 'counseling_notes',
    badge: 'Portal Wali',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'santri_id', type: 'UUID (FK)' },
      { name: 'mentor_user_id', type: 'UUID (FK)' },
      { name: 'note', type: 'TEXT' },
      { name: 'note_date', type: 'DATE' }
    ]
  },
  {
    name: 'academic_documents',
    badge: 'Dokumen & Rapor',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'santri_id', type: 'UUID (FK)' },
      { name: 'document_type', type: 'VARCHAR(100)' },
      { name: 'file_url', type: 'TEXT' },
      { name: 'issued_date', type: 'DATE' }
    ]
  },
  {
    name: 'payments',
    badge: 'Keuangan Wali',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'santri_id', type: 'UUID (FK)' },
      { name: 'payment_type', type: 'VARCHAR(100)' },
      { name: 'amount', type: 'INT' },
      { name: 'receipt_url', type: 'TEXT' },
      { name: 'status', type: 'ENUM (lunas, pending)' }
    ]
  },
  {
    name: 'announcements',
    badge: 'Informasi',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'title', type: 'VARCHAR(200)' },
      { name: 'content', type: 'TEXT' },
      { name: 'audience', type: 'ENUM (all, wali, santri, pengajar)' },
      { name: 'published_at', type: 'TIMESTAMP' }
    ]
  },
  {
    name: 'activities',
    badge: 'Kegiatan Mesir',
    columns: [
      { name: 'id', type: 'UUID (PK)' },
      { name: 'title', type: 'VARCHAR(200)' },
      { name: 'description', type: 'TEXT' },
      { name: 'activity_date', type: 'DATE' },
      { name: 'photo_url', type: 'TEXT' }
    ]
  }
];

function initDatabaseExplorer() {
  const erdGrid = document.getElementById('erd-grid');
  const searchInput = document.getElementById('erd-search-input');

  if (!erdGrid) return;

  function renderTables(tables) {
    erdGrid.innerHTML = tables.map(table => `
      <div class="table-card-brown">
        <div class="table-head-brown">
          <div class="table-title-brown">📁 ${table.name}</div>
          <span style="font-size: 10px; font-weight: 800; background: #f4ede4; color: #3e2723; border: 1px solid #d7ccc8; padding: 2px 8px; border-radius: 4px;">${table.badge}</span>
        </div>
        <ul style="padding: 12px 16px; list-style: none; display: flex; flex-direction: column; gap: 6px; max-height: 180px; overflow-y: auto;">
          ${table.columns.map(col => `
            <li style="font-size: 12px; display: flex; justify-content: space-between; font-family: monospace; color: #4e342e;">
              <span style="font-weight: 700;">${col.name}</span>
              <span style="color: #795548; font-size: 11px;">${col.type}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  renderTables(databaseTablesData);

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = databaseTablesData.filter(t => 
        t.name.toLowerCase().includes(query) ||
        t.badge.toLowerCase().includes(query) ||
        t.columns.some(c => c.name.toLowerCase().includes(query))
      );
      renderTables(filtered);
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 3. USER FLOW SIMULATOR                                                     */
/* -------------------------------------------------------------------------- */
const userFlowsData = {
  calonWali: [
    { num: '1', title: 'Akses Qohiroh Public', desc: 'Calon wali membuka situs resmi Qohiroh Center untuk melihat program, fasilitas, dan testimoni.' },
    { num: '2', title: 'Isi Formulir Online', desc: 'Menekan "Daftar Sekarang" dan mengisikan data calon santri serta wali secara step-by-step.' },
    { num: '3', title: 'Unggah Berkas', desc: 'Mengirimkan dokumen kelengkapan pendaftaran secara digital tanpa perlu hadir ke lokasi fisik.' },
    { num: '4', title: 'Pantau Status & Notifikasi', desc: 'Menerima nomor registrasi serta pembaruan status pendaftaran via email / WhatsApp otomatis.' }
  ],
  waliSantri: [
    { num: '1', title: 'Login Qohiroh Family', desc: 'Wali santri di Indonesia masuk ke portal dengan akun terverifikasi.' },
    { num: '2', title: 'Monitoring Real-time Mesir', desc: 'Melihat kehadiran harian santri, jadwal kelas, dan pengumuman kegiatan di Mesir.' },
    { num: '3', title: 'Cek Nilai & Catatan', desc: 'Memantau nilai ujian, progres akademik, dan masukan rutin dari pembimbing santri.' },
    { num: '4', title: 'Unduh Dokumen & Rapor', desc: 'Mengakses dan mengunduh rapor berkala, surat keterangan, serta riwayat pembayaran.' }
  ],
  santri: [
    { num: '1', title: 'Dashboard Qohiroh Campus', desc: 'Santri login dan langsung disambut jadwal kuliah/pelajaran hari ini di Kairo.' },
    { num: '2', title: 'Akses Materi & Modul', desc: 'Mengunduh bahan ajar PDF/video yang diunggah oleh pengajar.' },
    { num: '3', title: 'Kirim Tugas Digital', desc: 'Mengunggah tugas kuliah sebelum batas waktu pengumpulan.' },
    { num: '4', title: 'Evaluasi Diri', desc: 'Melihat hasil penilaian, absensi pribadi, dan masukan akademik dari ustaz/pengajar.' }
  ],
  pengajarAdmin: [
    { num: '1', title: 'Portal Management', desc: 'Pengajar atau Admin masuk ke area khusus pengelola akademik Qohiroh Campus.' },
    { num: '2', title: 'Input Jadwal & Presensi', desc: 'Mengisi absensi kehadiran santri harian dan mengunggah materi pelajaran baru.' },
    { num: '3', title: 'Penilaian & Catatan Mentor', desc: 'Menginput nilai tugas, ujian, serta memberikan catatan bimbingan karakter santri.' },
    { num: '4', title: 'Generate Laporan Wali', desc: 'Sistem otomatis mengompilasi laporan perkembangan untuk diteruskan ke portal Qohiroh Family.' }
  ]
};

function initFlowSimulator() {
  const flowBtns = document.querySelectorAll('.flow-btn');
  const flowContainer = document.getElementById('flow-stepper-container');

  if (!flowContainer) return;

  function renderFlow(flowKey) {
    const steps = userFlowsData[flowKey] || [];
    flowContainer.innerHTML = steps.map(step => `
      <div class="flow-step-card">
        <div class="flow-step-num">${step.num}</div>
        <h4 class="flow-step-title">${step.title}</h4>
        <p class="flow-step-desc">${step.desc}</p>
      </div>
    `).join('');
  }

  renderFlow('calonWali');

  flowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const flowKey = btn.getAttribute('data-flow');
      flowBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFlow(flowKey);
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. MODAL ACTIONS & CLIENT APPROVAL DECK                                    */
/* -------------------------------------------------------------------------- */
function initModalActions() {
  const modalOverlay = document.getElementById('approval-modal');
  const openBtns = document.querySelectorAll('.trigger-approval-modal');
  const closeBtns = document.querySelectorAll('.modal-close, .close-modal-btn');
  const feedbackForm = document.getElementById('client-approval-form');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalOverlay) modalOverlay.classList.add('active');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalOverlay) modalOverlay.classList.remove('active');
    });
  });

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = feedbackForm.querySelector('input[type="text"]').value || 'Perwakilan Qohiroh Center';
      const opsi = feedbackForm.querySelector('select').value || 'Persetujuan Arsitektur 2 Website';
      const catatan = feedbackForm.querySelector('textarea').value || '-';

      const waText = encodeURIComponent(`Halo Dar Dev,\n\nNama: ${nama}\nTahap Pilihan: ${opsi}\nCatatan: ${catatan}\n\nSaya ingin mendiskusikan rancangan 2 Website Qohiroh Center.`);
      window.open(`https://wa.me/6281311506025?text=${waText}`, '_blank');
      
      if (modalOverlay) modalOverlay.classList.remove('active');
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 5. SMOOTH SCROLL FOR NAVBAR                                                */
/* -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
