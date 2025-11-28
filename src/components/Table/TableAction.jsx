import React from "react";

function TableAction({
  processes,
  removeProcess,
  algorithm,
  listAlgorithm,
  setAlgorithm,
  quantum,
  setQuantum,
  resetDefault,
}) {
  return (
    <div className="bg-white p-4 rounded shadow md:col-span-2">
      <h2 className="font-bold mb-2 text-lg">Processes List</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="text-center text-slate-600 bg-slate-50">
              <th className="pr-4 py-2">Name</th>
              <th className="pr-4">Arrival</th>
              <th className="pr-4">Burst</th>
              {algorithm === listAlgorithm.ps && (
                <th className="pr-4">Priority</th>
              )}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p) => (
              <tr key={p.id} className="border-t text-center">
                <td className="py-2 border-r">{p.name}</td>
                <td className="border-r">{p.arrival}</td>
                <td className="border-r">{p.burst}</td>
                {algorithm === listAlgorithm.ps && (
                  <td className="border-r">{p.priority}</td>
                )}
                <td className="py-2">
                  <button
                    className="text-red-600 text-sm hover:underline"
                    onClick={() => removeProcess(p.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="text-sm font-medium">Algorithm :</label>
          <select
            className="border rounded px-2 py-1 w-full sm:w-auto"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option>First Come First Serve (FCFS)</option>
            <option>Shortest Job First (SJF)</option>
            <option>Priority Scheduling</option>
            <option>Round Robin (RR)</option>
          </select>
        </div>

        {algorithm === listAlgorithm.rr && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm font-medium">Quantum :</label>
            <input
              type="number"
              className="w-full sm:w-20 border rounded px-2 py-1"
              value={quantum}
              onChange={(e) => setQuantum(e.target.value)}
              min={1}
            />
          </div>
        )}

        <button
          className="mt-2 md:mt-0 md:ml-auto bg-amber-500 px-4 py-1.5 rounded text-white hover:bg-amber-600 transition"
          onClick={resetDefault}
        >
          Remove All
        </button>
      </div>
    </div>
  );
}

export default TableAction;
