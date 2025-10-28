import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableArticleProps {
  title: string;
  preview: string;
  fullContent: string;
  image: string;
}

const ExpandableArticle = ({ title, preview, fullContent, image }: ExpandableArticleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        
        <div className={`text-muted-foreground leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
          {isExpanded ? (
            <div className="space-y-4 whitespace-pre-line">{fullContent}</div>
          ) : (
            <p>{preview}</p>
          )}
        </div>

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="ghost"
          className="mt-4 text-primary hover:text-primary/80 font-semibold p-0 h-auto"
        >
          {isExpanded ? (
            <>
              Read Less <ChevronUp className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ExpandableArticle;
