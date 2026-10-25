import { useState } from "react";
import KartuServis from "./KartuServis";

/**
 * Komponen 5: DaftarServis
 * Wadah render koleksi data servis menggunakan Array.prototype.map() dengan unique key,
 * dilengkapi fitur filter kategori dan conditional rendering saat data kosong.
 * @param {{
 *   daftarServis: Array,
 *   onHapusServis: Function,
 *   onToggleStatus: Function,
 *   onResetSampel: Function
 * }} props
 */
export default function DaftarServis({
  daftarServis,
  onHapusServis,
  onToggleStatus,
  onResetSampel
}) {
  const [filterAktif, setFilterAktif] = useState("Semua");

  const filterOptions = ["Semua", "Konvensional", "Listrik", "Dijadwalkan", "Selesai"];

  // Pemfilteran data berdasarkan state tombol filter yang aktif
  const itemTerfilter = daftarServis.filter((item) => {
    if (filterAktif === "Semua") return true;
    if (filterAktif === "Konvensional" || filterAktif === "Listrik") {
      return item.jenisMotor === filterAktif;
    }
    if (filterAktif === "Dijadwalkan" || filterAktif === "Selesai") {
      return item.status === filterAktif;
    }
    return true;
  });

  return (
    <section className="list-section">
      <div className="list-header">
        <div>
          <h2 className="section-title">Daftar Jadwal Servis</h2>
          <p className="section-desc">
            Menampilkan antrean servis yang terdaftar di bengkel mitra ({itemTerfilter.length} dari {daftarServis.length} item).
          </p>
        </div>

        {daftarServis.length > 0 && (
          <div className="filter-group">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`btn-filter ${filterAktif === opt ? "filter-active" : ""}`}
                onClick={() => setFilterAktif(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Syarat Tugas: Conditional Rendering jika data kosong */}
      {daftarServis.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <h3 className="empty-title">Belum ada data jadwal servis Bengkelin</h3>
          <p className="empty-desc">
            Silakan masukkan data kendaraan dan layanan pada formulir di atas untuk menjadwalkan servis baru.
          </p>
          {onResetSampel && (
            <button
              type="button"
              className="btn-secondary"
              onClick={onResetSampel}
            >
              Muat Ulang Data Sampel
            </button>
          )}
        </div>
      ) : itemTerfilter.length === 0 ? (
        <div className="empty-filter-state">
          <p>Tidak ada data servis yang sesuai dengan filter "{filterAktif}".</p>
          <button
            type="button"
            className="btn-link"
            onClick={() => setFilterAktif("Semua")}
          >
            Reset Filter ke Semua
          </button>
        </div>
      ) : (
        <div className="cards-grid">
          {itemTerfilter.map((servis) => (
            <KartuServis
              key={servis.id}
              servis={servis}
              onHapusServis={onHapusServis}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </section>
  );
}
