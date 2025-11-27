import React, { useState } from "react";

const spinnerStyles = `
  @keyframes spinSlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes spinFast {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .spinner-slow {
    display: inline-block;
    width: 60px;
    height: 60px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #4caf50;
    border-radius: 50%;
    animation: spinSlow 2s linear infinite;
  }
  
  .spinner-fast {
    display: inline-block;
    width: 60px;
    height: 60px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #ff6b6b;
    border-radius: 50%;
    animation: spinFast 0.6s linear infinite;
  }
`;

export const Example5FastVsSlow: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSpinner, setSelectedSpinner] = useState<"fast" | "slow">(
    "fast"
  );

  const startDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div style={styles.container}>
      <style>{spinnerStyles}</style>

      <div style={styles.header}>
        <h1>Example 5: Fast vs Slow Spinners</h1>
        <p style={styles.subtitle}>
          Which one feels faster? Animation speed affects perceived loading time
        </p>
      </div>

      <div style={styles.actionPoints}>
        <h3>The Psychology:</h3>
        <ul>
          <li>✓ A fast-spinning animation feels quicker</li>
          <li>✓ A slow-spinning animation feels like it's taking forever</li>
          <li>✓ Even though the actual wait time is the same!</li>
          <li>✓ Animation speed = perceived performance</li>
        </ul>
      </div>

      <div style={styles.spinnersContainer}>
        <div style={styles.spinnerBox}>
          <h3 style={{ color: "#4caf50" }}>🟢 Fast Spinner</h3>
          <p style={styles.description}>
            Rotates quickly - feels like progress
          </p>
          <div style={styles.spinnerArea}>
            <div className="spinner-fast" />
          </div>
          <p style={styles.speedLabel}>Feels Quick!</p>
        </div>

        <div style={styles.spinnerBox}>
          <h3 style={{ color: "#ff6b6b" }}>🔴 Slow Spinner</h3>
          <p style={styles.description}>Rotates slowly - feels like waiting</p>
          <div style={styles.spinnerArea}>
            <div className="spinner-slow" />
          </div>
          <p style={styles.speedLabel}>Feels Sluggish...</p>
        </div>
      </div>

      <div style={styles.insight}>
        <h3>💡 Key Insight:</h3>
        <p>
          The <strong>same 3-second wait</strong> feels dramatically different
          depending on the spinner animation speed. A fast-rotating spinner
          makes users feel like something is happening, while a slow one feels
          broken or stuck.
        </p>
        <p style={{ marginTop: "1rem" }}>
          <strong>Lesson:</strong> Don't just add spinners—make them feel
          responsive and alive!
        </p>
      </div>

      <div style={styles.controls}>
        <h3>Choose a Spinner:</h3>
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="fast"
              checked={selectedSpinner === "fast"}
              onChange={(e) => setSelectedSpinner(e.target.value as "fast")}
              disabled={isLoading}
            />
            <span>🟢 Fast Spinner</span>
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="slow"
              checked={selectedSpinner === "slow"}
              onChange={(e) => setSelectedSpinner(e.target.value as "slow")}
              disabled={isLoading}
            />
            <span>🔴 Slow Spinner</span>
          </label>
        </div>
      </div>

      <button
        onClick={startDemo}
        disabled={isLoading}
        style={{
          ...styles.demoButton,
          backgroundColor: isLoading ? "#999" : "#007bff",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Loading (3s)..." : "Start Demo (3s)"}
      </button>

      {/* Reserved demo area so you can scroll down before the spinner appears */}
      <div style={styles.demoAreaAlways}>
        {isLoading ? (
          <div style={styles.demoArea}>
            <p style={styles.demoText}>
              {selectedSpinner === "fast"
                ? "Testing fast spinner..."
                : "Testing slow spinner..."}
            </p>
            <div style={styles.spinnerDisplay}>
              {selectedSpinner === "fast" ? (
                <>
                  <div className="spinner-fast" />
                  <p style={styles.spinnerLabel}>⚡ This feels quicker!</p>
                </>
              ) : (
                <>
                  <div className="spinner-slow" />
                  <p style={styles.spinnerLabel}>😴 This feels sluggish...</p>
                </>
              )}
            </div>
          </div>
        ) : (
          <div style={styles.demoPlaceholder}>
            <p style={{ margin: 0, color: "#666" }}>
              Scroll down here before starting the demo.
            </p>
          </div>
        )}
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
    borderBottom: "2px solid #333",
    paddingBottom: "1rem",
    marginBottom: "2rem",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666",
    marginTop: "0.5rem",
  },
  actionPoints: {
    backgroundColor: "#f5f5f5",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "2rem",
    borderLeft: "4px solid #333",
  },
  spinnersContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    marginBottom: "2rem",
  },
  spinnerBox: {
    backgroundColor: "white",
    border: "2px solid #ddd",
    borderRadius: "8px",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  description: {
    color: "#666",
    fontSize: "0.95rem",
    marginTop: "0.5rem",
    marginBottom: "1.5rem",
  },
  spinnerArea: {
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "150px",
  },
  speedLabel: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#333",
    marginTop: "1rem",
  },
  insight: {
    backgroundColor: "#e3f2fd",
    padding: "2rem",
    borderRadius: "8px",
    borderLeft: "4px solid #2196f3",
    marginBottom: "2rem",
  },
  controls: {
    backgroundColor: "#f9f9f9",
    padding: "1.5rem",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    border: "1px solid #ddd",
  },
  radioGroup: {
    display: "flex",
    gap: "2rem",
    marginTop: "1rem",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "bold",
  },
  demoButton: {
    display: "block",
    margin: "0 auto",
    padding: "1rem 2rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "white",
    border: "none",
    borderRadius: "4px",
    transition: "all 0.2s",
  },
  demoArea: {
    marginTop: "2rem",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    textAlign: "center",
  },
  demoText: {
    marginBottom: "1.5rem",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#333",
  },
  spinnerDisplay: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  spinnerLabel: {
    marginTop: "1rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#333",
  },
  demoAreaAlways: {
    marginTop: "2rem",
    minHeight: "260px",
    borderRadius: "8px",
  },
  demoPlaceholder: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    border: "1px dashed #eee",
    color: "#888",
    padding: "1rem",
    borderRadius: "8px",
  },
};
