import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { MOIS, count } from "../lib/utils.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);
ChartJS.defaults.font.family = '"Inter", ui-sans-serif, system-ui, sans-serif';
ChartJS.defaults.font.size = 12;

const tooltip = (t) => ({
  backgroundColor: t.text,
  titleColor: t.surface,
  bodyColor: t.surface,
  padding: 10,
  cornerRadius: 8,
  boxPadding: 4,
});

const legend = (t) => ({
  position: "bottom",
  labels: { usePointStyle: true, pointStyle: "circle", boxWidth: 8, padding: 16, color: t.muted },
});

const axis = (t, extra = {}) => ({
  ticks: { color: t.muted },
  grid: { color: t.border },
  border: { display: false },
  ...extra,
});

export function ChartCard({ title, sub, wide, children }) {
  return (
    <article className={wide ? "card span-2" : "card"}>
      <h2>{title}</h2>
      <p className="card-sub">{sub}</p>
      <div className="chart-box">{children}</div>
    </article>
  );
}

export function YearChart({ data, present, colorOf, theme }) {
  const { years, byYear } = useMemo(() => {
    const byYear = {};
    data.forEach((r) => {
      if (!r.y) return;
      if (!byYear[r.y]) byYear[r.y] = {};
      byYear[r.y][r.c] = (byYear[r.y][r.c] || 0) + 1;
    });
    return { years: Object.keys(byYear).sort(), byYear };
  }, [data]);

  const chartData = {
    labels: years,
    datasets: present.map((c) => ({
      label: c,
      backgroundColor: colorOf(c),
      borderRadius: 4,
      borderSkipped: false,
      data: years.map((y) => byYear[y][c] || 0),
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: axis(theme, { stacked: true, grid: { display: false } }),
      y: axis(theme, { stacked: true, beginAtZero: true }),
    },
    plugins: { legend: legend(theme), tooltip: tooltip(theme) },
  };

  return <Bar data={chartData} options={options} />;
}

export function DonutChart({ counts, colorFn, theme }) {
  const labels = Object.keys(counts);
  const chartData = {
    labels,
    datasets: [
      {
        data: labels.map((l) => counts[l]),
        backgroundColor: labels.map(colorFn),
        borderColor: theme.surface,
        borderWidth: 3,
        hoverOffset: 6,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: { legend: legend(theme), tooltip: tooltip(theme) },
  };
  return <Doughnut data={chartData} options={options} />;
}

export function MonthChart({ data, theme }) {
  const byM = useMemo(() => count(data.filter((r) => r.m !== null), (r) => r.m), [data]);
  const chartData = {
    labels: MOIS,
    datasets: [
      {
        label: "Décès",
        backgroundColor: theme.accent,
        borderRadius: 6,
        borderSkipped: false,
        data: MOIS.map((_, i) => byM[i] || 0),
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: tooltip(theme) },
    scales: { x: axis(theme, { grid: { display: false } }), y: axis(theme, { beginAtZero: true }) },
  };
  return <Bar data={chartData} options={options} />;
}
