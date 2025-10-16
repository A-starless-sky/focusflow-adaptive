import { Card } from "@/components/ui/card";
import { Clock, Eye, AlertTriangle } from "lucide-react";

interface SessionStatsProps {
  sessionTime: number;
  mode: string;
}

const SessionStats = ({ sessionTime, mode }: SessionStatsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Mock stats
  const avgFocus = 72;
  const phoneDetections = 2;

  return (
    <Card className="p-6 glass">
      <h3 className="text-lg font-semibold mb-4">Session Statistics</h3>
      
      <div className="space-y-4">
        <StatItem
          icon={<Clock className="w-5 h-5 text-primary" />}
          label="Session Time"
          value={formatTime(sessionTime)}
        />
        
        <StatItem
          icon={<Eye className="w-5 h-5 text-accent" />}
          label="Avg Focus"
          value={`${avgFocus}%`}
        />
        
        <StatItem
          icon={<AlertTriangle className="w-5 h-5 text-warning" />}
          label="Phone Detected"
          value={`${phoneDetections}x`}
        />

        <div className="pt-4 border-t border-border/50">
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground capitalize">{mode}</span> mode active
          </div>
        </div>
      </div>
    </Card>
  );
};

const StatItem = ({ icon, label, value }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <span className="text-lg font-semibold">{value}</span>
  </div>
);

export default SessionStats;
