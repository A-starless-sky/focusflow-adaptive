import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Monitor, BookOpen, Blend, Activity, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import minrvaLogo from "@/assets/minrva-logo.png";

const modes = [
  {
    id: "digital",
    name: "Digital Mode",
    icon: <Monitor className="w-12 h-12" />,
    description: "Focus on screen-based work. Tracks head direction and posture.",
    parameters: ["Head Direction (0.6)", "Posture Stability (0.1)"],
    color: "primary",
    interval: "10s per frame"
  },
  {
    id: "offline",
    name: "Offline Mode",
    icon: <BookOpen className="w-12 h-12" />,
    description: "Reading, writing, or studying from books. Monitors hand activity.",
    parameters: ["Real Hand Detection (0.5)", "Inferred Hand Activity (0.3)", "Posture (0.2)"],
    color: "accent",
    interval: "5s per frame"
  },
  {
    id: "hybrid",
    name: "Hybrid Mode",
    icon: <Blend className="w-12 h-12" />,
    description: "Alternating between screen and book. Tracks switching patterns.",
    parameters: ["Head Direction (0.4)", "Context Smoothness (0.2)", "Switch Score (0.3)"],
    color: "success",
    interval: "0.5s per frame"
  },
  {
    id: "dynamic",
    name: "Dynamic Mode",
    icon: <Activity className="w-12 h-12" />,
    description: "Active learning with movement. Tolerates walking and gestures.",
    parameters: ["Movement Score (0.3)", "Inferred Hand (0.4)", "Head Direction (0.3)"],
    color: "warning",
    interval: "0.3s per frame"
  }
];

const Modes = () => {
  const navigate = useNavigate();

  const handleModeSelect = (modeId: string) => {
    navigate(`/calibrate?mode=${modeId}`);
  };

  return (
    <div className="min-h-screen celestial-bg relative overflow-hidden">
      {/* Celestial Glow Effects */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={minrvaLogo} alt="Minrva Logo" className="w-10 h-10 rounded-full glow-primary" />
              <span className="text-2xl font-bold gradient-text">Minrva</span>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm" className="border border-accent/30 hover:border-accent/60">
                Back to Home
              </Button>
            </Link>
          </nav>
        </header>

        {/* Mode Selection */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass ornate-border mb-6">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-sm font-medium gradient-accent-text">Adaptive Focus Detection</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Choose Your <span className="gradient-text">Study Mode</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Each mode adapts parameter weights to match your learning style
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {modes.map((mode, index) => (
                <Card 
                  key={mode.id}
                  className="p-8 glass hover:glow-accent transition-all duration-500 group cursor-pointer border-accent/20 hover:border-accent/50 relative overflow-hidden ornate-border"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleModeSelect(mode.id)}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`text-${mode.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        {mode.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2 group-hover:gradient-accent-text transition-all">{mode.name}</h3>
                        <p className="text-muted-foreground leading-relaxed">{mode.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="text-sm font-semibold gradient-text flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        Key Parameters:
                      </div>
                      <ul className="space-y-2">
                        {mode.parameters.map((param) => (
                          <li key={param} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent glow-accent" />
                            {param}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-accent/30">
                      <span className="text-sm text-muted-foreground">
                        Frame interval: {mode.interval}
                      </span>
                      <Button size="sm" variant="secondary" className="border border-accent/30 hover:glow-accent">
                        Select Mode
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Card className="p-6 glass inline-block ornate-border border-accent/30">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <strong className="gradient-accent-text">Tip:</strong> All modes include phone detection penalty for distraction monitoring
                </p>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Modes;
