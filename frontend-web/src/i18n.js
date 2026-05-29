import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Comprehensive dictionary for high-fidelity Marathi-English regional translations
const resources = {
  en: {
    translation: {
      app_title: "Rural MH Connect",
      app_subtitle: "Rural Maharashtra Multi-modal Planner",
      from_label: "Source Village / Hamlet",
      from_placeholder: "e.g., Kalmeshwar, Sawargaon...",
      to_label: "Destination (Taluka HQ / City)",
      to_placeholder: "e.g., Nagpur, Katol...",
      date_label: "Date of Travel",
      time_label: "Must Arrive Before",
      search_btn: "Find Connectivity Route",
      voice_tooltip: "Tap to speak in Marathi or English",
      voice_listening: "Listening carefully...",
      voice_ready: "Tap & say, e.g., 'Sawargaon to Nagpur by bus'",
      mode_st_bus: "MSRTC ST Bus",
      mode_shared_auto: "Shared Auto / Winger",
      mode_walking: "Walking Path / Shivar road",
      ai_recommendation: "Gemini Smart Multi-Modal Recommendation",
      cost: "Estimated Fare",
      duration: "Travel Time",
      mins: "mins",
      hours: "hrs",
      rs: "₹",
      connecting: "Connection at",
      frequency: "Runs every",
      market_day: "Market Day Alert!",
      hospital_run: "Hospital Shuttle Route",
      no_direct: "No direct buses available. Recommended multi-modal connection below:"
    }
  },
  mr: {
    translation: {
      app_title: "लास्ट-माईल रुरल कनेक्ट",
      app_subtitle: "ग्रामीण महाराष्ट्र प्रवास नियोजन प्रणाली",
      from_label: "सुरुवातीचे गाव / पाडा / वस्ती",
      from_placeholder: "उदा. कळमेश्वर, सावरगाव...",
      to_label: "पोहोचण्याचे ठिकाण (तालुका / शहर)",
      to_placeholder: "उदा. नागपूर, काटोल...",
      date_label: "प्रवासाची तारीख",
      time_label: "पोहचायचे वेळ",
      search_btn: "कनेक्टिव्हिटी मार्ग शोधा",
      voice_tooltip: "मराठी किंवा इंग्रजीत बोलण्यासाठी दाबा",
      voice_listening: "काळजीपूर्वक ऐकत आहे...",
      voice_ready: "उदा. 'सावरगाव ते नागपूर एसटी बसने'",
      mode_st_bus: "एस.टी. लालपरी बस (MSRTC)",
      mode_shared_auto: "शेअर्ड ऑटो / वडाप वॅगन",
      mode_walking: "पायवाट / शिवार रस्ता / पाऊलवाट",
      ai_recommendation: "जेमिनी स्मार्ट बहु-पर्यायी प्रवास शिफारस",
      cost: "अंदाजे भाडे खर्च",
      duration: "प्रवासाचा वेळ",
      mins: "मिनिटे",
      hours: "तास",
      rs: "₹",
      connecting: "येथे गाडी बदला",
      frequency: "फेऱ्यांचे अंतर: दर",
      market_day: "साप्ताहिक बाजार दिवस अलर्ट!",
      hospital_run: "रुग्णालय विशेष शटल मार्ग",
      no_direct: "थेट बस सेवा उपलब्ध नाही. खालील बहु-पर्यायी जोडणी सुचवली आहे:"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "mr", // Default to Marathi for local rural users as high priority!
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
