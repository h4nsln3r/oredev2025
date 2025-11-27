import { useEffect, useState } from "react";
import { useTransition } from "react";
import { Vehicle } from "../types";
import { fetchVehicles } from "../api";

// Polyfill for useTransition if needed (simplified version for demo)
function useSimpleTransition() {
  const [isPending, setIsPending] = useState(false);

  const startTransition = (callback: () => Promise<void>) => {
    setIsPending(true);
    callback().finally(() => setIsPending(false));
  };

  return [isPending, startTransition] as const;
}

export const useOptimisticVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate optimistic update
  const optimisticAddVehicle = async (vehicle: Omit<Vehicle, "id">) => {
    const optimisticVehicle: Vehicle = {
      ...vehicle,
      id: Math.max(...vehicles.map((v) => v.id), 0) + 1,
    };

    // Optimistic update - show immediately
    setVehicles((prev) => [...prev, optimisticVehicle]);
    setIsPending(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In real app, would fetch fresh data
    } catch (err) {
      setError((err as Error).message);
      // Rollback
      setVehicles((prev) => prev.filter((v) => v.id !== optimisticVehicle.id));
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await fetchVehicles({ headers: { delay: "300" } });
        setVehicles(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    loadVehicles();
  }, []);

  return { vehicles, isPending, error, optimisticAddVehicle };
};
