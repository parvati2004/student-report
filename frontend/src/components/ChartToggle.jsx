import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  PointElement,      // ✅ REQUIRED
  LineElement,       // ✅ REQUIRED for radar
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar, Doughnut, Radar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

// ✅ REGISTER EVERYTHING ONCE
ChartJS.register(
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend
);

// A cheerful palette used when datasets don't provide colors
const PALETTE = [
  'rgba(99,102,241,0.9)',   // indigo
  'rgba(16,185,129,0.9)',   // green
  'rgba(234,88,12,0.9)',    // orange
  'rgba(234,179,8,0.9)',    // yellow
  'rgba(14,165,233,0.9)',   // sky
  'rgba(236,72,153,0.9)',   // pink
];

export default function ChartToggle({ type, onChange, chartData }) {
  // Keep original logic / props unchanged. We just create a visually-enhanced copy
  const processedChartData = React.useMemo(() => {
    if (!chartData) return chartData;

    return {
      ...chartData,
      datasets: (chartData.datasets || []).map((ds, idx) => {
        const base = PALETTE[idx % PALETTE.length];
        // If user already provided colors, keep them (don't overwrite)
        return {
          ...ds,
          backgroundColor: ds.backgroundColor ?? (
            Array.isArray(ds.data) && ds.data.length > 1 && type === 'doughnut'
              ? ds.data.map((_, i) => PALETTE[(idx + i) % PALETTE.length])
              : ds.backgroundColor ?? base
          ),
          borderColor: ds.borderColor ?? base,
          borderWidth: ds.borderWidth ?? 2,
          hoverOffset: ds.hoverOffset ?? 8,
        };
      }),
    };
  }, [chartData, type]);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 12,
          boxWidth: 10,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
      line: {
        tension: 0.35,
        borderWidth: 2,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  const doughnutOptions = {
    ...commonOptions,
    cutout: '55%',
  };

  const radarOptions = {
    ...commonOptions,
    scales: {
      r: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.06)' },
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-6">
        <div>
          <label className="text-sm text-gray-600 block">Chart type</label>
          <select
            value={type}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 border rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-300 transition"
          >
            <option value="doughnut">Doughnut</option>
            <option value="bar">Bar</option>
            <option value="radar">Radar</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-gray-500">Preview</div>
            <div className="text-sm font-semibold">Colorful • Responsive • Smooth</div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-gradient-to-br from-white/80 to-gray-50 p-4 rounded-2xl shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold shadow">C</div>
            <div>
              <div className="text-sm font-medium">Interactive Chart</div>
              <div className="text-xs text-gray-500">Beautiful, colorful and mobile-friendly</div>
            </div>
          </div>
          <div className="text-xs text-gray-400">Select a chart type to switch views</div>
        </div>

        <div className="w-full h-80 rounded-md bg-white/70 p-3">
          {type === 'doughnut' && (
            <Doughnut key="doughnut" data={processedChartData} options={doughnutOptions} />
          )}
          {type === 'bar' && (
            <Bar key="bar" data={processedChartData} options={barOptions} />
          )}
          {type === 'radar' && (
            <Radar key="radar" data={processedChartData} options={radarOptions} />
          )}
        </div>

       
      </motion.div>
    </div>
  );
}
