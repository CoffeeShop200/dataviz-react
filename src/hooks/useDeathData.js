import { useEffect, useMemo, useState } from "react";
import { API, count } from "../lib/utils.js";

// L'API renvoie 10 000 lignes max par page : on suit le lien "next" jusqu'au bout
async function loadAll(signal) {
  let url = API;
  let out = [];
  let guard = 0;
  while (url && guard++ < 20) {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = await res.json();
    if (!json.results || !json.results.length) break;
    out = out.concat(json.results);
    url = json.next || null;
  }
  return out;
}

function clean(raw) {
  return raw.map((r) => {
    const d = r.date_deces || "";
    return {
      c: r.conflit || "Non renseigné",
      dep: r.nom_departement || "Non renseigné",
      d,
      y: /^\d{4}/.test(d) ? d.slice(0, 4) : null,
      m: /^\d{4}-\d{2}/.test(d) ? Number(d.slice(5, 7)) - 1 : null,
    };
  });
}

export default function useDeathData() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();
    loadAll(ctrl.signal)
      .then((raw) => {
        setRows(clean(raw));
        setStatus("ready");
      })
      .catch((e) => {
        if (e.name === "AbortError") return;
        setError(e.message);
        setStatus("error");
      });
    return () => ctrl.abort();
  }, []);

  const meta = useMemo(() => {
    const cc = count(rows, (r) => r.c);
    const dc = count(rows, (r) => r.dep);
    return {
      cc,
      dc,
      conflits: Object.keys(cc).sort((a, b) => cc[b] - cc[a]),
      deps: Object.keys(dc).sort(),
    };
  }, [rows]);

  return { rows, status, error, ...meta };
}
