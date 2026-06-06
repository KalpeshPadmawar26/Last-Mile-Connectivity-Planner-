import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  ArrowUpDown,
  AlertCircle,
  ArrowRight,
  Bus,
  Clock,
} from 'lucide-react';
import ConnectivityMap from './components/ConnectivityMap';
import VoiceSearch from './components/VoiceSearch';
import BusDetailSheet from './components/BusDetailSheet';
import { useTripPlanner } from './controllers/useTripPlanner';
import { isHighlightedBus, getCurrentMinutes } from './models/BusScheduleEngine';

// Live clock — updates every minute
function useLiveClock() {
  const [mins, setMins] = useState(getCurrentMinutes);
  useEffect(() => {
    const t = setInterval(() => setMins(getCurrentMinutes()), 60000);
    return () => clearInterval(t);
  }, []);
  return mins;
}

function formatCurrentTime(mins) {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const ampm = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

const BUS_TYPE_COLORS = {
  Lalpari:   { bg: 'hsl(var(--msrtc-red))',   text: '#fff' },
  Asiad:     { bg: 'hsl(var(--auto-amber))',   text: '#000' },
  Shivshahi: { bg: 'hsl(var(--walk-green))',   text: '#fff' },
};

export default function App() {
  const currentMins = useLiveClock();

  const {
    fromLoc, toLoc,
    buses, selectedBus, setSelectedBus,
    selectedTrip, setSelectedTrip,
    isSearching, marketAlert,
    handleSwap, handleSpeechInput, handleBusSelect,
    triggerSearch, changeLanguage,
    t, i18n,
    fromSuggestions, toSuggestions,
    showFromSuggestions, showToSuggestions,
    setShowFromSuggestions, setShowToSuggestions,
    handleFromChange, handleToChange,
    selectFromSuggestion, selectToSuggestion,
  } = useTripPlanner();

  return (
    <div className="app-container">
      {/* ─── LEFT SIDEBAR ─── */}
      <div className="sidebar">

        {/* Logo & Language Switcher */}
        <div className="glass-header">
          <div className="logo-container">
            <img
              src="/logo.png" alt="Logo"
              style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', border: '1.5px solid hsl(var(--border))', boxShadow: 'var(--shadow)' }}
            />
            <div>
              <h1 className="app-title">{t('app_title')}</h1>
              <p className="app-subtitle">{t('app_subtitle')}</p>
            </div>
          </div>
          <button
            onClick={() => changeLanguage(i18n.language === 'mr' ? 'en' : 'mr')}
            className="lang-switch-btn"
          >
            {i18n.language === 'mr' ? 'English' : 'मराठी'}
          </button>
        </div>

        {/* Inputs */}
        <div className="sidebar-inputs">

          {/* Voice Command */}
          <div style={{ background: 'hsl(var(--secondary) / 0.3)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid hsl(var(--border))' }}>
            <VoiceSearch onSpeechParsed={handleSpeechInput} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Source Input */}
            <div className="search-form-group" style={{ position: 'relative' }}>
              <label className="search-form-label">
                <MapPin size={16} style={{ color: 'hsl(var(--walk-green))' }} />
                {t('from_label')}
              </label>
              <div className="input-container">
                <input
                  type="text"
                  className="input-field"
                  placeholder={t('from_placeholder')}
                  value={fromLoc}
                  onChange={(e) => handleFromChange(e.target.value)}
                  onFocus={() => setShowFromSuggestions(fromSuggestions.length > 0)}
                  onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                />
              </div>
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <div className="autocomplete-dropdown">
                  {fromSuggestions.map((loc, idx) => (
                    <div
                      key={idx}
                      className="autocomplete-item"
                      onMouseDown={() => selectFromSuggestion(loc)}
                    >
                      <span className="autocomplete-icon">📍</span>
                      <span className="autocomplete-name">{i18n.language === 'mr' ? loc.nameMr : loc.nameEn}</span>
                      <span className="autocomplete-district">{loc.district}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="swap-locations-container">
              <button onClick={handleSwap} className="swap-btn" type="button" title="Swap Directions">
                <ArrowUpDown size={16} />
              </button>
            </div>

            {/* Destination Input */}
            <div className="search-form-group" style={{ position: 'relative' }}>
              <label className="search-form-label">
                <MapPin size={16} style={{ color: 'hsl(var(--msrtc-red))' }} />
                {t('to_label')}
              </label>
              <div className="input-container">
                <input
                  type="text"
                  className="input-field"
                  placeholder={t('to_placeholder')}
                  value={toLoc}
                  onChange={(e) => handleToChange(e.target.value)}
                  onFocus={() => setShowToSuggestions(toSuggestions.length > 0)}
                  onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                />
              </div>
              {showToSuggestions && toSuggestions.length > 0 && (
                <div className="autocomplete-dropdown">
                  {toSuggestions.map((loc, idx) => (
                    <div
                      key={idx}
                      className="autocomplete-item"
                      onMouseDown={() => selectToSuggestion(loc)}
                    >
                      <span className="autocomplete-icon">📍</span>
                      <span className="autocomplete-name">{i18n.language === 'mr' ? loc.nameMr : loc.nameEn}</span>
                      <span className="autocomplete-district">{loc.district}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              className="btn btn-primary"
              onClick={() => triggerSearch()}
              style={{ marginTop: '0.5rem' }}
              disabled={isSearching}
            >
              <Search size={18} />
              {isSearching ? 'बस शोधत आहे...' : t('search_btn')}
            </button>
          </div>
        </div>

        {/* ─── RESULTS ─── */}
        <div className="sidebar-results">

          {/* Market Day Alert */}
          {marketAlert && (
            <div className="ai-recommendation-card" style={{ background: 'linear-gradient(135deg, hsl(var(--auto-amber) / 0.15) 0%, hsl(var(--secondary)) 100%)', borderColor: 'hsl(var(--auto-amber) / 0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--auto-amber))', fontWeight: 'bold', fontSize: '0.85rem' }}>
                <AlertCircle size={16} />
                <span>{t('market_day')}</span>
              </div>
              <p style={{ fontSize: '0.8rem', lineHeight: '1.4', color: 'hsl(var(--foreground))' }}>
                {marketAlert}
              </p>
            </div>
          )}

          {/* Bus List */}
          {buses.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

              {/* Live Time Badge */}
              <div className="live-time-badge">
                <Clock size={14} />
                <span>अत्ता / Now: <strong>{formatCurrentTime(currentMins)}</strong></span>
                <span className="live-time-hint">— हायलाइट बस जवळच्या वेळेत आहेत</span>
              </div>

              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, borderBottom: '1px solid hsl(var(--border))', paddingBottom: '0.5rem', margin: 0 }}>
                उपलब्ध बस सेवा ({buses.length} बस)
              </h3>

              {buses.map((bus) => {
                const highlighted = isHighlightedBus(bus, currentMins);
                const colors = BUS_TYPE_COLORS[bus.busType] || BUS_TYPE_COLORS.Lalpari;
                const isSelected = selectedBus?.id === bus.id;
                return (
                  <div
                    key={bus.id}
                    className={`bus-card ${highlighted ? 'bus-highlighted' : 'bus-dimmed'} ${isSelected ? 'bus-selected' : ''}`}
                    onClick={() => handleBusSelect(bus)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleBusSelect(bus)}
                  >
                    {/* Left: Time */}
                    <div className="bus-card-time">
                      <span className="bus-depart-time">{bus.departureTime}</span>
                      <span className="bus-arrive-time">→ {bus.arrivalTime}</span>
                    </div>

                    {/* Middle: Type + Details */}
                    <div className="bus-card-info">
                      <span
                        className="bus-type-pill"
                        style={{ background: colors.bg, color: colors.text }}
                      >
                        <Bus size={11} />
                        {bus.busTypeMr}
                      </span>
                      <span className="bus-duration">{bus.durationText}</span>
                      {highlighted && (
                        <span className="bus-now-badge">● आत्ता</span>
                      )}
                    </div>

                    {/* Right: Fare */}
                    <div className="bus-card-fare">
                      <span className="bus-fare-amount">₹{bus.totalFare}</span>
                      <ArrowRight size={14} className="bus-card-arrow" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Selected Trip Timeline (shown when bus is selected, for map context) */}
          {selectedTrip && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, borderBottom: '1px solid hsl(var(--border))', paddingBottom: '0.5rem' }}>
                सविस्तर मार्ग (Route Detail)
              </h3>
              <div className="timeline-container">
                {selectedTrip.segments.map((segment, idx) => (
                  <div key={idx} className={`timeline-step ${segment.mode}`}>
                    <div className="timeline-node">
                      <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>{idx + 1}</span>
                    </div>
                    <div className="timeline-details" style={{ width: '100%' }}>
                      <span className="timeline-time">{segment.duration}</span>
                      <span className="timeline-title">{t(segment.modeText)}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', margin: '0.15rem 0' }}>
                        {segment.from} ➔ {segment.to}
                      </span>
                      {segment.mode === 'msrtc' && segment.busNumber && (
                        <div className="timeline-bus-detail" style={{
                          marginTop: '0.4rem',
                          padding: '0.6rem 0.8rem',
                          background: 'linear-gradient(135deg, hsl(var(--msrtc-red) / 0.08) 0%, hsl(var(--secondary) / 0.5) 100%)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid hsl(var(--msrtc-red) / 0.2)',
                          fontSize: '0.8rem',
                          display: 'flex', flexDirection: 'column', gap: '0.35rem',
                          wordBreak: 'break-word', overflowWrap: 'anywhere',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <span>🚌</span>
                            <strong>बस क्र.:</strong>
                            <span style={{ color: 'hsl(var(--msrtc-red))', fontWeight: 800, background: 'hsl(var(--msrtc-red) / 0.1)', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-sm)' }}>
                              {segment.busNumber}
                            </span>
                          </div>
                          <div><span>🗺️</span> <strong>मार्ग:</strong> {segment.from} ➔ {segment.to} <em style={{ color: 'hsl(var(--muted-foreground))' }}>({segment.routeVia})</em></div>
                          <div><span>⏰</span> <strong>निघण्याची वेळ:</strong> <span style={{ color: 'hsl(var(--primary))', fontWeight: 700 }}>{segment.departureTime}</span></div>
                        </div>
                      )}
                      <span className="timeline-description" style={{ marginTop: '0.35rem', display: 'block', fontStyle: 'italic' }}>
                        {i18n.language === 'mr' ? segment.details : segment.detailsEn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── RIGHT PANEL: Map ─── */}
      <ConnectivityMap selectedTrip={selectedTrip} />

      {/* ─── BOTTOM SHEET: Bus Detail Popup ─── */}
      <BusDetailSheet bus={selectedBus} onClose={() => setSelectedBus(null)} />
    </div>
  );
}
