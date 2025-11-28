import React, { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import GanttChart from "./components/GanttChart";
import TableResult from "./components/Table/TableResult";
import TableCreate from "./components/Table/TableCreate";
import TableAction from "./components/Table/TableAction";

const listAlgorithm = {
  fcfs: "First Come First Serve (FCFS)",
  sjf: "Shortest Job First (SJF)",
  ps: "Priority Scheduling",
  rr: "Round Robin (RR)",
};

function App() {
  const [processes, setProcesses] = useState([]);
  const [averageTime, setAverageTime] = useState("");
  const [averageTurnAround, setaverageTurnAround] = useState("");

  const [name, setName] = useState("");
  const [arrival, setArrival] = useState(0);
  const [burst, setBurst] = useState(1);
  const [priority, setPriority] = useState(1);

  const [algorithm, setAlgorithm] = useState(listAlgorithm.fcfs);
  const [quantum, setQuantum] = useState(2);

  function addProcess(e) {
    e.preventDefault();
    const id = processes.length
      ? Math.max(...processes.map((p) => p.id)) + 1
      : 1;
    const newP = {
      id,
      name: name || `P-${id}`,
      arrival: Math.max(0, Number(arrival)),
      burst: Math.max(1, Number(burst)),
      priority: Number(priority),
    };
    setProcesses((s) => [...s, newP]);
    setName("");
    setArrival(0);
    setBurst(1);
    setPriority(1);
  }

  function removeProcess(id) {
    setProcesses((s) => s.filter((p) => p.id !== id));
  }

  function calculateAverageWaiting(resultData) {
    const computed = resultData.filter((r) => r.waiting !== undefined);
    if (!computed.length) return "-";

    const avg = (
      computed.reduce((s, x) => s + (x.waiting || 0), 0) / computed.length
    ).toFixed(2);

    return avg;
  }

  function calculateTurnAround(resultData) {
    const computed = resultData.filter((r) => r.turnaround !== undefined);
    if (!computed.length) return "-";

    const avg = (
      computed.reduce((s, x) => s + (x.turnaround || 0), 0) / computed.length
    ).toFixed(2);

    return avg;
  }

  function schedule(processes, algorithm, quantum = 2) {
    const procs = processes.map((p) => ({ ...p }));
    const timeline = [];

    if (algorithm === listAlgorithm.fcfs) {
      procs.sort((a, b) => a.arrival - b.arrival || a.id - b.id);
      let time = 0;
      for (const p of procs) {
        const start = Math.max(time, p.arrival);
        timeline.push({ id: p.id, name: p.name, start, duration: p.burst });
        p.start = start;
        p.completion = start + p.burst;
        p.turnaround = p.completion - p.arrival;
        p.waiting = p.start - p.arrival;
        time = p.completion;
      }

      return { timeline, procs };
    }

    if (algorithm === listAlgorithm.sjf) {
      const remaining = procs.slice();
      let time = 0;
      const finished = [];
      while (remaining.length) {
        const available = remaining.filter((r) => r.arrival <= time);
        if (!available.length) {
          time = Math.min(...remaining.map((r) => r.arrival));
          continue;
        }
        available.sort((a, b) => a.burst - b.burst || a.arrival - b.arrival);
        const p = available[0];
        const idx = remaining.indexOf(p);
        const start = Math.max(time, p.arrival);
        timeline.push({ id: p.id, name: p.name, start, duration: p.burst });
        p.start = start;
        p.completion = start + p.burst;
        p.turnaround = p.completion - p.arrival;
        p.waiting = p.start - p.arrival;
        time = p.completion;
        finished.push(p);
        remaining.splice(idx, 1);
      }
      return { timeline, procs: finished };
    }

    if (algorithm === listAlgorithm.ps) {
      const remaining = procs.slice();
      let time = 0;
      const finished = [];
      while (remaining.length) {
        const available = remaining.filter((r) => r.arrival <= time);
        if (!available.length) {
          time = Math.min(...remaining.map((r) => r.arrival));
          continue;
        }
        available.sort(
          (a, b) => a.priority - b.priority || a.arrival - b.arrival
        );
        const p = available[0];
        const idx = remaining.indexOf(p);
        const start = Math.max(time, p.arrival);
        timeline.push({ id: p.id, name: p.name, start, duration: p.burst });
        p.start = start;
        p.completion = start + p.burst;
        p.turnaround = p.completion - p.arrival;
        p.waiting = p.start - p.arrival;
        time = p.completion;
        finished.push(p);
        remaining.splice(idx, 1);
      }
      return { timeline, procs: finished };
    }

    if (algorithm === listAlgorithm.rr) {
      const queue = procs
        .slice()
        .sort((a, b) => a.arrival - b.arrival || a.id - b.id)
        .map((p) => ({ ...p, remaining: p.burst, startRecorded: false }));

      let time = 0;
      const ready = [];
      const finished = [];
      while (queue.length || ready.length) {
        while (queue.length && queue[0].arrival <= time) {
          ready.push(queue.shift());
        }
        if (!ready.length) {
          time = queue.length ? queue[0].arrival : time;
          continue;
        }
        const p = ready.shift();
        const slice = Math.min(quantum, p.remaining);
        const start = time;
        timeline.push({ id: p.id, name: p.name, start, duration: slice });
        if (!p.startRecorded) {
          p.start = start;
          p.startRecorded = true;
        }
        p.remaining -= slice;
        time += slice;

        while (queue.length && queue[0].arrival <= time)
          ready.push(queue.shift());
        if (p.remaining > 0) {
          ready.push(p);
        } else {
          p.completion = time;
          p.turnaround = p.completion - p.arrival;
          p.waiting = p.turnaround - p.burst;
          finished.push(p);
        }
      }

      const finalProcs = procs.map((orig) => {
        const match = finished.find((f) => f.id === orig.id);
        return match || orig;
      });
      return { timeline, procs: finalProcs };
    }

    return { timeline, procs };
  }

  const { timeline, procs: results } = useMemo(
    () => schedule(processes, algorithm, Number(quantum)),
    [processes, algorithm, quantum]
  );

  const totalTime = timeline.length
    ? Math.max(...timeline.map((t) => t.start + t.duration))
    : 0;

  function resetDefault() {
    setProcesses([]);
    setAlgorithm(listAlgorithm.fcfs);
    setQuantum(2);
  }

  useEffect(() => {
    setAverageTime(calculateAverageWaiting(results));
    setaverageTurnAround(calculateTurnAround(results));
  }, [processes]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <Header />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <TableCreate
            addProcess={addProcess}
            algorithm={algorithm}
            listAlgorithm={listAlgorithm}
            arrival={arrival}
            burst={burst}
            priority={priority}
            setName={setName}
            setArrival={setArrival}
            setBurst={setBurst}
            setPriority={setPriority}
            processes={processes}
          />

          <TableAction
            processes={processes}
            removeProcess={removeProcess}
            algorithm={algorithm}
            listAlgorithm={listAlgorithm}
            setAlgorithm={setAlgorithm}
            quantum={quantum}
            setQuantum={setQuantum}
            resetDefault={resetDefault}
          />
        </section>
        <GanttChart timeline={timeline} totalTime={totalTime} />

        <TableResult
          results={results}
          averageTime={averageTime}
          averageTurnAround={averageTurnAround}
        />
      </div>
    </div>
  );
}

export default App;
