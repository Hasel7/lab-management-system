// import React from "react";
import { Bell, Users, TestTube2, ClipboardList, Clock } from "lucide-react";
import RecentSamples from "./RecentSamples";
import LowStockAlerts from "./LowStockAlerts";

const Dashboard = () => {
  // Stats Data
  const stats = [
    {
      title: "Total Patients",
      icon: Users,
      value: "1,284",
      percentage: "+12%",
      description: "last month",
    },
    {
      title: "Samples Today",
      icon: TestTube2,
      value: "47",
      percentage: "+8%",
      description: "yesterday",
    },
    {
      title: "Tests Completed",
      icon: ClipboardList,
      value: "312",
      percentage: "-3%",
      description: "this week",
    },
    {
      title: "Avg. Turnaround",
      icon: Clock,
      value: "2.4h",
      percentage: "+15%",
      description: "improvement",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Welcome back! Here's what's happening in your lab today.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 pl-4 w-64 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              placeholder="Search..."
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-teal-600 hover:border-teal-200 transition-all">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          let percentageClass = "bg-rose-50 text-rose-600";
          if (item.percentage.startsWith("+")) {
            percentageClass = "bg-emerald-50 text-emerald-600";
          }

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-teal-50 rounded-xl">
                  <item.icon className="w-6 h-6 text-teal-600" />
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${percentageClass}`}
                >
                  {item.percentage}
                </span>
              </div>
              <div>
                <h3 className="text-slate-500 text-sm font-medium mb-1">
                  {item.title}
                </h3>
                <div className="text-2xl font-bold text-slate-800 mb-1">
                  {item.value}
                </div>
                <p className="text-xs text-slate-400">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <RecentSamples />
        </div>
        <div>
          <LowStockAlerts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
