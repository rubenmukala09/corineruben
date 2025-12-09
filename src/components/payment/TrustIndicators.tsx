import { Shield, Lock, RefreshCw, Clock } from 'lucide-react';

export function TrustIndicators() {
  return (
    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
      <div className="flex items-center gap-1">
        <Lock className="h-3 w-3" />
        <span>Secure</span>
      </div>
      <div className="flex items-center gap-1">
        <Shield className="h-3 w-3" />
        <span>Encrypted</span>
      </div>
      <div className="flex items-center gap-1">
        <RefreshCw className="h-3 w-3" />
        <span>30-Day Guarantee</span>
      </div>
    </div>
  );
}

export function AcceptedCards() {
  return (
    <div className="flex items-center justify-center gap-2 opacity-60">
      <img src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" alt="Visa" className="h-6" />
      <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="Mastercard" className="h-6" />
      <img src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" alt="Amex" className="h-6" />
      <img src="https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg" alt="Discover" className="h-6" />
    </div>
  );
}
