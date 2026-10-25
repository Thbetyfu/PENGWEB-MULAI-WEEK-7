import { formatRupiah } from "../data/servisAwal";

/**
 * Komponen 4: KartuServis
 * Menampilkan detail spesifik satu item jadwal servis melalui props tanpa emoji atau badge kotak berlebihan.
 * @param {{
 *   servis: Object,
 *   onHapusServis: Function,
 *   onToggleStatus: Function
 * }} props
 */
export default function KartuServis({ servis, onHapusServis, onToggleStatus }) {
  const isListrik = servis.jenisMotor === "Listrik";
  const isSelesai = servis.status === "Selesai";

  return (
    <article className="servis-card">
      <div className="card-top">
        <div className="card-identity">
          <span className="card-id">{servis.id}</span>
          <span className="card-separator">&bull;</span>
          <span className={`text-jenis ${isListrik ? "jenis-ev" : "jenis-ice"}`}>
            {isListrik ? "Listrik (EV)" : "Konvensional"}
          </span>
        </div>
        <span className={`text-status ${isSelesai ? "status-selesai" : "status-dijadwalkan"}`}>
          {servis.status}
        </span>
      </div>

      <div className="card-main">
        <h3 className="card-kendaraan">{servis.kendaraan}</h3>
        <p className="card-plat">{servis.platNomor}</p>

        <div className="card-detail-group">
          <div className="detail-row">
            <span className="detail-key">Layanan:</span>
            <span className="detail-val font-semibold">{servis.layanan}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Bengkel:</span>
            <span className="detail-val">{servis.bengkel}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Tanggal:</span>
            <span className="detail-val">{servis.tanggal}</span>
          </div>
        </div>
      </div>

      <div className="card-bottom">
        <div className="card-biaya">
          <span className="biaya-label">Estimasi Biaya</span>
          <span className="biaya-value">{formatRupiah(servis.biaya)}</span>
        </div>
        <div className="card-actions">
          <button
            type="button"
            className={`btn-action ${isSelesai ? "btn-undo" : "btn-complete"}`}
            onClick={() => onToggleStatus(servis.id)}
          >
            {isSelesai ? "Batal Selesai" : "Selesaikan"}
          </button>
          <button
            type="button"
            className="btn-action btn-delete"
            onClick={() => onHapusServis(servis.id)}
          >
            Hapus
          </button>
        </div>
      </div>
    </article>
  );
}
