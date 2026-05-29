import React from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowUpDown, 
  Sparkles, 
  AlertCircle, 
  TrendingUp, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import ConnectivityMap from './components/ConnectivityMap';
import VoiceSearch from './components/VoiceSearch';
import { useTripPlanner } from './controllers/useTripPlanner';

export default function App() {
  const {
    fromLoc,
    toLoc,
    travelDate,
    setTravelDate,
    arrivalTime,
    setArrivalTime,
    trips,
    selectedTrip,
    setSelectedTrip,
    isSearching,
    marketAlert,
    handleSwap,
    handleSpeechInput,
    triggerSearch,
    changeLanguage,
    t,
    i18n,
    
    // Autocomplete parameters from Controller
    fromSuggestions,
    toSuggestions,
    showFromSuggestions,
    showToSuggestions,
    setShowFromSuggestions,
    setShowToSuggestions,
    handleFromChange,
    handleToChange,
    selectFromSuggestion,
    selectToSuggestion
  } = useTripPlanner();

  return (
    <div className="app-container">
      {/* 1. LEFT SIDEBAR: Controls & Trip-Chain Timelines */}
      <div className="sidebar">
        
        {/* Sleek Logo & Language Switcher */}
        <div className="glass-header">
          <div className="logo-container">
            <img src="/logo.png" alt="Logo" style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', border: '1.5px solid hsl(var(--border))', boxShadow: 'var(--shadow)' }} />
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

        {/* Inputs & Timelines */}
        <div className="sidebar-inputs">
          
          {/* Voice Command Widget */}
          <div style={{ background: 'hsl(var(--secondary) / 0.3)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid hsl(var(--border))' }}>
            <VoiceSearch onSpeechParsed={handleSpeechInput} />
          </div>

          {/* Core Input Form */}
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
              
              {/* Autocomplete Droplist for Source */}
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '100%',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(var(--glass-blur))',
                  WebkitBackdropFilter: 'blur(var(--glass-blur))',
                  border: '1.5px solid hsl(var(--border))',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow)',
                  zIndex: 99,
                  marginTop: '0.25rem',
                  maxHeight: '180px',
                  overflowY: 'auto'
                }}>
                  {fromSuggestions.map((loc, idx) => (
                    <div 
                      key={idx}
                      onMouseDown={() => selectFromSuggestion(loc)}
                      style={{
                        padding: '0.6rem 1.0rem',
                        fontSize: '0.88rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        borderBottom: idx < fromSuggestions.length - 1 ? '1px solid hsl(var(--border))' : 'none',
                        color: 'hsl(var(--foreground))'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'hsl(var(--primary) / 0.08)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      📍 {i18n.language === 'mr' ? loc.nameMr : loc.nameEn}
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
              
              {/* Autocomplete Droplist for Destination */}
              {showToSuggestions && toSuggestions.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '100%',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(var(--glass-blur))',
                  WebkitBackdropFilter: 'blur(var(--glass-blur))',
                  border: '1.5px solid hsl(var(--border))',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow)',
                  zIndex: 99,
                  marginTop: '0.25rem',
                  maxHeight: '180px',
                  overflowY: 'auto'
                }}>
                  {toSuggestions.map((loc, idx) => (
                    <div 
                      key={idx}
                      onMouseDown={() => selectToSuggestion(loc)}
                      style={{
                        padding: '0.6rem 1.0rem',
                        fontSize: '0.88rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        borderBottom: idx < toSuggestions.length - 1 ? '1px solid hsl(var(--border))' : 'none',
                        color: 'hsl(var(--foreground))'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'hsl(var(--primary) / 0.08)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      📍 {i18n.language === 'mr' ? loc.nameMr : loc.nameEn}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date & Constraints */}
            <div className="search-form-row">
              <div className="search-form-group">
                <label className="search-form-label">
                  <Calendar size={14} />
                  {t('date_label')}
                </label>
                <input 
                  type="date" 
                  className="input-field"
                  style={{ paddingLeft: '1rem' }}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                />
              </div>
              
              <div className="search-form-group">
                <label className="search-form-label">
                  <Clock size={14} />
                  {t('time_label')}
                </label>
                <input 
                  type="time" 
                  className="input-field"
                  style={{ paddingLeft: '1rem' }}
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                />
              </div>
            </div>

            {/* Search Button */}
            <button 
              className="btn btn-primary"
              onClick={() => triggerSearch()}
              style={{ marginTop: '0.5rem' }}
              disabled={isSearching}
            >
              <Search size={18} />
              {isSearching ? 'नियोजन चालू आहे...' : t('search_btn')}
            </button>
          </div>
        </div>

        {/* 2. RESULTS SECTION */}
        <div className="sidebar-results">

          {/* Regional Market Alert banner */}
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

          {/* 2. DYNAMIC TRIP RECOMMENDATIONS */}
          {trips.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, borderBottom: '1px solid hsl(var(--border))', paddingBottom: '0.5rem' }}>
                सर्वोत्कृष्ट मार्ग पर्याय (Available Connections)
              </h3>

              {trips.map((trip) => (
                <div 
                  key={trip.id} 
                  className={`trip-card ${selectedTrip?.id === trip.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTrip(trip)}
                >
                  <div className="trip-card-summary">
                    <span className={`travel-badge ${trip.type === 'fastest' ? 'badge-msrtc' : 'badge-walk'}`}>
                      {trip.type === 'fastest' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {trip.type === 'fastest' ? 'वेगवान (Fastest)' : 'स्वस्त (Cheapest)'}
                    </span>
                    <span className="trip-cost">{t('rs')}{trip.cost}</span>
                  </div>

                  <div className="trip-duration">{trip.totalDuration}</div>

                  {/* Segment Sparkline visualization */}
                  <div className="trip-chain-viz">
                    {trip.segments.map((seg, idx) => (
                      <React.Fragment key={idx}>
                        <div className={`chain-segment ${seg.mode}`}></div>
                        {idx < trip.segments.length - 1 && <ArrowRight size={10} style={{ color: 'hsl(var(--muted-foreground))' }} />}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Gemini Smart AI recommendation detail inside card */}
                  <div style={{ 
                    marginTop: '0.25rem', 
                    padding: '0.6rem 0.8rem', 
                    background: 'hsl(var(--accent) / 0.05)', 
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '3.5px solid hsl(var(--accent))'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'hsl(var(--accent))', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.15rem' }}>
                      <Sparkles size={12} />
                      <span>{t('ai_recommendation')}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', lineHeight: '1.4', color: 'hsl(var(--foreground))' }}>
                      {i18n.language === 'mr' ? trip.aiSummaryMr : trip.aiSummary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. SELECTED ROUTE TIMELINE DETAIL */}
          {selectedTrip && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, borderBottom: '1px solid hsl(var(--border))', paddingBottom: '0.5rem' }}>
                सविस्तर प्रवास टप्पे (Route Timeline)
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
                      
                      {/* Detailed Bus Specification card containing: Bus No, From-To-Via, Departure Time */}
                      {segment.mode === 'msrtc' && segment.busNumber && (
                        <div className="timeline-bus-detail" style={{
                          marginTop: '0.4rem',
                          padding: '0.6rem 0.8rem',
                          background: 'linear-gradient(135deg, hsl(var(--msrtc-red) / 0.08) 0%, hsl(var(--secondary) / 0.5) 100%)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid hsl(var(--msrtc-red) / 0.2)',
                          fontSize: '0.8rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.35rem',
                          boxShadow: '0 2px 8px -2px rgba(0,0,0,0.05)',
                          wordBreak: 'break-word',
                          overflowWrap: 'anywhere'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '1rem' }}>🚌</span>
                            <strong>बस क्रमांक (Bus No):</strong> 
                            <span style={{ 
                              color: 'hsl(var(--msrtc-red))', 
                              fontWeight: 800, 
                              background: 'hsl(var(--msrtc-red) / 0.1)', 
                              padding: '0.1rem 0.4rem', 
                              borderRadius: 'var(--radius-sm)',
                              letterSpacing: '0.02em'
                            }}>{segment.busNumber}</span>
                          </div>
                          <div style={{ wordBreak: 'break-word' }}>
                            <span style={{ fontSize: '1rem' }}>🗺️</span> 
                            <strong>मार्ग (Route):</strong> {segment.from} ➔ {segment.to} <span style={{ color: 'hsl(var(--muted-foreground))', fontStyle: 'italic' }}>({segment.routeVia})</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '1rem' }}>⏰</span> 
                            <strong>सुटण्याची वेळ (Departure):</strong> <span style={{ color: 'hsl(var(--primary))', fontWeight: 700 }}>{segment.departureTime}</span>
                          </div>
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

      {/* 2. RIGHT PANEL: Premium Geographic Vector Map */}
      <ConnectivityMap selectedTrip={selectedTrip} />
      
    </div>
  );
}
