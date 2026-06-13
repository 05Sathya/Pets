/* Storage helpers - moved from app.js */
export const Store = {
  get(key, fallback = null) {
    try {
      if (typeof window === 'undefined') return fallback
      const v = localStorage.getItem(key)
      return v ? JSON.parse(v) : fallback
    } catch (e) {
      return fallback
    }
  },
  set(key, val) {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(val))
  },
  del(key) {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  }
}

export const rupee = (n) => "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 })

export function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10
}

export function locationGate() {
  const loc = Store.get("dittomart_location")
  if (!loc || !loc.latitude || !loc.longitude) {
    return false
  }
  if (loc.serviceable === false) {
    return false
  }
  return true
}
