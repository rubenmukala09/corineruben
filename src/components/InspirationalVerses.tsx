import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

const verses = [
  { text: "The LORD is my light and my salvation - whom shall I fear? The LORD is the stronghold of my life - of whom shall I be afraid?", reference: "Psalm 27:1", theme: "Protection" },
  { text: "Be strong and courageous. Do not be afraid or terrified because of them, for the LORD your God goes with you; he will never leave you nor forsake you.", reference: "Deuteronomy 31:6", theme: "Courage" },
  { text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.", reference: "2 Timothy 1:7", theme: "Strength" },
  { text: "The name of the LORD is a fortified tower; the righteous run to it and are safe.", reference: "Proverbs 18:10", theme: "Safety" },
  { text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", reference: "Proverbs 3:5-6", theme: "Trust" },
  { text: "The LORD will fight for you; you need only to be still.", reference: "Exodus 14:14", theme: "Peace" },
  { text: "When I am afraid, I put my trust in you.", reference: "Psalm 56:3", theme: "Faith" },
  { text: "Cast all your anxiety on him because he cares for you.", reference: "1 Peter 5:7", theme: "Comfort" },
  { text: "The LORD is close to the brokenhearted and saves those who are crushed in spirit.", reference: "Psalm 34:18", theme: "Healing" },
  { text: "Do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.", reference: "Isaiah 41:10", theme: "Assurance" },
  { text: "The LORD your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.", reference: "Zephaniah 3:17", theme: "Victory" },
  { text: "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.", reference: "Psalm 91:4", theme: "Refuge" },
  { text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.", reference: "Psalm 23:4", theme: "Presence" },
  { text: "The righteous cry out, and the LORD hears them; he delivers them from all their troubles.", reference: "Psalm 34:17", theme: "Deliverance" },
  { text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.", reference: "Isaiah 26:3", theme: "Peace" },
  { text: "No weapon forged against you will prevail, and you will refute every tongue that accuses you. This is the heritage of the servants of the LORD, and this is their vindication from me.", reference: "Isaiah 54:17", theme: "Protection" },
  { text: "I can do all this through him who gives me strength.", reference: "Philippians 4:13", theme: "Strength" },
  { text: "The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.", reference: "Psalm 23:1-3", theme: "Provision" },
  { text: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.", reference: "Psalm 46:10", theme: "Rest" },
  { text: "He gives strength to the weary and increases the power of the weak. Even youths grow tired and weary, and young men stumble and fall; but those who hope in the LORD will renew their strength.", reference: "Isaiah 40:29-31", theme: "Renewal" },
  { text: "The eternal God is your refuge, and underneath are the everlasting arms. He will drive out your enemies before you, saying, 'Destroy them!'", reference: "Deuteronomy 33:27", theme: "Security" },
  { text: "God is our refuge and strength, an ever-present help in trouble. Therefore we will not fear, though the earth give way and the mountains fall into the heart of the sea.", reference: "Psalm 46:1-2", theme: "Help" },
  { text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.", reference: "Matthew 11:28-29", theme: "Rest" }
];

export function InspirationalVerses() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % verses.length);
        setIsVisible(true);
      }, 1000);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentVerse = verses[currentIndex];

  return (
    <section className="py-6 md:py-10 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <Badge className="mb-2 text-xs md:text-sm px-3 py-1" variant="secondary">
              <BookOpen className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              Words of Strength
            </Badge>
          </div>
          
          <Card className="p-3 sm:p-4 md:p-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 relative overflow-hidden">
            <div 
              className="transition-opacity duration-1000"
              style={{ opacity: isVisible ? 1 : 0 }}
            >
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-serif italic text-center mb-3 text-foreground">
                "{currentVerse.text}"
              </p>
              <p className="text-xs sm:text-sm md:text-base text-primary font-semibold text-center">
                {currentVerse.reference}
              </p>
              <p className="text-xs text-muted-foreground text-center mt-2">
                {currentVerse.theme}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
