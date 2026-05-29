import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TripService } from '../models/TripService';

// Standard high-fidelity suggestion database for regional autocompletes
const SUGGESTED_LOCATIONS = [
  { nameEn: "Yavatmal", nameMr: "यवतमाळ" },
  { nameEn: "Pune", nameMr: "पुणे" },
  { nameEn: "Arni", nameMr: "आर्णी" },
  { nameEn: "Chandrapur", nameMr: "चंद्रपूर" },
  { nameEn: "Sawargaon", nameMr: "सावरगाव" },
  { nameEn: "Nagpur", nameMr: "नागपूर" },
  { nameEn: "Lohara", nameMr: "लोहारा" },
  { nameEn: "Dhamangaon", nameMr: "धामणगाव" },
  { nameEn: "Ghatanji", nameMr: "घाटनजी" },
  { nameEn: "Kalmeshwar", nameMr: "कळमेश्वर" }
];

// Phonetic voice recognition autocorrect mapping for rural accents & dialect mistakes
const AUTOCORRECT_DICT = {
  // English misspellings / variants
  "yawatmal": "Yavatmal",
  "yotmal": "Yavatmal",
  "yavatma": "Yavatmal",
  "yavatmal vasti": "Yavatmal",
  "yavatmal stand": "Yavatmal",
  "yavatmal st": "Yavatmal",
  "poona": "Pune",
  "pune station": "Pune",
  "pune city": "Pune",
  "pun": "Pune",
  "arnie": "Arni",
  "arne": "Arni",
  "arni city": "Arni",
  "chandrpur": "Chandrapur",
  "chandra pur": "Chandrapur",
  "chandrapur city": "Chandrapur",
  "sawargan": "Sawargaon",
  "savargaon": "Sawargaon",
  "nagpore": "Nagpur",
  "nagpur stand": "Nagpur",
  "lohara village": "Lohara",
  "lohara vasti": "Lohara",
  
  // Marathi mishearings
  "यवतमाळ एसटी": "यवतमाळ",
  "यवतमाळ बस": "यवतमाळ",
  "यवतमाळ स्टैंड": "यवतमाळ",
  "पुणे स्टेशन": "पुणे",
  "पुणे सिटी": "पुणे",
  "आर्णी वस्ती": "आर्णी",
  "आर्णी बस": "आर्णी",
  "चंद्रपूर सिटी": "चंद्रपूर",
  "सावरगाव वस्ती": "सावरगाव",
  "लोहारा वस्ती": "लोहारा",
  "लोहार": "लोहारा"
};

// Regional weekly market (बाजार) database for Maharashtra rural towns
// Format: { keywords: [], dayEn: '', dayMr: '', marketNameEn: '', marketNameMr: '', noteEn: '', noteMr: '' }
const REGIONAL_MARKET_DB = [
  {
    keywords: ['yavatmal', 'यवतमाळ', 'yawatmal', 'yotmal'],
    dayEn: 'Monday', dayMr: 'सोमवार',
    marketNameEn: 'Yavatmal Main Bazaar', marketNameMr: 'यवतमाळ मुख्य बाजार',
    noteEn: 'Heavy auto & ST rush on Mondays. Book early.',
    noteMr: 'सोमवारी ऑटो व एसटी मध्ये गर्दी. आधीच नियोजन करा.'
  },
  {
    keywords: ['arni', 'आर्णी', 'arnie'],
    dayEn: 'Wednesday', dayMr: 'बुधवार',
    marketNameEn: 'Arni Weekly Bazaar', marketNameMr: 'आर्णी आठवडी बाजार',
    noteEn: 'Arni Wednesday bazaar — shared autos fill fast.',
    noteMr: 'आर्णीचा बुधवारी बाजार — शेअर्ड ऑटो लवकर भरतात.'
  },
  {
    keywords: ['chandrapur', 'चंद्रपूर', 'chandrpur'],
    dayEn: 'Sunday', dayMr: 'रविवार',
    marketNameEn: 'Chandrapur Bazaar', marketNameMr: 'चंद्रपूर बाजार',
    noteEn: 'Sunday market at Chandrapur — peak bus usage.',
    noteMr: 'चंद्रपूरचा रविवार बाजार — बसेस गर्दीने भरलेल्या असतात.'
  },
  {
    keywords: ['nagpur', 'नागपूर', 'nagpore'],
    dayEn: 'Wednesday', dayMr: 'बुधवार',
    marketNameEn: 'Nagpur Weekly Bazaar', marketNameMr: 'नागपूर साप्ताहिक बाजार',
    noteEn: 'Wednesday is Nagpur market day. Heavy rush on shared vehicles.',
    noteMr: 'बुधवारी नागपूरचा साप्ताहिक बाजार — ऑटो व बसमध्ये अत्यंत गर्दी.'
  },
  {
    keywords: ['ghatanji', 'घाटनजी'],
    dayEn: 'Thursday', dayMr: 'गुरुवार',
    marketNameEn: 'Ghatanji Bazaar', marketNameMr: 'घाटनजी बाजार',
    noteEn: 'Ghatanji Thursday market — ST buses crowded from morning.',
    noteMr: 'घाटनजीचा गुरुवारी बाजार — सकाळपासूनच एसटी भरलेल्या असतात.'
  },
  {
    keywords: ['dhamangaon', 'धामणगाव'],
    dayEn: 'Friday', dayMr: 'शुक्रवार',
    marketNameEn: 'Dhamangaon Bazaar', marketNameMr: 'धामणगाव बाजार',
    noteEn: 'Dhamangaon Friday market — trains and buses fill up.',
    noteMr: 'धामणगावचा शुक्रवारी बाजार — रेल्वे व बसमध्ये गर्दी असते.'
  },
  {
    keywords: ['lohara', 'लोहारा'],
    dayEn: 'Tuesday', dayMr: 'मंगळवार',
    marketNameEn: 'Lohara Village Bazaar', marketNameMr: 'लोहारा गाव बाजार',
    noteEn: 'Lohara Tuesday bazaar — shared vehicles limited.',
    noteMr: 'लोहाराचा मंगळवारी बाजार — शेअर्ड वाहने मर्यादित असतात.'
  },
  {
    keywords: ['sawargaon', 'सावरगाव', 'savargaon'],
    dayEn: 'Saturday', dayMr: 'शनिवार',
    marketNameEn: 'Sawargaon Bazaar', marketNameMr: 'सावरगाव बाजार',
    noteEn: 'Sawargaon Saturday market — book auto in advance.',
    noteMr: 'सावरगावचा शनिवारी बाजार — आधीच ऑटो बुक करा.'
  },
  {
    keywords: ['kalmeshwar', 'कळमेश्वर'],
    dayEn: 'Monday', dayMr: 'सोमवार',
    marketNameEn: 'Kalmeshwar Bazaar', marketNameMr: 'कळमेश्वर बाजार',
    noteEn: 'Kalmeshwar Monday bazaar — ST Stand crowded.',
    noteMr: 'कळमेश्वरचा सोमवारी बाजार — एसटी स्थानकावर गर्दी असते.'
  },
  {
    keywords: ['pune', 'पुणे', 'poona'],
    dayEn: 'Sunday', dayMr: 'रविवार',
    marketNameEn: 'Pune Mandai Bazaar', marketNameMr: 'पुणे मंडई बाजार',
    noteEn: 'Pune Mandai is busy Sundays. Auto & bus rush near depot.',
    noteMr: 'पुणे मंडई रविवारी गजबजलेली असते. डेपोजवळ ऑटो-बस गर्दी.'
  }
];

const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAYS_MR = ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];

/**
 * Returns a dynamic market alert string if any market town matches the route
 * on the same day as the user's selected travel date.
 * If no date is given, checks against today.
 */
function getMarketAlert(from, to, travelDate, lang) {
  const combinedInput = `${from} ${to}`.toLowerCase();
  const dateObj = travelDate ? new Date(travelDate) : new Date();
  const dayIndex = dateObj.getDay(); // 0=Sun, 1=Mon...
  const travelDayEn = DAYS_EN[dayIndex];
  const travelDayMr = DAYS_MR[dayIndex];

  for (const market of REGIONAL_MARKET_DB) {
    const matchesLocation = market.keywords.some(kw => combinedInput.includes(kw.toLowerCase()));
    const matchesDay = market.dayEn === travelDayEn;

    if (matchesLocation && matchesDay) {
      if (lang === 'mr') {
        return `⚠️ सूचना: ${travelDayMr} रोजी ${market.marketNameMr} असतो. ${market.noteMr}`;
      } else {
        return `⚠️ Notice: ${market.marketNameEn} falls on ${travelDayEn}. ${market.noteEn}`;
      }
    }
  }
  return null; // No matching market day
}

/**
 * useTripPlanner Custom Hook - Controller Layer
 * Manages the planning workflow state and business logic orchestration.
 * Decoupled from App.jsx so that the UI View layer is solely presentational.
 */
export function useTripPlanner() {
  const { t, i18n } = useTranslation();
  
  const [fromLoc, setFromLoc] = useState('');
  const [toLoc, setToLoc] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [marketAlert, setMarketAlert] = useState(null);

  // Suggestions state
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  // Cached search params to regenerate alert on language switch
  const [lastSearchFrom, setLastSearchFrom] = useState('');
  const [lastSearchTo, setLastSearchTo] = useState('');
  const [lastSearchDate, setLastSearchDate] = useState('');

  // Toggle App Language — re-derive market alert in new language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    if (lastSearchFrom && lastSearchTo) {
      const alert = getMarketAlert(lastSearchFrom, lastSearchTo, lastSearchDate, lng);
      setMarketAlert(alert);
    }
  };

  // Swap Source & Destination
  const handleSwap = () => {
    const temp = fromLoc;
    setFromLoc(toLoc);
    setToLoc(temp);
  };

  // Autocomplete Suggestions Filters
  const handleFromChange = (val) => {
    setFromLoc(val);
    if (!val.trim()) {
      setFromSuggestions([]);
      setShowFromSuggestions(false);
      return;
    }
    const filtered = SUGGESTED_LOCATIONS.filter(loc => 
      loc.nameEn.toLowerCase().includes(val.toLowerCase()) || 
      loc.nameMr.includes(val)
    );
    setFromSuggestions(filtered);
    setShowFromSuggestions(filtered.length > 0);
  };

  const handleToChange = (val) => {
    setToLoc(val);
    if (!val.trim()) {
      setToSuggestions([]);
      setShowToSuggestions(false);
      return;
    }
    const filtered = SUGGESTED_LOCATIONS.filter(loc => 
      loc.nameEn.toLowerCase().includes(val.toLowerCase()) || 
      loc.nameMr.includes(val)
    );
    setToSuggestions(filtered);
    setShowToSuggestions(filtered.length > 0);
  };

  const selectFromSuggestion = (loc) => {
    const displayName = i18n.language === 'mr' ? loc.nameMr : loc.nameEn;
    setFromLoc(displayName);
    setShowFromSuggestions(false);
  };

  const selectToSuggestion = (loc) => {
    const displayName = i18n.language === 'mr' ? loc.nameMr : loc.nameEn;
    setToLoc(displayName);
    setShowToSuggestions(false);
  };

  // Smart Speech autocorrect engine
  const autocorrectText = (text) => {
    if (!text) return '';
    const clean = text.toLowerCase().trim();
    
    // Direct exact check
    if (AUTOCORRECT_DICT[clean]) {
      return AUTOCORRECT_DICT[clean];
    }
    
    // Fuzzy search
    for (const [misspelled, correct] of Object.entries(AUTOCORRECT_DICT)) {
      if (clean.includes(misspelled)) {
        return correct;
      }
    }
    return text;
  };

  // Process coordinates or name extracted via speech input
  const handleSpeechInput = ({ from, to }) => {
    const correctedFrom = from ? autocorrectText(from) : '';
    const correctedTo = to ? autocorrectText(to) : '';

    const nextFrom = correctedFrom || fromLoc;
    const nextTo = correctedTo || toLoc;
    
    if (correctedFrom) setFromLoc(correctedFrom);
    if (correctedTo) setToLoc(correctedTo);
    
    // Auto-trigger plan if both extracted successfully
    if (nextFrom && nextTo) {
      triggerSearch(nextFrom, nextTo);
    }
  };

  // Primary search orchestrator calling the Model Service
  const triggerSearch = async (from = fromLoc, to = toLoc) => {
    if (!from || !to) return;
    
    setIsSearching(true);
    setSelectedTrip(null);
    setMarketAlert(null);
    setShowFromSuggestions(false);
    setShowToSuggestions(false);

    // Save search context for language-switch alert regeneration
    setLastSearchFrom(from);
    setLastSearchTo(to);
    setLastSearchDate(travelDate);

    try {
      // Call Model Service
      const foundTrips = await TripService.fetchTrips(from, to, travelDate, arrivalTime);
      setTrips(foundTrips);
      
      if (foundTrips.length > 0) {
        setSelectedTrip(foundTrips[0]); // Select fastest connection by default
        
        // Dynamic location + date-aware market day alert
        const alert = getMarketAlert(from, to, travelDate, i18n.language);
        setMarketAlert(alert); // null if no market day matches — banner hides automatically
      }
    } catch (err) {
      console.error("[useTripPlanner] Searching failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    fromLoc,
    setFromLoc,
    toLoc,
    setToLoc,
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
    
    // Auto Suggestions exposes
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
  };
}
