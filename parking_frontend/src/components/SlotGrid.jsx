export default function SlotGrid({ slots, loading, error, onSelectSlot }) {
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-4/3 animate-pulse rounded-sm border border-asphalt-700 bg-asphalt-800" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-sm border border-led-red-dim bg-asphalt-800 px-4 py-3 font-mono text-sm text-led-red">
        Couldn't load stalls — {error}
      </p>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-asphalt-600 px-4 py-10 text-center">
        <p className="font-display text-lg uppercase tracking-wide text-chalk-dim">Lot full</p>
        <p className="mt-1 font-mono text-xs text-chalk-dim">No open stalls reported for this lot right now.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {slots.map((slot) => (
        <button
          key={slot.id}
          onClick={() => onSelectSlot(slot)}
          className="group relative aspect-4/3 overflow-hidden rounded-sm border-2 border-led-green-dim bg-asphalt-800 text-left transition hover:border-led-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paint"
        >
          {/* painted stall lines */}
          <span className="absolute inset-y-0 left-2 w-px bg-chalk/15" aria-hidden="true" />
          <span className="absolute inset-y-0 right-2 w-px bg-chalk/15" aria-hidden="true" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-led-green" aria-hidden="true" />
          <span className="flex h-full flex-col items-center justify-center gap-1">
            <span className="font-display text-2xl font-semibold text-chalk group-hover:text-led-green">
              {slot.slotNumber}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-chalk-dim">Open</span>
          </span>
        </button>
      ))}
    </div>
  );
}
