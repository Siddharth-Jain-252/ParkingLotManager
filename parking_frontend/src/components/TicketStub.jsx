export default function TicketStub({ ticket, onDismiss }) {
  if (!ticket) return null;

  const entry = ticket.entryTime ? new Date(ticket.entryTime) : null;

  return (
    <div className="relative rounded-sm border border-asphalt-600 bg-asphalt-800 shadow-lg shadow-black/30">
      <div className="flex items-start justify-between gap-4 px-5 pt-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-chalk-dim">Ticket issued</p>
          <p className="font-display text-lg font-semibold text-paint">{ticket.ticketNumber}</p>
        </div>
        <button
          onClick={onDismiss}
          className="rounded-sm border border-asphalt-600 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-chalk-dim hover:border-chalk-dim hover:text-chalk"
        >
          Dismiss
        </button>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 px-5 py-5 font-mono text-xs">
        <Row label="Owner" value={ticket.ownerName} />
        <Row label="Plate" value={ticket.licensePlate} />
        <Row label="Vehicle" value={ticket.vehicleType} />
        <Row label="Lot" value={ticket.parkingLotName} />
        <Row label="Stall" value={ticket.slotNumber ?? "—"} />
        <Row
          label="Entry"
          value={entry ? entry.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}
        />
      </dl>

      {/* perforated tear line */}
      <div className="h-3 ticket-perforation" aria-hidden="true" />

      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-chalk-dim">Rate due on exit</span>
        <span className="font-display text-2xl font-semibold text-led-green led-glow-green">
          {ticket.amount != null ? `$${ticket.amount.toFixed(2)}` : "—"}
        </span>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div>
      <dt className="text-chalk-dim">{label}</dt>
      <dd className="mt-0.5 text-chalk">{value || "—"}</dd>
    </div>
  );
}
