/**
 * Data awal riwayat & booking servis Bengkelin.
 * Berisi entitas utama dengan tipe data realistis.
 */
export const dataServisAwal = [
  {
    id: "SRV-101",
    kendaraan: "Honda Vario 160",
    platNomor: "D 2341 ABC",
    jenisMotor: "Konvensional",
    bengkel: "Bengkel Sentosa Motor",
    layanan: "Ganti Oli Mesin & Filter",
    biaya: 85000,
    tanggal: "2026-10-24",
    status: "Selesai"
  },
  {
    id: "SRV-102",
    kendaraan: "Gesits Raya G",
    platNomor: "B 5412 EV",
    jenisMotor: "Listrik",
    bengkel: "EV Care Hub Bandung",
    layanan: "Pemeriksaan BMS & Baterai",
    biaya: 120000,
    tanggal: "2026-10-25",
    status: "Dijadwalkan"
  },
  {
    id: "SRV-103",
    kendaraan: "Yamaha NMAX 155",
    platNomor: "D 8892 KLG",
    jenisMotor: "Konvensional",
    bengkel: "Ahass Prima Motor",
    layanan: "Servis CVT & Kampas Rem",
    biaya: 175000,
    tanggal: "2026-10-26",
    status: "Dijadwalkan"
  },
  {
    id: "SRV-104",
    kendaraan: "Alva Cervo",
    platNomor: "B 3108 ELE",
    jenisMotor: "Listrik",
    bengkel: "Electra Service Point",
    layanan: "Pengecekan Motor Hub & Kelistrikan",
    biaya: 150000,
    tanggal: "2026-10-27",
    status: "Dijadwalkan"
  }
];

/**
 * Format angka ke mata uang Rupiah (IDR).
 * @param {number} nilai 
 * @returns {string}
 */
export function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(nilai);
}
