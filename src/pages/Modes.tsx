import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Monitor, BookOpen, Blend, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
            <Link to="/">
              <Button variant="ghost" size="sm">
                Back to Home
              </Button>
            </Link>
          </nav>
        </header>

        {/* Mode Selection */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Choose Your Study Mode
              </h1>
              <p className="text-xl text-muted-foreground">
                Each mode adapts parameter weights to match your learning style
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {modes.map((mode, index) => (
                <Card 
                  key={mode.id}
                  className="p-8 glass hover:glow-accent transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleModeSelect(mode.id)}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`text-${mode.color} group-hover:scale-110 transition-transform duration-300`}>
                      {mode.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2">{mode.name}</h3>
                      <p className="text-muted-foreground">{mode.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="text-sm font-semibold text-primary">Key Parameters:</div>
                    <ul className="space-y-2">
                      {mode.parameters.map((param) => (
                        <li key={param} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {param}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">
                      Frame interval: {mode.interval}
                    </span>
                    <Button size="sm" variant="secondary">
                      Select Mode
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Card className="p-6 glass inline-block">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Tip:</strong> All modes include phone detection penalty for distraction monitoring
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
