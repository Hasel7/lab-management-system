import React from "react";
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  TestTube2,
  ClipboardList,
  Box,
  FileText,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Activity,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import SampleTracking from "./sampleTracking";


// Sidebar component
const Sidebar = () => {
  // Main navigation items
  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/",
    },
    { icon: Users, label: "Patients", path: "/patients" },
    {
      icon: FlaskConical,
      label: "Sample Tracking",
      path: "/SampleTracking",
    },
    { icon: TestTube2, label: "Lab Tests", path: "/lab-tests" },
    { icon: ClipboardList, label: "Results", path: "/results" },
    { icon: Box, label: "Inventory", path: "/inventory" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: CreditCard, label: "Billing", path: "/billing" },
  ];

  // Bottom navigation items
  const bottomItems = [
    {
      icon: Bell,
      label: "Notifications",
      path: "/notifications",
    },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  // Helper functions for dynamic classes
  const getLinkClasses = (isActive) => {
    return `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      isActive
        ? "bg-slate-800 text-teal-400"
        : "hover:bg-slate-800/50 hover:text-slate-200"
    }`;
  };

  // Helper function for dynamic icon classes
  const getIconClasses = (isActive) => {
    return `w-5 h-5 ${
      isActive ? "text-teal-400" : "group-hover:text-slate-200"
    }`;
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-slate-900 text-slate-400 font-sans">
      {/* Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-teal-500/10 p-2 rounded-xl">
          <Activity className="w-6 h-6 text-teal-400" />
        </div>
        <div>
          <h1 className="text-white font-semibold text-lg leading-tight">
            LabManager
          </h1>
          <p className="text-xs text-slate-500">Laboratory System</p>
        </div>
      </div>

      {/* Main Navigation - Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            {({ isActive }) => (
              <>
                <item.icon className={getIconClasses(isActive)} />
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

        <div className="my-4 border-t border-slate-800/50"></div>

        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            {({ isActive }) => (
              <>
                <item.icon className={getIconClasses(isActive)} />
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-slate-200 truncate">
              Dr. Jane Doe
            </h4>
            <p className="text-xs text-slate-500 truncate">Lab Administrator</p>
          </div>
          <LogOut className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
