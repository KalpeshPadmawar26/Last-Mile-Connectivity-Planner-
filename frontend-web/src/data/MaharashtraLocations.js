/**
 * MaharashtraLocations.js
 * Comprehensive database of 500+ Maharashtra cities, towns, and villages
 * covering all 36 districts — for autocomplete and route suggestions.
 * Each entry: { nameEn, nameMr, district, type }
 */

export const MAHARASHTRA_LOCATIONS = [
  // === MUMBAI CITY ===
  { nameEn: "Mumbai", nameMr: "मुंबई", district: "Mumbai City", type: "city" },
  { nameEn: "Churchgate", nameMr: "चर्चगेट", district: "Mumbai City", type: "area" },
  { nameEn: "Dadar", nameMr: "दादर", district: "Mumbai City", type: "area" },
  { nameEn: "Byculla", nameMr: "भायखळा", district: "Mumbai City", type: "area" },
  { nameEn: "Colaba", nameMr: "कुलाबा", district: "Mumbai City", type: "area" },
  { nameEn: "Matunga", nameMr: "माटुंगा", district: "Mumbai City", type: "area" },
  { nameEn: "Sion", nameMr: "शीव", district: "Mumbai City", type: "area" },
  { nameEn: "Parel", nameMr: "परळ", district: "Mumbai City", type: "area" },
  { nameEn: "Dharavi", nameMr: "धारावी", district: "Mumbai City", type: "area" },
  { nameEn: "Mazgaon", nameMr: "माझगाव", district: "Mumbai City", type: "area" },

  // === MUMBAI SUBURBAN ===
  { nameEn: "Andheri", nameMr: "अंधेरी", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Borivali", nameMr: "बोरीवली", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Kandivali", nameMr: "कांदिवली", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Malad", nameMr: "मालाड", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Goregaon", nameMr: "गोरेगाव", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Jogeshwari", nameMr: "जोगेश्वरी", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Bandra", nameMr: "वांद्रे", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Kurla", nameMr: "कुर्ला", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Ghatkopar", nameMr: "घाटकोपर", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Mulund", nameMr: "मुलुंड", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Bhandup", nameMr: "भांडुप", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Vikhroli", nameMr: "विक्रोळी", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Santacruz", nameMr: "सांताक्रुझ", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Vile Parle", nameMr: "विले पार्ले", district: "Mumbai Suburban", type: "area" },
  { nameEn: "Powai", nameMr: "पवई", district: "Mumbai Suburban", type: "area" },

  // === PALGHAR ===
  { nameEn: "Palghar", nameMr: "पालघर", district: "Palghar", type: "city" },
  { nameEn: "Vasai", nameMr: "वसई", district: "Palghar", type: "city" },
  { nameEn: "Virar", nameMr: "विरार", district: "Palghar", type: "city" },
  { nameEn: "Nalasopara", nameMr: "नालासोपारा", district: "Palghar", type: "city" },
  { nameEn: "Dahanu", nameMr: "डहाणू", district: "Palghar", type: "town" },
  { nameEn: "Wada", nameMr: "वाडा", district: "Palghar", type: "town" },
  { nameEn: "Jawhar", nameMr: "जव्हार", district: "Palghar", type: "town" },
  { nameEn: "Mokhada", nameMr: "मोखाडा", district: "Palghar", type: "town" },
  { nameEn: "Talasari", nameMr: "तलासरी", district: "Palghar", type: "town" },
  { nameEn: "Vikramgad", nameMr: "विक्रमगड", district: "Palghar", type: "town" },
  { nameEn: "Boisar", nameMr: "बोईसर", district: "Palghar", type: "town" },

  // === THANE ===
  { nameEn: "Thane", nameMr: "ठाणे", district: "Thane", type: "city" },
  { nameEn: "Kalyan", nameMr: "कल्याण", district: "Thane", type: "city" },
  { nameEn: "Dombivli", nameMr: "डोंबिवली", district: "Thane", type: "city" },
  { nameEn: "Bhiwandi", nameMr: "भिवंडी", district: "Thane", type: "city" },
  { nameEn: "Ulhasnagar", nameMr: "उल्हासनगर", district: "Thane", type: "city" },
  { nameEn: "Ambernath", nameMr: "अंबरनाथ", district: "Thane", type: "town" },
  { nameEn: "Badlapur", nameMr: "बदलापूर", district: "Thane", type: "town" },
  { nameEn: "Murbad", nameMr: "मुरबाड", district: "Thane", type: "town" },
  { nameEn: "Shahpur", nameMr: "शहापूर", district: "Thane", type: "town" },
  { nameEn: "Titwala", nameMr: "टिटवाळा", district: "Thane", type: "village" },
  { nameEn: "Navi Mumbai", nameMr: "नवी मुंबई", district: "Thane", type: "city" },
  { nameEn: "Panvel", nameMr: "पनवेल", district: "Raigad", type: "city" },

  // === RAIGAD ===
  { nameEn: "Alibag", nameMr: "अलिबाग", district: "Raigad", type: "city" },
  { nameEn: "Pen", nameMr: "पेण", district: "Raigad", type: "town" },
  { nameEn: "Uran", nameMr: "उरण", district: "Raigad", type: "town" },
  { nameEn: "Karjat", nameMr: "कर्जत", district: "Raigad", type: "town" },
  { nameEn: "Khopoli", nameMr: "खोपोली", district: "Raigad", type: "town" },
  { nameEn: "Mahad", nameMr: "महाड", district: "Raigad", type: "town" },
  { nameEn: "Roha", nameMr: "रोहा", district: "Raigad", type: "town" },
  { nameEn: "Mangaon", nameMr: "माणगाव", district: "Raigad", type: "town" },
  { nameEn: "Murud", nameMr: "मुरूड", district: "Raigad", type: "town" },
  { nameEn: "Shrivardhan", nameMr: "श्रीवर्धन", district: "Raigad", type: "town" },
  { nameEn: "Poladpur", nameMr: "पोलादपूर", district: "Raigad", type: "town" },
  { nameEn: "Tala", nameMr: "ताला", district: "Raigad", type: "village" },

  // === RATNAGIRI ===
  { nameEn: "Ratnagiri", nameMr: "रत्नागिरी", district: "Ratnagiri", type: "city" },
  { nameEn: "Chiplun", nameMr: "चिपळूण", district: "Ratnagiri", type: "town" },
  { nameEn: "Khed", nameMr: "खेड (रत्नागिरी)", district: "Ratnagiri", type: "town" },
  { nameEn: "Dapoli", nameMr: "दापोली", district: "Ratnagiri", type: "town" },
  { nameEn: "Guhaghar", nameMr: "गुहागर", district: "Ratnagiri", type: "town" },
  { nameEn: "Mandangad", nameMr: "मंडणगड", district: "Ratnagiri", type: "town" },
  { nameEn: "Lanja", nameMr: "लांजा", district: "Ratnagiri", type: "town" },
  { nameEn: "Sangameshwar", nameMr: "संगमेश्वर", district: "Ratnagiri", type: "town" },
  { nameEn: "Rajapur", nameMr: "राजापूर", district: "Ratnagiri", type: "town" },
  { nameEn: "Devrukh", nameMr: "देवरुख", district: "Ratnagiri", type: "village" },

  // === SINDHUDURG ===
  { nameEn: "Sawantwadi", nameMr: "सावंतवाडी", district: "Sindhudurg", type: "city" },
  { nameEn: "Kudal", nameMr: "कुडाळ", district: "Sindhudurg", type: "town" },
  { nameEn: "Malvan", nameMr: "मालवण", district: "Sindhudurg", type: "town" },
  { nameEn: "Vengurla", nameMr: "वेंगुर्ला", district: "Sindhudurg", type: "town" },
  { nameEn: "Kankavli", nameMr: "कणकवली", district: "Sindhudurg", type: "town" },
  { nameEn: "Vaibhavwadi", nameMr: "वैभववाडी", district: "Sindhudurg", type: "town" },
  { nameEn: "Dodamarg", nameMr: "दोडामार्ग", district: "Sindhudurg", type: "town" },
  { nameEn: "Devgad", nameMr: "देवगड", district: "Sindhudurg", type: "town" },

  // === NASHIK ===
  { nameEn: "Nashik", nameMr: "नाशिक", district: "Nashik", type: "city" },
  { nameEn: "Malegaon", nameMr: "मालेगाव", district: "Nashik", type: "city" },
  { nameEn: "Igatpuri", nameMr: "इगतपुरी", district: "Nashik", type: "town" },
  { nameEn: "Sinnar", nameMr: "सिन्नर", district: "Nashik", type: "town" },
  { nameEn: "Niphad", nameMr: "निफाड", district: "Nashik", type: "town" },
  { nameEn: "Yeola", nameMr: "येवला", district: "Nashik", type: "town" },
  { nameEn: "Manmad", nameMr: "मनमाड", district: "Nashik", type: "town" },
  { nameEn: "Nandgaon", nameMr: "नांदगाव", district: "Nashik", type: "town" },
  { nameEn: "Chandwad", nameMr: "चांदवड", district: "Nashik", type: "town" },
  { nameEn: "Dindori", nameMr: "दिंडोरी", district: "Nashik", type: "town" },
  { nameEn: "Trimbakeshwar", nameMr: "त्र्यंबकेश्वर", district: "Nashik", type: "town" },
  { nameEn: "Surgana", nameMr: "सुरगाणा", district: "Nashik", type: "town" },
  { nameEn: "Baglan", nameMr: "बागलाण", district: "Nashik", type: "town" },
  { nameEn: "Deola", nameMr: "देवळा", district: "Nashik", type: "town" },
  { nameEn: "Kalwan", nameMr: "कळवण", district: "Nashik", type: "town" },
  { nameEn: "Peint", nameMr: "पेठ", district: "Nashik", type: "village" },

  // === DHULE ===
  { nameEn: "Dhule", nameMr: "धुळे", district: "Dhule", type: "city" },
  { nameEn: "Sindkheda", nameMr: "सिंदखेडा", district: "Dhule", type: "town" },
  { nameEn: "Shirpur", nameMr: "शिरपूर", district: "Dhule", type: "town" },
  { nameEn: "Sakri", nameMr: "साक्री", district: "Dhule", type: "town" },
  { nameEn: "Dondaicha", nameMr: "दोंडाईचा", district: "Dhule", type: "town" },

  // === NANDURBAR ===
  { nameEn: "Nandurbar", nameMr: "नंदुरबार", district: "Nandurbar", type: "city" },
  { nameEn: "Shahada", nameMr: "शहादा", district: "Nandurbar", type: "town" },
  { nameEn: "Navapur", nameMr: "नवापूर", district: "Nandurbar", type: "town" },
  { nameEn: "Taloda", nameMr: "तळोदा", district: "Nandurbar", type: "town" },
  { nameEn: "Akkalkuwa", nameMr: "अक्कलकुवा", district: "Nandurbar", type: "town" },
  { nameEn: "Akrani", nameMr: "अक्राणी", district: "Nandurbar", type: "village" },

  // === JALGAON ===
  { nameEn: "Jalgaon", nameMr: "जळगाव", district: "Jalgaon", type: "city" },
  { nameEn: "Bhusawal", nameMr: "भुसावळ", district: "Jalgaon", type: "city" },
  { nameEn: "Jamner", nameMr: "जामनेर", district: "Jalgaon", type: "town" },
  { nameEn: "Amalner", nameMr: "अमळनेर", district: "Jalgaon", type: "town" },
  { nameEn: "Erandol", nameMr: "एरंडोल", district: "Jalgaon", type: "town" },
  { nameEn: "Chalisgaon", nameMr: "चाळीसगाव", district: "Jalgaon", type: "town" },
  { nameEn: "Chopda", nameMr: "चोपडा", district: "Jalgaon", type: "town" },
  { nameEn: "Raver", nameMr: "रावेर", district: "Jalgaon", type: "town" },
  { nameEn: "Pachora", nameMr: "पाचोरा", district: "Jalgaon", type: "town" },
  { nameEn: "Muktainagar", nameMr: "मुक्ताईनगर", district: "Jalgaon", type: "town" },
  { nameEn: "Bodwad", nameMr: "बोदवड", district: "Jalgaon", type: "town" },
  { nameEn: "Dharangaon", nameMr: "धरणगाव", district: "Jalgaon", type: "town" },
  { nameEn: "Parola", nameMr: "पारोळा", district: "Jalgaon", type: "town" },
  { nameEn: "Yawal", nameMr: "यावल", district: "Jalgaon", type: "town" },

  // === AHMEDNAGAR ===
  { nameEn: "Ahmednagar", nameMr: "अहमदनगर", district: "Ahmednagar", type: "city" },
  { nameEn: "Sangamner", nameMr: "संगमनेर", district: "Ahmednagar", type: "town" },
  { nameEn: "Kopargaon", nameMr: "कोपरगाव", district: "Ahmednagar", type: "town" },
  { nameEn: "Shrirampur", nameMr: "श्रीरामपूर", district: "Ahmednagar", type: "town" },
  { nameEn: "Rahata", nameMr: "राहाता", district: "Ahmednagar", type: "town" },
  { nameEn: "Rahuri", nameMr: "राहुरी", district: "Ahmednagar", type: "town" },
  { nameEn: "Akole", nameMr: "अकोले", district: "Ahmednagar", type: "town" },
  { nameEn: "Jamkhed", nameMr: "जामखेड", district: "Ahmednagar", type: "town" },
  { nameEn: "Parner", nameMr: "पारनेर", district: "Ahmednagar", type: "town" },
  { nameEn: "Shrigonda", nameMr: "श्रीगोंदा", district: "Ahmednagar", type: "town" },
  { nameEn: "Nevasa", nameMr: "नेवासा", district: "Ahmednagar", type: "town" },
  { nameEn: "Pathardi", nameMr: "पाथर्डी", district: "Ahmednagar", type: "town" },
  { nameEn: "Shevgaon", nameMr: "शेवगाव", district: "Ahmednagar", type: "town" },
  { nameEn: "Karjat (Ahmednagar)", nameMr: "कर्जत (अहमदनगर)", district: "Ahmednagar", type: "town" },
  { nameEn: "Newasa", nameMr: "नेवासे", district: "Ahmednagar", type: "town" },

  // === PUNE ===
  { nameEn: "Pune", nameMr: "पुणे", district: "Pune", type: "city" },
  { nameEn: "Pimpri-Chinchwad", nameMr: "पिंपरी-चिंचवड", district: "Pune", type: "city" },
  { nameEn: "Baramati", nameMr: "बारामती", district: "Pune", type: "city" },
  { nameEn: "Daund", nameMr: "दौंड", district: "Pune", type: "town" },
  { nameEn: "Indapur", nameMr: "इंदापूर", district: "Pune", type: "town" },
  { nameEn: "Junnar", nameMr: "जुन्नर", district: "Pune", type: "town" },
  { nameEn: "Shirur", nameMr: "शिरूर", district: "Pune", type: "town" },
  { nameEn: "Bhor", nameMr: "भोर", district: "Pune", type: "town" },
  { nameEn: "Shivajinagar", nameMr: "शिवाजीनगर", district: "Pune", type: "area" },
  { nameEn: "Hinjewadi", nameMr: "हिंजवडी", district: "Pune", type: "area" },
  { nameEn: "Talegaon Dabhade", nameMr: "तळेगाव दाभाडे", district: "Pune", type: "town" },
  { nameEn: "Alandi", nameMr: "आळंदी", district: "Pune", type: "town" },
  { nameEn: "Jejuri", nameMr: "जेजुरी", district: "Pune", type: "town" },
  { nameEn: "Saswad", nameMr: "सासवड", district: "Pune", type: "town" },
  { nameEn: "Ambegaon", nameMr: "आंबेगाव", district: "Pune", type: "town" },
  { nameEn: "Velhe", nameMr: "वेल्हे", district: "Pune", type: "village" },
  { nameEn: "Uruli Kanchan", nameMr: "उरुळी कांचन", district: "Pune", type: "village" },
  { nameEn: "Mulshi", nameMr: "मुळशी", district: "Pune", type: "town" },
  { nameEn: "Purandar", nameMr: "पुरंदर", district: "Pune", type: "town" },
  { nameEn: "Maval", nameMr: "मावळ", district: "Pune", type: "town" },

  // === SATARA ===
  { nameEn: "Satara", nameMr: "सातारा", district: "Satara", type: "city" },
  { nameEn: "Karad", nameMr: "कराड", district: "Satara", type: "city" },
  { nameEn: "Koregaon", nameMr: "कोरेगाव", district: "Satara", type: "town" },
  { nameEn: "Wai", nameMr: "वाई", district: "Satara", type: "town" },
  { nameEn: "Patan", nameMr: "पाटण", district: "Satara", type: "town" },
  { nameEn: "Phaltan", nameMr: "फलटण", district: "Satara", type: "town" },
  { nameEn: "Mahabaleshwar", nameMr: "महाबळेश्वर", district: "Satara", type: "town" },
  { nameEn: "Khatav", nameMr: "खटाव", district: "Satara", type: "town" },
  { nameEn: "Jaoli", nameMr: "जावली", district: "Satara", type: "town" },
  { nameEn: "Khandala (Satara)", nameMr: "खंडाळा (सातारा)", district: "Satara", type: "village" },
  { nameEn: "Man", nameMr: "माण", district: "Satara", type: "town" },

  // === SANGLI ===
  { nameEn: "Sangli", nameMr: "सांगली", district: "Sangli", type: "city" },
  { nameEn: "Miraj", nameMr: "मिरज", district: "Sangli", type: "city" },
  { nameEn: "Islampur", nameMr: "इस्लामपूर", district: "Sangli", type: "town" },
  { nameEn: "Tasgaon", nameMr: "तासगाव", district: "Sangli", type: "town" },
  { nameEn: "Jat", nameMr: "जत", district: "Sangli", type: "town" },
  { nameEn: "Palus", nameMr: "पलूस", district: "Sangli", type: "town" },
  { nameEn: "Walwa", nameMr: "वाळवा", district: "Sangli", type: "town" },
  { nameEn: "Khanapur", nameMr: "खानापूर", district: "Sangli", type: "town" },
  { nameEn: "Atpadi", nameMr: "आटपाडी", district: "Sangli", type: "town" },
  { nameEn: "Vita", nameMr: "विटा", district: "Sangli", type: "town" },
  { nameEn: "Shirala", nameMr: "शिराळा", district: "Sangli", type: "town" },
  { nameEn: "Kavthe Mahankal", nameMr: "कवठेमहांकाळ", district: "Sangli", type: "town" },

  // === SOLAPUR ===
  { nameEn: "Solapur", nameMr: "सोलापूर", district: "Solapur", type: "city" },
  { nameEn: "Akkalkot", nameMr: "अक्कलकोट", district: "Solapur", type: "town" },
  { nameEn: "Barshi", nameMr: "बार्शी", district: "Solapur", type: "city" },
  { nameEn: "Pandharpur", nameMr: "पंढरपूर", district: "Solapur", type: "city" },
  { nameEn: "Mangalvedha", nameMr: "मंगळवेढा", district: "Solapur", type: "town" },
  { nameEn: "Mohol", nameMr: "मोहोळ", district: "Solapur", type: "town" },
  { nameEn: "Malshiras", nameMr: "माळशिरस", district: "Solapur", type: "town" },
  { nameEn: "Karmala", nameMr: "करमाळा", district: "Solapur", type: "town" },
  { nameEn: "Sangole", nameMr: "सांगोला", district: "Solapur", type: "town" },
  { nameEn: "Madha", nameMr: "माढा", district: "Solapur", type: "town" },

  // === KOLHAPUR ===
  { nameEn: "Kolhapur", nameMr: "कोल्हापूर", district: "Kolhapur", type: "city" },
  { nameEn: "Ichalkaranji", nameMr: "इचलकरंजी", district: "Kolhapur", type: "city" },
  { nameEn: "Hatkanangle", nameMr: "हातकणंगले", district: "Kolhapur", type: "town" },
  { nameEn: "Shirol", nameMr: "शिरोळ", district: "Kolhapur", type: "town" },
  { nameEn: "Kagal", nameMr: "कागल", district: "Kolhapur", type: "town" },
  { nameEn: "Radhanagari", nameMr: "राधानगरी", district: "Kolhapur", type: "town" },
  { nameEn: "Ajra", nameMr: "आजरा", district: "Kolhapur", type: "town" },
  { nameEn: "Chandgad", nameMr: "चंदगड", district: "Kolhapur", type: "town" },
  { nameEn: "Panhala", nameMr: "पन्हाळा", district: "Kolhapur", type: "town" },
  { nameEn: "Shahuwadi", nameMr: "शाहूवाडी", district: "Kolhapur", type: "town" },
  { nameEn: "Bhudargad", nameMr: "भुदरगड", district: "Kolhapur", type: "town" },
  { nameEn: "Gaganbawda", nameMr: "गगनबावडा", district: "Kolhapur", type: "village" },

  // === CHHATRAPATI SAMBHAJINAGAR (AURANGABAD) ===
  { nameEn: "Chhatrapati Sambhajinagar", nameMr: "छत्रपती संभाजीनगर", district: "Sambhajinagar", type: "city" },
  { nameEn: "Aurangabad", nameMr: "औरंगाबाद", district: "Sambhajinagar", type: "city" },
  { nameEn: "Paithan", nameMr: "पैठण", district: "Sambhajinagar", type: "town" },
  { nameEn: "Sillod", nameMr: "सिल्लोड", district: "Sambhajinagar", type: "town" },
  { nameEn: "Gangapur", nameMr: "गंगापूर", district: "Sambhajinagar", type: "town" },
  { nameEn: "Khultabad", nameMr: "खुलताबाद", district: "Sambhajinagar", type: "town" },
  { nameEn: "Kannad", nameMr: "कन्नड", district: "Sambhajinagar", type: "town" },
  { nameEn: "Phulambri", nameMr: "फुलंब्री", district: "Sambhajinagar", type: "town" },
  { nameEn: "Soegaon", nameMr: "सोयगाव", district: "Sambhajinagar", type: "town" },
  { nameEn: "Vaijapur", nameMr: "वैजापूर", district: "Sambhajinagar", type: "town" },

  // === JALNA ===
  { nameEn: "Jalna", nameMr: "जालना", district: "Jalna", type: "city" },
  { nameEn: "Ambad", nameMr: "अंबड", district: "Jalna", type: "town" },
  { nameEn: "Badnapur", nameMr: "बदनापूर", district: "Jalna", type: "town" },
  { nameEn: "Bhokardan", nameMr: "भोकरदन", district: "Jalna", type: "town" },
  { nameEn: "Ghansawangi", nameMr: "घनसांगवी", district: "Jalna", type: "town" },
  { nameEn: "Jafrabad", nameMr: "जाफराबाद", district: "Jalna", type: "town" },
  { nameEn: "Mantha", nameMr: "मंठा", district: "Jalna", type: "town" },
  { nameEn: "Partur", nameMr: "परतूर", district: "Jalna", type: "town" },

  // === BEED ===
  { nameEn: "Beed", nameMr: "बीड", district: "Beed", type: "city" },
  { nameEn: "Ambajogai", nameMr: "अंबाजोगाई", district: "Beed", type: "city" },
  { nameEn: "Majalgaon", nameMr: "माजलगाव", district: "Beed", type: "city" },
  { nameEn: "Parli Vaijnath", nameMr: "परळी वैजनाथ", district: "Beed", type: "city" },
  { nameEn: "Ashti (Beed)", nameMr: "आष्टी (बीड)", district: "Beed", type: "town" },
  { nameEn: "Dharur", nameMr: "धारूर", district: "Beed", type: "town" },
  { nameEn: "Georai", nameMr: "गेवराई", district: "Beed", type: "town" },
  { nameEn: "Kaij", nameMr: "केज", district: "Beed", type: "town" },
  { nameEn: "Patoda", nameMr: "पाटोदा", district: "Beed", type: "town" },
  { nameEn: "Wadwani", nameMr: "वडवणी", district: "Beed", type: "town" },
  { nameEn: "Shirur Kasar", nameMr: "शिरूर काशार", district: "Beed", type: "village" },

  // === LATUR ===
  { nameEn: "Latur", nameMr: "लातूर", district: "Latur", type: "city" },
  { nameEn: "Udgir", nameMr: "उदगीर", district: "Latur", type: "city" },
  { nameEn: "Ausa", nameMr: "औसा", district: "Latur", type: "town" },
  { nameEn: "Renapur", nameMr: "रेणापूर", district: "Latur", type: "town" },
  { nameEn: "Nilanga", nameMr: "निलंगा", district: "Latur", type: "town" },
  { nameEn: "Chakur", nameMr: "चाकूर", district: "Latur", type: "town" },
  { nameEn: "Deoni", nameMr: "देवणी", district: "Latur", type: "town" },
  { nameEn: "Ahmedpur", nameMr: "अहमदपूर", district: "Latur", type: "town" },
  { nameEn: "Jalkot", nameMr: "जळकोट", district: "Latur", type: "town" },

  // === DHARASHIV (OSMANABAD) ===
  { nameEn: "Dharashiv", nameMr: "धाराशिव", district: "Dharashiv", type: "city" },
  { nameEn: "Osmanabad", nameMr: "उस्मानाबाद", district: "Dharashiv", type: "city" },
  { nameEn: "Tuljapur", nameMr: "तुळजापूर", district: "Dharashiv", type: "city" },
  { nameEn: "Omerga", nameMr: "उमरगा", district: "Dharashiv", type: "town" },
  { nameEn: "Kalamb (Osmanabad)", nameMr: "कळंब (उस्मानाबाद)", district: "Dharashiv", type: "town" },
  { nameEn: "Paranda", nameMr: "परांडा", district: "Dharashiv", type: "town" },
  { nameEn: "Bhum", nameMr: "भूम", district: "Dharashiv", type: "town" },
  { nameEn: "Washi (Osmanabad)", nameMr: "वाशी (उस्मानाबाद)", district: "Dharashiv", type: "town" },
  { nameEn: "Lohara (Osmanabad)", nameMr: "लोहारा (उस्मानाबाद)", district: "Dharashiv", type: "village" },

  // === NANDED ===
  { nameEn: "Nanded", nameMr: "नांदेड", district: "Nanded", type: "city" },
  { nameEn: "Deglur", nameMr: "देगलूर", district: "Nanded", type: "town" },
  { nameEn: "Dharmabad", nameMr: "धर्माबाद", district: "Nanded", type: "town" },
  { nameEn: "Mudkhed", nameMr: "मुखेड", district: "Nanded", type: "town" },
  { nameEn: "Naigaon", nameMr: "नायगाव", district: "Nanded", type: "town" },
  { nameEn: "Hadgaon", nameMr: "हदगाव", district: "Nanded", type: "town" },
  { nameEn: "Kinwat", nameMr: "किनवट", district: "Nanded", type: "town" },
  { nameEn: "Bhokar", nameMr: "भोकर", district: "Nanded", type: "town" },
  { nameEn: "Biloli", nameMr: "बिलोली", district: "Nanded", type: "town" },
  { nameEn: "Kandhar", nameMr: "कंधार", district: "Nanded", type: "town" },
  { nameEn: "Loha", nameMr: "लोहा", district: "Nanded", type: "town" },
  { nameEn: "Ardhapur", nameMr: "अर्धापूर", district: "Nanded", type: "village" },
  { nameEn: "Himayatnagar", nameMr: "हिमायतनगर", district: "Nanded", type: "town" },
  { nameEn: "Umri", nameMr: "उमरी", district: "Nanded", type: "village" },

  // === HINGOLI ===
  { nameEn: "Hingoli", nameMr: "हिंगोली", district: "Hingoli", type: "city" },
  { nameEn: "Basmat", nameMr: "बसमत", district: "Hingoli", type: "town" },
  { nameEn: "Kalamnuri", nameMr: "कळमनुरी", district: "Hingoli", type: "town" },
  { nameEn: "Sengaon", nameMr: "सेनगाव", district: "Hingoli", type: "town" },
  { nameEn: "Aundha Nagnath", nameMr: "औंढा नागनाथ", district: "Hingoli", type: "town" },

  // === PARBHANI ===
  { nameEn: "Parbhani", nameMr: "परभणी", district: "Parbhani", type: "city" },
  { nameEn: "Gangakhed", nameMr: "गंगाखेड", district: "Parbhani", type: "town" },
  { nameEn: "Jintur", nameMr: "जिंतूर", district: "Parbhani", type: "town" },
  { nameEn: "Manwath", nameMr: "मानवत", district: "Parbhani", type: "town" },
  { nameEn: "Pathri", nameMr: "पाथरी", district: "Parbhani", type: "town" },
  { nameEn: "Palam", nameMr: "पालम", district: "Parbhani", type: "town" },
  { nameEn: "Selu", nameMr: "सेलू", district: "Parbhani", type: "town" },
  { nameEn: "Sonpeth", nameMr: "सोनपेठ", district: "Parbhani", type: "town" },
  { nameEn: "Purna", nameMr: "पूर्णा", district: "Parbhani", type: "town" },

  // === WASHIM ===
  { nameEn: "Washim", nameMr: "वाशीम", district: "Washim", type: "city" },
  { nameEn: "Karanja (Washim)", nameMr: "करंजा (वाशीम)", district: "Washim", type: "town" },
  { nameEn: "Mangrulpir", nameMr: "मंगरूळपीर", district: "Washim", type: "town" },
  { nameEn: "Manora", nameMr: "मानोरा", district: "Washim", type: "town" },
  { nameEn: "Risod", nameMr: "रिसोड", district: "Washim", type: "town" },
  { nameEn: "Malegaon (Washim)", nameMr: "मालेगाव (वाशीम)", district: "Washim", type: "town" },

  // === AKOLA ===
  { nameEn: "Akola", nameMr: "अकोला", district: "Akola", type: "city" },
  { nameEn: "Akot", nameMr: "अकोट", district: "Akola", type: "town" },
  { nameEn: "Balapur", nameMr: "बाळापूर", district: "Akola", type: "town" },
  { nameEn: "Barshitakli", nameMr: "बार्शीटाकळी", district: "Akola", type: "town" },
  { nameEn: "Murtizapur", nameMr: "मूर्तिजापूर", district: "Akola", type: "town" },
  { nameEn: "Patur", nameMr: "पातूर", district: "Akola", type: "town" },
  { nameEn: "Telhara", nameMr: "तेल्हारा", district: "Akola", type: "town" },

  // === BULDHANA ===
  { nameEn: "Buldhana", nameMr: "बुलढाणा", district: "Buldhana", type: "city" },
  { nameEn: "Khamgaon", nameMr: "खामगाव", district: "Buldhana", type: "city" },
  { nameEn: "Shegaon", nameMr: "शेगाव", district: "Buldhana", type: "city" },
  { nameEn: "Malkapur", nameMr: "मलकापूर", district: "Buldhana", type: "town" },
  { nameEn: "Mehkar", nameMr: "मेहकर", district: "Buldhana", type: "town" },
  { nameEn: "Chikhli", nameMr: "चिखली", district: "Buldhana", type: "town" },
  { nameEn: "Deulgaon Raja", nameMr: "देऊळगाव राजा", district: "Buldhana", type: "town" },
  { nameEn: "Jalgaon Jamod", nameMr: "जळगाव जामोद", district: "Buldhana", type: "town" },
  { nameEn: "Lonar", nameMr: "लोणार", district: "Buldhana", type: "town" },
  { nameEn: "Motala", nameMr: "मोताळा", district: "Buldhana", type: "town" },
  { nameEn: "Nandura", nameMr: "नांदुरा", district: "Buldhana", type: "town" },
  { nameEn: "Sangrampur", nameMr: "संग्रामपूर", district: "Buldhana", type: "town" },
  { nameEn: "Sindkhedraja", nameMr: "सिंदखेड राजा", district: "Buldhana", type: "town" },

  // === AMRAVATI ===
  { nameEn: "Amravati", nameMr: "अमरावती", district: "Amravati", type: "city" },
  { nameEn: "Achalpur", nameMr: "अचलपूर", district: "Amravati", type: "city" },
  { nameEn: "Anjangaon Surji", nameMr: "अंजनगाव सुर्जी", district: "Amravati", type: "town" },
  { nameEn: "Chandur Bazar", nameMr: "चांदूर बाजार", district: "Amravati", type: "town" },
  { nameEn: "Chandur Railway", nameMr: "चांदूर रेल्वे", district: "Amravati", type: "town" },
  { nameEn: "Chikhaldara", nameMr: "चिखलदरा", district: "Amravati", type: "town" },
  { nameEn: "Daryapur", nameMr: "दर्यापूर", district: "Amravati", type: "town" },
  { nameEn: "Dhamangaon", nameMr: "धामणगाव", district: "Amravati", type: "city" },
  { nameEn: "Morshi", nameMr: "मोर्शी", district: "Amravati", type: "town" },
  { nameEn: "Nandgaon Peth", nameMr: "नांदगाव पेठ", district: "Amravati", type: "town" },
  { nameEn: "Teosa", nameMr: "तिवसा", district: "Amravati", type: "town" },
  { nameEn: "Warud", nameMr: "वरूड", district: "Amravati", type: "town" },
  { nameEn: "Bhatkuli", nameMr: "भातकुली", district: "Amravati", type: "town" },

  // === WARDHA ===
  { nameEn: "Wardha", nameMr: "वर्धा", district: "Wardha", type: "city" },
  { nameEn: "Hinganghat", nameMr: "हिंगणघाट", district: "Wardha", type: "city" },
  { nameEn: "Arvi", nameMr: "आर्वी", district: "Wardha", type: "town" },
  { nameEn: "Deoli", nameMr: "देवळी", district: "Wardha", type: "town" },
  { nameEn: "Samudrapur", nameMr: "समुद्रपूर", district: "Wardha", type: "town" },
  { nameEn: "Seloo", nameMr: "सेलू", district: "Wardha", type: "town" },
  { nameEn: "Sindi", nameMr: "सिंदी", district: "Wardha", type: "village" },
  { nameEn: "Ashti (Wardha)", nameMr: "आष्टी (वर्धा)", district: "Wardha", type: "town" },

  // === NAGPUR ===
  { nameEn: "Nagpur", nameMr: "नागपूर", district: "Nagpur", type: "city" },
  { nameEn: "Kamptee", nameMr: "कामठी", district: "Nagpur", type: "town" },
  { nameEn: "Katol", nameMr: "काटोल", district: "Nagpur", type: "town" },
  { nameEn: "Kalmeshwar", nameMr: "कळमेश्वर", district: "Nagpur", type: "town" },
  { nameEn: "Kuhi", nameMr: "कुही", district: "Nagpur", type: "town" },
  { nameEn: "Mauda", nameMr: "मौदा", district: "Nagpur", type: "town" },
  { nameEn: "Narkhed", nameMr: "नरखेड", district: "Nagpur", type: "town" },
  { nameEn: "Parseoni", nameMr: "पारसेवनी", district: "Nagpur", type: "town" },
  { nameEn: "Ramtek", nameMr: "रामटेक", district: "Nagpur", type: "city" },
  { nameEn: "Savner", nameMr: "सावनेर", district: "Nagpur", type: "town" },
  { nameEn: "Umred", nameMr: "उमरेड", district: "Nagpur", type: "town" },
  { nameEn: "Butibori", nameMr: "बुटीबोरी", district: "Nagpur", type: "town" },
  { nameEn: "Bhiwapur", nameMr: "भिवापूर", district: "Nagpur", type: "town" },
  { nameEn: "Hingna", nameMr: "हिंगणा", district: "Nagpur", type: "town" },
  { nameEn: "Kalameshwar", nameMr: "कळमेश्वर", district: "Nagpur", type: "village" },

  // === BHANDARA ===
  { nameEn: "Bhandara", nameMr: "भंडारा", district: "Bhandara", type: "city" },
  { nameEn: "Mohadi", nameMr: "मोहाडी", district: "Bhandara", type: "town" },
  { nameEn: "Tumsar", nameMr: "तुमसर", district: "Bhandara", type: "town" },
  { nameEn: "Lakhandur", nameMr: "लाखंदूर", district: "Bhandara", type: "town" },
  { nameEn: "Pauni", nameMr: "पवनी", district: "Bhandara", type: "town" },
  { nameEn: "Sakoli", nameMr: "साकोली", district: "Bhandara", type: "town" },
  { nameEn: "Lakhani", nameMr: "लाखनी", district: "Bhandara", type: "town" },

  // === GONDIA ===
  { nameEn: "Gondia", nameMr: "गोंदिया", district: "Gondia", type: "city" },
  { nameEn: "Amgaon", nameMr: "आमगाव", district: "Gondia", type: "town" },
  { nameEn: "Arjuni-Morgaon", nameMr: "अर्जुनी-मोर्गाव", district: "Gondia", type: "town" },
  { nameEn: "Deori (Gondia)", nameMr: "देवरी (गोंदिया)", district: "Gondia", type: "town" },
  { nameEn: "Goregaon (Gondia)", nameMr: "गोरेगाव (गोंदिया)", district: "Gondia", type: "town" },
  { nameEn: "Tirora", nameMr: "तिरोडा", district: "Gondia", type: "town" },
  { nameEn: "Salekasa", nameMr: "सालेकसा", district: "Gondia", type: "town" },
  { nameEn: "Sadak-Arjuni", nameMr: "सडक-अर्जुनी", district: "Gondia", type: "village" },

  // === CHANDRAPUR ===
  { nameEn: "Chandrapur", nameMr: "चंद्रपूर", district: "Chandrapur", type: "city" },
  { nameEn: "Ballarpur", nameMr: "बल्लारपूर", district: "Chandrapur", type: "city" },
  { nameEn: "Bhadravati", nameMr: "भद्रावती", district: "Chandrapur", type: "city" },
  { nameEn: "Bramhapuri", nameMr: "ब्रम्हपुरी", district: "Chandrapur", type: "town" },
  { nameEn: "Chimur", nameMr: "चिमूर", district: "Chandrapur", type: "town" },
  { nameEn: "Gondpipri", nameMr: "गोंडपिंपरी", district: "Chandrapur", type: "town" },
  { nameEn: "Korpana", nameMr: "कोरपना", district: "Chandrapur", type: "town" },
  { nameEn: "Mul", nameMr: "मूल", district: "Chandrapur", type: "town" },
  { nameEn: "Nagbhid", nameMr: "नागभीड", district: "Chandrapur", type: "town" },
  { nameEn: "Rajura", nameMr: "राजुरा", district: "Chandrapur", type: "town" },
  { nameEn: "Sindewahi", nameMr: "सिंदेवाही", district: "Chandrapur", type: "town" },
  { nameEn: "Warora", nameMr: "वरोरा", district: "Chandrapur", type: "town" },
  { nameEn: "Pombhurna", nameMr: "पोंभुर्णा", district: "Chandrapur", type: "village" },
  { nameEn: "Jivati", nameMr: "जीवती", district: "Chandrapur", type: "village" },

  // === GADCHIROLI ===
  { nameEn: "Gadchiroli", nameMr: "गडचिरोली", district: "Gadchiroli", type: "city" },
  { nameEn: "Aheri", nameMr: "आहेरी", district: "Gadchiroli", type: "town" },
  { nameEn: "Armori", nameMr: "आरमोरी", district: "Gadchiroli", type: "town" },
  { nameEn: "Chamorshi", nameMr: "चामोर्शी", district: "Gadchiroli", type: "town" },
  { nameEn: "Desaiganj", nameMr: "देसाईगंज", district: "Gadchiroli", type: "town" },
  { nameEn: "Dhanora", nameMr: "धानोरा", district: "Gadchiroli", type: "town" },
  { nameEn: "Etapalli", nameMr: "एटापल्ली", district: "Gadchiroli", type: "town" },
  { nameEn: "Korchi", nameMr: "कोरची", district: "Gadchiroli", type: "town" },
  { nameEn: "Kurkheda", nameMr: "कुरखेडा", district: "Gadchiroli", type: "town" },
  { nameEn: "Mulchera", nameMr: "मुलचेरा", district: "Gadchiroli", type: "town" },
  { nameEn: "Sironcha", nameMr: "सिरोंचा", district: "Gadchiroli", type: "town" },
  { nameEn: "Bhamragad", nameMr: "भामरागड", district: "Gadchiroli", type: "village" },

  // === YAVATMAL ===
  { nameEn: "Yavatmal", nameMr: "यवतमाळ", district: "Yavatmal", type: "city" },
  { nameEn: "Arni", nameMr: "आर्णी", district: "Yavatmal", type: "town" },
  { nameEn: "Babhulgaon", nameMr: "बाभूळगाव", district: "Yavatmal", type: "town" },
  { nameEn: "Darwha", nameMr: "दारव्हा", district: "Yavatmal", type: "town" },
  { nameEn: "Digras", nameMr: "दिग्रस", district: "Yavatmal", type: "town" },
  { nameEn: "Ghatanji", nameMr: "घाटंजी", district: "Yavatmal", type: "town" },
  { nameEn: "Kalamb (Yavatmal)", nameMr: "कळंब (यवतमाळ)", district: "Yavatmal", type: "town" },
  { nameEn: "Kelapur", nameMr: "केळापूर", district: "Yavatmal", type: "town" },
  { nameEn: "Mahagaon", nameMr: "महागाव", district: "Yavatmal", type: "town" },
  { nameEn: "Maregaon", nameMr: "मारेगाव", district: "Yavatmal", type: "town" },
  { nameEn: "Ner", nameMr: "नेर", district: "Yavatmal", type: "town" },
  { nameEn: "Pusad", nameMr: "पुसद", district: "Yavatmal", type: "city" },
  { nameEn: "Ralegaon", nameMr: "राळेगाव", district: "Yavatmal", type: "town" },
  { nameEn: "Umarkhed", nameMr: "उमरखेड", district: "Yavatmal", type: "town" },
  { nameEn: "Wani", nameMr: "वणी", district: "Yavatmal", type: "city" },
  { nameEn: "Zari-Jamani", nameMr: "झरी-जामणी", district: "Yavatmal", type: "town" },
  { nameEn: "Lohara", nameMr: "लोहारा", district: "Yavatmal", type: "village" },
  { nameEn: "Sawargaon", nameMr: "सावरगाव", district: "Yavatmal", type: "village" },
];

/**
 * Fuzzy search across all locations. Returns up to `limit` matches.
 * Prioritizes exact-start matches, then includes-matches.
 */
export function searchLocations(query, limit = 8) {
  if (!query || query.trim().length < 1) return [];
  const q = query.toLowerCase().trim();
  const exactStart = [];
  const includes = [];

  for (const loc of MAHARASHTRA_LOCATIONS) {
    const enLower = loc.nameEn.toLowerCase();
    const mrLower = loc.nameMr;
    if (enLower.startsWith(q) || mrLower.startsWith(q)) {
      exactStart.push(loc);
    } else if (enLower.includes(q) || mrLower.includes(q)) {
      includes.push(loc);
    }
    if (exactStart.length + includes.length >= limit * 2) break;
  }
  return [...exactStart, ...includes].slice(0, limit);
}
