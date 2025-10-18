import { useEffect, useState, ReactNode } from "react";
import { useBackgroundStore } from "@/hooks/use-background-store";

interface MousePosition {
  x: number;
  y: number;
}

interface ParallaxBackgroundProps {
  children: ReactNode;
}

export const ParallaxBackground = ({ children }: ParallaxBackgroundProps) => {
  const { currentBackground } = useBackgroundStore();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cursor Glow Effect */}
      <div
        className="fixed pointer-events-none z-[100] mix-blend-screen transition-opacity duration-300"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, hsl(var(--accent) / 0.05) 25%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Parallax Background Layer */}
      <div
        className="fixed inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          willChange: "transform",
        }}
      >
        {currentBackground ? (
          <img
            src={currentBackground}
            alt="Background"
            className="w-full h-[120vh] object-cover"
          />
        ) : (
          <div className="w-full h-full celestial-bg" />
        )}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      </div>

      {/* Celestial Glow Effects */}
      <div className="fixed top-1/3 left-10 w-80 h-80 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none z-[1]" />
      <div
        className="fixed bottom-1/3 right-10 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none z-[1]"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
