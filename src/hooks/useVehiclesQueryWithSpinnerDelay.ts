import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicles } from "../api";

export const useVehiclesQueryWithSpinnerDelay = () => {
  const [showLoading, setShowLoading] = useState(false);

  const query = useQuery({
    queryKey: ["vehicles"],
    queryFn: () =>
      fetchVehicles({
        headers: {
          delay: "250",
        },
      }),
  });

  // Show loading spinner only after 300ms
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (query.isLoading) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 300);
    } else {
      setShowLoading(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [query.isLoading]);

  return { ...query, isLoading: showLoading };
};
