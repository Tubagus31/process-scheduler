import React from "react";

function TableCreate({
  addProcess,
  algorithm,
  listAlgorithm,
  arrival,
  burst,
  priority,
  setName,
  setArrival,
  setBurst,
  setPriority,
  processes,
}) {
  return (
    <form onSubmit={addProcess} className="bg-white p-4 rounded shadow">
      <h1 className="font-bold mb-2">Add Process -- {processes.length + 1}</h1>
      <label className="block text-sm">Arrival Time</label>
      <input
        type="number"
        className="w-full border rounded px-2 py-1 mb-2"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
        min={0}
      />
      <label className="block text-sm">Burst Time</label>
      <input
        type="number"
        className="w-full border rounded px-2 py-1 mb-2"
        value={burst}
        onChange={(e) => setBurst(e.target.value)}
        min={1}
      />
      {algorithm === listAlgorithm.ps && (
        <div>
          <label className="block text-sm">Priority (lower = higher)</label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1 mb-4"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            min={0}
          />
        </div>
      )}
      <div className="flex bg-red-200">
        <button
          className="bg-blue-600 text-white py-1 w-full rounded"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TableCreate;
