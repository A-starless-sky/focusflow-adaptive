import { useEffect, useState, ReactNode } from "react";
import { useBackgroundStore } from "@/hooks/use-background-store";

interface ParallaxBackgroundProps {
  children: ReactNode;
}

export const ParallaxBackground = ({ children }: ParallaxBackgroundProps) => {
  const { currentBackground } = useBackgroundStore();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
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
