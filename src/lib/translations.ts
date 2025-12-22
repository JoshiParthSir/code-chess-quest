export type Language = 'en' | 'hi';

export const translations = {
  en: {
    // App Title
    appTitle: "CHESSVERSE CAMPUS",
    tagline: "Neural C Programming Through The Digital Grid",
    
    // Buttons
    jackIn: "JACK IN",
    startQuest: "Start Quest",
    learnChessBasics: "LEARN CHESS BASICS",
    startChessTutorial: "Start Chess Tutorial",
    beginProgramming: "Begin Programming",
    backToDashboard: "Back to Dashboard",
    nextLesson: "Next Lesson",
    previousPiece: "Previous Piece",
    nextPiece: "Next Piece",
    demonstrateMove: "Demonstrate Move",
    showMove: "Show Move",
    reset: "Reset",
    runCode: "Run Code",
    showSolution: "Show Solution",
    showHint: "Show Hint",
    skipStory: "Skip Story",
    continue: "Continue",
    beginQuest: "Begin Your Quest",
    
    // Headers
    choosePath: "CHOOSE YOUR PATH",
    chessBasicsProtocol: "CHESS BASICS TUTORIAL",
    neuralCProgramming: "Neural C Programming Grid",
    masterPiecesFirst: "Master the pieces before you master the code",
    selectPath: "Select how you want to begin your journey",
    chessBasics: "Chess Basics",
    achievementVault: "ACHIEVEMENT VAULT",
    
    // Chess Tutorial
    whatYouLearn: "What You'll Learn:",
    pawnKnightBishop: "Pawn, Knight, Bishop movements",
    rookQueenKing: "Rook, Queen, King strategies",
    interactiveBoard: "Interactive board demonstrations",
    uniqueSounds: "Unique sound for each piece",
    
    // Quest Features
    whatYouGet: "What You'll Get:",
    interactiveLessons: "25 interactive C programming lessons",
    learnMoves: "Learn chess moves after each lesson",
    unlockBadges: "Unlock badges and achievements",
    levelUpSkills: "Level up your coding skills",
    
    // Progress
    dayStreak: "day streak",
    lessons: "lessons",
    level: "Lv",
    xpProgress: "XP Progress",
    piece: "Piece",
    of: "of",
    
    // Chess Pieces
    pawn: "Pawn",
    knight: "Knight",
    bishop: "Bishop",
    rook: "Rook",
    queen: "Queen",
    king: "King",
    
    // Chess Piece Descriptions
    pawnDesc: "The foot soldier of your army. Small but mighty when used correctly.",
    knightDesc: "The only piece that can jump over others. Moves in an L-shape.",
    bishopDesc: "Moves diagonally across the board. Each bishop stays on one color forever.",
    rookDesc: "The castle tower. Powerful piece that controls ranks and files.",
    queenDesc: "The most powerful piece! Combines rook and bishop movement.",
    kingDesc: "The most important piece! If your king is checkmated, you lose.",
    
    // Chess Move Patterns
    pawnMove: "Moves forward one square (or two on first move). Captures diagonally forward.",
    knightMove: "L-shaped move: 2 squares in one direction, then 1 square perpendicular.",
    bishopMove: "Moves diagonally any number of squares. Cannot jump over pieces.",
    rookMove: "Moves horizontally or vertically any number of squares.",
    queenMove: "Moves like rook OR bishop - any direction, any distance.",
    kingMove: "Moves one square in any direction. Must stay safe from attacks.",
    
    // Labels
    description: "Description:",
    movementPattern: "Movement Pattern:",
    examples: "Examples:",
    value: "Value",
    howToExecute: "How to Execute:",
    moveDetails: "Move Details:",
    pieceLabel: "Piece:",
    from: "From:",
    to: "To:",
    
    // Messages
    chessBasicsMastered: "Chess Basics Mastered!",
    readyToLearn: "Ready to learn C programming!",
    perfectSolved: "Perfect! ✨",
    puzzleSolved: "You've solved the puzzle!",
    notQuite: "Not quite right",
    tryAgain: "Try again or use the hint!",
    solutionRevealed: "Solution Revealed",
    studyCode: "Study the code carefully!",
    
    // Miscellaneous
    coreDeveloper: "CORE DEVELOPER:",
    systemArchitect: "SYSTEM ARCHITECT:",
    assistantProfessor: "(Assistant Professor)",
    president: "(President, LJK)",
    accessLater: "You can always access Chess Basics from the dashboard later",
    badges: "Badges",
    loading: "Loading chess pieces...",
    error: "Error loading piece data",
    
    // Narration Text
    narration: {
      welcomeChessBasics: "Welcome to Chess Basics Tutorial. Let's master all six chess pieces with interactive demonstrations.",
      lessonIntro: (id: number, title: string, analogy: string) => `Lesson ${id}: ${title}. ${analogy}`,
      successMessage: "Excellent work! You have successfully completed this challenge!",
      errorMessage: "Not quite right. Try again or use the hint button for guidance.",
      hintMessage: (hint: string) => `Here is a hint: ${hint}`,
      pieceWelcome: (name: string, description: string) => `Welcome to ${name}. ${description}`,
      pieceDemo: (name: string, description: string, pattern: string) => `${name}. ${description}. ${pattern}`,
      nextPiece: (name: string) => `Moving to ${name}`,
      previousPiece: (name: string) => `Going back to ${name}`,
      chessComplete: "Congratulations! You have mastered all chess pieces. Now you are ready to learn C programming!",
      
      // Story Mission
      storyTitle: "The Digital Grandmaster's Quest",
      storyMission: "In the year 2077, the digital realm faces chaos. The ancient wisdom of chess strategy has been forgotten, and programs crash without logic. You are the chosen one, destined to master both the 64 squares of chess and the infinite possibilities of code. Only by understanding strategic thinking can you restore balance to the digital universe.",
      missionObjective: "Your mission: Master chess strategies to unlock the secrets of programming logic. Each chess move teaches a coding concept. Each piece represents a programming pattern. Victory awaits those who think both strategically and logically.",
      whyChess: "Chess teaches you to think ahead, plan strategically, and solve complex problems - the exact skills needed for coding!",
      whyCoding: "Programming gives you the power to create, innovate, and solve real-world problems using logical thinking!",
      theConnection: "Every chess strategy has a coding equivalent. Pawns are variables. Knights jump like functions. Queens combine powers like classes. The chessboard is your first program!",
    },
  },
  
  hi: {
    // App Title
    appTitle: "चेसवर्स प्रोटोकॉल",
    tagline: "डिजिटल ग्रिड के माध्यम से न्यूरल C प्रोग्रामिंग",
    
    // Buttons
    jackIn: "शुरू करें",
    startQuest: "क्वेस्ट शुरू करें",
    learnChessBasics: "शतरंज मूल बातें सीखें",
    startChessTutorial: "शतरंज ट्यूटोरियल शुरू करें",
    beginProgramming: "प्रोग्रामिंग शुरू करें",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    nextLesson: "अगला पाठ",
    previousPiece: "पिछला मोहरा",
    nextPiece: "अगला मोहरा",
    demonstrateMove: "चाल दिखाएं",
    showMove: "चाल दिखाएं",
    reset: "रीसेट करें",
    runCode: "कोड चलाएं",
    showSolution: "समाधान दिखाएं",
    showHint: "संकेत दिखाएं",
    skipStory: "कहानी छोड़ें",
    continue: "जारी रखें",
    beginQuest: "अपनी खोज शुरू करें",
    
    // Headers
    choosePath: "अपना रास्ता चुनें",
    chessBasicsProtocol: "शतरंज मूल बातें ट्यूटोरियल",
    neuralCProgramming: "न्यूरल C प्रोग्रामिंग ग्रिड",
    masterPiecesFirst: "कोड में महारत से पहले मोहरों में महारत हासिल करें",
    selectPath: "अपनी यात्रा कैसे शुरू करना चाहते हैं चुनें",
    chessBasics: "शतरंज मूल बातें",
    achievementVault: "उपलब्धि कक्ष",
    
    // Chess Tutorial
    whatYouLearn: "आप क्या सीखेंगे:",
    pawnKnightBishop: "प्यादा, घोड़ा, ऊंट की चालें",
    rookQueenKing: "हाथी, वज़ीर, राजा की रणनीतियाँ",
    interactiveBoard: "इंटरैक्टिव बोर्ड प्रदर्शन",
    uniqueSounds: "प्रत्येक मोहरे के लिए अनूठी ध्वनि",
    
    // Quest Features
    whatYouGet: "आपको क्या मिलेगा:",
    interactiveLessons: "25 इंटरैक्टिव C प्रोग्रामिंग पाठ",
    learnMoves: "प्रत्येक पाठ के बाद शतरंज चालें सीखें",
    unlockBadges: "बैज और उपलब्धियां अनलॉक करें",
    levelUpSkills: "अपने कोडिंग कौशल को बढ़ाएं",
    
    // Progress
    dayStreak: "दिन की लकीर",
    lessons: "पाठ",
    level: "स्तर",
    xpProgress: "XP प्रगति",
    piece: "मोहरा",
    of: "का",
    
    // Chess Pieces
    pawn: "प्यादा",
    knight: "घोड़ा",
    bishop: "ऊंट",
    rook: "हाथी",
    queen: "वज़ीर",
    king: "राजा",
    
    // Chess Piece Descriptions
    pawnDesc: "आपकी सेना का पैदल सैनिक। सही ढंग से उपयोग करने पर छोटा लेकिन शक्तिशाली।",
    knightDesc: "एकमात्र मोहरा जो दूसरों के ऊपर कूद सकता है। L-आकार में चलता है।",
    bishopDesc: "बोर्ड पर तिरछा चलता है। प्रत्येक ऊंट हमेशा एक रंग पर रहता है।",
    rookDesc: "महल का टावर। शक्तिशाली मोहरा जो पंक्तियों और फ़ाइलों को नियंत्रित करता है।",
    queenDesc: "सबसे शक्तिशाली मोहरा! हाथी और ऊंट की गति को जोड़ता है।",
    kingDesc: "सबसे महत्वपूर्ण मोहरा! यदि आपका राजा शह और मात हो जाता है, तो आप हार जाते हैं।",
    
    // Chess Move Patterns
    pawnMove: "एक वर्ग आगे चलता है (पहली चाल में दो)। तिरछा आगे पकड़ता है।",
    knightMove: "L-आकार की चाल: एक दिशा में 2 वर्ग, फिर 1 वर्ग लंबवत।",
    bishopMove: "तिरछा कितने भी वर्ग चल सकता है। टुकड़ों के ऊपर नहीं कूद सकता।",
    rookMove: "क्षैतिज या लंबवत कितने भी वर्ग चलता है।",
    queenMove: "हाथी या ऊंट की तरह चलता है - कोई भी दिशा, कोई भी दूरी।",
    kingMove: "किसी भी दिशा में एक वर्ग चलता है। हमलों से सुरक्षित रहना चाहिए।",
    
    // Labels
    description: "विवरण:",
    movementPattern: "चाल पैटर्न:",
    examples: "उदाहरण:",
    value: "मूल्य",
    howToExecute: "कैसे निष्पादित करें:",
    moveDetails: "चाल विवरण:",
    pieceLabel: "मोहरा:",
    from: "से:",
    to: "तक:",
    
    // Messages
    chessBasicsMastered: "शतरंज मूल बातें में महारत हासिल!",
    readyToLearn: "C प्रोग्रामिंग सीखने के लिए तैयार!",
    perfectSolved: "बिल्कुल सही! ✨",
    puzzleSolved: "आपने पहेली हल कर दी!",
    notQuite: "बिल्कुल सही नहीं",
    tryAgain: "फिर से प्रयास करें या संकेत का उपयोग करें!",
    solutionRevealed: "समाधान प्रकट हुआ",
    studyCode: "कोड को ध्यान से पढ़ें!",
    
    // Miscellaneous
    coreDeveloper: "मुख्य डेवलपर:",
    systemArchitect: "सिस्टम आर्किटेक्ट:",
    assistantProfessor: "(सहायक प्रोफेसर)",
    president: "(अध्यक्ष, LJK)",
    accessLater: "आप बाद में डैशबोर्ड से शतरंज मूल बातें एक्सेस कर सकते हैं",
    badges: "बैज",
    loading: "शतरंज के मोहरे लोड हो रहे हैं...",
    error: "मोहरा डेटा लोड करने में त्रुटि",
    
    // Narration Text
    narration: {
      welcomeChessBasics: "शतरंज मूल बातें ट्यूटोरियल में आपका स्वागत है। आइए इंटरैक्टिव प्रदर्शन के साथ सभी छह शतरंज मोहरों में महारत हासिल करें।",
      lessonIntro: (id: number, title: string, analogy: string) => `पाठ ${id}: ${title}। ${analogy}`,
      successMessage: "उत्कृष्ट काम! आपने इस चुनौती को सफलतापूर्वक पूरा कर लिया है!",
      errorMessage: "बिल्कुल सही नहीं। फिर से प्रयास करें या मार्गदर्शन के लिए संकेत बटन का उपयोग करें।",
      hintMessage: (hint: string) => `यहां एक संकेत है: ${hint}`,
      pieceWelcome: (name: string, description: string) => `${name} में आपका स्वागत है। ${description}`,
      pieceDemo: (name: string, description: string, pattern: string) => `${name}। ${description}। ${pattern}`,
      nextPiece: (name: string) => `${name} पर जा रहे हैं`,
      previousPiece: (name: string) => `${name} पर वापस जा रहे हैं`,
      chessComplete: "बधाई हो! आपने सभी शतरंज मोहरों में महारत हासिल कर ली है। अब आप C प्रोग्रामिंग सीखने के लिए तैयार हैं!",
      
      // Story Mission
      storyTitle: "डिजिटल ग्रैंडमास्टर की खोज",
      storyMission: "वर्ष 2077 में, डिजिटल क्षेत्र अराजकता का सामना कर रहा है। शतरंज रणनीति का प्राचीन ज्ञान भुला दिया गया है, और प्रोग्राम तर्क के बिना क्रैश हो जाते हैं। आप चुने हुए हैं, शतरंज के 64 वर्गों और कोड की अनंत संभावनाओं दोनों में महारत हासिल करने के लिए नियत। केवल रणनीतिक सोच को समझकर ही आप डिजिटल ब्रह्मांड में संतुलन बहाल कर सकते हैं।",
      missionObjective: "आपका मिशन: प्रोग्रामिंग तर्क के रहस्यों को अनलॉक करने के लिए शतरंज रणनीतियों में महारत हासिल करें। प्रत्येक शतरंज चाल एक कोडिंग अवधारणा सिखाती है। प्रत्येक मोहरा एक प्रोग्रामिंग पैटर्न का प्रतिनिधित्व करता है। रणनीतिक और तार्किक रूप से सोचने वालों के लिए जीत का इंतजार है।",
      whyChess: "शतरंज आपको आगे सोचना, रणनीतिक योजना बनाना और जटिल समस्याओं को हल करना सिखाता है - कोडिंग के लिए आवश्यक वही कौशल!",
      whyCoding: "प्रोग्रामिंग आपको तार्किक सोच का उपयोग करके बनाने, नवाचार करने और वास्तविक दुनिया की समस्याओं को हल करने की शक्ति देता है!",
      theConnection: "प्रत्येक शतरंज रणनीति का एक कोडिंग समकक्ष है। प्यादे चर हैं। नाइट्स फ़ंक्शंस की तरह कूदते हैं। वजीर कक्षाओं की तरह शक्तियों को जोड़ती है। शतरंज बोर्ड आपका पहला प्रोग्राम है!",
    },
  },
  
  gu: {
    // App Title
    appTitle: "ચેસવર્સ પ્રોટોકોલ",
    tagline: "ડિજિટલ ગ્રીડ દ્વારા ન્યુરલ C પ્રોગ્રામિંગ",
    
    // Buttons
    jackIn: "શરૂ કરો",
    startQuest: "ક્વેસ્ટ શરૂ કરો",
    learnChessBasics: "ચેસ મૂળભૂત બાબતો શીખો",
    startChessTutorial: "ચેસ ટ્યુટોરિયલ શરૂ કરો",
    beginProgramming: "પ્રોગ્રામિંગ શરૂ કરો",
    backToDashboard: "ડેશબોર્ડ પર પાછા જાઓ",
    nextLesson: "આગળનો પાઠ",
    previousPiece: "પાછલો ચકરો",
    nextPiece: "આગળનો ચકરો",
    demonstrateMove: "ચાલ બતાવો",
    showMove: "ચાલ બતાવો",
    reset: "રીસેટ કરો",
    runCode: "કોડ ચલાવો",
    showSolution: "ઉકેલ બતાવો",
    showHint: "સંકેત બતાવો",
    skipStory: "વાર્તા છોડો",
    continue: "ચાલુ રાખો",
    beginQuest: "તમારી શોધ શરૂ કરો",
    
    // Headers
    choosePath: "તમારો રસ્તો પસંદ કરો",
    chessBasicsProtocol: "ચેસ મૂળભૂત બાબતો પ્રોટોકોલ",
    neuralCProgramming: "ન્યુરલ C પ્રોગ્રામિંગ ગ્રીડ",
    masterPiecesFirst: "કોડમાં નિપુણતા પહેલાં ચકરામાં નિપુણતા મેળવો",
    selectPath: "તમે તમારી મુસાફરી કેવી રીતે શરૂ કરવા માંગો છો તે પસંદ કરો",
    chessBasics: "ચેસ મૂળભૂત બાબતો",
    achievementVault: "સિદ્ધિ કક્ષ",
    
    // Chess Tutorial
    whatYouLearn: "તમે શું શીખશો:",
    pawnKnightBishop: "પ્યાદા, ઘોડો, ઊંટની ચાલો",
    rookQueenKing: "હાથી, વજીર, રાજાની વ્યૂહરચનાઓ",
    interactiveBoard: "ઇન્ટરેક્ટિવ બોર્ડ પ્રદર્શન",
    uniqueSounds: "દરેક ચકરા માટે અનન્ય ધ્વનિ",
    
    // Quest Features
    whatYouGet: "તમને શું મળશે:",
    interactiveLessons: "25 ઇન્ટરેક્ટિવ C પ્રોગ્રામિંગ પાઠ",
    learnMoves: "દરેક પાઠ પછી ચેસ ચાલો શીખો",
    unlockBadges: "બેજ અને સિદ્ધિઓ અનલોક કરો",
    levelUpSkills: "તમારા કોડિંગ કૌશલ્યો વધારો",
    
    // Progress
    dayStreak: "દિવસની લકીર",
    lessons: "પાઠ",
    level: "સ્તર",
    xpProgress: "XP પ્રગતિ",
    piece: "ચકરો",
    of: "નો",
    
    // Chess Pieces
    pawn: "પ્યાદો",
    knight: "ઘોડો",
    bishop: "ઊંટ",
    rook: "હાથી",
    queen: "વજીર",
    king: "રાજા",
    
    // Chess Piece Descriptions
    pawnDesc: "તમારી સેનાનો પાયદળ સૈનિક. યોગ્ય રીતે ઉપયોગ કરવામાં આવે ત્યારે નાનો પણ શક્તિશાળી.",
    knightDesc: "એકમાત્ર ચકરો જે અન્ય ઉપર કૂદી શકે છે. L-આકારમાં ચાલે છે.",
    bishopDesc: "બોર્ડ પર ત્રાંસી ચાલે છે. દરેક ઊંટ હંમેશા એક રંગ પર રહે છે.",
    rookDesc: "કિલ્લાનો ટાવર. શક્તિશાળી ચકરો જે રેન્ક અને ફાઇલ્સને નિયંત્રિત કરે છે.",
    queenDesc: "સૌથી શક્તિશાળી ચકરો! હાથી અને ઊંટની ચાલને જોડે છે.",
    kingDesc: "સૌથી મહત્વપૂર્ણ ચકરો! જો તમારો રાજા શહ અને માત થાય, તો તમે હારો છો.",
    
    // Chess Move Patterns
    pawnMove: "એક ચોરસ આગળ ચાલે છે (પ્રથમ ચાલમાં બે). ત્રાંસી આગળ પકડે છે.",
    knightMove: "L-આકારની ચાલ: એક દિશામાં 2 ચોરસ, પછી 1 ચોરસ લંબરૂપ.",
    bishopMove: "ત્રાંસી ગમે તેટલા ચોરસ ચાલી શકે છે. ચકરાઓ ઉપર કૂદી શકતો નથી.",
    rookMove: "આડા અથવા ઊભા ગમે તેટલા ચોરસ ચાલે છે.",
    queenMove: "હાથી અથવા ઊંટની જેમ ચાલે છે - કોઈપણ દિશા, કોઈપણ અંતર.",
    kingMove: "કોઈપણ દિશામાં એક ચોરસ ચાલે છે. હુમલાઓથી સુરક્ષિત રહેવું જોઈએ.",
    
    // Labels
    description: "વર્ણન:",
    movementPattern: "ચાલ પેટર્ન:",
    examples: "ઉદાહરણો:",
    value: "મૂલ્ય",
    howToExecute: "કેવી રીતે અમલ કરવું:",
    moveDetails: "ચાલ વિગતો:",
    pieceLabel: "ચકરો:",
    from: "થી:",
    to: "સુધી:",
    
    // Messages
    chessBasicsMastered: "ચેસ મૂળભૂત બાબતોમાં નિપુણતા મેળવી!",
    readyToLearn: "C પ્રોગ્રામિંગ શીખવા માટે તૈયાર!",
    perfectSolved: "સંપૂર્ણ! ✨",
    puzzleSolved: "તમે પઝલ હલ કર્યું!",
    notQuite: "એકદમ સાચું નથી",
    tryAgain: "ફરી પ્રયાસ કરો અથવા સંકેતનો ઉપયોગ કરો!",
    solutionRevealed: "ઉકેલ પ્રગટ થયો",
    studyCode: "કોડને કાળજીપૂર્વક અભ્યાસ કરો!",
    
    // Miscellaneous
    coreDeveloper: "મુખ્ય ડેવલપર:",
    systemArchitect: "સિસ્ટમ આર્કિટેક્ટ:",
    assistantProfessor: "(સહાયક પ્રોફેસર)",
    president: "(પ્રમુખ, LJK)",
    accessLater: "તમે પછીથી ડેશબોર્ડથી ચેસ મૂળભૂત બાબતો ઍક્સેસ કરી શકો છો",
    badges: "બેજ",
    loading: "ચેસ ચકરાઓ લોડ થઈ રહ્યા છે...",
    error: "ચકરો ડેટા લોડ કરવામાં ભૂલ",
    
    // Narration Text
    narration: {
      welcomeChessBasics: "ચેસ મૂળભૂત બાબતોના ટ્યુટોરિયલમાં આપનું સ્વાગત છે. ચાલો ઇન્ટરેક્ટિવ પ્રદર્શનો સાથે તમામ છ ચેસ ચકરાઓમાં નિપુણતા મેળવીએ.",
      lessonIntro: (id: number, title: string, analogy: string) => `પાઠ ${id}: ${title}। ${analogy}`,
      successMessage: "ઉત્તમ કાર્ય! તમે આ પડકારને સફળતાપૂર્વક પૂર્ણ કર્યો!",
      errorMessage: "એકદમ સાચું નથી। ફરીથી પ્રયાસ કરો અથવા માર્ગદર્શન માટે સંકેત બટનનો ઉપયોગ કરો.",
      hintMessage: (hint: string) => `અહીં એક સંકેત છે: ${hint}`,
      pieceWelcome: (name: string, description: string) => `${name} માં આપનું સ્વાગત છે। ${description}`,
      pieceDemo: (name: string, description: string, pattern: string) => `${name}। ${description}। ${pattern}`,
      nextPiece: (name: string) => `${name} તરફ આગળ વધી રહ્યા છીએ`,
      previousPiece: (name: string) => `${name} પર પાછા જઈ રહ્યા છીએ`,
      chessComplete: "અભિનંદન! તમે તમામ ચેસ ચકરાઓમાં નિપુણતા મેળવી લીધી છે। હવે તમે C પ્રોગ્રામિંગ શીખવા માટે તૈયાર છો!",
      
      // Story Mission
      storyTitle: "ડિજિટલ ગ્રાન્ડમાસ્ટરની શોધ",
      storyMission: "વર્ષ 2077માં, ડિજિટલ ક્ષેત્ર અરાજકતાનો સામનો કરી રહ્યું છે. ચેસ વ્યૂહરચનાનું પ્રાચીન જ્ઞાન ભૂલી ગયું છે, અને પ્રોગ્રામ્સ તર્ક વિના ક્રેશ થાય છે. તમે પસંદ કરેલા છો, ચેસના 64 ચોરસ અને કોડની અનંત શક્યતાઓ બંનેમાં નિપુણતા મેળવવા માટે નક્કી થયેલા. માત્ર વ્યૂહાત્મક વિચારસરણી સમજીને જ તમે ડિજિટલ બ્રહ્માંડમાં સંતુલન પુનઃસ્થાપિત કરી શકો છો.",
      missionObjective: "તમારું મિશન: પ્રોગ્રામિંગ તર્કના રહસ્યો અનલૉક કરવા માટે ચેસ વ્યૂહરચનાઓમાં નિપુણતા મેળવો. દરેક ચેસ ચાલ એક કોડિંગ ખ્યાલ શીખવે છે. દરેક ચકરો એક પ્રોગ્રામિંગ પેટર્નનું પ્રતિનિધિત્વ કરે છે. વ્યૂહાત્મક અને તાર્કિક રીતે વિચારનારાઓ માટે વિજય રાહ જોઈ રહ્યો છે.",
      whyChess: "ચેસ તમને આગળ વિચારવાનું, વ્યૂહાત્મક આયોજન કરવાનું અને જટિલ સમસ્યાઓ હલ કરવાનું શીખવે છે - કોડિંગ માટે જરૂરી બરાબર કુશળતા!",
      whyCoding: "પ્રોગ્રામિંગ તમને તાર્કિક વિચારસરણીનો ઉપયોગ કરીને બનાવવા, નવીનતા લાવવા અને વાસ્તવિક દુનિયાની સમસ્યાઓ હલ કરવાની શક્તિ આપે છે!",
      theConnection: "દરેક ચેસ વ્યૂહરચનામાં કોડિંગ સમકક્ષ છે. પ્યાદાઓ ચલો છે. નાઈટ્સ ફંક્શન્સની જેમ કૂદે છે. વજીર વર્ગોની જેમ શક્તિઓને જોડે છે. ચેસબોર્ડ તમારો પહેલો પ્રોગ્રામ છે!",
    },
  }
};

export const getTranslation = (lang: Language) => translations[lang];
