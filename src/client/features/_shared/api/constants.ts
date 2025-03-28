const INAT_API_URL = `https://api.inaturalist.org/v1`

const JSON_SERVER_URL =
  import.meta.env.VITE_JSONSERVER_URL || "http://localhost:3000"

const API_SERVER = {
  JSON: JSON_SERVER_URL,
  INAT: INAT_API_URL,
}

export { JSON_SERVER_URL, INAT_API_URL, API_SERVER }
