import { useState } from "react";
import Header from "./components/Header";
import RingkasanStatistik from "./components/RingkasanStatistik";
import FormTambahServis from "./components/FormTambahServis";
import DaftarServis from "./components/DaftarServis";
import { dataServisAwal } from "./data/servisAwal";
import "./App.css";

/**
 * Komponen Utama: App
 * Mengelola state global (State Lifting) untuk seluruh alur data aplikasi Bengkelin.
 */
export default function App() {
  const [daftarServis, setDaftarServis] = useState(dataServisAwal);

  // Menambahkan servis baru ke state teratas
  const handleTambahServis = (servisBaru) => {
    setDaftarServis((prev) => [servisBaru, ...prev]);
  };

  // Menghapus data servis berdasarkan ID unik
  const handleHapusServis = (id) => {
    setDaftarServis((prev) => prev.filter((item) => item.id !== id));
  };

  // Mengubah status servis (Dijadwalkan <-> Selesai)
  const handleToggleStatus = (id) => {
    setDaftarServis((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const statusBaru = item.status === "Selesai" ? "Dijadwalkan" : "Selesai";
          return { ...item, status: statusBaru };
        }
        return item;
      })
    );
  };

  // Mengembalikan data contoh awal
  const handleResetSampel = () => {
    setDaftarServis(dataServisAwal);
  };

  // Mengosongkan data untuk keperluan demonstrasi conditional rendering empty state
  const handleKosongkanData = () => {
    setDaftarServis([]);
  };

  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">
        <div className="content-container">
          {/* Komponen 2: Ringkasan Statistik */}
          <RingkasanStatistik daftarServis={daftarServis} />

          {/* Panel demonstrasi pengujian */}
          <div className="demo-toolbar">
            <span className="demo-label">Opsi Simulasi Pengujian:</span>
            <button
              type="button"
              className="btn-text-action"
              onClick={handleKosongkanData}
              title="Kosongkan seluruh data untuk menguji conditional rendering"
            >
              Kosongkan Data (Uji Empty State)
            </button>
            <span className="demo-sep">|</span>
            <button
              type="button"
              className="btn-text-action"
              onClick={handleResetSampel}
              title="Kembalikan data sampel awal"
            >
              Kembalikan Data Sampel
            </button>
          </div>

          {/* Komponen 3: Form Tambah Servis (Controlled Component) */}
          <FormTambahServis onTambahServis={handleTambahServis} />

          {/* Komponen 5: Daftar Servis (Container List & Conditional Rendering) */}
          <DaftarServis
            daftarServis={daftarServis}
            onHapusServis={handleHapusServis}
            onToggleStatus={handleToggleStatus}
            onResetSampel={handleResetSampel}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>Bengkelin &copy; 2026 - Dikembangkan oleh Thoriq (NIM: 103022430006) | Tugas 6 React Dasar</p>
      </footer>
    </div>
  );
}
