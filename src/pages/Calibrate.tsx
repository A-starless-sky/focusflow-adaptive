import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import minrvaLogo from "@/assets/minrva-logo.png";

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
    <div className="min-h-screen celestial-bg relative overflow-hidden">
      {/* Celestial Glow Effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-success/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={minrvaLogo} alt="Minrva Logo" className="w-10 h-10 rounded-full glow-primary" />
              <span className="text-2xl font-bold gradient-text">Minrva</span>
            </Link>
            <Link to="/modes">
              <Button variant="ghost" size="sm" className="border border-accent/30 hover:border-accent/60">
                Back to Modes
              </Button>
            </Link>
          </nav>
        </header>

        {/* Calibration Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass ornate-border mb-6">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-sm font-medium gradient-accent-text">Baseline Calibration</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Calibrate Your <span className="gradient-text">Baseline</span>
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
