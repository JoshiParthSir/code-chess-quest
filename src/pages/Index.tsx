import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  Trophy, Code, Crown, Flame, Star, Award, CheckCircle2, 
  Play, Volume2, VolumeX, ChevronRight, Sparkles
} from "lucide-react";

// Types
interface UserProgress {
  username: string;
  level: number;
  xp: number;
  streak: number;
  completedLessons: number[];
  badges: string[];
  lastVisit: string;
}

interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  concept: string;
  analogy: string;
  explanation: string;
  challenge: string;
  starterCode: string;
  solution: string;
  hint: string;
}

// Lesson Data
const lessons: Lesson[] = [
  {
    id: 1,
    title: "The King is main()",
    subtitle: "The Foundation of Every Game",
    concept: "int main() function",
    analogy: "The King is the most crucial piece. Everything revolves around protecting and positioning the King. Similarly, main() is where your C program begins and ends.",
    explanation: "Just as a chess game cannot exist without the King, a C program cannot run without the main() function. It's the entry point where execution begins.",
    challenge: "Write the main function to place the White King on its starting square (e1).",
    starterCode: "// Write your main function here\n// Place the King at position e1\n\n",
    solution: "#include <stdio.h>\n\nint main() {\n    printf(\"King placed at e1\\n\");\n    return 0;\n}",
    hint: "Remember: int main() { ... return 0; }"
  },
  {
    id: 2,
    title: "The Pawns are Variables",
    subtitle: "Your Basic Building Blocks",
    concept: "Variables & Data Types",
    analogy: "Pawns are the most basic units in chess. Each pawn has a file (a-h) and rank (1-8), just like variables have a type and value.",
    explanation: "A variable is like a pawn with a name (identifier) and a value (its position). An 'int' is a pawn that can hold whole numbers, like rank numbers 1-8.",
    challenge: "Declare an integer variable pawn_e_rank and assign it the value 2 to place the pawn on e2.",
    starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare a variable for the e-pawn's rank\n    \n    printf(\"E-pawn is on rank %d\\n\", pawn_e_rank);\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    int pawn_e_rank = 2;\n    printf(\"E-pawn is on rank %d\\n\", pawn_e_rank);\n    return 0;\n}",
    hint: "Syntax: int variable_name = value;"
  },
  {
    id: 3,
    title: "The Board is Your Memory",
    subtitle: "Eight Files, Eight Variables",
    concept: "Multiple Variables",
    analogy: "A chess board has 8 files (a-h). We can represent all 8 white pawns using 8 different variables.",
    explanation: "Just as chess has 8 pawns, we can create 8 variables to track each one. This teaches us about organizing data in memory.",
    challenge: "Create 8 pawn variables and place them on their starting ranks (rank 2).",
    starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare 8 variables for pawns a-h\n    \n    printf(\"All pawns placed on rank 2\\n\");\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    int pawn_a = 2, pawn_b = 2, pawn_c = 2, pawn_d = 2;\n    int pawn_e = 2, pawn_f = 2, pawn_g = 2, pawn_h = 2;\n    printf(\"All pawns placed on rank 2\\n\");\n    return 0;\n}",
    hint: "You can declare multiple variables in one line: int a = 2, b = 2;"
  },
  {
    id: 4,
    title: "Making Moves with Operators",
    subtitle: "Advancing Your Position",
    concept: "Operators (+, -, =)",
    analogy: "Moving a piece is like using operators. 'pawn_e = pawn_e + 2' moves the e-pawn forward 2 squares.",
    explanation: "Operators let us manipulate values. The = operator assigns, + adds, - subtracts. Just like moving pieces on a board!",
    challenge: "Write code to advance the e-pawn two squares on its first move (from rank 2 to rank 4).",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int pawn_e_rank = 2;\n    printf(\"E-pawn starts at rank %d\\n\", pawn_e_rank);\n    \n    // Move the pawn forward 2 squares\n    \n    printf(\"E-pawn is now at rank %d\\n\", pawn_e_rank);\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    int pawn_e_rank = 2;\n    printf(\"E-pawn starts at rank %d\\n\", pawn_e_rank);\n    \n    pawn_e_rank = pawn_e_rank + 2;\n    \n    printf(\"E-pawn is now at rank %d\\n\", pawn_e_rank);\n    return 0;\n}",
    hint: "Use the + operator: pawn_e_rank = pawn_e_rank + 2;"
  },
  {
    id: 5,
    title: "Forks & Decisions with if-else",
    subtitle: "Strategic Choices",
    concept: "Conditional Statements (if-else)",
    analogy: "A fork is when a knight attacks two pieces. You must decide which to save. if-else creates decision trees in code.",
    explanation: "Just like choosing which piece to move when under attack, if-else lets your program make decisions based on conditions.",
    challenge: "A knight is attacking your Queen (value 9) and Rook (value 5). Write an if-else to save the more valuable piece.",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int queen_value = 9;\n    int rook_value = 5;\n    \n    // Write if-else to save the more valuable piece\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    int queen_value = 9;\n    int rook_value = 5;\n    \n    if (queen_value > rook_value) {\n        printf(\"Save the Queen! (Value: %d)\\n\", queen_value);\n    } else {\n        printf(\"Save the Rook! (Value: %d)\\n\", rook_value);\n    }\n    \n    return 0;\n}",
    hint: "Use if (condition) { } else { }"
  }
];

// Badge definitions
const allBadges = [
  { id: "first-move", name: "First Move", icon: "🏁", requirement: "Complete first lesson" },
  { id: "pawn-master", name: "Pawn Master", icon: "♟️", requirement: "Master variables" },
  { id: "strategic-mind", name: "Strategic Mind", icon: "🧠", requirement: "Complete 3 lessons" },
  { id: "code-warrior", name: "Code Warrior", icon: "⚔️", requirement: "Complete 5 lessons" },
  { id: "streak-3", name: "3-Day Streak", icon: "🔥", requirement: "3 consecutive days" },
];

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<"dashboard" | "lesson" | "badges">("dashboard");
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [userCode, setUserCode] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const [progress, setProgress] = useState<UserProgress>({
    username: "Knight Errant",
    level: 1,
    xp: 0,
    streak: 0,
    completedLessons: [],
    badges: [],
    lastVisit: new Date().toISOString().split('T')[0]
  });

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("codequest-progress");
    if (saved) {
      const loaded = JSON.parse(saved);
      setProgress(loaded);
      
      // Check streak
      const today = new Date().toISOString().split('T')[0];
      const lastVisit = new Date(loaded.lastVisit);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (loaded.lastVisit === today) {
        // Same day, keep streak
      } else if (loaded.lastVisit === yesterday.toISOString().split('T')[0]) {
        // Consecutive day, increment streak
        setProgress(prev => ({ ...prev, streak: prev.streak + 1, lastVisit: today }));
      } else {
        // Streak broken
        setProgress(prev => ({ ...prev, streak: 1, lastVisit: today }));
      }
    }
    
    // Hide splash after 3 seconds
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem("codequest-progress", JSON.stringify(progress));
  }, [progress]);

  const getLevelName = (level: number) => {
    if (level < 5) return "Pawn";
    if (level < 10) return "Knight";
    if (level < 15) return "Bishop";
    if (level < 20) return "Rook";
    if (level < 25) return "Queen";
    return "Grandmaster";
  };

  const startLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setUserCode(lesson.starterCode);
    setShowHint(false);
    setCurrentScreen("lesson");
  };

  const runCode = () => {
    if (!currentLesson) return;
    
    // Simple validation - check if code contains key elements
    const codeCheck = userCode.toLowerCase();
    let isCorrect = false;
    
    switch (currentLesson.id) {
      case 1:
        isCorrect = codeCheck.includes("int main") && codeCheck.includes("return 0");
        break;
      case 2:
        isCorrect = codeCheck.includes("int pawn_e_rank") && codeCheck.includes("= 2");
        break;
      case 3:
        isCorrect = codeCheck.includes("pawn_a") && codeCheck.includes("pawn_h");
        break;
      case 4:
        isCorrect = codeCheck.includes("pawn_e_rank + 2") || codeCheck.includes("pawn_e_rank += 2");
        break;
      case 5:
        isCorrect = codeCheck.includes("if") && codeCheck.includes("queen_value > rook_value");
        break;
    }
    
    if (isCorrect) {
      toast({
        title: "🎉 Challenge Complete!",
        description: `You've mastered ${currentLesson.title}!`,
      });
      
      // Award XP and mark lesson complete
      if (!progress.completedLessons.includes(currentLesson.id)) {
        const newXP = progress.xp + 100;
        const newLevel = Math.floor(newXP / 500) + 1;
        const newCompleted = [...progress.completedLessons, currentLesson.id];
        const newBadges = [...progress.badges];
        
        // Award badges
        if (currentLesson.id === 1 && !newBadges.includes("first-move")) {
          newBadges.push("first-move");
          toast({ title: "🏆 Badge Unlocked!", description: "First Move" });
        }
        if (currentLesson.id === 2 && !newBadges.includes("pawn-master")) {
          newBadges.push("pawn-master");
          toast({ title: "🏆 Badge Unlocked!", description: "Pawn Master" });
        }
        if (newCompleted.length >= 3 && !newBadges.includes("strategic-mind")) {
          newBadges.push("strategic-mind");
          toast({ title: "🏆 Badge Unlocked!", description: "Strategic Mind" });
        }
        if (newCompleted.length >= 5 && !newBadges.includes("code-warrior")) {
          newBadges.push("code-warrior");
          toast({ title: "🏆 Badge Unlocked!", description: "Code Warrior" });
        }
        
        setProgress(prev => ({
          ...prev,
          xp: newXP,
          level: newLevel,
          completedLessons: newCompleted,
          badges: newBadges
        }));
      }
    } else {
      toast({
        title: "Not quite right",
        description: "Try again or use the hint!",
        variant: "destructive"
      });
    }
  };

  const showSolution = () => {
    if (currentLesson) {
      setUserCode(currentLesson.solution);
      toast({
        title: "Solution Revealed",
        description: "Study the code carefully!",
      });
    }
  };

  // Splash Screen
  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-background to-card flex items-center justify-center z-50 animate-fade-in">
        <div className="text-center space-y-8">
          <div className="text-8xl animate-scale-in">
            <span className="inline-block animate-pulse">♞</span>
            <span className="text-primary ml-4 font-mono">{"}"}</span>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in">
            LJCCA CodeQuest
          </h1>
          <div className="space-y-2 text-muted-foreground animate-fade-in">
            <p className="text-lg">Designed & Developed by: <span className="text-primary">Parth D. Joshi</span></p>
            <p className="text-sm">(Assistant Professor)</p>
            <p className="text-lg mt-4">Innovative Idea by: <span className="text-secondary">Dr. Manish Shah</span></p>
            <p className="text-sm">(President, LJK)</p>
          </div>
          <Progress value={100} className="w-64 mx-auto animate-pulse" />
        </div>
      </div>
    );
  }

  // Dashboard
  if (currentScreen === "dashboard") {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <Crown className="text-primary w-10 h-10" />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  CodeQuest
                </span>
              </h1>
              <p className="text-muted-foreground mt-2">Master C through the Royal Game</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="rounded-full"
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </Button>
          </div>

          {/* User Profile Card */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    {progress.username}
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                      Level {progress.level} {getLevelName(progress.level)}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-lg">
                      <Flame className="text-orange-500 w-5 h-5 streak-fire" />
                      {progress.streak} day streak
                    </span>
                    <span className="text-muted-foreground">
                      {progress.completedLessons.length} / {lessons.length} lessons
                    </span>
                  </CardDescription>
                </div>
                <Button onClick={() => setCurrentScreen("badges")} variant="outline">
                  <Trophy className="mr-2" />
                  Badges ({progress.badges.length})
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>XP Progress</span>
                  <span className="text-primary font-semibold">
                    {progress.xp} / {(progress.level) * 500} XP
                  </span>
                </div>
                <Progress 
                  value={(progress.xp % 500) / 5} 
                  className="h-3"
                />
              </div>
            </CardContent>
          </Card>

          {/* The Grandmaster's Path */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="text-secondary" />
                The Grandmaster's Path
              </CardTitle>
              <CardDescription>Your journey from Pawn to Grandmaster</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lessons.map((lesson) => {
                  const isCompleted = progress.completedLessons.includes(lesson.id);
                  const isLocked = lesson.id > 1 && !progress.completedLessons.includes(lesson.id - 1);
                  
                  return (
                    <Card
                      key={lesson.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        isCompleted 
                          ? "border-success bg-success/5 hover:shadow-lg hover:shadow-success/20" 
                          : isLocked
                          ? "opacity-50 cursor-not-allowed"
                          : "border-secondary/30 pulse-glow hover:shadow-lg hover:shadow-secondary/20"
                      }`}
                      onClick={() => !isLocked && startLesson(lesson)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                Lesson {lesson.id}
                              </Badge>
                              {isCompleted && <CheckCircle2 className="text-success w-4 h-4" />}
                            </div>
                            <CardTitle className="text-lg">{lesson.title}</CardTitle>
                            <CardDescription className="text-sm mt-1">
                              {lesson.subtitle}
                            </CardDescription>
                          </div>
                          {!isLocked && (
                            <ChevronRight className={isCompleted ? "text-success" : "text-secondary"} />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Code className="w-4 h-4" />
                          <span>{lesson.concept}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground border-t border-border pt-4">
            <p>Designed & Developed by: <span className="text-primary">Parth D. Joshi</span> (Assistant Professor)</p>
            <p>Innovative Idea by: <span className="text-secondary">Dr. Manish Shah</span> (President, LJK)</p>
          </div>
        </div>
      </div>
    );
  }

  // Badges Screen
  if (currentScreen === "badges") {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setCurrentScreen("dashboard")}>
              ← Back
            </Button>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Trophy className="text-primary" />
              The Armory
            </h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {allBadges.map((badge) => {
              const earned = progress.badges.includes(badge.id);
              return (
                <Card
                  key={badge.id}
                  className={`text-center ${
                    earned 
                      ? "border-primary bg-primary/5 shadow-lg" 
                      : "opacity-40 grayscale"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="text-6xl mb-4">{badge.icon}</div>
                    <h3 className="font-bold mb-2">{badge.name}</h3>
                    <p className="text-xs text-muted-foreground">{badge.requirement}</p>
                    {earned && (
                      <Badge className="mt-3" variant="outline">
                        <Star className="w-3 h-3 mr-1" />
                        Earned
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Button variant="outline" onClick={() => setCurrentScreen("dashboard")} className="w-full">
            Return to Path
          </Button>
        </div>
      </div>
    );
  }

  // Lesson Screen
  if (currentScreen === "lesson" && currentLesson) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-[1800px] mx-auto space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setCurrentScreen("dashboard")}>
              ← Back to Path
            </Button>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Lesson {currentLesson.id}: {currentLesson.title}
            </Badge>
          </div>

          {/* Dual Pane */}
          <div className="grid lg:grid-cols-2 gap-4 h-[calc(100vh-120px)]">
            {/* Left Pane - The Codex */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="text-secondary" />
                  The Codex
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col space-y-4 overflow-auto">
                {/* Learn Tab */}
                <div className="space-y-4">
                  <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-2 text-secondary">♟️ Chess Analogy</h3>
                    <p className="text-sm leading-relaxed">{currentLesson.analogy}</p>
                  </div>
                  
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-2 text-primary">💻 C Concept</h3>
                    <p className="text-sm leading-relaxed">{currentLesson.explanation}</p>
                  </div>
                </div>

                {/* Challenge */}
                <div className="bg-card border-2 border-accent rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Award className="text-accent" />
                    Your Challenge
                  </h3>
                  <p className="text-sm mb-4">{currentLesson.challenge}</p>
                  
                  {/* Code Editor */}
                  <div className="space-y-2">
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-64 code-editor resize-none focus:ring-2 focus:ring-primary outline-none"
                      spellCheck={false}
                    />
                    
                    <div className="flex gap-2">
                      <Button onClick={runCode} className="flex-1 bg-secondary hover:bg-secondary/80">
                        <Play className="mr-2 w-4 h-4" />
                        Run Code
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowHint(!showHint)}
                      >
                        💡 Hint
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={showSolution}
                      >
                        Show Solution
                      </Button>
                    </div>

                    {showHint && (
                      <div className="bg-muted/20 border border-muted rounded p-3 text-sm">
                        <strong>Hint:</strong> {currentLesson.hint}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Pane - The Chessboard */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="text-primary" />
                  The Chessboard
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="aspect-square w-full max-w-[600px]">
                  <div className="grid grid-cols-8 gap-0 border-4 border-primary rounded-lg overflow-hidden shadow-2xl">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const row = Math.floor(i / 8);
                      const col = i % 8;
                      const isLight = (row + col) % 2 === 0;
                      const rank = 8 - row;
                      const file = String.fromCharCode(97 + col);
                      
                      // Show pieces based on lesson
                      let piece = "";
                      if (currentLesson.id >= 1 && rank === 1 && file === "e") piece = "♔";
                      if (currentLesson.id >= 2 && rank === 2 && file === "e") piece = "♙";
                      if (currentLesson.id >= 3 && rank === 2) piece = "♙";
                      if (currentLesson.id >= 4 && rank === 4 && file === "e") piece = "♙";
                      if (currentLesson.id >= 4 && rank === 2 && file === "e") piece = "";
                      
                      return (
                        <div
                          key={i}
                          className={`aspect-square flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-bold transition-all ${
                            isLight ? "bg-chess-light" : "bg-chess-dark"
                          } ${piece ? "hover:scale-110 cursor-pointer" : ""}`}
                        >
                          {piece}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Board Labels */}
                  <div className="flex justify-around mt-2 text-xs text-muted-foreground font-mono">
                    {["a", "b", "c", "d", "e", "f", "g", "h"].map(f => (
                      <span key={f}>{f}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
