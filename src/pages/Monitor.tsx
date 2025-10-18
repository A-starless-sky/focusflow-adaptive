import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Pause, Play, Settings, Sparkles } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import FocusMeter from "@/components/FocusMeter";
import ParameterBreakdown from "@/components/ParameterBreakdown";
import SessionStats from "@/components/SessionStats";
import { BackgroundSelector } from "@/components/BackgroundSelector";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { useFocusDetection } from "@/hooks/use-focus-detection";
import minrvaLogo from "@/assets/minrva-logo.png";

const Monitor = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "digital";
  
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const { focusScore, parameters: detectedParams, isInitialized, videoRef, startWebcam, analyzeFrame } = useFocusDetection(mode);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Start webcam when monitoring begins
  useEffect(() => {
    if (isMonitoring && isInitialized) {
      startWebcam();
    }
  }, [isMonitoring, isInitialized]);

  // Analyze frames and update session time
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      analyzeFrame();
      setSessionTime((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring, analyzeFrame]);

  const parameters = [
    { name: "Head Direction", value: detectedParams.headDirection, weight: mode === "digital" ? 0.6 : 0.4 },
    { name: "Hand Activity", value: detectedParams.handActivity, weight: mode === "offline" ? 0.5 : 0.3 },
    { name: "Posture Stability", value: detectedParams.postureStability, weight: 0.1 },
    { name: "Context Smoothness", value: detectedParams.contextSmoothness, weight: mode === "hybrid" ? 0.2 : 0 },
  ].filter(p => p.weight > 0);

  return (
    <ParallaxBackground>
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={minrvaLogo} alt="Minrva Logo" className="w-10 h-10 rounded-full glow-primary" />
              <span className="text-2xl font-bold gradient-text">Minrva</span>
            </Link>
            <div className="flex gap-2">
              <BackgroundSelector />
              <Button variant="ghost" size="sm" className="border border-accent/30 hover:border-accent/60">
                <Settings className="w-4 h-4" />
              </Button>
              <Link to="/modes">
                <Button variant="ghost" size="sm" className="border border-destructive/30 hover:border-destructive/60">
                  End Session
                </Button>
              </Link>
            </div>
          </nav>
        </header>

        {/* Monitor Layout */}
        <section className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Camera Feed */}
            <Card className="lg:col-span-2 p-6 glass ornate-border border-accent/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Live Feed
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={isMonitoring ? "default" : "secondary"}
                      onClick={() => setIsMonitoring(!isMonitoring)}
                      className="border border-accent/30 hover:glow-accent"
                    >
                      {isMonitoring ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Resume
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Camera Preview */}
                <div className="bg-muted/30 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden border border-accent/20">
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ display: isMonitoring ? 'block' : 'none' }}
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ display: isMonitoring ? 'block' : 'none' }}
                  />
                  {!isMonitoring && (
                    <>
                      <div className="absolute inset-0 bg-gradient-radial opacity-20" />
                      <div className="text-center relative z-10">
                        <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          {isInitialized ? "Press Resume to start monitoring" : "Initializing models..."}
                        </p>
                      </div>
                    </>
                  )}
                  
                  {/* Mock overlays */}
                  <div className="absolute top-4 left-4 bg-background/90 px-3 py-1 rounded-full text-sm border border-accent/30 backdrop-blur-sm">
                    Mode: <span className="font-semibold gradient-accent-text capitalize">{mode}</span>
                  </div>
                  
                  {isMonitoring && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-background/90 px-3 py-1 rounded-full text-sm border border-success/30 backdrop-blur-sm">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse glow-accent" />
                      <span>Monitoring</span>
                    </div>
                  )}
                </div>

                {/* Parameter Breakdown */}
                <ParameterBreakdown parameters={parameters} />
              </div>
            </Card>

            {/* Right Column - Focus Score & Stats */}
            <div className="space-y-6">
              <FocusMeter score={focusScore} isMonitoring={isMonitoring} />
              <SessionStats sessionTime={sessionTime} mode={mode} />
            </div>
          </div>
        </section>
    </ParallaxBackground>
  );
};

export default Monitor;
