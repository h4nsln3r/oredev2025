import React from "react";
import { useOptimisticVehicles } from "../hooks/useOptimisticVehicles";

export const Example4Optimistic: React.FC = () => {
  const { vehicles, isPending, error, optimisticAddVehicle } =
    useOptimisticVehicles();
  const [name, setName] = React.useState("");
  const [brand, setBrand] = React.useState("");

  const handleAdd = async () => {
    if (name && brand) {
      await optimisticAddVehicle({
        name,
        brand,
        year: new Date().getFullYear(),
      });
      setName("");
      setBrand("");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Example 4: Optimistic Updates</h1>
        <p style={styles.subtitle}>
          Update UI immediately, then sync with server in background
        </p>
      </div>

      <div style={styles.actionPoints}>
        <h3>Action Points:</h3>
        <ul>
          <li>✓ Use animations to mask waiting and reduce perceived delay</li>
          <li>✓ Update UI optimistically before server confirms</li>
          <li>✓ Rollback if server request fails</li>
          <li>✓ Focus on user perception — not just DevTools metrics</li>
        </ul>
      </div>

      <div style={styles.form}>
        <h3>Add New Vehicle</h3>
        <input
          type="text"
          placeholder="Vehicle name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isPending}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          disabled={isPending}
          style={styles.input}
        />
        <button
          onClick={handleAdd}
          disabled={isPending || !name || !brand}
          style={{
            ...styles.button,
            opacity: isPending ? 0.6 : 1,
          }}
        >
          {isPending ? "🔄 Adding..." : "➕ Add Vehicle"}
        </button>
      </div>

      {error && <div style={styles.error}>Error: {error}</div>}

      <div style={styles.result}>
        <h3>Vehicles ({vehicles.length})</h3>
        <div style={styles.vehicleList}>
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              style={{
                ...styles.vehicleCard,
                opacity: isPending ? 0.7 : 1,
                animation: isPending ? "fadeIn 0.3s" : "none",
              }}
            >
              <h4>{vehicle.name}</h4>
              <p>
                <strong>Brand:</strong> {vehicle.brand}
              </p>
              <p>
                <strong>Year:</strong> {vehicle.year}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.codeBlock}>
        <h3>Key Concept:</h3>
        <pre>{`// Optimistic update
const optimisticAddVehicle = async (vehicle: Vehicle) => {
  // 1. Update UI immediately
  setVehicles(prev => [...prev, { ...vehicle, id: generateId() }]);
  setIsPending(true);

  try {
    // 2. Send to server
    await api.addVehicle(vehicle);
    // Success - data persisted!
  } catch (err) {
    // 3. Rollback on error
    setVehicles(prev => prev.filter(v => v.id !== vehicle.id));
  } finally {
    setIsPending(false);
  }
};`}</pre>
      </div>

      <div style={styles.comparison}>
        <h3>Traditional vs Optimistic:</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Traditional</th>
              <th>Optimistic</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1️⃣ Show loading spinner</td>
              <td>1️⃣ Update UI immediately</td>
            </tr>
            <tr>
              <td>2️⃣ Wait for server response</td>
              <td>2️⃣ Send to server in background</td>
            </tr>
            <tr>
              <td>3️⃣ Update UI when done</td>
              <td>3️⃣ Rollback if needed</td>
            </tr>
            <tr>
              <td>User feels waiting</td>
              <td>✨ Feels instant!</td>
            </tr>
          </tbody>
        </table>
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
    borderBottom: "2px solid #ffc107",
    paddingBottom: "1rem",
    marginBottom: "2rem",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666",
    marginTop: "0.5rem",
  },
  actionPoints: {
    backgroundColor: "#fff8e1",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "2rem",
    borderLeft: "4px solid #ffc107",
  },
  form: {
    backgroundColor: "#f5f5f5",
    padding: "1.5rem",
    borderRadius: "8px",
    marginBottom: "2rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#ffc107",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "all 0.2s",
  },
  error: {
    color: "#d32f2f",
    padding: "1rem",
    backgroundColor: "#ffebee",
    borderRadius: "4px",
    marginBottom: "2rem",
  },
  result: {
    marginBottom: "2rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid #eee",
  },
  vehicleList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  vehicleCard: {
    backgroundColor: "#f5f5f5",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
  comparison: {
    backgroundColor: "#e3f2fd",
    padding: "1.5rem",
    borderRadius: "8px",
    borderLeft: "4px solid #2196f3",
  },
  table: {
    width: "100%",
    marginTop: "1rem",
    borderCollapse: "collapse",
  },
};
