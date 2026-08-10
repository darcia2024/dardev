import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  Star, 
  Send, 
  CheckCircle, 
  Car, 
  Camera, 
  Coffee, 
  ShoppingBag, 
  ArrowRight, 
  PhoneCall, 
  ShieldCheck, 
  Zap,
  Globe
} from 'lucide-react';

export default function App() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('qohiroh');

  // Form State
  const [nama, setNama] = useState('Ahmad Supriyadi');
  const [layanan, setLayanan] = useState('Horse Riding Experience Madinah (100 SAR)');
  const [tanggal, setTanggal] = useState('2026-12-25');
  const [catatan, setCatatan] = useState('Minta jemput di Lobi Hotel Oberoi Madinah');
  const [toastVisible, setToastVisible] = useState(false);

  // Sample Services Catalog
  const services = [
    {
      id: 1,
      title: 'Horse Riding Experience Madinah',
      category: 'Aktivitas',
      city: 'madinah',
      price: '100 SAR',
      rating: 4.8,
      vendor: 'Madinah Equestrian',
      icon: Compass
    },
    {
      id: 2,
      title: 'Private GMC Airport Transfer Jeddah → Makkah',
      category: 'Transportasi',
      city: 'jeddah',
      price: '350 SAR',
      rating: 4.9,
      vendor: 'Haramain Express',
      icon: Car
    },
    {
      id: 3,
      title: 'Specialist Umrah Photographer (Makkah & Nabawi)',
      category: 'Dokumentasi',
      city: 'makkah',
      price: '200 SAR',
      rating: 5.0,
      vendor: 'Kairo Vision Media',
      icon: Camera
    },
    {
      id: 4,
      title: 'Traditional Saudi Coffee & Culinary Tour',
      category: 'Kuliner',
      city: 'madinah',
      price: '75 SAR',
      rating: 4.7,
      vendor: 'Hijaz Flavor Co.',
      icon: Coffee
    },
    {
      id: 5,
      title: 'Ajwa Premium Dates & Souvenir Hotel Delivery',
      category: 'Oleh-oleh',
      city: 'makkah',
      price: '120 SAR',
      rating: 4.9,
      vendor: 'Madinah Date Center',
      icon: ShoppingBag
    }
  ];

  const filteredServices = services.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || s.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);

    const text = encodeURIComponent(
      `📲 Rincian Pesanan GALLOP Umroh:\n\n👤 Nama: ${nama}\n📦 Layanan: ${layanan}\n📅 Tanggal: ${tanggal}\n📝 Catatan: ${catatan}\n\nHalo Penyedia Jasa, mohon konfirmasi pesanan. Terima kasih!`
    );
    window.open(`https://wa.me/6281311506025?text=${text}`, '_blank');
  };

  return (
    <div style={{ background: '#ffffff', color: '#022c22', minHeight: '100vh', fontWeight: 300 }}>

      {/* TOP NOTICE BANNER */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: '#064e3b',
          color: '#ffffff',
          textAlign: 'center',
          padding: '10px 16px',
          fontSize: '12.5px',
          fontWeight: 300,
          borderBottom: '1px solid #047857'
        }}
      >
        <Sparkles style={{ width: 14, height: 14, display: 'inline', marginRight: 6, verticalAlign: -2 }} />
        PLATFORM FULL ANIMASI (Motion for React + Vite + TypeScript) — Persembahan <strong>Dar Dev</strong>
      </motion.div>

      <!-- NAVBAR MINIMALIST -->
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1.5px solid #a7f3d0',
          padding: '16px 0'
        }}
      >
        <div class="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.02 }}
            style={{ fontSize: '20px', fontWeight: 400, color: '#064e3b', textDecoration: 'none', letterSpacing: '-0.5px' }}
          >
            Dar Dev <span style={{ color: '#047857', fontWeight: 300 }}>× Motion App</span>
          </motion.a>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="#katalog" style={{ color: '#022c22', textDecoration: 'none', fontSize: '13px', fontWeight: 300 }}>Katalog</a>
            <a href="#wa-booking" style={{ color: '#022c22', textDecoration: 'none', fontSize: '13px', fontWeight: 300 }}>Booking WA</a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/6281311506025?text=Halo%20Dar%20Dev,%20saya%20tertarik%20dengan%20Motion%20React%20App"
              target="_blank"
              class="btn-outline"
              style={{ padding: '8px 18px', fontSize: '12px' }}
            >
              Diskusi WA <ArrowRight style={{ width: 14, height: 14 }} />
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* HERO SECTION WITH ENTRANCE STAGGER ANIMATION */}
      <section style={{ padding: '70px 0 50px 0', textAlign: 'center' }}>
        <div class="container" style={{ maxWidth: '840px' }}>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            class="badge-emerald"
            style={{ marginBottom: '16px' }}
          >
            Full Animasi & Interactive Motion System
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: '42px', fontWeight: 300, color: '#064e3b', lineHeight: 1.15, marginBottom: '18px' }}
          >
            Website Layanan Jamaah Umroh dengan Animasi Halus & Responsif
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '16px', color: '#047857', lineHeight: 1.6, marginBottom: '28px', fontWeight: 300 }}
          >
            Demonstrasi alur kerja 4 Tool (Motion for React + Vite + TypeScript + Design System) persembahan <strong>Dar Dev</strong> — Cepat, tanpa login, dan terintegrasi otomatis ke WhatsApp hotline <code>081311506025</code>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a href="#katalog" class="btn-emerald">
              Coba Katalog Motion ↓
            </a>
            <a 
              href="https://wa.me/6281311506025?text=Halo%20Dar%20Dev,%20saya%20tertarik%20diskusi%20React%20Motion" 
              target="_blank" 
              class="btn-outline"
            >
              <PhoneCall style={{ width: 14, height: 14 }} /> Diskusikan Bersama Dar Dev ↗
            </a>
          </motion.div>

        </div>
      </section>

      {/* INTERACTIVE MOTION TABS SWITCHER */}
      <section style={{ padding: '40px 0', background: '#f0fdf4' }}>
        <div class="container">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style="font-size: 26px; fontWeight: 300; color: #064e3b; margin-bottom: 6px;">Ekosistem Digital Interaktif</h2>
            <p style={{ fontSize: '13.5px', color: '#047857' }}>Klik tab di bawah untuk melihat animasi pergantian mode secara instant:</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
            {['qohiroh', 'gallop'].map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                style={{
                  position: 'relative',
                  padding: '10px 24px',
                  borderRadius: '50px',
                  border: '1.5px solid #a7f3d0',
                  background: activeTab === tabKey ? '#064e3b' : '#ffffff',
                  color: activeTab === tabKey ? '#ffffff' : '#064e3b',
                  fontSize: '13px',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tabKey === 'qohiroh' ? '🏫 Qohiroh Center (2 Web)' : '🐎 GALLOP (Umrah Catalog)'}
                {activeTab === tabKey && (
                  <motion.div 
                    layoutId="activePill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50px',
                      border: '2px solid #064e3b',
                      pointerEvents: 'none'
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* TAB CONTENT ANIMATION */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              class="glass-card"
              style={{ maxWidth: '800px', margin: '0 auto' }}
            >
              {activeTab === 'qohiroh' ? (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 400, color: '#064e3b', marginBottom: '8px' }}>
                    Qohiroh Digital Ecosystem (2 Website Terpisah)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#047857', lineHeight: 1.6 }}>
                    Arsitektur resmi untuk Ustadz Muhammad Iqbal, Lc: <strong>qohirohcenter.com</strong> (Website Utama Pendaftaran & Akun Seleksi Ujian) dan <strong>app.qohirohcenter.com</strong> (Portal Aplikasi Wali Family, Campus Santri, & Operations Staff dengan Auto-Generate Invoice SPP/Kuitansi Digital PDF).
                  </p>
                </div>
              ) : (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 400, color: '#064e3b', marginBottom: '8px' }}>
                    GALLOP — Platform Katalog Layanan Tambahan Jamaah Umroh
                  </h3>
                  <p style={{ fontSize: '13px', color: '#047857', lineHeight: 1.6 }}>
                    Katalog pusat untuk Transportasi GMC, Berkuda Madinah, Padel Makkah, Kuliner, Fotografi, & Laundry. Jamaah cukup memilih paket lalu mengirim pesan otomatis ke WhatsApp penyedia tanpa perlu membuat akun.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* KATALOG SHOWCASE WITH SCROLL REVEAL & FILTERS */}
      <section id="katalog" style={{ padding: '60px 0' }}>
        <div class="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 300, color: '#064e3b', marginBottom: '6px' }}>Katalog Layanan Interaktif</h2>
            <p style={{ fontSize: '14px', color: '#047857' }}>Filter kota atau cari berdasarkan kata kunci:</p>
          </div>

          {/* SEARCH & FILTER CONTROLS */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Cari layanan (cth: Berkuda, GMC, Fotografer)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: '50px',
                border: '1.5px solid #a7f3d0',
                fontSize: '13px',
                outline: 'none',
                background: '#f0fdf4',
                color: '#022c22'
              }}
            />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{
                padding: '12px 20px',
                borderRadius: '50px',
                border: '1.5px solid #a7f3d0',
                fontSize: '13px',
                background: '#ffffff',
                color: '#064e3b',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">📍 Semua Lokasi</option>
              <option value="madinah">Madinah</option>
              <option value="makkah">Makkah</option>
              <option value="jeddah">Jeddah</option>
            </select>
          </div>

          {/* SERVICES GRID WITH MOTION HOVER AND STAGGER */}
          <div class="catalog-card-grid">
            {filteredServices.map((service, index) => {
              const IconComp = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  class="glass-card"
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span class="catalog-tag">{service.category}</span>
                      <span style={{ fontSize: '12px', color: '#064e3b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star style={{ width: 14, height: 14, fill: '#059669', color: '#059669' }} /> {service.rating}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '16px', fontWeight: 400, color: '#064e3b', marginBottom: '6px' }}>{service.title}</h4>
                    <span style={{ fontSize: '12px', color: '#047857', display: 'block', marginBottom: '12px' }}>
                      <MapPin style={{ width: 12, height: 12, display: 'inline', marginRight: 4 }} /> {service.vendor}
                    </span>
                  </div>

                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 400, color: '#064e3b', marginBottom: '12px' }}>
                      Mulai {service.price}
                    </div>
                    <button 
                      onClick={() => setLayanan(`${service.title} (${service.price})`)}
                      class="btn-emerald" 
                      style={{ width: '100%', justifyContent: 'center', padding: '8px 14px', fontSize: '12px' }}
                    >
                      Pilih & Booking WA ↗
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* BOOKING FORM SIMULATOR WITH WHATSAPP LIVE PREVIEW */}
      <section id="wa-booking" style={{ padding: '60px 0', background: '#f0fdf4' }}>
        <div class="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 300, color: '#064e3b', marginBottom: '6px' }}>Simulasi Booking WhatsApp</h2>
            <p style={{ fontSize: '14px', color: '#047857' }}>Sistem otomatis menyusun pesan siap kirim ke WhatsApp vendor:</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            {/* FORM */}
            <div class="glass-card">
              <h3 style={{ fontSize: '18px', fontWeight: 400, color: '#064e3b', marginBottom: '16px' }}>Form Rincian Pemesanan</h3>
              <form onSubmit={handleBookingSubmit}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', color: '#064e3b', display: 'block', marginBottom: '4px' }}>Nama Pemesan</label>
                  <input 
                    type="text" 
                    value={nama} 
                    onChange={(e) => setNama(e.target.value)} 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '13px' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', color: '#064e3b', display: 'block', marginBottom: '4px' }}>Layanan Terpilih</label>
                  <input 
                    type="text" 
                    value={layanan} 
                    onChange={(e) => setLayanan(e.target.value)} 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '13px' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', color: '#064e3b', display: 'block', marginBottom: '4px' }}>Tanggal Kegiatan</label>
                  <input 
                    type="date" 
                    value={tanggal} 
                    onChange={(e) => setTanggal(e.target.value)} 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '13px' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', color: '#064e3b', display: 'block', marginBottom: '4px' }}>Catatan Tambahan</label>
                  <textarea 
                    rows={2} 
                    value={catatan} 
                    onChange={(e) => setCatatan(e.target.value)} 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '13px', fontFamily: 'inherit' }}
                  />
                </div>

                <button type="submit" class="btn-emerald" style={{ width: '100%', justifyContent: 'center', background: '#064e3b' }}>
                  <Send style={{ width: 14, height: 14 }} /> Kirim ke WA Vendor ↗
                </button>
              </form>
            </div>

            {/* LIVE PREVIEW */}
            <div class="glass-card-highlight">
              <h3 style={{ fontSize: '18px', fontWeight: 400, color: '#064e3b', marginBottom: '16px' }}>Live Preview Message (`wa.me`)</h3>
              <div class="wa-preview-box">
{`📲 Rincian Pesanan GALLOP Umroh:

👤 Nama: ${nama}
📦 Layanan: ${layanan}
📅 Tanggal: ${tanggal}
📝 Catatan: ${catatan}

Halo Penyedia Jasa, mohon konfirmasi pesanan. Terima kasih!`}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              background: '#064e3b',
              color: '#ffffff',
              padding: '14px 24px',
              borderRadius: '50px',
              boxShadow: '0 10px 25px rgba(6, 78, 59, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              zIndex: 1000
            }}
          >
            <CheckCircle style={{ width: 18, height: 18, color: '#a7f3d0' }} /> Pesan WhatsApp sedang dibuka...
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer style={{ padding: '30px 0', textAlign: 'center', borderTop: '1.5px solid #a7f3d0', fontSize: '12.5px', color: '#047857' }}>
        <div class="container">
          <p>© 2026 React Motion App Blueprint — Persembahan Mahakarya dari <strong>Dar Dev</strong> (Hotline WA: 081311506025).</p>
        </div>
      </footer>

    </div>
  );
}
