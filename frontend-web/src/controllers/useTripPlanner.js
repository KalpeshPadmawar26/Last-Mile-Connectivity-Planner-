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

  // Toggle App Language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    
    // Dynamically update the active alert language if an alert exists
    if (marketAlert) {
      if (lng === 'mr') {
        setMarketAlert("सूचना: बुधवारी नागपूरचा साप्ताहिक बाजार असल्याने ऑटो व बस मध्ये गर्दी असण्याची शक्यता आहे. लवकर नियोजन करा!");
      } else {
        setMarketAlert("Notice: Wednesday is Nagpur weekly market day. Heavy rush expected on shared vehicles. Travel early!");
      }
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

    try {
      // Call Model Service
      const foundTrips = await TripService.fetchTrips(from, to, travelDate, arrivalTime);
      setTrips(foundTrips);
      
      if (foundTrips.length > 0) {
        setSelectedTrip(foundTrips[0]); // Select fastest connection by default
        
        // Context-aware alert for regional market day
        if (i18n.language === 'mr') {
          setMarketAlert("सूचना: बुधवारी नागपूरचा साप्ताहिक बाजार असल्याने ऑटो व बस मध्ये गर्दी असण्याची शक्यता आहे. लवकर नियोजन करा!");
        } else {
          setMarketAlert("Notice: Wednesday is Nagpur weekly market day. Heavy rush expected on shared vehicles. Travel early!");
        }
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
