const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/parking";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.text();
      if (body) message = body;
    } catch {
      // ignore body parse failure, keep default message
    }
    throw new Error(message);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  ping: () => request("/test"),

  getLots: () => request("/lot"),

  getVehicleTypes: () => request("/vehiclesTypes"),

  getEmptySlots: (parkingLotName) =>
    request(`/slots?parkingLotName=${encodeURIComponent(parkingLotName)}`),

  registerVehicle: (vehicleDTO) =>
    request("/vehicle", {
      method: "POST",
      body: JSON.stringify(vehicleDTO),
    }),

  // NOTE: the backend currently maps this as @GetMapping with a @RequestBody,
  // which a browser cannot send (GET requests can't carry a body). This client
  // calls it as POST — the controller needs @PostMapping("/ticket") to match.
  createTicket: (ticketRequestDTO) =>
    request("/ticket", {
      method: "POST",
      body: JSON.stringify(ticketRequestDTO),
    }),

  releaseSlot: (parkingLotName, slotNumber) =>
    request(
      `/deleteSlot?parkingLotName=${encodeURIComponent(parkingLotName)}&slotNumber=${encodeURIComponent(slotNumber)}`,
      { method: "DELETE" }
    ),
};