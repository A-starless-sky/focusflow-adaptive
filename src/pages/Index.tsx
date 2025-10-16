import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Eye, Zap, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(263_70%_60%/0.15),transparent_70%)]" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">Minrva</span>
            </div>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Mode-Aware Focus Estimation</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Stay Focused,<br />
              <span className="gradient-text">Measure Your Flow</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Minrva analyzes your focus level in real-time using advanced computer vision.
              Adapts to your study mode—digital, offline, hybrid, or dynamic.
            </p>

            <div className="flex gap-4 justify-center">
              <Link to="/modes">
                <Button size="lg" className="glow-primary">
                  <Eye className="w-5 h-5 mr-2" />
                  Start Monitoring
                </Button>
              </Link>
              <Button size="lg" variant="secondary">
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
          <Card className="p-12 text-center glass glow-primary">
            <h2 className="text-4xl font-bold mb-4">Ready to enhance your focus?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start your first session and discover your focus patterns
            </p>
            <Link to="/modes">
              <Button size="lg" variant="default">
                Get Started Now
              </Button>
            </Link>
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
  <Card className="p-6 glass hover:glow-accent transition-all duration-300 group">
    <div className="text-accent group-hover:scale-110 transition-transform duration-300 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </Card>
);

export default Index;
