import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TripService } from '../models/TripService';
import { searchLocations } from '../data/MaharashtraLocations';

// Phonetic voice recognition autocorrect mapping for rural accents & dialect mistakes
const AUTOCORRECT_DICT = {
  "yawatmal": "Yavatmal", "yotmal": "Yavatmal", "yavatma": "Yavatmal",
  "yavatmal vasti": "Yavatmal", "yavatmal stand": "Yavatmal",
  "poona": "Pune", "pune station": "Pune", "pune city": "Pune",
  "arnie": "Arni", "arne": "Arni", "arni city": "Arni",
  "chandrpur": "Chandrapur", "chandra pur": "Chandrapur",
  "sawargan": "Sawargaon", "savargaon": "Sawargaon",
  "nagpore": "Nagpur", "nagpur stand": "Nagpur",
  "lohara village": "Lohara", "lohara vasti": "Lohara",
  "यवतमाळ एसटी": "यवतमाळ", "यवतमाळ बस": "यवतमाळ",
  "पुणे स्टेशन": "पुणे", "पुणे सिटी": "पुणे",
  "आर्णी वस्ती": "आर्णी", "लोहारा वस्ती": "लोहारा", "लोहार": "लोहारा",
};

// Regional weekly market (बाजार) database
const REGIONAL_MARKET_DB = [
  { keywords: ['yavatmal','यवतमाळ'], dayEn:'Monday', dayMr:'सोमवार',
    marketNameEn:'Yavatmal Main Bazaar', marketNameMr:'यवतमाळ मुख्य बाजार',
    noteEn:'Heavy auto & ST rush on Mondays. Book early.',
    noteMr:'सोमवारी ऑटो व एसटी मध्ये गर्दी. आधीच नियोजन करा.' },
  { keywords: ['arni','आर्णी'], dayEn:'Wednesday', dayMr:'बुधवार',
    marketNameEn:'Arni Weekly Bazaar', marketNameMr:'आर्णी आठवडी बाजार',
    noteEn:'Arni Wednesday bazaar — shared autos fill fast.',
    noteMr:'आर्णीचा बुधवारी बाजार — शेअर्ड ऑटो लवकर भरतात.' },
  { keywords: ['chandrapur','चंद्रपूर'], dayEn:'Sunday', dayMr:'रविवार',
    marketNameEn:'Chandrapur Bazaar', marketNameMr:'चंद्रपूर बाजार',
    noteEn:'Sunday market at Chandrapur — peak bus usage.',
    noteMr:'चंद्रपूरचा रविवार बाजार — बसेस गर्दीने भरलेल्या असतात.' },
  { keywords: ['nagpur','नागपूर'], dayEn:'Wednesday', dayMr:'बुधवार',
    marketNameEn:'Nagpur Weekly Bazaar', marketNameMr:'नागपूर साप्ताहिक बाजार',
    noteEn:'Wednesday is Nagpur market day. Heavy rush on shared vehicles.',
    noteMr:'बुधवारी नागपूरचा साप्ताहिक बाजार — ऑटो व बसमध्ये अत्यंत गर्दी.' },
  { keywords: ['ghatanji','घाटंजी'], dayEn:'Thursday', dayMr:'गुरुवार',
    marketNameEn:'Ghatanji Bazaar', marketNameMr:'घाटनजी बाजार',
    noteEn:'Ghatanji Thursday market — ST buses crowded from morning.',
    noteMr:'घाटनजीचा गुरुवारी बाजार — सकाळपासूनच एसटी भरलेल्या असतात.' },
  { keywords: ['dhamangaon','धामणगाव'], dayEn:'Friday', dayMr:'शुक्रवार',
    marketNameEn:'Dhamangaon Bazaar', marketNameMr:'धामणगाव बाजार',
    noteEn:'Dhamangaon Friday market — trains and buses fill up.',
    noteMr:'धामणगावचा शुक्रवारी बाजार — रेल्वे व बसमध्ये गर्दी असते.' },
  { keywords: ['lohara','लोहारा'], dayEn:'Tuesday', dayMr:'मंगळवार',
    marketNameEn:'Lohara Village Bazaar', marketNameMr:'लोहारा गाव बाजार',
    noteEn:'Lohara Tuesday bazaar — shared vehicles limited.',
    noteMr:'लोहाराचा मंगळवारी बाजार — शेअर्ड वाहने मर्यादित असतात.' },
  { keywords: ['sawargaon','सावरगाव'], dayEn:'Saturday', dayMr:'शनिवार',
    marketNameEn:'Sawargaon Bazaar', marketNameMr:'सावरगाव बाजार',
    noteEn:'Sawargaon Saturday market — book auto in advance.',
    noteMr:'सावरगावचा शनिवारी बाजार — आधीच ऑटो बुक करा.' },
  { keywords: ['pune','पुणे'], dayEn:'Sunday', dayMr:'रविवार',
    marketNameEn:'Pune Mandai Bazaar', marketNameMr:'पुणे मंडई बाजार',
    noteEn:'Pune Mandai is busy Sundays. Auto & bus rush near depot.',
    noteMr:'पुणे मंडई रविवारी गजबजलेली असते. डेपोजवळ ऑटो-बस गर्दी.' },
  { keywords: ['pandharpur','पंढरपूर'], dayEn:'Thursday', dayMr:'गुरुवार',
    marketNameEn:'Pandharpur Bazaar', marketNameMr:'पंढरपूर बाजार',
    noteEn:'Pandharpur Thursday bazaar. Extra rush near temple.',
    noteMr:'पंढरपूरचा गुरुवारी बाजार. मंदिराजवळ जास्त गर्दी.' },
  { keywords: ['amravati','अमरावती'], dayEn:'Monday', dayMr:'सोमवार',
    marketNameEn:'Amravati Weekly Bazaar', marketNameMr:'अमरावती बाजार',
    noteEn:'Amravati Monday market — heavy ST Stand rush.',
    noteMr:'अमरावतीचा सोमवारी बाजार — एसटी स्थानकावर गर्दी.' },
];

const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAYS_MR = ['रविवार','सोमवार','मंगळवार','बुधवार','गुरुवार','शुक्रवार','शनिवार'];

function getMarketAlert(from, to, lang) {
  const combined = `${from} ${to}`.toLowerCase();
  const today = new Date();
  const dayIndex = today.getDay();
  const travelDayEn = DAYS_EN[dayIndex];
  const travelDayMr = DAYS_MR[dayIndex];
  for (const market of REGIONAL_MARKET_DB) {
    const matchesLoc = market.keywords.some(kw => combined.includes(kw.toLowerCase()));
    const matchesDay = market.dayEn === travelDayEn;
    if (matchesLoc && matchesDay) {
      if (lang === 'mr') {
        return `⚠️ सूचना: ${travelDayMr} रोजी ${market.marketNameMr} असतो. ${market.noteMr}`;
      } else {
        return `⚠️ Notice: ${market.marketNameEn} falls on ${travelDayEn}. ${market.noteEn}`;
      }
    }
  }
  return null;
}

/**
 * useTripPlanner Custom Hook — Controller Layer
 */
export function useTripPlanner() {
  const { t, i18n } = useTranslation();

  const [fromLoc, setFromLoc] = useState('');
  const [toLoc, setToLoc] = useState('');
  const [buses, setBuses] = useState([]);           // Full-day bus schedule
  const [selectedBus, setSelectedBus] = useState(null); // For bottom sheet
  const [selectedTrip, setSelectedTrip] = useState(null); // For map
  const [isSearching, setIsSearching] = useState(false);
  const [marketAlert, setMarketAlert] = useState(null);

  // Suggestion state
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  // Cached for language-switch alert
  const [lastSearchFrom, setLastSearchFrom] = useState('');
  const [lastSearchTo, setLastSearchTo] = useState('');

  // Toggle language — re-derive market alert
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    if (lastSearchFrom && lastSearchTo) {
      setMarketAlert(getMarketAlert(lastSearchFrom, lastSearchTo, lng));
    }
  };

  const handleSwap = () => {
    const temp = fromLoc;
    setFromLoc(toLoc);
    setToLoc(temp);
  };

  // Autocomplete: search 500+ Maharashtra locations
  const handleFromChange = (val) => {
    setFromLoc(val);
    if (!val.trim()) { setFromSuggestions([]); setShowFromSuggestions(false); return; }
    const results = searchLocations(val, 8);
    setFromSuggestions(results);
    setShowFromSuggestions(results.length > 0);
  };

  const handleToChange = (val) => {
    setToLoc(val);
    if (!val.trim()) { setToSuggestions([]); setShowToSuggestions(false); return; }
    const results = searchLocations(val, 8);
    setToSuggestions(results);
    setShowToSuggestions(results.length > 0);
  };

  const selectFromSuggestion = (loc) => {
    setFromLoc(i18n.language === 'mr' ? loc.nameMr : loc.nameEn);
    setShowFromSuggestions(false);
  };

  const selectToSuggestion = (loc) => {
    setToLoc(i18n.language === 'mr' ? loc.nameMr : loc.nameEn);
    setShowToSuggestions(false);
  };

  // Voice autocorrect
  const autocorrectText = (text) => {
    if (!text) return '';
    const clean = text.toLowerCase().trim();
    if (AUTOCORRECT_DICT[clean]) return AUTOCORRECT_DICT[clean];
    for (const [mis, cor] of Object.entries(AUTOCORRECT_DICT)) {
      if (clean.includes(mis)) return cor;
    }
    // Try fuzzy match against full location database
    const matches = searchLocations(clean, 1);
    if (matches.length > 0) return matches[0].nameEn;
    return text;
  };

  const handleSpeechInput = ({ from, to }) => {
    const correctedFrom = from ? autocorrectText(from) : '';
    const correctedTo   = to   ? autocorrectText(to)   : '';
    const nextFrom = correctedFrom || fromLoc;
    const nextTo   = correctedTo   || toLoc;
    if (correctedFrom) setFromLoc(correctedFrom);
    if (correctedTo)   setToLoc(correctedTo);
    if (nextFrom && nextTo) triggerSearch(nextFrom, nextTo);
  };

  // Handle bus card click → set bottom sheet + map trip
  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
    setSelectedTrip({
      from: bus.from,
      to: bus.to,
      cost: bus.totalFare,
      duration: bus.durationText,
      path: bus.path,
      segments: bus.segments,
    });
  };

  // Primary search
  const triggerSearch = async (from = fromLoc, to = toLoc) => {
    if (!from || !to) return;
    setIsSearching(true);
    setSelectedBus(null);
    setSelectedTrip(null);
    setMarketAlert(null);
    setBuses([]);
    setShowFromSuggestions(false);
    setShowToSuggestions(false);
    setLastSearchFrom(from);
    setLastSearchTo(to);

    try {
      const foundBuses = await TripService.fetchTrips(from, to);
      setBuses(foundBuses);
      if (foundBuses.length > 0) {
        setMarketAlert(getMarketAlert(from, to, i18n.language));
      }
    } catch (err) {
      console.error('[useTripPlanner] Search failed:', err);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    fromLoc, setFromLoc,
    toLoc, setToLoc,
    buses,
    selectedBus, setSelectedBus,
    selectedTrip, setSelectedTrip,
    isSearching,
    marketAlert,
    handleSwap,
    handleSpeechInput,
    handleBusSelect,
    triggerSearch,
    changeLanguage,
    t, i18n,
    fromSuggestions, toSuggestions,
    showFromSuggestions, showToSuggestions,
    setShowFromSuggestions, setShowToSuggestions,
    handleFromChange, handleToChange,
    selectFromSuggestion, selectToSuggestion,
  };
}
