import { profile } from '../data/portfolio'

export function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="loader-mark">{profile.initials}</div>
      <div className="loader-track">
        <span />
      </div>
      <p className="loader-caption">{profile.role}</p>
    </div>
  )
}
