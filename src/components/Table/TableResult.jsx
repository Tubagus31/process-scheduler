import React from "react";

function TableResult({ results, averageTime, averageTurnAround }) {
  return (
    <section className="bg-white p-4 rounded shadow">
      <h1 className="font-bold mb-2">Results Table</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-center text-slate-600 bg-slate-50">
              <th className="pr-4 py-2">Name</th>
              <th className="pr-4">Arrival</th>
              <th className="pr-4">Burst</th>
              <th className="pr-4">Start</th>
              <th className="pr-4">Completion</th>
              <th className="pr-4">Waiting</th>
              <th>Turnaround</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id} className="border-t text-center">
                <td className="py-2 border-r">{r.name}</td>
                <td className="border-r">{r.arrival}</td>
                <td className="border-r">{r.burst}</td>
                <td className="border-r">{r.start ?? "-"}</td>
                <td className="border-r">{r.completion ?? "-"}</td>
                <td className="border-r">{r.waiting ?? "-"}</td>
                <td>{r.turnaround ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-sm text-slate-700">
        <strong>Average waiting :</strong> {averageTime}
      </div>
      <div className="mt-3 text-sm text-slate-700">
        <strong>Average Turn Around :</strong> {averageTurnAround}
      </div>
    </section>
  );
}

export default TableResult;
