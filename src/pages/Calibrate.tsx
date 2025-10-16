import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Camera, CheckCircle2, ArrowRight } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Calibrate = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "digital";
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [neutralCaptured, setNeutralCaptured] = useState(false);
  const [awayCaptured, setAwayCaptured] = useState(false);

  const handleNeutralCapture = () => {
    setNeutralCaptured(true);
    toast({
      title: "Neutral position captured",
      description: "Your baseline focus posture has been recorded.",
    });
  };

  const handleAwayCapture = () => {
    setAwayCaptured(true);
    toast({
      title: "Away position captured",
      description: "Your distracted posture has been recorded.",
    });
  };

  const handleStartSession = () => {
    if (neutralCaptured && awayCaptured) {
      navigate(`/monitor?mode=${mode}`);
    } else {
      toast({
        title: "Calibration incomplete",
        description: "Please capture both positions before starting.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(263_70%_60%/0.15),transparent_70%)]" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">Minrva</span>
            </Link>
            <Link to="/modes">
              <Button variant="ghost" size="sm">
                Back to Modes
              </Button>
            </Link>
          </nav>
        </header>

        {/* Calibration Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Calibrate Your Baseline
              </h1>
              <p className="text-xl text-muted-foreground">
                Let's capture your focus and distracted positions for accurate tracking
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Neutral Capture */}
              <Card className={`p-8 glass transition-all duration-300 ${neutralCaptured ? 'glow-primary border-primary' : ''}`}>
                <div className="text-center space-y-6">
                  {neutralCaptured ? (
                    <CheckCircle2 className="w-16 h-16 text-success mx-auto animate-scale-in" />
                  ) : (
                    <Camera className="w-16 h-16 text-primary mx-auto" />
                  )}
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Neutral Position</h3>
                    <p className="text-muted-foreground mb-6">
                      Sit in your normal focused position, look straight at the camera
                    </p>
                  </div>

                  <div className="bg-muted/30 rounded-lg aspect-video flex items-center justify-center mb-6">
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Camera preview</p>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handleNeutralCapture}
                    disabled={neutralCaptured}
                  >
                    {neutralCaptured ? "Captured ✓" : "Capture Neutral"}
                  </Button>
                </div>
              </Card>

              {/* Away Capture */}
              <Card className={`p-8 glass transition-all duration-300 ${awayCaptured ? 'glow-accent border-accent' : ''}`}>
                <div className="text-center space-y-6">
                  {awayCaptured ? (
                    <CheckCircle2 className="w-16 h-16 text-success mx-auto animate-scale-in" />
                  ) : (
                    <Camera className="w-16 h-16 text-accent mx-auto" />
                  )}
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Away Position</h3>
                    <p className="text-muted-foreground mb-6">
                      Turn away or look down as if distracted or on your phone
                    </p>
                  </div>

                  <div className="bg-muted/30 rounded-lg aspect-video flex items-center justify-center mb-6">
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Camera preview</p>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="w-full"
                    onClick={handleAwayCapture}
                    disabled={awayCaptured}
                  >
                    {awayCaptured ? "Captured ✓" : "Capture Away"}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                className="glow-primary"
                onClick={handleStartSession}
                disabled={!neutralCaptured || !awayCaptured}
              >
                Start Focus Session
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              {(!neutralCaptured || !awayCaptured) && (
                <p className="text-sm text-muted-foreground mt-4">
                  Complete both calibrations to continue
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Calibrate;
