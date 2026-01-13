import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Patients from "./components/patients";
import "./App.css";
import SampleTracking from "./components/sampleTracking";
import LabTests from "./components/LabTests";
import Results from "./components/results";
import Inventory from "./components/inventory";

function App() {
  return (
    <div className="flex h-screen bg-slate-50 w-full font-sans">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/SampleTracking" element={<SampleTracking />} />
          <Route path="/lab-tests" element={<LabTests />} />
          <Route path="/results" element={<Results />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
