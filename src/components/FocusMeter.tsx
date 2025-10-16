import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FocusMeterProps {
  score: number;
  isMonitoring: boolean;
}

const FocusMeter = ({ score, isMonitoring }: FocusMeterProps) => {
  const percentage = Math.round(score * 100);
  
  const getScoreColor = (score: number) => {
    if (score >= 0.7) return "text-success";
    if (score >= 0.4) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.7) return "Focused";
    if (score >= 0.4) return "Moderate";
    return "Distracted";
  };

  return (
    <Card className="p-6 glass glow-primary">
      <div className="text-center space-y-6">
        <h2 className="text-xl font-semibold">Focus Score</h2>
        
        {/* Circular Score Display */}
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - score)}`}
              className="transition-all duration-1000 ease-out"
              style={{
                filter: "drop-shadow(0 0 8px hsl(var(--primary)))"
              }}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
              {percentage}%
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {getScoreLabel(score)}
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-center gap-2">
          {isMonitoring ? (
            <>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Live Tracking</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-warning rounded-full" />
              <span className="text-sm text-muted-foreground">Paused</span>
            </>
          )}
        </div>

        {/* Mini Bar Graph */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground text-left">Recent trend</div>
          <Progress value={percentage} className="h-2" />
        </div>
      </div>
    </Card>
  );
};

export default FocusMeter;
