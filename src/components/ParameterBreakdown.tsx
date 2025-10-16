import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Parameter {
  name: string;
  value: number;
  weight: number;
}

interface ParameterBreakdownProps {
  parameters: Parameter[];
}

const ParameterBreakdown = ({ parameters }: ParameterBreakdownProps) => {
  return (
    <Card className="p-6 glass">
      <h3 className="text-lg font-semibold mb-4">Parameter Breakdown</h3>
      <div className="space-y-4">
        {parameters.map((param) => (
          <div key={param.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {param.name}
                <span className="text-xs ml-2 text-primary">
                  (weight: {param.weight.toFixed(1)})
                </span>
              </span>
              <span className="font-semibold">{Math.round(param.value * 100)}%</span>
            </div>
            <Progress 
              value={param.value * 100} 
              className="h-2"
            />
          </div>
        ))}
        
        <div className="pt-4 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            💡 Weights are normalized per mode
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ParameterBreakdown;
