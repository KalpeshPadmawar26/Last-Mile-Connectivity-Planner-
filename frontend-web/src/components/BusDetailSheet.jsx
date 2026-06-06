import React from 'react';
import { Bus, Clock, MapPin, IndianRupee, X, Navigation } from 'lucide-react';

/**
 * BusDetailSheet — Bottom slide-up popup showing full bus details.
 * Appears when user taps any bus card in the results list.
 */
export default function BusDetailSheet({ bus, onClose }) {
  if (!bus) return null;

  const typeColors = {
    Lalpari:   { bg: 'hsl(var(--msrtc-red))',  label: '#fff' },
    Asiad:     { bg: 'hsl(var(--auto-amber))', label: '#000' },
    Shivshahi: { bg: 'hsl(var(--walk-green))', label: '#fff' },
  };
  const colors = typeColors[bus.busType] || typeColors.Lalpari;

  return (
    <>
      {/* Backdrop */}
      <div className="bus-sheet-backdrop" onClick={onClose} />

      {/* Sheet */}
      <div className="bus-detail-sheet">
        {/* Drag Handle */}
        <div className="bus-sheet-handle" />

        {/* Header */}
        <div className="bus-sheet-header">
          <div className="bus-sheet-type-row">
            <span
              className="bus-sheet-type-badge"
              style={{ background: colors.bg, color: colors.label }}
            >
              <Bus size={14} style={{ marginRight: 5 }} />
              MSRTC {bus.busType} &nbsp;|&nbsp; {bus.busTypeMr}
            </span>
            <button className="bus-sheet-close" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          {bus.busNumber && (
            <p className="bus-sheet-number">🚌 बस क्र. / Bus No: <strong>{bus.busNumber}</strong></p>
          )}
        </div>

        {/* Route */}
        <div className="bus-sheet-section">
          <div className="bus-sheet-route">
            <div className="bus-sheet-stop">
              <MapPin size={16} style={{ color: 'hsl(var(--primary))' }} />
              <span>{bus.from}</span>
            </div>
            <div className="bus-sheet-route-line" />
            <div className="bus-sheet-stop">
              <Navigation size={16} style={{ color: 'hsl(var(--msrtc-red))' }} />
              <span>{bus.to}</span>
            </div>
          </div>
          <p className="bus-sheet-via">📍 {bus.routeViaMr} ({bus.routeVia})</p>
        </div>

        {/* Times */}
        <div className="bus-sheet-section bus-sheet-times">
          <div className="bus-sheet-time-box">
            <Clock size={15} />
            <span className="bus-sheet-time-label">निघणे / Departs</span>
            <span className="bus-sheet-time-value">{bus.departureTime}</span>
          </div>
          <div className="bus-sheet-time-divider">
            <span className="bus-sheet-duration">{bus.durationText}</span>
            <div className="bus-sheet-time-arrow">──────➔</div>
          </div>
          <div className="bus-sheet-time-box">
            <Clock size={15} />
            <span className="bus-sheet-time-label">पोहचणे / Arrives</span>
            <span className="bus-sheet-time-value">{bus.arrivalTime}</span>
          </div>
        </div>

        {/* Fare Breakdown */}
        <div className="bus-sheet-section bus-sheet-fare">
          <div className="bus-sheet-fare-title">
            <IndianRupee size={16} /> &nbsp;तिकीट रक्कम / Fare
          </div>
          <div className="bus-sheet-fare-row">
            <span>MSRTC {bus.busType} तिकीट</span>
            <span>₹ {bus.baseFare}</span>
          </div>
          <div className="bus-sheet-fare-row">
            <span>स्थानिक ऑटो / Local Auto</span>
            <span>₹ {bus.autoFare}</span>
          </div>
          <div className="bus-sheet-fare-row bus-sheet-fare-total">
            <span><strong>एकूण / Total</strong></span>
            <span><strong>₹ {bus.totalFare}</strong></span>
          </div>
        </div>

        {/* Distance */}
        <p className="bus-sheet-distance">
          📏 अंतर / Distance: ~{bus.distanceKm} किमी
        </p>
      </div>
    </>
  );
}
