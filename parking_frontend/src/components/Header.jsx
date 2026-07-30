export default function Header({ lots, selectedLot, onSelectLot, openCount, loading }) {
  const isFull = !loading && openCount === 0;

  return (
    <header className="border-b border-asphalt-700 bg-asphalt-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-2xl font-semibold uppercase tracking-wide text-chalk">
            Gate <span className="text-paint">&amp;</span> Grid
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-widest text-chalk-dim sm:inline">
            Parking Ops Console
          </span>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-chalk-dim">Lot</span>
            <select
              value={selectedLot ?? ""}
              onChange={(e) => onSelectLot(e.target.value)}
              className="rounded-sm border border-asphalt-600 bg-asphalt-800 px-3 py-1.5 font-display text-sm uppercase tracking-wide text-chalk outline-none focus-visible:ring-2 focus-visible:ring-paint"
            >
              {lots.length === 0 && <option value="">No lots</option>}
              {lots.map((lot) => (
                <option key={lot} value={lot}>
                  {lot}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center gap-2 rounded-sm border border-asphalt-600 bg-asphalt-950 px-3 py-1.5">
            <span
              className={`h-2 w-2 rounded-full ${isFull ? "bg-led-red" : "bg-led-green"} animate-flicker`}
              aria-hidden="true"
            />
            <span className="font-mono text-xs uppercase tracking-widest text-chalk-dim">
              {loading ? "—" : isFull ? "Full" : "Open"}
            </span>
            <span
              className={`font-display text-xl font-semibold ${
                isFull ? "text-led-red led-glow-red" : "text-led-green led-glow-green"
              }`}
            >
              {loading ? "··" : openCount}
            </span>
            <span className="font-mono text-xs text-chalk-dim">spaces</span>
          </div>
        </div>
      </div>
    </header>
  );
}
