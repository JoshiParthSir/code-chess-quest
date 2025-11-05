import { Button } from "@/components/ui/button";
import { Crown, Sparkles, Trophy, Code } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Icon group */}
        <div className="flex justify-center items-center gap-4 mb-8 animate-fade-in">
          <Crown className="w-16 h-16 text-primary animate-bounce" />
          <Code className="w-20 h-20 text-primary" />
          <Trophy className="w-16 h-16 text-primary animate-bounce delay-500" />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-fade-in">
          LJCCA CodeQuest
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-3 animate-fade-in delay-200">
          Master C Programming Through Chess
        </p>

        {/* Epic tagline */}
        <div className="flex items-center justify-center gap-2 mb-12 animate-fade-in delay-300">
          <Sparkles className="w-5 h-5 text-primary" />
          <p className="text-lg text-muted-foreground italic">
            Learn the Ancient Game of Kings while Conquering Code
          </p>
          <Sparkles className="w-5 h-5 text-primary" />
        </div>

        {/* CTA Button */}
        <Link to="/learn">
          <Button 
            size="lg" 
            className="text-xl px-12 py-8 rounded-xl shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in delay-500 group"
          >
            Start Your Quest
            <Crown className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
          </Button>
        </Link>

        {/* Bottom info */}
        <p className="mt-12 text-sm text-muted-foreground/70 animate-fade-in delay-700">
          Created by Parth D. Joshi • LJK College Computer Applications
        </p>
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
