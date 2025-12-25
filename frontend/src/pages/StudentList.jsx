import React, {useEffect,useState} from 'react';
import { fetchStudents } from '../api/reportApi';
import { Link } from 'react-router-dom';

export default function StudentList(){
  const [students,setStudents] = useState([]);
  useEffect(()=>{ fetchStudents().then(setStudents).catch(console.error); },[]);
  return (
    <div>
      <h2 className="text-2xl mb-4">Students</h2>
      <div className="space-y-3">
        {students.map(s=>(
          <div key={s.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div><div className="font-medium">{s.name}</div><div className="text-sm text-gray-500">Overall: {s.overall} / 9</div></div>
            <Link to={`/students/${s.id}`} className="text-indigo-600">View Report</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
