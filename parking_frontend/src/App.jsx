import { useEffect, useState, useCallback } from "react";
import { api } from "./api";
import Header from "./components/Header";
import SlotGrid from "./components/SlotGrid";
import CheckInDrawer from "./components/CheckInDrawer";
import TicketStub from "./components/TicketStub";
import ReleasePanel from "./components/ReleasePanel";

export default function App() {
  const [lots, setLots] = useState([]);
  const [selectedLot, setSelectedLot] = useState("");
  const [vehicleTypes, setVehicleTypes] = useState([]);

  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState("");

  const [activeSlot, setActiveSlot] = useState(null);
  const [lastTicket, setLastTicket] = useState(null);
  const [connectionError, setConnectionError] = useState("");

  // Initial load: lots + vehicle types
  useEffect(() => {
    api
      .getLots()
      .then((data) => {
        setLots(data ?? []);
        if (data && data.length > 0) setSelectedLot(data[0]);
      })
      .catch((err) => setConnectionError(err.message));

    api.getVehicleTypes().then(setVehicleTypes).catch(() => setVehicleTypes(["CAR", "BIKE", "TRUCK"]));
  }, []);

  const loadSlots = useCallback(() => {
    if (!selectedLot) return;
    setSlotsLoading(true);
    setSlotsError("");
    api
      .getEmptySlots(selectedLot)
      .then((data) => setSlots(data ?? []))
      .catch((err) => setSlotsError(err.message))
      .finally(() => setSlotsLoading(false));
  }, [selectedLot]);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  async function handleCheckedIn(ticketRequestDTO) {
    // Best-effort vehicle registration — a repeat plate will fail the unique
    // constraint on the backend, which is fine, we proceed to ticketing anyway.
    try {
      await api.registerVehicle(ticketRequestDTO.vehicleDTO);
    } catch {
      // vehicle likely already registered — continue to ticket issuance
    }

    const ticket = await api.createTicket(ticketRequestDTO);
    setLastTicket(ticket);
    setActiveSlot(null);
    loadSlots();
  }

  async function handleRelease(slotNumber) {
    await api.releaseSlot(selectedLot, slotNumber);
    loadSlots();
  }

  return (
    <div className="min-h-screen">
      <Header
        lots={lots}
        selectedLot={selectedLot}
        onSelectLot={setSelectedLot}
        openCount={slots.length}
        loading={slotsLoading}
      />

      <main className="mx-auto max-w-6xl px-5 py-8">
        {connectionError && (
          <p className="mb-6 rounded-sm border border-led-red-dim bg-asphalt-800 px-4 py-3 font-mono text-sm text-led-red">
            Can't reach the API at the configured base URL — {connectionError}. Set{" "}
            <code className="text-chalk">VITE_API_BASE_URL</code> if the backend isn't on localhost:8080.
          </p>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section>
            <div className="mb-4 flex items-baseline justify-between">
              <h1 className="font-display text-xl font-semibold uppercase tracking-wide text-chalk">
                Open stalls {selectedLot && <span className="text-chalk-dim">— {selectedLot}</span>}
              </h1>
              <button
                onClick={loadSlots}
                className="font-mono text-xs uppercase tracking-widest text-chalk-dim hover:text-paint"
              >
                Refresh
              </button>
            </div>
            <SlotGrid slots={slots} loading={slotsLoading} error={slotsError} onSelectSlot={setActiveSlot} />
          </section>

          <aside className="flex flex-col gap-6">
            <ReleasePanel parkingLotName={selectedLot} onRelease={handleRelease} />
            {lastTicket && <TicketStub ticket={lastTicket} onDismiss={() => setLastTicket(null)} />}
          </aside>
        </div>
      </main>

      <CheckInDrawer
        slot={activeSlot}
        parkingLotName={selectedLot}
        vehicleTypes={vehicleTypes}
        onClose={() => setActiveSlot(null)}
        onCheckedIn={handleCheckedIn}
      />
    </div>
  );
}
