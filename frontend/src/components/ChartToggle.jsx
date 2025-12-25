import React from 'react';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(RadialLinearScale, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartToggle({type,onChange,chartData}){
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm">Chart type</label>
        <select value={type} onChange={e=>onChange(e.target.value)} className="border rounded px-2 py-1">
          <option value="doughnut">Doughnut</option>
          <option value="bar">Bar</option>
          <option value="radar">Radar</option>
        </select>
      </div>
      <div className="bg-white p-4 rounded shadow">
        {type==='doughnut' && <Doughnut data={chartData} />}
        {type==='bar' && <Bar data={chartData} />}
        {type==='radar' && <Radar data={chartData} />}
      </div>
    </div>
  );
}
