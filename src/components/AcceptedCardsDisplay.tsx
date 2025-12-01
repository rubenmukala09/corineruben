import { CreditCard } from "lucide-react";

export function AcceptedCardsDisplay() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <CreditCard className="w-4 h-4" />
        <span>Secure Payment - All Major Cards Accepted</span>
      </div>
      
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md">
          <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
            <rect width="32" height="20" rx="3" fill="#1434CB"/>
            <path d="M11.5 5h9v10h-9z" fill="#FF5F00"/>
            <circle cx="11.5" cy="10" r="5" fill="#EB001B"/>
            <circle cx="20.5" cy="10" r="5" fill="#F79E1B"/>
          </svg>
          <span className="text-xs font-medium">Mastercard</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md">
          <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
            <rect width="32" height="20" rx="3" fill="#00579F"/>
            <path d="M13.5 6l-2 8h2l2-8h-2zm6 0l-3 8h2l3-8h-2z" fill="#FAA61A"/>
          </svg>
          <span className="text-xs font-medium">Visa</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md">
          <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
            <rect width="32" height="20" rx="3" fill="#006FCF"/>
            <path d="M16 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="white"/>
          </svg>
          <span className="text-xs font-medium">Amex</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md">
          <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
            <rect width="32" height="20" rx="3" fill="#FF6000"/>
            <circle cx="10" cy="10" r="3" fill="white"/>
            <circle cx="22" cy="10" r="3" fill="white"/>
          </svg>
          <span className="text-xs font-medium">Discover</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md">
          <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
            <rect width="32" height="20" rx="3" fill="black"/>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-[8px] fill-white font-bold">Pay</text>
          </svg>
          <span className="text-xs font-medium">Apple Pay</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md">
          <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
            <rect width="32" height="20" rx="3" fill="white" stroke="#ccc"/>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-[6px] font-bold">
              <tspan fill="#4285F4">G</tspan>
              <tspan fill="#EA4335">o</tspan>
              <tspan fill="#FBBC05">o</tspan>
              <tspan fill="#4285F4">g</tspan>
              <tspan fill="#34A853">l</tspan>
              <tspan fill="#EA4335">e</tspan>
            </text>
          </svg>
          <span className="text-xs font-medium">Google Pay</span>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        🔒 Your payment information is encrypted and secure
      </p>
    </div>
  );
}
