import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Patients from "./components/patients";
import "./App.css";
import SampleTracking from "./components/sampleTracking";
import LabTests from "./components/LabTests";
import Results from "./components/results";
import Inventory from "./components/inventory";
import Reports from "./components/reports";
import Billing from "./components/billing";
import Notifications from "./components/notification";
import Settings from "./components/settings";
import SignIn from "./components/SignIn";

import { useState } from "react";
import { Menu, Activity } from "lucide-react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = location.pathname === "/";

  return (
    <div className="flex h-screen bg-slate-50 w-full font-sans">
      {!isAuthPage && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Wrapper */}
      <div
        className={`flex-1 flex flex-col h-screen overflow-hidden ${isAuthPage ? "w-full" : ""}`}
      >
        {/* Mobile Header */}
        {!isAuthPage && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-teal-600/10 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-teal-600" />
              </div>
              <span className="font-bold text-slate-800 text-lg">
                LabManager
              </span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Scrollable Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/SampleTracking" element={<SampleTracking />} />
            <Route path="/lab-tests" element={<LabTests />} />
            <Route path="/results" element={<Results />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
