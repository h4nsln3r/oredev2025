import { useState, useEffect } from "react";
import { fetchVehicle } from "../api";
import { Vehicle } from "../types";

export const useVehicleTimeoutFetch = (vehicleId: string | undefined) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const init = async () => {
      try {
        setVehicle(null);
        setError(null);
        // Delay spinner by 300ms to avoid "instant slowness"
        timer = setTimeout(() => {
          setLoading(true);
        }, 300);
        const data = await fetchVehicle(vehicleId);
        setVehicle(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        if (timer) clearTimeout(timer);
        setLoading(false);
      }
    };

    if (vehicleId) {
      init();
    }
  }, [vehicleId]);

  return { vehicle, loading, error };
};
