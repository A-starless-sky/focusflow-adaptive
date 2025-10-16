import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Camera, Pause, Play, Settings } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import FocusMeter from "@/components/FocusMeter";
import ParameterBreakdown from "@/components/ParameterBreakdown";
import SessionStats from "@/components/SessionStats";

const Monitor = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "digital";
  
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [focusScore, setFocusScore] = useState(0.75);
  const [sessionTime, setSessionTime] = useState(0);

  // Simulate real-time focus score updates
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      // Simulate fluctuating focus score
      const variation = (Math.random() - 0.5) * 0.3;
      setFocusScore((prev) => Math.max(0, Math.min(1, prev + variation)));
      setSessionTime((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const parameters = [
    { name: "Head Direction", value: 0.85, weight: mode === "digital" ? 0.6 : 0.4 },
    { name: "Hand Activity", value: 0.70, weight: mode === "offline" ? 0.5 : 0.3 },
    { name: "Posture Stability", value: 0.65, weight: 0.1 },
    { name: "Context Smoothness", value: 0.80, weight: mode === "hybrid" ? 0.2 : 0 },
  ].filter(p => p.weight > 0);

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
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Link to="/modes">
                <Button variant="ghost" size="sm">
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
            <Card className="lg:col-span-2 p-6 glass">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Live Feed</h2>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={isMonitoring ? "default" : "secondary"}
                      onClick={() => setIsMonitoring(!isMonitoring)}
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
                <div className="bg-muted/30 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Camera feed with overlay</p>
                  </div>
                  
                  {/* Mock overlays */}
                  <div className="absolute top-4 left-4 bg-background/80 px-3 py-1 rounded-full text-sm">
                    Mode: <span className="font-semibold text-primary capitalize">{mode}</span>
                  </div>
                  
                  {isMonitoring && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-background/80 px-3 py-1 rounded-full text-sm">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
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
      </div>
    </div>
  );
};

export default Monitor;
