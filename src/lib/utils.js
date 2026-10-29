export const API =
  "https://data.corsica/data-fair/api/v1/datasets/wttmpqh1rx4qjru6oua8haql/lines?size=10000&select=conflit,date_deces,nom_departement";

export const KEYS = ["--c1", "--c2", "--c3", "--c4", "--c5", "--c6"];
export const MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

export const fmt = (n) => n.toLocaleString("fr-FR");

export const count = (arr, f) =>
  arr.reduce((acc, x) => {
    const k = f(x);
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// Lit les couleurs du thème courant (clair/sombre) depuis les variables CSS
export const readTheme = () => ({
  series: KEYS.map(css),
  muted: css("--muted"),
  border: css("--border"),
  surface: css("--surface"),
  text: css("--text"),
  accent: css("--accent"),
});
