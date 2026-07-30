import { useState } from "react";

export default function ReleasePanel({ parkingLotName, onRelease }) {
  const [slotNumber, setSlotNumber] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!slotNumber.trim()) return;

    setStatus("submitting");
    setMessage("");
    try {
      await onRelease(slotNumber.trim().toUpperCase());
      setStatus("done");
      setMessage(`Stall ${slotNumber.trim().toUpperCase()} is open again.`);
      setSlotNumber("");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Couldn't release that stall.");
    }
  }

  return (
    <div className="rounded-sm border border-asphalt-600 bg-asphalt-800 p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-chalk-dim">Vehicle exiting</p>
      <p className="mt-1 font-display text-lg font-semibold text-chalk">Release a stall</p>
      <p className="mt-1 text-xs text-chalk-dim">
        Free up a stall in <span className="text-chalk">{parkingLotName || "—"}</span> once the vehicle leaves.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
        <input
          value={slotNumber}
          onChange={(e) => setSlotNumber(e.target.value)}
          placeholder="Stall no. e.g. A1"
          disabled={!parkingLotName}
          className="input flex-1 font-mono uppercase"
        />
        <button
          type="submit"
          disabled={!parkingLotName || status === "submitting"}
          className="rounded-sm border border-led-green-dim bg-led-green/10 px-4 py-2 font-display text-sm uppercase tracking-wide text-led-green transition hover:bg-led-green/20 disabled:opacity-50"
        >
          {status === "submitting" ? "Releasing…" : "Release"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 font-mono text-xs ${status === "error" ? "text-led-red" : "text-led-green"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
