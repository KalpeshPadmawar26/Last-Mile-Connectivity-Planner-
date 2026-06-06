/**
 * BusScheduleEngine.js
 * Dynamically generates realistic MSRTC-style full-day bus schedules
 * for any source→destination route based on actual road distance and duration.
 *
 * Bus Types:
 *  - Lalpari  (Ordinary/Red):   ₹0.72/km, every 90 min, 5:30 AM – 10:30 PM
 *  - Asiad    (Semi-Luxury):    ₹1.05/km, every 3 hrs,  6:00 AM – 9:00 PM
 *  - Shivshahi (AC Luxury):     ₹1.45/km, fixed times,  for routes > 80 km
 */

const BUS_TYPES = {
  Lalpari: {
    nameMr: 'लालपरी',
    ratePerKm: 0.72,
    speedFactor: 1.05,   // slightly slower (more stops)
    minFare: 15,
    colorKey: 'msrtc',
    prefix: 'L',
    intervalMins: 90,
    startMins: 5 * 60 + 30,   // 5:30 AM
    endMins: 22 * 60 + 30,    // 10:30 PM
  },
  Asiad: {
    nameMr: 'आशियाद',
    ratePerKm: 1.05,
    speedFactor: 0.95,
    minFare: 40,
    colorKey: 'auto',
    prefix: 'A',
    intervalMins: 180,
    startMins: 6 * 60,        // 6:00 AM
    endMins: 21 * 60,         // 9:00 PM
  },
  Shivshahi: {
    nameMr: 'शिवशाही',
    ratePerKm: 1.45,
    speedFactor: 0.85,        // faster (fewer stops, express)
    minFare: 80,
    colorKey: 'walk',
    prefix: 'S',
    // Fixed departure times (minutes from midnight)
    fixedDepartures: [
      6 * 60 + 30,   // 6:30 AM
      9 * 60 + 30,   // 9:30 AM
      13 * 60,       // 1:00 PM
      16 * 60,       // 4:00 PM
      19 * 60 + 30,  // 7:30 PM
      22 * 60,       // 10:00 PM
      23 * 60 + 30,  // 11:30 PM (overnight)
    ],
  },
};

/** Format minutes-from-midnight → "HH:MM AM/PM" */
function formatTime(mins) {
  const totalMins = ((mins % 1440) + 1440) % 1440; // wrap around midnight
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  const ampm = h < 12 ? 'AM' : 'PM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${ampm}`;
}

/** Format minutes duration → "Xh Ym" */
function formatDuration(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/** Seeded pseudo-random for consistent bus numbers per route+type+time */
function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateBusNumber(prefix, seed) {
  const n = Math.floor(1000 + seededRandom(seed) * 8999);
  return `MH-29-${prefix}-${n}`;
}

function routeViaText(distanceKm) {
  if (distanceKm > 400) return 'via Samruddhi Expressway';
  if (distanceKm > 200) return 'via NH-361 / State Highway';
  if (distanceKm > 100) return 'via District Highway';
  return 'via Local Road';
}
function routeViaTextMr(distanceKm) {
  if (distanceKm > 400) return 'समृद्धी महामार्ग मार्गे';
  if (distanceKm > 200) return 'NH-361 / राज्य महामार्ग मार्गे';
  if (distanceKm > 100) return 'जिल्हा महामार्ग मार्गे';
  return 'स्थानिक रस्त्याने';
}

/**
 * Build a single bus object.
 */
function makeBus(typeName, depMins, from, to, distanceKm, baseDurationMins, idx) {
  const type = BUS_TYPES[typeName];
  const actualDurMins = Math.round(baseDurationMins * type.speedFactor);
  const arrMins = depMins + actualDurMins;
  const baseFare = Math.max(type.minFare, Math.round(distanceKm * type.ratePerKm));
  const seed = depMins * 31 + idx * 17 + distanceKm;

  return {
    id: `bus-${typeName}-${depMins}`,
    busType: typeName,
    busTypeMr: type.nameMr,
    busNumber: generateBusNumber(type.prefix, seed),
    colorKey: type.colorKey,
    from,
    to,
    departureMinutes: depMins,
    departureTime: formatTime(depMins),
    arrivalTime: formatTime(arrMins),
    durationMins: actualDurMins,
    durationText: formatDuration(actualDurMins),
    baseFare,
    autoFare: distanceKm > 10 ? 20 : 10,
    totalFare: baseFare + (distanceKm > 10 ? 20 : 10),
    distanceKm,
    routeVia: routeViaText(distanceKm),
    routeViaMr: routeViaTextMr(distanceKm),
    // Map-compatible trip shape
    path: [from, from + ' ST Stand', to + ' ST Stand', to],
    segments: [
      {
        mode: 'walk',
        modeText: 'mode_walking',
        from,
        to: from + ' ST Stand',
        duration: '15m',
        cost: 0,
        details: '१.२ किमी स्थानिक पाऊलवाट',
        detailsEn: '1.2 km local walk to ST Stand',
      },
      {
        mode: 'msrtc',
        modeText: 'mode_st_bus',
        from: from + ' ST Stand',
        to: to + ' ST Stand',
        duration: formatDuration(actualDurMins),
        cost: baseFare,
        busNumber: generateBusNumber(type.prefix, seed),
        routeVia: routeViaText(distanceKm),
        departureTime: formatTime(depMins),
        details: `MSRTC ${type.nameMr} | ${distanceKm} किमी | ${routeViaTextMr(distanceKm)}`,
        detailsEn: `MSRTC ${typeName} | ${distanceKm} km | ${routeViaText(distanceKm)}`,
      },
      {
        mode: 'auto',
        modeText: 'mode_shared_auto',
        from: to + ' ST Stand',
        to,
        duration: '20m',
        cost: distanceKm > 10 ? 20 : 10,
        details: 'स्थानिक शेअर्ड ऑटो | दर ५ मि',
        detailsEn: 'Local shared auto | every 5 min',
      },
    ],
  };
}

/**
 * Generate a full-day bus schedule for a given route.
 * @param {string} from   - Source location name
 * @param {string} to     - Destination location name
 * @param {number} distanceKm   - Road distance in km (from OSRM)
 * @param {number} durationHours - Road drive time in hours (from OSRM)
 * @returns {Array} Sorted list of bus objects
 */
export function generateSchedule(from, to, distanceKm, durationHours) {
  const baseDurationMins = Math.round(durationHours * 60);
  const buses = [];
  let idx = 0;

  // --- Lalpari: every 90 min ---
  const lp = BUS_TYPES.Lalpari;
  for (let t = lp.startMins; t <= lp.endMins; t += lp.intervalMins) {
    buses.push(makeBus('Lalpari', t, from, to, distanceKm, baseDurationMins, idx++));
  }

  // --- Asiad: every 3 hrs (only if route > 30 km) ---
  if (distanceKm > 30) {
    const as = BUS_TYPES.Asiad;
    for (let t = as.startMins; t <= as.endMins; t += as.intervalMins) {
      buses.push(makeBus('Asiad', t, from, to, distanceKm, baseDurationMins, idx++));
    }
  }

  // --- Shivshahi: fixed departures (only if route > 80 km) ---
  if (distanceKm > 80) {
    for (const t of BUS_TYPES.Shivshahi.fixedDepartures) {
      buses.push(makeBus('Shivshahi', t, from, to, distanceKm, baseDurationMins, idx++));
    }
  }

  // Sort all by departure time
  buses.sort((a, b) => a.departureMinutes - b.departureMinutes);
  return buses;
}

/**
 * Get current time as minutes from midnight.
 */
export function getCurrentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

/**
 * Check if a bus falls within the highlight window around current time.
 * Window: -10 min to +30 min from now.
 */
export function isHighlightedBus(bus, currentMins) {
  const diff = bus.departureMinutes - currentMins;
  return diff >= -10 && diff <= 30;
}
