import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Crown, Code, Trophy, Sparkles, Target, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { type Language, getTranslation } from "@/lib/translations";

const About = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('chessverse-language');
    return (saved as Language) || 'en';
  });
  const t = getTranslation(language);

  useEffect(() => {
    localStorage.setItem('chessverse-language', language);
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-cyan-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="ghost" className="w-full sm:w-auto text-cyan-400 hover:text-cyan-300 min-h-[44px] touch-manipulation">
              <ArrowLeft className="mr-2 w-5 h-5" />
              {language === 'en' ? 'Back to Home' : 'होम पर वापस जाएं'}
            </Button>
          </Link>
          
          {/* Language Selector */}
          <div className="flex gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-cyan-500/30 w-full sm:w-auto justify-center">
            <Button
              variant={language === 'en' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('en')}
              className={`min-h-[44px] min-w-[44px] touch-manipulation ${language === 'en' ? 'bg-cyan-500 text-black font-bold' : 'text-cyan-400 hover:bg-cyan-500/20'}`}
            >
              EN
            </Button>
            <Button
              variant={language === 'hi' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('hi')}
              className={`min-h-[44px] min-w-[44px] touch-manipulation ${language === 'hi' ? 'bg-cyan-500 text-black font-bold' : 'text-cyan-400 hover:bg-cyan-500/20'}`}
            >
              हिं
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8 sm:mb-12 px-4">
          <div className="flex justify-center items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 animate-bounce" />
            <Code className="w-16 h-16 sm:w-20 sm:h-20 text-pink-400" />
            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 animate-bounce" style={{animationDelay: '0.5s'}} />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-mono leading-tight">
            {language === 'en' ? 'ABOUT CHESSVERSE' : 'चेसवर्स के बारे में'}
          </h1>
          <p className="text-lg sm:text-xl text-cyan-300/90 font-mono px-4">
            {language === 'en' ? 'Where Chess Strategy Meets Code Logic' : 'जहां शतरंज रणनीति कोड तर्क से मिलती है'}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* About ChessVerse */}
          <Card className="border-cyan-500/30 bg-black/50 backdrop-blur-xl shadow-2xl shadow-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-cyan-400" />
                {language === 'en' ? 'What is ChessVerse?' : 'चेसवर्स क्या है?'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-cyan-100/90">
              <p>
                {language === 'en' 
                  ? "ChessVerse is an innovative learning platform that bridges the ancient game of chess with modern C programming. We believe that the strategic thinking required in chess directly translates to the logical reasoning needed in coding."
                  : "चेसवर्स एक अभिनव शिक्षण मंच है जो शतरंज के प्राचीन खेल को आधुनिक C प्रोग्रामिंग से जोड़ता है। हम मानते हैं कि शतरंज में आवश्यक रणनीतिक सोच सीधे कोडिंग में आवश्यक तार्किक तर्क में बदल जाती है।"}
              </p>
              <p>
                {language === 'en'
                  ? "Through 25 carefully crafted cyberpunk-themed lessons, students learn C programming fundamentals by drawing parallels to chess pieces, moves, and strategies. Each programming concept is paired with a chess move, making abstract ideas concrete and memorable."
                  : "25 सावधानीपूर्वक तैयार किए गए साइबरपंक-थीम वाले पाठों के माध्यम से, छात्र शतरंज के मोहरों, चालों और रणनीतियों के समानांतर बनाकर C प्रोग्रामिंग की मूल बातें सीखते हैं। प्रत्येक प्रोग्रामिंग अवधारणा को एक शतरंज चाल के साथ जोड़ा जाता है, जिससे अमूर्त विचार ठोस और यादगार बन जाते हैं।"}
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="border-pink-500/30 bg-black/50 backdrop-blur-xl shadow-2xl shadow-pink-500/20">
            <CardHeader>
              <CardTitle className="text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 flex items-center gap-2">
                <Target className="w-6 h-6 text-pink-400" />
                {language === 'en' ? 'Our Mission' : 'हमारा मिशन'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-cyan-100/90">
              <p className="font-semibold text-pink-300">
                {language === 'en'
                  ? "To revolutionize how students learn programming by making it strategic, engaging, and memorable."
                  : "छात्रों के प्रोग्रामिंग सीखने के तरीके में क्रांति लाना, इसे रणनीतिक, आकर्षक और यादगार बनाकर।"}
              </p>
              <ul className="space-y-3 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">♔</span>
                  <span>
                    {language === 'en'
                      ? "Transform abstract programming concepts into tangible chess analogies"
                      : "अमूर्त प्रोग्रामिंग अवधारणाओं को ठोस शतरंज उपमाओं में बदलना"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">♛</span>
                  <span>
                    {language === 'en'
                      ? "Provide an immersive, gamified learning experience with cyberpunk aesthetics"
                      : "साइबरपंक सौंदर्यशास्त्र के साथ एक इमर्सिव, गेमिफाइड शिक्षण अनुभव प्रदान करना"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">♜</span>
                  <span>
                    {language === 'en'
                      ? "Make learning accessible through multi-language support and voice narration"
                      : "बहु-भाषा समर्थन और आवाज कथन के माध्यम से सीखने को सुलभ बनाना"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">♞</span>
                  <span>
                    {language === 'en'
                      ? "Build strong logical thinking and problem-solving skills through chess-code parallels"
                      : "शतरंज-कोड समानताओं के माध्यम से मजबूत तार्किक सोच और समस्या-समाधान कौशल बनाना"}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="border-purple-500/30 bg-black/50 backdrop-blur-xl shadow-2xl shadow-purple-500/20 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center gap-2">
                <Eye className="w-6 h-6 text-purple-400" />
                {language === 'en' ? 'Our Vision' : 'हमारी दृष्टि'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-cyan-100/90">
              <p className="text-lg font-semibold text-purple-300">
                {language === 'en'
                  ? "To create a global community of strategic programmers who think like grandmasters and code like architects."
                  : "रणनीतिक प्रोग्रामर्स का एक वैश्विक समुदाय बनाना जो ग्रैंडमास्टर्स की तरह सोचते हैं और आर्किटेक्ट्स की तरह कोड करते हैं।"}
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-purple-300 mb-2 font-mono">
                    {language === 'en' ? 'Innovation' : 'नवाचार'}
                  </h3>
                  <p className="text-sm">
                    {language === 'en'
                      ? "Continuously evolving our teaching methodology to make programming education more effective and enjoyable."
                      : "प्रोग्रामिंग शिक्षा को अधिक प्रभावी और आनंददायक बनाने के लिए हमारी शिक्षण पद्धति को लगातार विकसित करना।"}
                  </p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-cyan-300 mb-2 font-mono">
                    {language === 'en' ? 'Excellence' : 'उत्कृष्टता'}
                  </h3>
                  <p className="text-sm">
                    {language === 'en'
                      ? "Empowering students to master C programming through strategic thinking and hands-on practice."
                      : "रणनीतिक सोच और व्यावहारिक अभ्यास के माध्यम से छात्रों को C प्रोग्रामिंग में महारत हासिल करने के लिए सशक्त बनाना।"}
                  </p>
                </div>
                <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-pink-300 mb-2 font-mono">
                    {language === 'en' ? 'Impact' : 'प्रभाव'}
                  </h3>
                  <p className="text-sm">
                    {language === 'en'
                      ? "Building a generation of programmers who understand both the art of strategy and the science of code."
                      : "प्रोग्रामर्स की एक पीढ़ी का निर्माण जो रणनीति की कला और कोड के विज्ञान दोनों को समझती है।"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card className="border-cyan-500/30 bg-black/50 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-cyan-400" />
                {language === 'en' ? 'The Team' : 'टीम'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-cyan-100/90">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-300 mb-2 font-mono">Dr. Manish Shah</h3>
                  <p className="text-sm text-purple-300 mb-3">
                    {language === 'en' ? 'President, Lok Jagruti Kendra Trust' : 'अध्यक्ष, लोक जागृति केंद्र ट्रस्ट'}
                  </p>
                  <p className="text-sm">
                    {language === 'en'
                      ? "Visionary leader and President of Lok Jagruti Kendra Trust who conceptualized the fusion of chess strategy with programming education to revolutionize how students learn."
                      : "दूरदर्शी नेता और लोक जागृति केंद्र ट्रस्ट के अध्यक्ष जिन्होंने छात्रों के सीखने के तरीके में क्रांति लाने के लिए शतरंज रणनीति को प्रोग्रामिंग शिक्षा के साथ जोड़ने की अवधारणा बनाई।"}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-pink-300 mb-2 font-mono">Parth D. Joshi</h3>
                  <p className="text-sm text-purple-300 mb-3">
                    {language === 'en' ? 'Core Developer & Assistant Professor' : 'मुख्य डेवलपर और सहायक प्रोफेसर'}
                  </p>
                  <p className="text-sm">
                    {language === 'en'
                      ? "Architect and developer of the ChessVerse platform. Passionate about creating immersive educational experiences, Parth combines modern web technologies with gamification to make learning programming an adventure."
                      : "चेसवर्स प्लेटफॉर्म के आर्किटेक्ट और डेवलपर। इमर्सिव शैक्षिक अनुभव बनाने के बारे में भावुक, पार्थ आधुनिक वेब तकनीकों को गेमिफिकेशन के साथ जोड़कर प्रोग्रामिंग सीखने को एक रोमांच बनाते हैं।"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12 px-4">
          <Link to="/learn" className="inline-block w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-6 font-mono min-h-[56px] touch-manipulation">
              <Code className="mr-2 w-5 h-5" />
              {language === 'en' ? 'Start Learning' : 'सीखना शुरू करें'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
