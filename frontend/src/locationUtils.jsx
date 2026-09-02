export function setLocationCookie(data) {
document.cookie = `lat=${data.lat}; path=/; max-age=31536000`
document.cookie = `lon=${data.lon}; path=/; max-age=31536000`
document.cookie = `address=${encodeURIComponent(data.address)}; path=/; max-age=31536000`
}

export function getLocationFromCookie() {
const cookies = document.cookie.split("; ").reduce((acc, cur) => {
    const [k, v] = cur.split("=")
    acc[k] = decodeURIComponent(v)
    return acc
}, {})

if (cookies.lat && cookies.lon && cookies.address) {
    return {
    lat: cookies.lat,
    lon: cookies.lon,
    address: cookies.address,
    }
}

return null
}

export async function reverseGeocode(lat, lon) {
const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
)
const data = await res.json()
return data.display_name
}
