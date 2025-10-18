import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Image, Check } from "lucide-react";
import { useBackgroundStore } from "@/hooks/use-background-store";
import wallpaper1 from "@/assets/backgrounds/wallpaper-1.jpg";
import wallpaper2 from "@/assets/backgrounds/wallpaper-2.jpg";
import wallpaper3 from "@/assets/backgrounds/wallpaper-3.jpg";
import wallpaper4 from "@/assets/backgrounds/wallpaper-4.jpg";
import wallpaper5 from "@/assets/backgrounds/wallpaper-5.jpg";
import wallpaper6 from "@/assets/backgrounds/wallpaper-6.jpg";
import wallpaper7 from "@/assets/backgrounds/wallpaper-7.jpg";

const backgrounds = [
  { id: "default", name: "Celestial", preview: null },
  { id: "1", name: "Mystic Library", preview: wallpaper1 },
  { id: "2", name: "Sunset Journey", preview: wallpaper2 },
  { id: "3", name: "Starlit Voyage", preview: wallpaper3 },
  { id: "4", name: "Laundry Dreams", preview: wallpaper4 },
  { id: "5", name: "Chibi Crowd", preview: wallpaper5 },
  { id: "6", name: "Autumn Ruins", preview: wallpaper6 },
  { id: "7", name: "Azure Stage", preview: wallpaper7 },
];

export const BackgroundSelector = () => {
  const { currentBackground, setBackground } = useBackgroundStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="border border-accent/30 hover:border-accent/60">
          <Image className="w-4 h-4 mr-2" />
          Background
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 glass border-accent/30 p-4">
        <h3 className="font-semibold mb-3 gradient-text">Choose Background</h3>
        <div className="grid grid-cols-2 gap-2">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => setBackground(bg.preview)}
              className="relative group overflow-hidden rounded-lg border-2 transition-all hover:scale-105"
              style={{
                borderColor: currentBackground === bg.preview ? "hsl(var(--accent))" : "hsl(var(--border))",
              }}
            >
              {bg.preview ? (
                <img
                  src={bg.preview}
                  alt={bg.name}
                  className="w-full h-20 object-cover"
                />
              ) : (
                <div className="w-full h-20 celestial-bg" />
              )}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs font-medium">{bg.name}</span>
              </div>
              {currentBackground === bg.preview && (
                <div className="absolute top-1 right-1 bg-accent rounded-full p-1">
                  <Check className="w-3 h-3 text-accent-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
