import { useEffect, useState } from "react";
import KartuMotor from "./KartuMotor";
import { getReferensiMotor } from "../services/api";

/**
 * Komponen 6: ReferensiMotor
 * Mengambil daftar referensi model motor dari API publik DummyJSON secara asinkron,
 * lalu menampilkan salah satu dari tiga kondisi: loading, success, atau error.
 */
export default function ReferensiMotor() {
  const [daftarMotor, setDaftarMotor] = useState([]);
  // Status pengambilan data: "loading" | "success" | "error"
  const [status, setStatus] = useState("loading");
  const [pesanError, setPesanError] = useState("");
  // Penghitung percobaan: setiap nilainya berubah, useEffect di bawah mengambil ulang data
  const [percobaan, setPercobaan] = useState(0);

  // Dijalankan saat komponen pertama kali tampil dan setiap kali tombol "Coba Lagi" diklik
  useEffect(() => {
    const controller = new AbortController();

    // Mengambil data dari API lalu mengubah status menjadi "success" atau "error"
    async function muatDataMotor() {
      try {
        const hasil = await getReferensiMotor(controller.signal);
        setDaftarMotor(hasil);
        setStatus("success");
      } catch (error) {
        // Request dibatalkan karena komponen dilepas, bukan kegagalan, jadi diabaikan
        if (error.name === "AbortError") return;
        setPesanError(error.message);
        setStatus("error");
      }
    }

    muatDataMotor();

    // Cleanup: batalkan request jika komponen hilang sebelum data selesai diambil
    return () => controller.abort();
  }, [percobaan]);

  // Tombol "Coba Lagi": kembali ke kondisi loading, lalu memicu useEffect mengambil ulang data
  const handleCobaLagi = () => {
    setStatus("loading");
    setPesanError("");
    setPercobaan((n) => n + 1);
  };

  return (
    <section className="list-section api-section" aria-labelledby="judul-referensi-motor">
      <div className="list-header">
        <div>
          <h2 id="judul-referensi-motor" className="section-title">Referensi Model Motor</h2>
          <p className="section-desc">
            Data model motor beserta informasi garansinya, diambil langsung dari API publik DummyJSON
            secara asinkron.
          </p>
        </div>
      </div>

      {/* Kondisi 1: LOADING, data masih dalam perjalanan dari server */}
      {status === "loading" && (
        <div className="api-loading" role="status" aria-live="polite">
          <div className="api-loading-info">
            <span className="spinner" aria-hidden="true" />
            <span>Memuat data referensi motor dari API...</span>
          </div>
          <div className="motor-grid" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="motor-card motor-skeleton">
                <div className="motor-thumb skeleton-block" />
                <div className="motor-body">
                  <div className="skeleton-line skeleton-short" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kondisi 2: ERROR, pengambilan data gagal */}
      {status === "error" && (
        <div className="api-error" role="alert">
          <h3 className="api-error-title">Gagal memuat data referensi motor</h3>
          <p className="api-error-desc">{pesanError}</p>
          <button type="button" className="btn-primary" onClick={handleCobaLagi}>
            Coba Lagi
          </button>
        </div>
      )}

      {/* Kondisi 3: SUCCESS, data berhasil diambil lalu ditampilkan dengan render list */}
      {status === "success" &&
        (daftarMotor.length === 0 ? (
          <div className="empty-filter-state">
            <p>Belum ada data referensi motor dari API.</p>
          </div>
        ) : (
          <>
            <p className="api-source">
              Sumber data: dummyjson.com &middot; {daftarMotor.length} model motor
            </p>
            <div className="motor-grid">
              {daftarMotor.map((motor) => (
                <KartuMotor key={motor.id} motor={motor} />
              ))}
            </div>
          </>
        ))}
    </section>
  );
}
