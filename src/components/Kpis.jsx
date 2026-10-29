import { fmt } from "../lib/utils.js";

function Kpi({ label, value, hint }) {
  return (
    <div className="kpi">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className="hint">{hint}</div>
    </div>
  );
}

export default function Kpis({ selected, total, topC, topY }) {
  return (
    <section className="kpis">
      <Kpi label="Personnes dans la sélection" value={fmt(selected)} hint={`sur ${fmt(total)} au total`} />
      <Kpi label="Conflit le plus représenté" value={topC ? topC[0] : "–"} hint={topC ? `${fmt(topC[1])} personnes` : ""} />
      <Kpi label="Année la plus touchée" value={topY ? topY[0] : "–"} hint={topY ? `${fmt(topY[1])} décès` : ""} />
    </section>
  );
}
