import React, { useState } from "react";
import { useVehiclesQueryWithSpinnerDelay } from "../hooks/useVehiclesQueryWithSpinnerDelay";
import { useVehicleQueryWithInitialData } from "../hooks/useVehicleQueryWithInitialData";

export const Example2QueryWithSpinnerDelay: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const vehiclesQuery = useVehiclesQueryWithSpinnerDelay();
  const vehicleQuery = useVehicleQueryWithInitialData(selectedId);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Example 2: useQuery with Spinner Delay</h1>
        <p style={styles.subtitle}>
          Use React Query with 300ms delay before showing loading indicator
        </p>
      </div>

      <div style={styles.actionPoints}>
        <h3>Action Points:</h3>
        <ul>
          <li>✓ Show loading spinner only after 300ms</li>
          <li>✓ Use React Query for data fetching</li>
          <li>✓ Initial data from vehicles list (instant display)</li>
          <li>✓ Stale time prevents unnecessary refetches</li>
        </ul>
      </div>

      <div style={styles.vehicles}>
        <h3>
          All Vehicles{" "}
          {vehiclesQuery.isLoading && (
            <span style={{ color: "#007bff" }}>🔄 Loading...</span>
          )}
        </h3>
        {vehiclesQuery.error && (
          <div style={styles.error}>
            Error: {(vehiclesQuery.error as Error).message}
          </div>
        )}
        {vehiclesQuery.data && (
          <div style={styles.buttonGroup}>
            {vehiclesQuery.data.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => setSelectedId(`${vehicle.id}`)}
                style={{
                  ...styles.button,
                  backgroundColor:
                    selectedId === `${vehicle.id}` ? "#007bff" : "#f0f0f0",
                  color: selectedId === `${vehicle.id}` ? "white" : "black",
                }}
              >
                {vehicle.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={styles.result}>
        <h3>
          Selected Vehicle Detail{" "}
          {vehicleQuery.isLoading && (
            <span style={{ color: "#007bff" }}>🔄 Loading...</span>
          )}
        </h3>
        {vehicleQuery.error && (
          <div style={styles.error}>
            Error: {(vehicleQuery.error as Error).message}
          </div>
        )}
        {vehicleQuery.data && (
          <div style={styles.card}>
            <h3>{vehicleQuery.data.name}</h3>
            <p>
              <strong>Brand:</strong> {vehicleQuery.data.brand}
            </p>
            <p>
              <strong>Year:</strong> {vehicleQuery.data.year}
            </p>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              ℹ️ Initial data shown instantly from vehicles list, then refetched
              for fresh data
            </p>
          </div>
        )}
        {!vehicleQuery.data && selectedId && !vehicleQuery.isLoading && (
          <div style={styles.empty}>No vehicle found</div>
        )}
      </div>

      <div style={styles.codeBlock}>
        <h3>Key Code:</h3>
        <pre>{`// Show loading only after 300ms delay
useEffect(() => {
  let timer: ReturnType<typeof setTimeout>;

  if (query.isLoading) {
    timer = setTimeout(() => {
      setShowLoading(true);
    }, 300);
  } else {
    setShowLoading(false);
  }

  return () => clearTimeout(timer);
}, [query.isLoading]);

return { ...query, isLoading: showLoading };`}</pre>
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
    borderBottom: "2px solid #28a745",
    paddingBottom: "1rem",
    marginBottom: "2rem",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666",
    marginTop: "0.5rem",
  },
  actionPoints: {
    backgroundColor: "#e8f5e9",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "2rem",
    borderLeft: "4px solid #28a745",
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
    fontSize: "0.85rem",
  },
};
