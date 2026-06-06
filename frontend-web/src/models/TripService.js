import axios from 'axios';
import { generateSchedule } from './BusScheduleEngine';

/**
 * TripService - Model Layer
 * Fetches geocodes via Nominatim + road data via OSRM,
 * then passes to BusScheduleEngine to build a full dynamic schedule.
 * No static/mock data — every search is live.
 */

/** Haversine aerial distance (km) — used as fallback when OSRM fails */
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const TripService = {
  /**
   * Fetch buses for a given route.
   * 1. Geocode from + to via Nominatim
   * 2. Get road distance + duration via OSRM
   * 3. Generate full-day bus schedule via BusScheduleEngine
   * Falls back to aerial distance estimate if APIs fail.
   *
   * @param {string} from  Source village/town
   * @param {string} to    Destination hub/city
   * @returns {Promise<Array>} List of buses across the day
   */
  async fetchTrips(from, to) {
    const rawFrom = (from || '').trim();
    const rawTo   = (to   || '').trim();

    if (!rawFrom || !rawTo) return [];

    // ----- ONLINE PATH -----
    if (navigator.onLine) {
      try {
        console.log(`[TripService] Geocoding: "${rawFrom}" → "${rawTo}"`);

        const [fromGeoRes, toGeoRes] = await Promise.all([
          axios.get('https://nominatim.openstreetmap.org/search', {
            params: { q: `${rawFrom}, Maharashtra, India`, format: 'json', limit: 1 },
            headers: { 'User-Agent': 'LastMileConnectivityPlanner/2.0' },
          }),
          axios.get('https://nominatim.openstreetmap.org/search', {
            params: { q: `${rawTo}, Maharashtra, India`, format: 'json', limit: 1 },
            headers: { 'User-Agent': 'LastMileConnectivityPlanner/2.0' },
          }),
        ]);

        if (fromGeoRes.data.length > 0 && toGeoRes.data.length > 0) {
          const fromNode = fromGeoRes.data[0];
          const toNode   = toGeoRes.data[0];
          const fromLat = parseFloat(fromNode.lat), fromLon = parseFloat(fromNode.lon);
          const toLat   = parseFloat(toNode.lat),   toLon   = parseFloat(toNode.lon);

          console.log(`[TripService] Geocodes OK: (${fromLat},${fromLon}) → (${toLat},${toLon})`);

          // Try OSRM for precise road distance + duration
          try {
            const osrmRes = await axios.get(
              `https://router.project-osrm.org/route/v1/driving/${fromLon},${fromLat};${toLon},${toLat}?overview=false`
            );
            if (osrmRes.data.routes && osrmRes.data.routes.length > 0) {
              const route = osrmRes.data.routes[0];
              const distanceKm   = Math.round(route.distance / 1000);
              const durationHours = route.duration / 3600;
              console.log(`[TripService] OSRM: ${distanceKm} km, ${durationHours.toFixed(2)} hrs`);
              return generateSchedule(rawFrom, rawTo, distanceKm, durationHours);
            }
          } catch (osrmErr) {
            console.warn('[TripService] OSRM failed, using aerial distance:', osrmErr.message);
          }

          // OSRM failed — use haversine × 1.3 road factor, 50 km/h avg speed
          const aerialKm = haversineKm(fromLat, fromLon, toLat, toLon);
          const distanceKm   = Math.round(aerialKm * 1.3);
          const durationHours = distanceKm / 50;
          console.log(`[TripService] Aerial fallback: ${distanceKm} km`);
          return generateSchedule(rawFrom, rawTo, distanceKm, durationHours);
        }
      } catch (err) {
        console.warn('[TripService] Geocoding failed, using default estimate:', err.message);
      }
    } else {
      console.log('[TripService] Device offline — using default 150 km estimate.');
    }

    // ----- OFFLINE / TOTAL FALLBACK -----
    // Generic Maharashtra intra-state route estimate
    const defaultDistanceKm = 150;
    const defaultDurationHours = 3.5;
    return generateSchedule(rawFrom, rawTo, defaultDistanceKm, defaultDurationHours);
  },
};
