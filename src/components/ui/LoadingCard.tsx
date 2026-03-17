import React from 'react';
import './LoadingCard.css';

interface LoadingCardProps {
  /** Whether to show the loading overlay */
  show?: boolean;
  /** Optional custom text (defaults to "LOADING") */
  text?: string;
  /** Optional className for additional styling */
  className?: string;
  /** Whether to show as fullscreen overlay or inline */
  fullscreen?: boolean;
}

/**
 * Glassmorphism Loading Widget
 *
 * A beautiful loading indicator with frosted glass effect,
 * animated concentric rings, and orbiting dots.
 *
 * @example
 * // Fullscreen overlay
 * <LoadingCard show={isLoading} />
 *
 * @example
 * // Inline loading card
 * <LoadingCard show={true} fullscreen={false} text="Processing" />
 */
export const LoadingCard: React.FC<LoadingCardProps> = ({
  show = true,
  text = 'Loading',
  className = '',
  fullscreen = true,
}) => {
  if (!show) return null;

  const content = (
    <div className="loading-card" role="status" aria-live="polite">
      {/* Loader with rings and dots */}
      <div className="loader-container">
        {/* Center glow */}
        <div className="center-glow" aria-hidden="true" />

        {/* SVG rings and dots */}
        <svg
          className="loader-svg"
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="glow-filter">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer lavender ring */}
          <circle
            className="ring ring-lavender-1"
            cx="60"
            cy="60"
            r="45"
            filter="url(#glow-filter)"
          />

          {/* Middle lavender ring */}
          <circle
            className="ring ring-lavender-2"
            cx="60"
            cy="60"
            r="36"
            filter="url(#glow-filter)"
          />

          {/* Inner peach ring */}
          <circle
            className="ring ring-peach"
            cx="60"
            cy="60"
            r="30"
            filter="url(#glow-filter)"
          />

          {/* Animated dots on path */}
          <g transform="rotate(240 60 60)">
            <circle className="dot dot-1" cx="60" cy="15" r="3" />
          </g>
          <g transform="rotate(260 60 60)">
            <circle className="dot dot-2" cx="60" cy="15" r="3" />
          </g>
          <g transform="rotate(280 60 60)">
            <circle className="dot dot-3" cx="60" cy="15" r="3" />
          </g>
        </svg>
      </div>

      {/* Loading text */}
      <p className="loading-text" aria-label={text}>
        {text}
      </p>

      {/* Screen reader announcement */}
      <span className="sr-only">{text}, please wait</span>
    </div>
  );

  if (fullscreen) {
    return (
      <div className={`loading-overlay ${className}`} aria-label="Loading overlay">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingCard;
