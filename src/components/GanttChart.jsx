import React from "react";

function GanttChart({ timeline, totalTime }) {
  return (
    <section className="bg-white p-4 rounded shadow mb-6">
      <h2 className="font-bold mb-2">Gantt Chart</h2>
      <div className="w-full border rounded p-3 overflow-x-auto">
        <div
          className="relative h-16 flex items-center"
          style={{ minWidth: Math.max(600, totalTime * 40) + "px" }}
        >
          <div className="absolute left-0 top-0 right-0 h-0.5 bg-slate-200" />
          {timeline.map((seg, idx) => {
            const left = (seg.start / Math.max(1, totalTime)) * 100;
            const width = (seg.duration / Math.max(1, totalTime)) * 100;
            return (
              <div
                key={idx}
                className="absolute top-6 h-8 flex items-center justify-center text-xs font-medium"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  background: `linear-gradient(90deg, rgba(99,102,241,0.9), rgba(56,189,248,0.9))`,
                }}
              >
                {seg.name}
              </div>
            );
          })}
        </div>
        <div className="mt-3 text-xs text-slate-600">
          Total time: {totalTime}
        </div>
      </div>
    </section>
  );
}

export default GanttChart;
