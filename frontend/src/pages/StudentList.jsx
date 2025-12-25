import React, { useEffect, useState } from 'react';
import { fetchStudents } from '../api/reportApi';
import { Link } from 'react-router-dom';

function scoreColorClass(score) {
  if (score >= 8) return 'bg-green-100 text-green-800';
  if (score >= 6) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

function initials(name = '') {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents().then(setStudents).catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Students</h2>
        <p className="mt-2 text-base text-gray-600">
          Click a student card to view the speaking assessment report.
        </p>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {students.map((s, index) => (
          <article
            key={s.id}
            className={`relative bg-white rounded-2xl p-10 min-h-[300px]
                        border border-gray-200 shadow-md
                        hover:shadow-xl transition-all duration-300
                        ${index === 2 ? 'md:col-span-2 md:max-w-xl md:mx-auto' : ''}`}
          >
            {/* Card content */}
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-indigo-100
                                flex items-center justify-center
                                text-indigo-700 font-bold text-xl">
                  {initials(s.name)}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {s.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Speaking Assessment Result
                </p>

                {/* Score row */}
                <div className="mt-5 flex items-center gap-4">
                  <div
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold ${scoreColorClass(
                      s.overall
                    )}`}
                  >
                    {s.overall} / 9
                  </div>

                  <div className="flex-1">
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.round((s.overall / 9) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-sm text-gray-600 leading-relaxed">
                  Overall performance indicator based on pronunciation,
                  fluency, vocabulary, and grammar.
                </p>
              </div>
            </div>

            {/* Action button */}
            <div className="absolute bottom-8 right-8">
              <Link
                to={`/students/${s.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5
                           rounded-lg bg-indigo-600 text-white
                           text-sm font-semibold
                           hover:bg-indigo-700 transition"
              >
                View Report
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {students.length === 0 && (
        <div className="mt-10 bg-white rounded-xl p-8 text-center text-gray-500 shadow">
          No students found — make sure your backend is running.
        </div>
      )}
    </div>
  );
}
