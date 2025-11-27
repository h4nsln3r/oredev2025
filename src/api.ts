import { Vehicle } from "./types";

const VEHICLES: Vehicle[] = [
  { id: 1, name: "Model S", brand: "Tesla", year: 2022 },
  { id: 2, name: "XC40 Recharge", brand: "Volvo", year: 2023 },
  { id: 3, name: "ID.4", brand: "Volkswagen", year: 2021 },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchVehicles = async (options?: {
  headers?: { delay?: string };
}) => {
  const delay = Number(options?.headers?.delay ?? "500");
  await sleep(delay);
  return VEHICLES;
};

export const fetchVehicle = async (
  vehicleId: string | undefined,
  options?: { headers?: { delay?: string } }
) => {
  const delay = Number(options?.headers?.delay ?? "500");
  await sleep(delay);

  const id = Number(vehicleId);
  const vehicle = VEHICLES.find((v) => v.id === id);
  if (!vehicle) {
    throw new Error("Vehicle not found");
  }
  return vehicle;
};
