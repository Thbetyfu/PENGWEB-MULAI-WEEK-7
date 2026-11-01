/**
 * Komponen 7: KartuMotor
 * Menampilkan detail satu model motor hasil API melalui props.
 * @param {{
 *   motor: {
 *     id: number,
 *     title: string,
 *     brand?: string,
 *     description?: string,
 *     thumbnail?: string,
 *     warrantyInformation?: string,
 *     rating?: number
 *   }
 * }} props
 */
export default function KartuMotor({ motor }) {
  const rating = typeof motor.rating === "number" ? `${motor.rating.toFixed(1)} / 5` : "-";

  return (
    <article className="motor-card">
      <div className="motor-thumb">
        {motor.thumbnail && (
          <img src={motor.thumbnail} alt={motor.title} loading="lazy" width="300" height="300" />
        )}
      </div>

      <div className="motor-body">
        <span className="motor-brand">{motor.brand || "Merek tidak tersedia"}</span>
        <h3 className="motor-title">{motor.title}</h3>
        {motor.description && <p className="motor-desc">{motor.description}</p>}

        <div className="card-detail-group">
          <div className="detail-row">
            <span className="detail-key">Garansi:</span>
            <span className="detail-val">{motor.warrantyInformation || "-"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Rating:</span>
            <span className="detail-val">{rating}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
