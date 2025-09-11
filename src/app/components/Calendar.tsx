export default function Calendar() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const first = new Date(y, m, 1);
  const start = first.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = i - start + 1;
    return d > 0 && d <= daysInMonth ? d : "";
  });

  const monthLetter = now
    .toLocaleString("es", { month: "short" })
    .slice(0, 1)
    .toUpperCase();
  const week = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  return (
    <div className="card p-4 w-64">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-4xl font-bold opacity-30">{monthLetter}</span>
        <span className="opacity-50 text-sm">{y}</span>
      </div>
      <div className="grid grid-cols-7 text-[10px] gap-2 opacity-60 mb-1">
        {week.map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-sm">
        {cells.map((d, i) => (
          <div
            key={i}
            className={`h-6 flex items-center justify-center rounded ${
              d === now.getDate()
                ? "bg-white/10 text-white"
                : "text-neutral-300"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
