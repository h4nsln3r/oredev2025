import React, { useState } from "react";
import { useVehiclesQueryWithSpinnerDelay } from "../hooks/useVehiclesQueryWithSpinnerDelay";
import { useVehicleQueryWithInitialData } from "../hooks/useVehicleQueryWithInitialData";

export const Example3InitialDataStaleTime: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const vehiclesQuery = useVehiclesQueryWithSpinnerDelay();
  const vehicleQuery = useVehicleQueryWithInitialData(selectedId);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Example 3: initialData & staleTime</h1>
        <p style={styles.subtitle}>
          Show instant data from cache, then refresh in background
        </p>
      </div>

      <div style={styles.actionPoints}>
        <h3>Action Points:</h3>
        <ul>
          <li>✓ Use skeleton screens for short, frequent loading states</li>
          <li>✓ Provide initialData from parent query results</li>
          <li>✓ Set staleTime to reduce unnecessary refetches</li>
          <li>✓ UI feels instant while data refreshes in background</li>
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
                    selectedId === `${vehicle.id}` ? "#ff6b6b" : "#f0f0f0",
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
        <h3>Selected Vehicle Detail</h3>
        {vehicleQuery.error && (
          <div style={styles.error}>
            Error: {(vehicleQuery.error as Error).message}
          </div>
        )}
        {vehicleQuery.data ? (
          <div
            style={{
              ...styles.card,
              opacity: vehicleQuery.isLoading ? 0.6 : 1,
              transition: "opacity 0.2s",
            }}
          >
            <h3>{vehicleQuery.data.name}</h3>
            <p>
              <strong>Brand:</strong> {vehicleQuery.data.brand}
            </p>
            <p>
              <strong>Year:</strong> {vehicleQuery.data.year}
            </p>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              {vehicleQuery.isLoading
                ? "🔄 Refreshing data in background..."
                : "✓ Data from cache (2 min stale time)"}
            </p>
          </div>
        ) : vehicleQuery.isLoading ? (
          <div style={styles.skeleton}>
            <div style={styles.skeletonLine} />
            <div style={{ ...styles.skeletonLine, width: "80%" }} />
            <div style={{ ...styles.skeletonLine, width: "60%" }} />
          </div>
        ) : null}
      </div>

      <div style={styles.codeBlock}>
        <h3>Key Code:</h3>
        <pre>{`export const useFetchVehicle = (vehicleId: string | undefined) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: () => fetchVehicle(vehicleId),
    // Show instant data from vehicles list
    initialData: () => {
      const queries = queryClient.getQueriesData({
        queryKey: ['vehicles'],
      });
      if (queries[0]) {
        const [, vehicles] = queries[0];
        return vehicles?.find(v => v.id === vehicleId);
      }
    },
    // Don't refetch for 2 minutes
    staleTime: 2 * 60 * 1000,
  });
};`}</pre>
      </div>

      <div style={styles.benefits}>
        <h3>Benefits:</h3>
        <ul>
          <li>⚡ Data appears instantly (no loading state)</li>
          <li>🔄 Fresh data fetched in background automatically</li>
          <li>💾 2-minute cache prevents unnecessary requests</li>
          <li>✨ Smooth user experience with skeleton screens</li>
        </ul>
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
    backgroundColor: "#ffe0e0",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "2rem",
    borderLeft: "4px solid #ff6b6b",
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
  skeleton: {
    backgroundColor: "#f5f5f5",
    padding: "1.5rem",
    borderRadius: "8px",
  },
  skeletonLine: {
    height: "1rem",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    marginBottom: "0.75rem",
    animation: "pulse 1.5s infinite",
  },
  codeBlock: {
    backgroundColor: "#1e1e1e",
    color: "#d4d4d4",
    padding: "1rem",
    borderRadius: "4px",
    overflow: "auto",
    fontSize: "0.85rem",
    marginBottom: "2rem",
  },
  benefits: {
    backgroundColor: "#e8f5e9",
    padding: "1rem",
    borderRadius: "8px",
    borderLeft: "4px solid #28a745",
  },
};
