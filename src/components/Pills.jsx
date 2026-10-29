import { fmt } from "../lib/utils.js";

export default function Pills({ label, items, total, value, onChange }) {
  const all = [{ value: "", label: "Tous", n: total }, ...items];
  return (
    <div className="filter-group">
      <span className="filter-label">{label}</span>
      <div className="pills">
        {all.map((i) => (
          <button
            key={i.value || "all"}
            type="button"
            className="pill"
            aria-pressed={value === i.value}
            onClick={() => onChange(i.value)}
          >
            {i.label}
            <span className="n">{fmt(i.n)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
