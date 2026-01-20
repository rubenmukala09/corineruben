import { useState, useEffect } from 'react';
import { CreditCard, Check, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface SavedCard {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

interface SavedPaymentMethodsProps {
  onSelectCard: (cardId: string | null) => void;
  selectedCardId: string | null;
  onAddNewCard: () => void;
}

const CARD_ICONS: Record<string, string> = {
  visa: 'https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg',
  mastercard: 'https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg',
  amex: 'https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg',
  discover: 'https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg',
};

export function SavedPaymentMethods({ 
  onSelectCard, 
  selectedCardId, 
  onAddNewCard 
}: SavedPaymentMethodsProps) {
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      // Saved cards would be fetched from Stripe API via edge function
      // For now, we show empty state to encourage adding new cards
      setIsLoading(false);
    };
    
    checkUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-foreground">Saved Payment Methods</h4>
      
      <div className="space-y-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => onSelectCard(card.id === selectedCardId ? null : card.id)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
              selectedCardId === card.id
                ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                : 'border-border/50 bg-muted/30 hover:border-border'
            }`}
          >
            <div className="flex items-center gap-3">
              <img 
                src={CARD_ICONS[card.brand.toLowerCase()] || ''} 
                alt={card.brand} 
                className="h-6 w-auto"
              />
              <div className="text-left">
                <p className="text-sm font-medium">
                  •••• {card.last4}
                </p>
                <p className="text-xs text-muted-foreground">
                  Expires {card.expMonth.toString().padStart(2, '0')}/{card.expYear.toString().slice(-2)}
                </p>
              </div>
              {card.isDefault && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  Default
                </span>
              )}
            </div>
            
            {selectedCardId === card.id && (
              <div className="p-1 bg-primary rounded-full">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
        
        <Button
          variant="outline"
          onClick={onAddNewCard}
          className="w-full h-11 border-dashed"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Card
        </Button>
      </div>
    </div>
  );
}
