import { useState } from "react";

/**
 * Komponen 3: FormTambahServis (Controlled Component)
 * Mengelola input form secara terikat dengan state lokal, melakukan validasi,
 * lalu mengirimkan entitas baru ke parent component melalui props onTambahServis.
 * @param {{ onTambahServis: Function }} props
 */
export default function FormTambahServis({ onTambahServis }) {
  const [kendaraan, setKendaraan] = useState("");
  const [platNomor, setPlatNomor] = useState("");
  const [jenisMotor, setJenisMotor] = useState("Konvensional");
  const [bengkel, setBengkel] = useState("Bengkel Sentosa Motor");
  const [layanan, setLayanan] = useState("");
  const [biaya, setBiaya] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [errorPesan, setErrorPesan] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!kendaraan.trim() || !platNomor.trim() || !layanan.trim() || !biaya || !tanggal) {
      setErrorPesan("Mohon lengkapi seluruh field formulir sebelum menyimpan jadwal.");
      return;
    }

    const servisBaru = {
      id: `SRV-${Date.now().toString().slice(-4)}`,
      kendaraan: kendaraan.trim(),
      platNomor: platNomor.trim().toUpperCase(),
      jenisMotor,
      bengkel,
      layanan: layanan.trim(),
      biaya: Number(biaya),
      tanggal,
      status: "Dijadwalkan"
    };

    onTambahServis(servisBaru);

    // Reset form state setelah submit sukses
    setKendaraan("");
    setPlatNomor("");
    setJenisMotor("Konvensional");
    setLayanan("");
    setBiaya("");
    setTanggal("");
    setErrorPesan("");
  };

  return (
    <section className="form-section">
      <div className="section-header">
        <h2 className="section-title">Tambah Jadwal Servis Baru</h2>
        <p className="section-desc">Masukkan informasi servis motor pelanggan untuk dimasukkan ke antrean sistem.</p>
      </div>

      {errorPesan && (
        <div className="alert-error" role="alert">
          <span>{errorPesan}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label htmlFor="input-kendaraan" className="form-label">Nama Kendaraan / Model</label>
          <input
            id="input-kendaraan"
            type="text"
            className="form-input"
            placeholder="Contoh: Honda Vario 160, Alva One"
            value={kendaraan}
            onChange={(e) => setKendaraan(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="input-plat" className="form-label">Nomor Polisi / Plat</label>
          <input
            id="input-plat"
            type="text"
            className="form-input"
            placeholder="Contoh: D 1234 XYZ"
            value={platNomor}
            onChange={(e) => setPlatNomor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="select-jenis" className="form-label">Jenis Motor</label>
          <select
            id="select-jenis"
            className="form-select"
            value={jenisMotor}
            onChange={(e) => setJenisMotor(e.target.value)}
          >
            <option value="Konvensional">Konvensional (Mesin Bensin)</option>
            <option value="Listrik">Listrik (Electric Vehicle / EV)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="select-bengkel" className="form-label">Bengkel Mitra</label>
          <select
            id="select-bengkel"
            className="form-select"
            value={bengkel}
            onChange={(e) => setBengkel(e.target.value)}
          >
            <option value="Bengkel Sentosa Motor">Bengkel Sentosa Motor</option>
            <option value="Ahass Prima Motor">Ahass Prima Motor</option>
            <option value="EV Care Hub Bandung">EV Care Hub Bandung</option>
            <option value="Electra Service Point">Electra Service Point</option>
            <option value="Mitra Motor Jaya">Mitra Motor Jaya</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="input-layanan" className="form-label">Jenis Layanan Servis</label>
          <input
            id="input-layanan"
            type="text"
            className="form-input"
            placeholder="Contoh: Ganti Oli Mesin, Kalibrasi BMS"
            value={layanan}
            onChange={(e) => setLayanan(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="input-biaya" className="form-label">Estimasi Biaya (Rp)</label>
          <input
            id="input-biaya"
            type="number"
            min="0"
            step="5000"
            className="form-input"
            placeholder="Contoh: 100000"
            value={biaya}
            onChange={(e) => setBiaya(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="input-tanggal" className="form-label">Tanggal Booking Servis</label>
          <input
            id="input-tanggal"
            type="date"
            className="form-input"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </div>

        <div className="form-group form-actions">
          <button type="submit" className="btn-primary">
            Tambahkan ke Jadwal
          </button>
        </div>
      </form>
    </section>
  );
}
