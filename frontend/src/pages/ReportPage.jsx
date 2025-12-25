import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchStudent } from '../api/reportApi';
import ScoreCard from '../components/ScoreCard';
import ChartToggle from '../components/ChartToggle';
import { getFeedback } from '../utils/feedbackUtil';

export default function ReportPage(){
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [chartType, setChartType] = useState('doughnut');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    let mounted = true;
    setLoading(true);
    setError(null);

    fetchStudent(id)
      .then(data => {
        if (mounted) setStudent(data);
      })
      .catch(err => {
        console.error('fetchStudent error', err);
        if (mounted) setError(err.message || String(err));
      })
      .finally(()=> { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  },[id]);

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
      <strong>Failed to load student:</strong> {error}
      <div className="text-sm mt-2">Check backend at <code>http://localhost:4000/api/students/{id}</code></div>
    </div>
  );

  if (!student) return <div>No data</div>;

  const labels = Object.keys(student.scores || {});
  const values = Object.values(student.scores || {});
  const chartData = { labels, datasets:[{ label:'Skill scores (0-9)', data: values }] };

  return (
    <div >
      <header className="mb-6">
        <h2 className="text-2xl flex items-center font-semibold">{student.name}</h2>
        <p className="text-gray-600 flex items-center">Overall score: <span className="font-bold">{student.overall} / 9</span></p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-medium mb-4">Skill Scores</h3>
          {labels.map(k => <ScoreCard key={k} name={k} score={student.scores[k]} feedback={getFeedback(student.scores[k])} />)}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Visual</h3>
          <ChartToggle type={chartType} onChange={setChartType} chartData={chartData} />
          <p className="mt-4 text-sm text-gray-600">{getFeedback(student.overall)}</p>
        </div>
      </div>

      <section className="mt-8 bg-white p-6 rounded shadow">
        <h3 className="text-lg font-medium">Descriptive Feedback</h3>
        <p className="mt-2 text-gray-700">{student.summary}</p>
      </section>
    </div>
  );
}
