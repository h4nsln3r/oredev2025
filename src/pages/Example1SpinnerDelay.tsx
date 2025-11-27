import React, { useState } from "react";
import { fetchVehicle } from "../api";
import { Vehicle } from "../types";

const spinnerStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .loading-spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
`;

export const Example1SpinnerDelay: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [apiDelay, setApiDelay] = useState(250);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSpinnerInfo, setShowSpinnerInfo] = useState(false);
  const [delaySpinner, setDelaySpinner] = useState(true);

  const loadVehicle = async (vehicleId: string) => {
    setSelectedId(vehicleId);
    setVehicle(null);
    setError(null);
    setShowSpinnerInfo(false);

    // If delaySpinner mode is ON and API delay > 300ms, show spinner immediately
    if (delaySpinner && apiDelay > 300) {
      setLoading(true);
      setShowSpinnerInfo(true);
    }
    // If delaySpinner mode is OFF, show spinner immediately regardless of delay
    else if (!delaySpinner) {
      setLoading(true);
      setShowSpinnerInfo(false);
    }

    try {
      // Fetch data with custom delay
      const data = await fetchVehicle(vehicleId, {
        headers: { delay: `${apiDelay}` },
      });

      setVehicle(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      // Hide loading
      setLoading(false);
    }
  };

  const shouldShowSpinner = loading;

  return (
    <div style={styles.container}>
      <style>{spinnerStyles}</style>
      <div style={styles.header}>
        <h1>Example 1: Delay Spinners by ~300ms</h1>
        <p style={styles.subtitle}>
          Control API delay to see how spinners appear/disappear based on load
          time
        </p>
      </div>

      <div style={styles.actionPoints}>
        <h3>Action Points:</h3>
        <ul>
          <li>✓ Delay spinners by ~300ms to avoid "instant slowness"</li>
          <li>✓ If data loads in &lt;300ms, no spinner shown</li>
          <li>✓ If data takes &gt;300ms, spinner appears smoothly</li>
        </ul>
      </div>

      <div style={styles.controlPanel}>
        <h3>⚙️ API Delay Control</h3>
        <div style={styles.controlGroup}>
          <label>
            API Response Delay: <strong>{apiDelay}ms</strong>
          </label>
          <input
            type="range"
            min="0"
            max="1500"
            step="50"
            value={apiDelay}
            onChange={(e) => setApiDelay(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="delaySpinner"
            checked={delaySpinner}
            onChange={(e) => setDelaySpinner(e.target.checked)}
            style={styles.checkbox}
          />
          <label htmlFor="delaySpinner" style={styles.checkboxLabel}>
            <strong>Delay spinner by 300ms</strong> (only show spinner if load
            takes &gt; 300ms)
          </label>
        </div>
      </div>

      <div style={styles.vehicles}>
        <h3>Select a Vehicle to Load:</h3>
        <div style={styles.buttonGroup}>
          {[1, 2, 3].map((id) => (
            <button
              key={id}
              onClick={() => loadVehicle(`${id}`)}
              disabled={loading}
              style={{
                ...styles.button,
                backgroundColor:
                  selectedId === `${id}` && !loading ? "#007bff" : "#f0f0f0",
                color: selectedId === `${id}` && !loading ? "white" : "black",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              Vehicle {id}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.result}>
        {shouldShowSpinner && (
          <div style={styles.spinnerContainer}>
            <div className="loading-spinner" />
            <div style={styles.spinnerText}>Loading...</div>
          </div>
        )}
        {error && <div style={styles.error}>Error: {error}</div>}
        {vehicle && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>✨ Data Loaded!</div>
            <h3>{vehicle.name}</h3>
            <p>
              <strong>Brand:</strong> {vehicle.brand}
            </p>
            <p>
              <strong>Year:</strong> {vehicle.year}
            </p>
          </div>
        )}
      </div>

      <div style={styles.codeBlock}>
        <h3>Code:</h3>
        <pre>{`// 300ms timeout prevents showing spinner for fast loads
timer = setTimeout(() => {
  setLoading(true);
}, 300);

const data = await fetchVehicle(vehicleId);

// If fetched within 300ms, loading stays false!
if (timer) clearTimeout(timer);`}</pre>
      </div>
    </div>
  );
};
//
const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  header: {
    borderBottom: "2px solid #007bff",
    paddingBottom: "1rem",
    marginBottom: "2rem",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666",
    marginTop: "0.5rem",
  },
  actionPoints: {
    backgroundColor: "#e8f4f8",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "2rem",
    borderLeft: "4px solid #007bff",
  },
  controlPanel: {
    backgroundColor: "#f0f8ff",
    padding: "1.5rem",
    borderRadius: "8px",
    marginBottom: "2rem",
    border: "2px solid #007bff",
  },
  controlGroup: {
    marginTop: "1rem",
  },
  slider: {
    width: "100%",
    height: "8px",
    borderRadius: "4px",
    background: "#ddd",
    outline: "none",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  delayExplanation: {
    padding: "0.75rem",
    borderRadius: "4px",
    backgroundColor: "white",
    fontSize: "0.95rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  checkboxGroup: {
    marginTop: "1.5rem",
    padding: "1rem",
    backgroundColor: "white",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
  },
  checkboxLabel: {
    cursor: "pointer",
    fontSize: "0.95rem",
    margin: 0,
  },
  modeInfo: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#f0f8ff",
    borderRadius: "4px",
    border: "1px solid #007bff",
    fontSize: "0.95rem",
  },
  vehicles: {
    marginBottom: "2rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
    flexWrap: "wrap",
  },
  button: {
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "all 0.2s",
  },
  result: {
    minHeight: "200px",
    marginBottom: "2rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid #eee",
  },
  spinnerContainer: {
    textAlign: "center",
    padding: "2rem",
  },
  spinner: {
    fontSize: "1.5rem",
    color: "#007bff",
    fontWeight: "bold",
    padding: "2rem",
    textAlign: "center",
  },
  spinnerText: {
    fontSize: "1.1rem",
    color: "#007bff",
    fontWeight: "bold",
    marginTop: "1rem",
  },
  spinnerInfo: {
    fontSize: "0.9rem",
    color: "#666",
    padding: "1rem",
    backgroundColor: "#fff3cd",
    borderRadius: "4px",
    marginTop: "1rem",
  },
  error: {
    color: "#d32f2f",
    padding: "1rem",
    backgroundColor: "#ffebee",
    borderRadius: "4px",
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  cardHeader: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: "0.5rem",
  },
  speedInfo: {
    fontSize: "0.9rem",
    color: "#4caf50",
    marginTop: "1rem",
    padding: "0.75rem",
    backgroundColor: "#e8f5e9",
    borderRadius: "4px",
  },
  empty: {
    color: "#999",
    fontSize: "1rem",
    padding: "2rem",
    textAlign: "center",
  },
  codeBlock: {
    backgroundColor: "#1e1e1e",
    color: "#d4d4d4",
    padding: "1rem",
    borderRadius: "4px",
    overflow: "auto",
  },
};
