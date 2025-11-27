import React, { useState } from "react";

const skeletonStyles = `
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  
  .skeleton {
    background: linear-gradient(
      90deg,
      #e0e0e0 25%,
      #f0f0f0 50%,
      #e0e0e0 75%
    );
    background-size: 1000px 100%;
    animation: shimmer 2s infinite;
    border-radius: 8px;
  }
  
  .skeleton-image {
    width: 100%;
    height: 200px;
  }
  
  .skeleton-text {
    width: 100%;
    height: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .skeleton-text-short {
    width: 60%;
    height: 1rem;
    margin-bottom: 0.5rem;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .fade-in {
    animation: fadeIn 0.4s ease-in;
  }
`;

interface SkeletonCard {
  id: string;
        title: string;
        imageUrl: string;
        loaded: boolean;
      }

      export const Example3SkeletonScreens: React.FC = () => {
        const [cards, setCards] = useState<SkeletonCard[]>([
          {
            id: "1",
            title: "Mountain Vista",
            imageUrl: "https://picsum.photos/300/200?random=1",
            loaded: false,
          },
          {
            id: "2",
            title: "Ocean Waves",
            imageUrl: "https://picsum.photos/300/200?random=2",
            loaded: false,
          },
          {
            id: "3",
            title: "Forest Path",
            imageUrl: "https://picsum.photos/300/200?random=3",
            loaded: false,
          },
          {
            id: "4",
            title: "Desert Dunes",
            imageUrl: "https://picsum.photos/300/200?random=4",
            loaded: false,
          },
        ]);

        const handleImageLoad = (id: string) => {
          setCards((prev) =>
            prev.map((card) => (card.id === id ? { ...card, loaded: true } : card))
          );
        };

        return (
          <div style={styles.container}>
            <style>{skeletonStyles}</style>

            <div style={styles.header}>
              <h1>Example 3: Skeleton Screens</h1>
              <p style={styles.subtitle}>
                Grey placeholders that reduce uncertainty while content loads
              </p>
            </div>

            <div style={styles.actionPoints}>
              <h3>Why Skeleton Screens?</h3>
              <ul>
                <li>✓ Reduce uncertainty — users see where content will appear</li>
                <li>✓ Preserve layout stability — no jumping or shifting</li>
                <li>✓ Communicate "this is loading" calmly and elegantly</li>
                <li>✓ Best for content that loads in under 1 second</li>
                <li>✓ Feel more sophisticated than plain spinners</li>
              </ul>
            </div>

            <div style={styles.insight}>
              <h3>💡 Key Insight:</h3>
              <p>
                A skeleton screen isn't just a visual placeholder — it's a
                <strong> psychological signal</strong>. It tells users "your content
                is coming" without making them anxious about waiting.
              </p>
            </div>

            <div style={styles.demo}>
              <h3>📸 Loading Images with Skeleton Screens</h3>
              <p style={styles.demoDescription}>
                Each card shows a skeleton while the image loads, then smoothly fades
                in. Notice how the layout doesn't jump — the space is reserved before
                content arrives.
              </p>

              <div style={styles.cardGrid}>
                {cards.map((card) => (
                  <div key={card.id} style={styles.card}>
                    {/* Skeleton shown while image loads */}
                    {!card.loaded && (
                      <div
                        className="skeleton skeleton-image"
                        style={styles.skeletonOverlay}
                      />
                    )}

                    {/* Actual image, hidden until loaded */}
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      onLoad={() => handleImageLoad(card.id)}
                      style={{
                        ...styles.image,
                        opacity: card.loaded ? 1 : 0,
                      }}
                      className={card.loaded ? "fade-in" : ""}
                    />

                    {/* Card content */}
                    <div style={styles.cardContent}>
                      <h4 style={styles.cardTitle}>{card.title}</h4>
                      <p style={styles.cardDescription}>
                        {card.loaded ? "Content ready!" : "Loading image..."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle list skeletons (preserve layout from vehicles demo, but show only skeletons) */}
            <div style={styles.vehicleSkeletonSection}>
              <h3>🚗 Vehicle List — Skeleton Only</h3>
              <p style={styles.demoDescription}>
                The same card layout used for vehicles, but shown as skeletons to
                reserve space and reduce layout shift while data loads.
              </p>

              <div style={styles.vehicleListGridSkeleton}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={styles.vehicleSkeletonCard}>
                    <div style={{ display: "flex", gap: 12, padding: "0.75rem" }}>
                      <div
                        className="skeleton"
                        style={{ width: 80, height: 56, borderRadius: 6 }}
                      />
                      <div style={{ flex: 1 }}>
                        <div
                          className="skeleton"
                          style={{ height: 16, width: "60%", marginBottom: 8 }}
                        />
                        <div
                          className="skeleton"
                          style={{ height: 12, width: "40%", marginBottom: 6 }}
                        />
                        <div className="skeleton" style={{ height: 12, width: "30%" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.comparison}>
              <h3>🎯 Skeleton vs Spinner</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Spinner</th>
                    <th>Skeleton Screen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Abstract, generic animation</td>
                    <td>Contextual, shows actual layout</td>
                  </tr>
                  <tr>
                    <td>Takes space in center</td>
                    <td>Occupies reserved content space</td>
                  </tr>
                  <tr>
                    <td>Feels like "please wait"</td>
                    <td>Feels like "almost ready"</td>
                  </tr>
                  <tr>
                    <td>Good for 500ms+ waits</td>
                    <td>Best for sub-1-second loads</td>
                  </tr>
                  <tr>
                    <td>Can feel impatient</td>
                    <td>Calm and intentional</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={styles.tips}>
              <h3>💡 Pro Tips for Skeleton Screens</h3>
              <ul style={styles.tipsList}>
                <li>
                  <strong>Match the actual layout:</strong> Your skeleton should look
                  like the real content shape
                </li>
                <li>
                  <strong>Use subtle animation:</strong> Shimmer effects help convey
                  "loading" without being jarring
                </li>
                <li>
                  <strong>Time matters:</strong> Don't show skeletons for
                  instant-loading content (&lt;200ms)
                </li>
                <li>
                  <strong>Combine with real data:</strong> Use skeleton for unknown
                  content, real text/images for known data
                </li>
                <li>
                  <strong>Test with real users:</strong> Perception varies — measure
                  what feels best
                </li>
              </ul>
            </div>

            <div style={styles.codeBlock}>
              <h3>Implementation Pattern:</h3>
              <pre>{`// Show skeleton while loading
      {!loaded ? (
        <div className="skeleton" style={skeletonStyle} />
      ) : (
        <img
          src={url}
          onLoad={() => setLoaded(true)}
          className="fade-in"
        />
      )}

      // CSS for shimmer effect
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }

      .skeleton {
        background: linear-gradient(90deg, #e0e0e0, #f0f0f0, #e0e0e0);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
      }`}</pre>
            </div>
          </div>
        );
      };

      const styles: Record<string, React.CSSProperties> = {
        container: {
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem",
          fontFamily: "system-ui, -apple-system, sans-serif",
        },
        header: {
          borderBottom: "2px solid #ff6b6b",
          paddingBottom: "1rem",
          marginBottom: "2rem",
        },
        subtitle: {
          fontSize: "1rem",
          color: "#666",
          marginTop: "0.5rem",
        },
        actionPoints: {
          backgroundColor: "#ffe8e8",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "2rem",
          borderLeft: "4px solid #ff6b6b",
        },
        insight: {
          backgroundColor: "#fff3e0",
          padding: "1.5rem",
          borderRadius: "8px",
          borderLeft: "4px solid #ff9800",
          marginBottom: "2rem",
        },
        demo: {
          marginBottom: "3rem",
        },
        demoDescription: {
          color: "#666",
          marginBottom: "1.5rem",
          fontSize: "0.95rem",
        },
        cardGrid: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        },
        card: {
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
        skeletonOverlay: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
        },
        image: {
          width: "100%",
          height: "200px",
          objectFit: "cover",
          transition: "opacity 0.3s ease-in",
        },
        cardContent: {
          padding: "1rem",
        },
        cardTitle: {
          margin: "0.5rem 0",
          fontSize: "1rem",
        },
        cardDescription: {
          margin: "0.5rem 0 0 0",
          color: "#888",
          fontSize: "0.85rem",
        },
        comparison: {
          backgroundColor: "#e3f2fd",
          padding: "1.5rem",
          borderRadius: "8px",
          borderLeft: "4px solid #2196f3",
          marginBottom: "2rem",
        },
        table: {
          width: "100%",
          marginTop: "1rem",
          borderCollapse: "collapse",
        },
        tips: {
          backgroundColor: "#e8f5e9",
          padding: "1.5rem",
          borderRadius: "8px",
          borderLeft: "4px solid #4caf50",
          marginBottom: "2rem",
        },
        tipsList: {
          listStyle: "none",
          padding: 0,
          marginTop: "1rem",
        },
        codeBlock: {
          backgroundColor: "#1e1e1e",
          color: "#d4d4d4",
          padding: "1.5rem",
          borderRadius: "8px",
          overflow: "auto",
          fontSize: "0.85rem",
        },
        /* Styles for vehicle skeleton section */
        vehicleSkeletonSection: {
          marginTop: "2rem",
          marginBottom: "2rem",
        },
        vehicleListGridSkeleton: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        },
        vehicleSkeletonCard: {
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          overflow: "hidden",
        },
      };
