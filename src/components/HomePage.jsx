import { useCallback, useMemo, useState } from "react";
import useDeathData from "../hooks/useDeathData.js";
import useColorScheme from "../hooks/useColorScheme.js";
import { count, readTheme } from "../lib/utils.js";
import Pills from "./Pills.jsx";
import Kpis from "./Kpis.jsx";
import DotsCanvas from "./DotsCanvas.jsx";
import { ChartCard, YearChart, DonutChart, MonthChart } from "./Charts.jsx";
import Footer from "./Footer.jsx";

const top = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1])[0];

export default function HomePage() {
  const { rows, status, error, conflits, deps, cc, dc } = useDeathData();
  const dark = useColorScheme();
  const theme = useMemo(readTheme, [dark]);
  const [filters, setFilters] = useState({ conflit: "", dep: "" });

  const setFilter = (key) => (value) => setFilters((f) => ({ ...f, [key]: value }));

  const data = useMemo(
    () =>
      rows.filter(
        (r) => (!filters.conflit || r.c === filters.conflit) && (!filters.dep || r.dep === filters.dep)
      ),
    [rows, filters]
  );

  const colorOf = useCallback(
    (c) => theme.series[Math.min(conflits.indexOf(c), theme.series.length - 1)],
    [conflits, theme]
  );

  const stats = useMemo(() => {
    const byC = count(data, (r) => r.c);
    const byD = count(data, (r) => r.dep);
    const byY = count(data.filter((r) => r.y), (r) => r.y);
    return { byC, byD, topC: top(byC), topY: top(byY) };
  }, [data]);

  const present = conflits.filter((c) => stats.byC[c]);

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <span className="brand">
            <span className="brand-dot" />
            Mémoire de Corse
          </span>
          <span className="badge">Données ouvertes</span>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Morts pour la France en Corse</h1>
          <p className="lede">
            Une visualisation interactive du registre des morts pour la France, alimentée en direct par l’API de
            data.corsica. Filtrez par conflit ou par département pour explorer les données.
          </p>
        </section>

        {status === "loading" && <div className="status">Chargement des données…</div>}
        {status === "error" && (
          <div className="status error">
            Impossible de charger les données ({error}). Vérifiez votre connexion puis rechargez la page.
          </div>
        )}

        {status === "ready" && (
          <>
            <section className="filters" aria-label="Filtres">
              <Pills
                label="Conflit"
                total={rows.length}
                value={filters.conflit}
                onChange={setFilter("conflit")}
                items={conflits.map((c) => ({ value: c, label: c, n: cc[c] }))}
              />
              <Pills
                label="Département"
                total={rows.length}
                value={filters.dep}
                onChange={setFilter("dep")}
                items={deps.map((d) => ({ value: d, label: d, n: dc[d] }))}
              />
            </section>

            <Kpis selected={data.length} total={rows.length} topC={stats.topC} topY={stats.topY} />

            <section className="card">
              <div className="card-head">
                <div>
                  <h2>Une personne, un point</h2>
                  <p className="card-sub">Classés par date de décès, de gauche à droite et de haut en bas.</p>
                </div>
                <div className="legend">
                  {present.map((c) => (
                    <span key={c} style={{ "--k": colorOf(c) }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <DotsCanvas data={data} colorOf={colorOf} />
            </section>

            <section className="grid">
              <ChartCard wide title="Décès par année" sub="Empilés par conflit">
                <YearChart data={data} present={present} colorOf={colorOf} theme={theme} />
              </ChartCard>
              <ChartCard title="Répartition par conflit" sub="Part de chaque conflit dans la sélection">
                <DonutChart counts={stats.byC} colorFn={colorOf} theme={theme} />
              </ChartCard>
              <ChartCard title="Répartition par département" sub="Corse-du-Sud et Haute-Corse">
                <DonutChart
                  counts={stats.byD}
                  colorFn={(d) => theme.series[deps.indexOf(d) % theme.series.length]}
                  theme={theme}
                />
              </ChartCard>
              <ChartCard wide title="Décès selon le mois de l’année" sub="Tous conflits de la sélection confondus">
                <MonthChart data={data} theme={theme} />
              </ChartCard>
            </section>
          </>
        )}
      </main>



    </>
  );
}

