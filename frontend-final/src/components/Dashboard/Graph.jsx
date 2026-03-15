import React from "react";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = ({ graphData }) => {
  const hasData = graphData && graphData.length > 0;

  const labels = hasData
    ? graphData.map((d) => d.clickDate)
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const values = hasData
    ? graphData.map((d) => d.count)
    : [0, 0, 0, 0, 0, 0, 0];

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const gridColor  = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
  const tickColor  = isDark ? "#6b7280" : "#94a3b8";
  const barColor   = hasData
    ? isDark ? "rgba(99,102,241,0.75)" : "rgba(99,102,241,0.85)"
    : isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const barBorder  = hasData
    ? isDark ? "rgba(99,102,241,1)" : "rgba(79,70,229,1)"
    : "transparent";
  const tooltipBg  = isDark ? "#17171d" : "#ffffff";
  const tooltipBdr = isDark ? "#2a2a35" : "#e2e8f0";

  const data = {
    labels,
    datasets: [{
      label: "Clicks",
      data: values,
      backgroundColor: barColor,
      borderColor: barBorder,
      borderWidth: 1,
      borderRadius: 5,
      barThickness: 24,
      categoryPercentage: 0.6,
      barPercentage: 0.75,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor:  isDark ? "#f1f5f9" : "#1e293b",
        bodyColor:   isDark ? "#94a3b8" : "#64748b",
        borderColor: tooltipBdr,
        borderWidth: 1,
        padding: 10,
        callbacks: { label: (ctx) => ` ${ctx.parsed.y} clicks` },
      },
    },
    scales: {
      x: {
        ticks: { color: tickColor, font: { size: 11 } },
        grid:  { display: false },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: tickColor,
          font: { size: 11 },
          stepSize: 1,
          callback: (v) => Math.floor(v),
        },
        grid:  { color: gridColor },
        border: { display: false },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Graph;
