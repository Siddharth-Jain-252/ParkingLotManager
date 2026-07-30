import { useState } from "react";

export default function CheckInDrawer({ slot, parkingLotName, vehicleTypes, onClose, onCheckedIn }) {
  const [ownerName, setOwnerName] = useState("");
  const [vehicleType, setVehicleType] = useState(vehicleTypes[0] ?? "CAR");
  const [licensePlate, setLicensePlate] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [errorMessage, setErrorMessage] = useState("");

  if (!slot) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      await onCheckedIn({
        vehicleDTO: {
          ownerName: ownerName.trim(),
          vehicleType,
          licensePlate: licensePlate.trim().toUpperCase(),
        },
        parkingLotName,
        slotNumber: slot.slotNumber,
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong issuing the ticket.");
      return;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-asphalt-950/70 backdrop-blur-xs" role="dialog" aria-modal="true">
      <div className="flex h-full w-full max-w-md flex-col border-l border-asphalt-600 bg-asphalt-900">
        <div className="flex items-center justify-between border-b border-asphalt-700 px-6 py-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-chalk-dim">Check in — stall</p>
            <p className="font-display text-2xl font-semibold text-paint">{slot.slotNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm border border-asphalt-600 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-chalk-dim hover:border-chalk-dim hover:text-chalk"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-6">
          <Field label="Owner name">
            <input
              required
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Jordan Rivera"
              className="input"
            />
          </Field>

          <Field label="Vehicle type">
            <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="input">
              {vehicleTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>

          <Field label="License plate">
            <input
              required
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="7ABC123"
              className="input font-mono uppercase"
            />
          </Field>

          {status === "error" && (
            <p className="rounded-sm border border-led-red-dim bg-asphalt-800 px-3 py-2 font-mono text-xs text-led-red">
              {errorMessage}
            </p>
          )}

          <div className="mt-auto flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-sm border border-asphalt-600 py-2.5 font-display text-sm uppercase tracking-wide text-chalk-dim hover:border-chalk-dim hover:text-chalk"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex-1 rounded-sm bg-paint py-2.5 font-display text-sm uppercase tracking-wide text-asphalt-950 transition hover:bg-paint/90 disabled:opacity-50"
            >
              {status === "submitting" ? "Issuing…" : "Issue ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-xs uppercase tracking-widest text-chalk-dim">{label}</span>
      {children}
    </label>
  );
}
