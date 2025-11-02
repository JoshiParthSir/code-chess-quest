import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-card">
      <Card className="max-w-md w-full border-primary/20 shadow-xl">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6" aria-hidden="true">
            <AlertCircle className="w-20 h-20 text-primary animate-pulse" />
          </div>
          
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </h1>
          
          <p className="text-2xl font-semibold mb-2">Page Not Found</p>
          <p className="text-muted-foreground mb-8">
            The page you're looking for has wandered off the board.
          </p>
          
          <Link to="/" aria-label="Return to home page">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
              <Home className="mr-2 w-4 h-4" aria-hidden="true" />
              Return to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
