import { formatRupiah } from "../data/servisAwal";

/**
 * Komponen 2: RingkasanStatistik
 * Menghitung dan merangkum metrik kunci dari data servis yang diterima melalui props.
 * @param {{ daftarServis: Array }} props
 */
export default function RingkasanStatistik({ daftarServis }) {
  const totalServis = daftarServis.length;
  const totalListrik = daftarServis.filter((s) => s.jenisMotor === "Listrik").length;
  const totalKonvensional = daftarServis.filter((s) => s.jenisMotor === "Konvensional").length;
  const totalBiaya = daftarServis.reduce((total, s) => total + (Number(s.biaya) || 0), 0);

  return (
    <section className="stats-section">
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Jadwal</span>
          <span className="stat-value">{totalServis}</span>
          <span className="stat-sub">Servis terdaftar</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Motor Konvensional</span>
          <span className="stat-value">{totalKonvensional}</span>
          <span className="stat-sub">Bensin / Mesin</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Motor Listrik (EV)</span>
          <span className="stat-value">{totalListrik}</span>
          <span className="stat-sub">Baterai &amp; BMS</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Estimasi Biaya</span>
          <span className="stat-value">{formatRupiah(totalBiaya)}</span>
          <span className="stat-sub">Akumulasi biaya servis</span>
        </div>
      </div>
    </section>
  );
}
