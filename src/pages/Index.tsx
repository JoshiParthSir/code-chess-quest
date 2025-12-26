import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crown, Sparkles, Trophy, Code, ChevronRight, Mic, MicOff, Download } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { type Language, getTranslation } from "@/lib/translations";

const Index = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('chessverse-language');
    return (saved as Language) || 'en';
  });
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('chessverse-player-name') || '';
  });
  const [showNameInput, setShowNameInput] = useState(false);
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [tempName, setTempName] = useState('');
  const [showStory, setShowStory] = useState(false);
  const [storyStep, setStoryStep] = useState(0);
  const [isNarrating, setIsNarrating] = useState(false);
  const [narrationEnabled, setNarrationEnabled] = useState(true);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  
  const t = getTranslation(language);
  const synth = useRef<SpeechSynthesis | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chessverse-language', language);
  }, [language]);

  // Save playerName to localStorage whenever it changes
  useEffect(() => {
    if (playerName) {
      localStorage.setItem('chessverse-player-name', playerName);
    }
  }, [playerName]);

  // Auto-skip landing page for returning users
  useEffect(() => {
    const savedName = localStorage.getItem('chessverse-player-name');
    if (savedName) {
      setShowLanding(false);
      setShowStory(true);
    }
  }, []);

  // Initialize speech synthesis and wait for voices to load
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synth.current = window.speechSynthesis;
      
      // Load voices
      const loadVoices = () => {
        const voices = synth.current?.getVoices() || [];
        if (voices.length > 0) {
          setVoicesLoaded(true);
          console.log('Voices loaded:', voices.map(v => ({ name: v.name, lang: v.lang })));
        }
      };
      
      // Load immediately if already available
      loadVoices();
      
      // Listen for voices changed event
      if (synth.current) {
        synth.current.addEventListener('voiceschanged', loadVoices);
      }
      
      return () => {
        if (synth.current) {
          synth.current.removeEventListener('voiceschanged', loadVoices);
        }
      };
    }
  }, []);

  // Voice narration function with PRIORITY for Indian female voices
  const narrateText = (text: string, priority: 'high' | 'normal' = 'normal') => {
    if (!narrationEnabled || !synth.current || !voicesLoaded) {
      console.log('Narration skipped:', { narrationEnabled, hasSynth: !!synth.current, voicesLoaded });
      return;
    }
    
    // Stop any ongoing narration if high priority
    if (priority === 'high' && synth.current.speaking) {
      synth.current.cancel();
    }
    
    // Don't interrupt ongoing narration for normal priority
    if (priority === 'normal' && synth.current.speaking) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select voice based on current language - PRIORITIZE INDIAN FEMALE/LADY VOICES
    const voices = synth.current.getVoices();
    let selectedVoice = null;
    
    console.log(`Selecting voice for language: ${language}`);
    
    // USE HINDI FEMALE VOICE FOR ALL LANGUAGES
    // Stage 1: Try Hindi + Female
    selectedVoice = voices.find(voice => 
      (voice.lang.includes('hi-IN') || voice.lang.includes('hi')) &&
      (voice.name.toLowerCase().includes('female') || 
       voice.name.toLowerCase().includes('woman') || 
       voice.name.toLowerCase().includes('lady'))
    );
    
    // Stage 2: Try any Hindi voice
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => 
        voice.lang.includes('hi-IN') || voice.lang.includes('hi') || voice.name.toLowerCase().includes('hindi')
      );
    }
    
    // Stage 3: Fallback to any Indian voice
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => 
        voice.lang.includes('IN') || voice.name.includes('Indian') || voice.name.includes('India')
      );
    }
    
    // Set language code based on actual content language for proper pronunciation
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    
    // Final fallback: any voice matching the language code
    if (!selectedVoice) {
      const langCode = language === 'hi' ? 'hi' : 'en';
      selectedVoice = voices.find(voice => voice.lang.startsWith(langCode));
    }
    
    // Last resort: first available voice
    if (!selectedVoice && voices.length > 0) {
      selectedVoice = voices[0];
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log('Selected voice:', selectedVoice.name, selectedVoice.lang);
    }
    
    // Adjust speech parameters for clarity
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = language === 'en' ? 1.1 : 1.0; // Higher pitch for English
    utterance.volume = 0.8;
    
    utterance.onstart = () => {
      setIsNarrating(true);
      console.log('Narration started');
    };
    utterance.onend = () => {
      setIsNarrating(false);
      console.log('Narration ended');
    };
    utterance.onerror = (e) => {
      setIsNarrating(false);
      console.error('Narration error:', e);
    };
    
    currentUtterance.current = utterance;
    synth.current.speak(utterance);
  };

  // Stop narration function
  const stopNarration = () => {
    if (synth.current && synth.current.speaking) {
      synth.current.cancel();
      setIsNarrating(false);
    }
  };

  // Auto-narrate story steps
  useEffect(() => {
    if (showStory && voicesLoaded) {
      const storySteps = [
        t.narration.storyTitle,
        t.narration.storyMission,
        t.narration.missionObjective,
        t.narration.whyChess,
        t.narration.whyCoding,
        t.narration.theConnection,
      ];
      
      setTimeout(() => {
        narrateText(storySteps[storyStep], 'high');
      }, 500);
    }
  }, [storyStep, showStory, voicesLoaded, language]);

  // PWA Install Prompt
  useEffect(() => {
    console.log('Setting up PWA install prompt listener...');
    
    const handleBeforeInstallPrompt = (e: any) => {
      console.log('beforeinstallprompt event fired!');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
      console.log('Install button should now be visible');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('App is already installed');
    } else {
      console.log('App is not installed, waiting for install prompt...');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    console.log('Install button clicked');
    
    if (!deferredPrompt) {
      console.log('No deferred prompt available');
      return;
    }

    try {
      console.log('Showing install prompt...');
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`Install prompt outcome: ${outcome}`);
      
      if (outcome === 'accepted') {
        console.log('✅ PWA installed successfully!');
      } else {
        console.log('❌ PWA installation dismissed');
      }
    } catch (error) {
      console.error('Error during installation:', error);
    } finally {
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
  };

  // Landing Page with About Section
  if (showLanding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-cyan-950 flex items-center justify-center relative overflow-hidden p-4">
        {/* Animated stars background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 2 + 2 + 's'
              }}
            />
          ))}
        </div>

        {/* Language Selector - Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[140px] bg-black/40 border-cyan-500/50 text-white backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black/95 border-cyan-500/50 text-white">
              <SelectItem value="en">🇬🇧 English</SelectItem>
              <SelectItem value="hi">🇮🇳 हिंदी</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* PWA Install Button */}
        {showInstallButton && (
          <Button
            onClick={handleInstallClick}
            className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            size="sm"
          >
            📱 {t.install}
          </Button>
        )}

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl w-full">
          <Card className="bg-black/40 border-cyan-500/50 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <div className="text-6xl md:text-7xl animate-bounce">♟️</div>
              </div>
              <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ChessVerse
              </CardTitle>
              <CardDescription className="text-lg md:text-xl text-cyan-300">
                {language === 'hi' ? 'शतरंज के माध्यम से C प्रोग्रामिंग सीखें' : 'Learn C Programming Through Chess'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 text-white">
              {/* About Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-cyan-400">
                  {language === 'hi' ? 'के बारे में' : 'About ChessVerse'}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {language === 'hi' 
                    ? 'ChessVerse एक अनोखा शिक्षण मंच है जो शतरंज की रणनीति के साथ C प्रोग्रामिंग को जोड़ता है। प्रत्येक प्रोग्रामिंग अवधारणा को शतरंज के खेल से जुड़े वास्तविक उदाहरणों के माध्यम से सिखाया जाता है।'
                    : 'ChessVerse is a unique learning platform that combines C programming with chess strategy. Each programming concept is taught through real-world examples tied to the game of chess.'
                  }
                </p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-bold text-cyan-400 mb-1">
                    {language === 'hi' ? '25 पाठ' : '25 Lessons'}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {language === 'hi' ? 'शुरुआत से उन्नत तक' : 'From basics to advanced'}
                  </p>
                </div>
                
                <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                  <div className="text-3xl mb-2">🎙️</div>
                  <h4 className="font-bold text-cyan-400 mb-1">
                    {language === 'hi' ? 'आवाज कथन' : 'Voice Narration'}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {language === 'hi' ? 'दो भाषाओं में' : 'In two languages'}
                  </p>
                </div>
                
                <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                  <div className="text-3xl mb-2">🏆</div>
                  <h4 className="font-bold text-cyan-400 mb-1">
                    {language === 'hi' ? 'प्रमाण पत्र' : 'Certificates'}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {language === 'hi' ? 'पूर्णता पर पुरस्कार' : 'Earn on completion'}
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => {
                    setShowLanding(false);
                    setShowNameInput(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-6 text-lg"
                >
                  ✨ {language === 'hi' ? 'यात्रा शुरू करें' : 'Begin Journey'}
                </Button>
                
                <Button
                  onClick={() => navigate('/about')}
                  variant="outline"
                  className="flex-1 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 py-6 text-lg"
                >
                  📖 {language === 'hi' ? 'और जानें' : 'Learn More'}
                </Button>
              </div>

              {/* Credits Section */}
              <div className="pt-4 border-t border-cyan-500/30">
                <p className="text-center text-xs text-gray-400">
                  {language === 'hi' 
                    ? '🎯 विचारक: ' 
                    : '🎯 Conceptualized by: '}
                  <span className="text-purple-400 font-semibold">Dr. Manish Shah</span>
                </p>
                <p className="text-center text-xs text-gray-400 mt-1">
                  {language === 'hi' 
                    ? '🧑‍💻 विकसित: ' 
                    : '🧑‍💻 Developed by: '}
                  <span className="text-cyan-400 font-semibold">Parth D. Joshi</span>
                </p>
                <p className="text-center text-xs text-gray-500 mt-2">
                  {language === 'hi' 
                    ? '© 2025 ChessVerse. सर्वाधिकार सुरक्षित।' 
                    : '© 2025 ChessVerse. All rights reserved.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Player Name Input Screen
  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-cyan-950 flex items-center justify-center relative overflow-hidden">
        {/* Language Selector - Top Right */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-cyan-500/30">
            <Button
              variant={language === 'en' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('en')}
              className={`min-h-[44px] min-w-[44px] touch-manipulation text-sm ${language === 'en' ? 'bg-cyan-500 text-black font-bold' : 'text-cyan-400 hover:bg-cyan-500/20'}`}
            >
              EN
            </Button>
            <Button
              variant={language === 'hi' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('hi')}
              className={`min-h-[44px] min-w-[44px] touch-manipulation text-sm ${language === 'hi' ? 'bg-cyan-500 text-black font-bold' : 'text-cyan-400 hover:bg-cyan-500/20'}`}
            >
              हिं
            </Button>
          </div>
        </div>

        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-black/50 backdrop-blur-xl border-2 border-cyan-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl shadow-cyan-500/20">
            <div className="text-center mb-6">
              <Crown className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-400 mx-auto mb-4 animate-bounce" />
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 font-mono">
                {language === 'en' ? 'NEURAL LINK INITIALIZATION' : 'न्यूरल लिंक प्रारंभ'}
              </h1>
              <p className="text-sm sm:text-base text-cyan-300/90 font-mono">
                {language === 'en' ? 'Enter your Knight name to begin' : 'शुरू करने के लिए अपना नाम दर्ज करें'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2 font-mono">
                  {language === 'en' ? 'Player Name:' : 'खिलाड़ी का नाम:'}
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && tempName.trim()) {
                      setPlayerName(tempName.trim());
                      setShowNameInput(false);
                      setShowStory(true);
                      setStoryStep(0);
                    }
                  }}
                  placeholder={language === 'en' ? 'Enter your name...' : 'अपना नाम दर्ज करें...'}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-cyan-500/50 rounded-lg text-cyan-100 placeholder-cyan-600/50 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 font-mono transition-all"
                  autoFocus
                />
              </div>

              <Button
                onClick={() => {
                  if (tempName.trim()) {
                    setPlayerName(tempName.trim());
                    setShowNameInput(false);
                    setShowStory(true);
                    setStoryStep(0);
                  }
                }}
                disabled={!tempName.trim()}
                className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-black font-bold text-base sm:text-lg py-6 rounded-lg shadow-lg border-2 border-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                {language === 'en' ? 'BEGIN JOURNEY' : 'यात्रा शुरू करें'}
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-cyan-500/20">
              <p className="text-xs text-center text-cyan-400/70 font-mono">
                {language === 'en' 
                  ? 'Your progress will be saved automatically' 
                  : 'आपकी प्रगति स्वचालित रूप से सहेजी जाएगी'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Story Introduction Screen - Animated mission briefing
  if (showStory) {
    const storySteps = [
      { icon: "🎯", text: t.narration.storyTitle, narration: t.narration.storyTitle },
      { icon: "📖", text: t.narration.storyMission, narration: t.narration.storyMission },
      { icon: "🎮", text: t.narration.missionObjective, narration: t.narration.missionObjective },
      { icon: "♟️", text: t.narration.whyChess, narration: t.narration.whyChess },
      { icon: "💻", text: t.narration.whyCoding, narration: t.narration.whyCoding },
      { icon: "⚡", text: t.narration.theConnection, narration: t.narration.theConnection },
    ];

    const currentStoryStep = storySteps[storyStep];

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-950 to-cyan-950 flex items-center justify-center z-50 overflow-hidden">
        {/* Language Selector - Top Left */}
        <div className="absolute top-4 left-4 z-20">
          <div className="flex gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-cyan-500/30">
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

        {/* Narration Toggle + Install Button - Top Right */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {showInstallButton && (
            <Button
              onClick={handleInstallClick}
              variant="ghost"
              size="sm"
              className="border border-cyan-500/30 bg-black/50 backdrop-blur-sm text-cyan-400 hover:bg-cyan-500/10 min-h-[44px] min-w-[44px] touch-manipulation"
              title="Install ChessVerse as an app"
            >
              <Download className="w-5 h-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setNarrationEnabled(!narrationEnabled);
              if (narrationEnabled) {
                stopNarration();
              }
            }}
            className="border border-cyan-500/30 bg-black/50 backdrop-blur-sm text-cyan-400 hover:bg-cyan-500/10 min-h-[44px] min-w-[44px] touch-manipulation"
          >
            {narrationEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
        </div>

        {/* Floating Chess Pieces Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-4xl opacity-20 animate-float">♔</div>
          <div className="absolute top-20 right-20 text-5xl opacity-15 animate-float" style={{animationDelay: '1s'}}>♕</div>
          <div className="absolute bottom-20 left-20 text-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}>♞</div>
          <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}>♟</div>
          <div className="absolute top-1/3 left-1/4 text-6xl opacity-10 animate-float" style={{animationDelay: '0.5s'}}>{ "{}" }</div>
          <div className="absolute top-2/3 right-1/4 text-5xl opacity-15 animate-float" style={{animationDelay: '2.5s'}}>{ "</>" }</div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="bg-black/50 backdrop-blur-xl border-2 border-cyan-500/30 rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl shadow-cyan-500/20">
            {/* Story Icon */}
            <div className="text-center mb-4 sm:mb-6 animate-scale-in">
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-3 sm:mb-4 inline-block animate-float">
                {currentStoryStep.icon}
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold text-center font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 animate-fade-in leading-tight px-2">
                {storyStep === 0 ? currentStoryStep.text : ""}
              </h2>
              
              {storyStep > 0 && (
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-cyan-100 leading-relaxed text-center animate-fade-in font-mono px-2">
                  {currentStoryStep.text}
                </p>
              )}

              {/* Progress Dots */}
              <div className="flex justify-center gap-1.5 sm:gap-2 pt-3 sm:pt-4">
                {storySteps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === storyStep 
                        ? "w-6 sm:w-8 bg-cyan-400" 
                        : idx < storyStep 
                          ? "w-2 bg-pink-400" 
                          : "w-2 bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center pt-3 sm:pt-4 md:pt-6 px-2">
                {storyStep < storySteps.length - 1 ? (
                  <>
                    <Link to="/learn" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        onClick={() => stopNarration()}
                        className="w-full sm:w-auto border-gray-500/50 text-gray-400 hover:bg-gray-500/10 min-h-[44px] sm:min-h-[48px] text-sm sm:text-base touch-manipulation"
                      >
                        {t.skipStory}
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        setStoryStep(storyStep + 1);
                      }}
                      className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-black font-bold min-h-[44px] sm:min-h-[48px] text-sm sm:text-base touch-manipulation"
                    >
                      <ChevronRight className="mr-1 w-4 h-4 sm:w-5 sm:h-5" />
                      {t.continue}
                    </Button>
                  </>
                ) : (
                  <Link to="/learn" className="w-full sm:w-auto">
                    <Button
                      onClick={() => stopNarration()}
                      className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-black font-bold px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg min-h-[48px] sm:min-h-[56px] touch-manipulation"
                    >
                      <Trophy className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                      {t.beginQuest}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Animation Styles */}
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          
          @keyframes scale-in {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-scale-in {
            animation: scale-in 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-cyan-950 relative overflow-hidden w-full">
      {/* Language Selector - Top Right */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex flex-col sm:flex-row gap-2 px-2 sm:px-0">
        {showInstallButton && (
          <Button
            onClick={handleInstallClick}
            size="sm"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold min-h-[44px] touch-manipulation text-xs sm:text-sm animate-pulse"
            title="Install ChessVerse as an app"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
            <span className="hidden sm:inline">{language === 'en' ? 'Install App' : 'ऐप इंस्टॉल करें'}</span>
            <span className="sm:hidden">App</span>
          </Button>
        )}
        <div className="flex gap-1.5 sm:gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-cyan-500/30">
          <Button
            variant={language === 'en' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLanguage('en')}
            className={`min-h-[44px] min-w-[44px] touch-manipulation text-sm ${language === 'en' ? 'bg-cyan-500 text-black font-bold' : 'text-cyan-400 hover:bg-cyan-500/20'}`}
          >
            EN
          </Button>
          <Button
            variant={language === 'hi' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLanguage('hi')}
            className={`min-h-[44px] min-w-[44px] touch-manipulation text-sm ${language === 'hi' ? 'bg-cyan-500 text-black font-bold' : 'text-cyan-400 hover:bg-cyan-500/20'}`}
          >
            हिं
          </Button>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 sm:top-20 left-3 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-5 sm:bottom-20 right-3 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-40 sm:w-64 h-40 sm:h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-3 sm:px-4 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen">
        {/* Icon group */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 animate-fade-in flex-wrap">
          <Crown className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-primary animate-bounce flex-shrink-0" />
          <Code className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 text-primary flex-shrink-0" />
          <Trophy className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-primary animate-bounce delay-500 flex-shrink-0" />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fade-in leading-tight break-words">
          {t.appTitle}
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-lg lg:text-2xl text-cyan-300/90 mb-2 sm:mb-2 md:mb-3 animate-fade-in delay-200 font-mono px-2">
          <span className="text-pink-400">{language === 'en' ? 'NEURAL' : 'न्यूरल'}</span> C Programming <span className="text-purple-400">{language === 'en' ? 'MAINFRAME' : 'मेनफ्रेम'}</span>
        </p>

        {/* Epic tagline */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-6 sm:mb-8 md:mb-12 animate-fade-in delay-300 px-2 flex-wrap">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-cyan-400 flex-shrink-0" />
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-purple-300/90 italic font-mono break-words">
            {language === 'en' ? (
              <>
                <span className="text-pink-400">JACK IN.</span> Code the Matrix. <span className="text-cyan-400">DOMINATE THE GRID.</span>
              </>
            ) : (
              <>
                <span className="text-pink-400">शुरू करें।</span> कोड करें मैट्रिक्स। <span className="text-cyan-400">ग्रिड पर राज करें।</span>
              </>
            )}
          </p>
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-cyan-400 flex-shrink-0" />
        </div>

        {/* CTA Button */}
        <Button 
          onClick={() => {
            setShowStory(true);
            setStoryStep(0);
          }}
          size="lg" 
          className="w-full sm:w-auto text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-6 lg:py-8 rounded-lg sm:rounded-xl shadow-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 border-2 border-cyan-400/50 shadow-cyan-500/50 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 animate-fade-in delay-500 group font-mono min-h-[48px] sm:min-h-[56px] touch-manipulation"
        >
          <span className="text-black font-bold">
            {language === 'en' ? 'INITIALIZE PROTOCOL' : 'प्रोटोकॉल शुरू करें'}
          </span>
          <Crown className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform text-black flex-shrink-0" />
        </Button>

        {/* Credits Footer */}
        <div className="mt-8 sm:mt-12 md:mt-16 space-y-1 sm:space-y-2 animate-fade-in delay-700 font-mono px-2 text-center">
          <p className="text-xs sm:text-sm text-cyan-400/90 break-words">
            <span className="font-semibold text-pink-400">{t.systemArchitect}</span> Dr. Manish Shah {t.president}
          </p>
          <p className="text-xs sm:text-sm text-cyan-400/90 break-words">
            <span className="font-semibold text-pink-400">{t.coreDeveloper}</span> Parth D. Joshi {t.assistantProfessor}
          </p>
          <div className="flex justify-center gap-2 sm:gap-4 mt-2 sm:mt-4">
            <Link to="/about" className="w-full sm:w-auto">
              <Button variant="link" className="text-cyan-400 hover:text-cyan-300 min-h-[44px] touch-manipulation text-xs sm:text-sm w-full sm:w-auto">
                {language === 'en' ? 'About' : 'के बारे में'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Index;
