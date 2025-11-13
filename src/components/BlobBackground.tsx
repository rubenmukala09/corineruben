interface BlobBackgroundProps {
  variant?: 'gold' | 'teal' | 'purple';
  position?: 'top-right' | 'bottom-left' | 'center';
}

const BlobBackground = ({ variant = 'gold', position = 'top-right' }: BlobBackgroundProps) => {
  const gradientColor = {
    gold: 'from-[hsl(260,70%,35%)] to-[hsl(260,60%,50%)]',
    teal: 'from-[hsl(180,80%,40%)] to-[hsl(180,75%,50%)]',
    purple: 'from-[hsl(260,70%,35%)] to-[hsl(260,60%,50%)]',
  }[variant];

  const positionClasses = {
    'top-right': 'top-[-200px] right-[-200px]',
    'bottom-left': 'bottom-[-150px] left-[-150px]',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  }[position];

  return (
    <div className={`absolute ${positionClasses} w-[600px] h-[600px] pointer-events-none`}>
      <div 
        className={`w-full h-full bg-gradient-to-br ${gradientColor} opacity-10 blur-[80px] animate-blob-morph`}
        style={{ 
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          animation: 'blob-morph 20s ease-in-out infinite',
        }}
      />
    </div>
  );
};

export default BlobBackground;
