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
      {/* Cursor Deblur Bubble */}
      <div
        className="fixed pointer-events-none z-[100] transition-opacity duration-300 rounded-full"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          width: '250px',
          height: '250px',
          backdropFilter: 'blur(0px) brightness(1.1)',
          WebkitBackdropFilter: 'blur(0px) brightness(1.1)',
          border: '1px solid hsl(var(--primary) / 0.2)',
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
            className="w-full h-[200vh] object-cover"
          />
        ) : (
          <div className="w-full h-[200vh] celestial-bg" />
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
