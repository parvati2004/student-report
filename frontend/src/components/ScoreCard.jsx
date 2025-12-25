export default function ScoreCard({name,score,feedback}){
  const pct = Math.round((score/9)*100);
  return (
    <div className="mb-4">
      <div className="flex justify-between"><div className="capitalize  font-medium">{name}</div><div className="font-semibold">{score} / 9</div></div>
      <div className="h-2 bg-gray-200 rounded mt-3 overflow-hidden"><div style={{width: `${pct}%`}} className="h-full rounded bg-indigo-500"></div></div>
      <div className="text-sm text-gray-600 mt-2">{feedback}</div>
    </div>
  );
}
