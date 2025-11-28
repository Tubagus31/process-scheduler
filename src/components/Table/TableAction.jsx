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
      <h2 className="font-bold mb-2">Processes List</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-center text-slate-600">
              <th className="pr-4">Name</th>
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
                <td>
                  <button
                    className="text-red-600 text-sm"
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
      <div className="mt-3 flex gap-2 items-center">
        <label className="text-sm">Algorithm : </label>
        <select
          className="border rounded px-2 py-1"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option>First Come First Serve (FCFS)</option>
          <option>Shortest Job First (SJF)</option>
          <option>Priority Scheduling</option>
          <option>Round Robin (RR)</option>
        </select>
        {algorithm === listAlgorithm.rr && (
          <>
            <label className="ml-3 text-sm">Quantum</label>
            <input
              type="number"
              className="w-20 border rounded px-2 py-1"
              value={quantum}
              onChange={(e) => setQuantum(e.target.value)}
              min={1}
            />
          </>
        )}
        <button
          className="ml-auto bg-amber-500 px-3 py-1 rounded text-white"
          onClick={resetDefault}
        >
          Remove All
        </button>
      </div>
    </div>
  );
}

export default TableAction;
