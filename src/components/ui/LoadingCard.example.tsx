import React, { useState } from 'react';
import { LoadingCard } from './LoadingCard';

/**
 * LoadingCard Usage Examples
 *
 * This file demonstrates various ways to use the LoadingCard component.
 */

export const LoadingCardExamples = () => {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [showInline, setShowInline] = useState(true);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>LoadingCard Component Examples</h1>

      {/* Example 1: Fullscreen Overlay */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Example 1: Fullscreen Overlay (Default)</h2>
        <button onClick={() => setShowFullscreen(!showFullscreen)}>
          {showFullscreen ? 'Hide' : 'Show'} Fullscreen Loading
        </button>
        <LoadingCard show={showFullscreen} />
      </section>

      {/* Example 2: Custom Text */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Example 2: Custom Loading Text</h2>
        <button onClick={() => setShowFullscreen(!showFullscreen)}>
          {showFullscreen ? 'Hide' : 'Show'} Processing
        </button>
        <LoadingCard show={showFullscreen} text="Processing" />
      </section>

      {/* Example 3: Inline (Non-fullscreen) */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Example 3: Inline Loading Card</h2>
        <button onClick={() => setShowInline(!showInline)}>
          {showInline ? 'Hide' : 'Show'} Inline Loading
        </button>
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem',
            background: 'linear-gradient(135deg, #f5f3f0, #faf9f7)',
            borderRadius: '8px',
          }}
        >
          <LoadingCard show={showInline} fullscreen={false} text="Loading" />
        </div>
      </section>

      {/* Example 4: Conditional Loading */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Example 4: Conditional Loading (Async Operation)</h2>
        <AsyncDataExample />
      </section>
    </div>
  );
};

/**
 * Example showing LoadingCard with async data fetching
 */
const AsyncDataExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setData(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setData('Data loaded successfully!');
    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={fetchData} disabled={isLoading}>
        Fetch Data
      </button>

      {data && (
        <p style={{ marginTop: '1rem', color: 'green' }}>✓ {data}</p>
      )}

      <LoadingCard show={isLoading} text="Fetching" />
    </div>
  );
};

/**
 * Example integration in a page component
 */
export const ExamplePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingCard show={isLoading} />

      <div style={{ padding: '2rem' }}>
        <h1>Page Content</h1>
        <p>This content appears after loading completes.</p>
      </div>
    </>
  );
};

export default LoadingCardExamples;
