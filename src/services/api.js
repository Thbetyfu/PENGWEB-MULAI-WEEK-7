/**
 * Layanan API Bengkelin
 * Semua alamat endpoint dan fungsi pemanggilan API eksternal dikumpulkan di file ini,
 * supaya komponen cukup fokus mengatur tampilan (loading / success / error).
 */

// Endpoint publik DummyJSON: daftar produk kategori "motorcycle".
// Gratis, tanpa API key/registrasi, dan mendukung CORS sehingga bisa dipanggil langsung dari browser.
// Untuk simulasi kondisi error (screenshot), ganti sementara URL ini menjadi alamat yang salah,
// misalnya "https://dummyjson.invalid/products/category/motorcycle", lalu kembalikan seperti semula.
export const URL_REFERENSI_MOTOR = "https://dummyjson.com/products/category/motorcycle";

/**
 * Mengambil daftar referensi model motor dari API secara asinkron (AJAX dengan fetch).
 * @param {AbortSignal} [signal] - Sinyal untuk membatalkan request saat komponen dilepas (unmount).
 * @returns {Promise<Array>} Array data motor dari properti `products` pada respons API.
 * @throws {Error} Jika server tidak bisa dihubungi, membalas status gagal, atau format datanya tidak sesuai.
 */
export async function getReferensiMotor(signal) {
  let response;

  try {
    response = await fetch(URL_REFERENSI_MOTOR, { signal });
  } catch (error) {
    // Request sengaja dibatalkan, teruskan apa adanya supaya komponen bisa mengabaikannya
    if (error.name === "AbortError") throw error;
    // fetch() hanya gagal di sini kalau request tidak sampai ke server
    // (internet putus, alamat domain salah, atau diblokir CORS)
    throw new Error("Tidak dapat terhubung ke server API. Periksa koneksi internet Anda.");
  }

  // Status 404/500 TIDAK membuat fetch() gagal, jadi wajib dicek manual lewat response.ok
  if (!response.ok) {
    throw new Error(`Server API merespons dengan status ${response.status}.`);
  }

  const data = await response.json();

  if (!Array.isArray(data?.products)) {
    throw new Error("Format data dari API tidak sesuai.");
  }

  return data.products;
}
