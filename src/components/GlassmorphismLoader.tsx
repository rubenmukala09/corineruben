interface GlassmorphismLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export const GlassmorphismLoader = ({
  message = "Loading",
  fullScreen = true,
}: GlassmorphismLoaderProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`glassy-loader-wrapper ${fullScreen ? "glassy-loader-fullscreen" : ""}`}
    >
      <div className="glassy-loader-card">
        {/* Prismatic ring system */}
        <div className="glassy-loader-orb">
          <span className="glassy-loader-ring ring-one" />
          <span className="glassy-loader-ring ring-two" />
          <span className="glassy-loader-ring ring-three" />
          <span className="glassy-loader-core" />
          {/* Inner glow pip */}
          <span className="glassy-loader-pip" />
        </div>

        {/* Animated glass dots */}
        <div className="glassy-loader-dots">
          <span />
          <span />
          <span />
        </div>

        {message ? <p className="glassy-loader-text">{message}</p> : null}
      </div>
    </div>
  );
};
