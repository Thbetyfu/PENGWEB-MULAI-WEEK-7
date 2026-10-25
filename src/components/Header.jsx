/**
 * Komponen 1: Header
 * Berfungsi menampilkan identitas brand aplikasi Bengkelin dan metadata pengguna.
 */
export default function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand-group">
          <div className="brand-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <div>
            <h1 className="brand-title">Bengkelin</h1>
            <p className="brand-tagline">Sistem Manajemen Servis Motor Konvensional &amp; Motor Listrik</p>
          </div>
        </div>
        <div className="header-meta">
          <span className="user-profile">Thoriq | 103022430006</span>
        </div>
      </div>
    </header>
  );
}
