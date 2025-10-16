import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Eye, Zap, Settings, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import minrvaLogo from "@/assets/minrva-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen celestial-bg relative overflow-hidden">
      {/* Celestial Glow Effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" style={{ background: 'var(--gradient-glow)' }} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={minrvaLogo} alt="Minrva Logo" className="w-12 h-12 rounded-full glow-primary" />
              <span className="text-3xl font-bold gradient-text">Minrva</span>
            </div>
            <Button variant="ghost" size="sm" className="border border-accent/30 hover:border-accent/60 hover:glow-accent transition-all">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass ornate-border">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-medium gradient-accent-text">Mode-Aware Focus Estimation</span>
              <Star className="w-3 h-3 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-wide">
              Stay Focused,<br />
              <span className="gradient-text">Measure Your Flow</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Minrva analyzes your focus level in real-time using advanced computer vision.
              Adapts to your study mode—digital, offline, hybrid, or dynamic.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/modes">
                <Button size="lg" className="glow-primary relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-20 transition-opacity" />
                  <Eye className="w-5 h-5 mr-2" />
                  Start Monitoring
                </Button>
              </Link>
              <Button size="lg" variant="secondary" className="border border-accent/30 hover:border-accent/60 hover:glow-accent transition-all">
                <Sparkles className="w-4 h-4 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Brain className="w-10 h-10" />}
              title="Multi-Mode Analysis"
              description="Digital, offline, hybrid, or dynamic—adapt to any study style"
            />
            <FeatureCard
              icon={<Eye className="w-10 h-10" />}
              title="Real-Time Detection"
              description="Advanced face and hand tracking using MediaPipe & YOLO"
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title="Smart Calibration"
              description="Personalized baseline detection for accurate focus scoring"
            />
            <FeatureCard
              icon={<Settings className="w-10 h-10" />}
              title="Customizable Weights"
              description="Fine-tune parameter sensitivity for each study mode"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <Card className="p-12 text-center glass glow-primary ornate-border relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ background: 'var(--gradient-glow)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                Ready to <span className="gradient-accent-text">enhance</span> your focus?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Start your first session and discover your focus patterns
              </p>
              <Link to="/modes">
                <Button size="lg" className="glow-accent relative group">
                  <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                  Get Started Now
                  <Star className="w-4 h-4 ml-2 group-hover:rotate-180 transition-transform duration-500" />
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => (
  <Card className="p-6 glass hover:glow-accent transition-all duration-500 group border-accent/20 hover:border-accent/50 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
    <div className="relative z-10">
      <div className="text-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:gradient-accent-text transition-all">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </Card>
);

export default Index;
