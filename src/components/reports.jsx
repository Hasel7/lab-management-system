import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  Download,
  Printer,
  //   ChevronDown,
} from "lucide-react";

const Reports = () => {
  // Mock Data for Reports
  const [reports] = useState([
    {
      id: "RPT-001",
      patient: "John Doe",
      test: "Complete Blood Count",
      date: "2024-01-15",
      status: "ready",
    },
    {
      id: "RPT-002",
      patient: "Jane Smith",
      test: "Lipid Panel",
      date: "2024-01-15",
      status: "ready",
    },
    {
      id: "RPT-003",
      patient: "Mike Johnson",
      test: "Liver Function",
      date: "2024-01-14",
      status: "pending",
    },
    {
      id: "RPT-004",
      patient: "Sarah Williams",
      test: "Urinalysis",
      date: "2024-01-14",
      status: "ready",
    },
    {
      id: "RPT-005",
      patient: "Tom Brown",
      test: "Thyroid Panel",
      date: "2024-01-13",
      status: "ready",
    },
  ]);

  //   Search and Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  //   Status Color
  const getStatusColor = (status) => {
    if (status === "ready") {
      return "bg-emerald-500";
    } else if (status === "pending") {
      return "bg-amber-100 text-amber-600";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  //   Status Badge
  const getStatusBadge = (status) => {
    if (status === "ready") {
      return (
        <span className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-full capitalize">
          {status}
        </span>
      );
    } else if (status === "pending") {
      return (
        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full capitalize">
          {status}
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full capitalize">
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 p-1">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
          />
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 font-medium outline-none cursor-pointer focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              <option value="all">All Status</option>
              <option value="ready">Ready</option>
              <option value="pending">Pending</option>
            </select>
            <Filter className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 font-medium whitespace-nowrap">
            <Calendar className="w-4 h-4" />
            <span>Date Range</span>
          </button>
        </div>
      </div>

      {/* Reports Table Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">
            Generated Reports
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-sm font-medium">
              <tr>
                <th className="px-6 py-4">Report ID</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Test</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports
                .filter((report) => {
                  const searchLower = searchQuery.toLowerCase();
                  const matchesSearch =
                    report.patient.toLowerCase().includes(searchLower) ||
                    report.test.toLowerCase().includes(searchLower) ||
                    report.id.toLowerCase().includes(searchLower);
                  const matchesStatus =
                    filterStatus === "all" || report.status === filterStatus;
                  return matchesSearch && matchesStatus;
                })
                .map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {report.id}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {report.patient}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{report.test}</td>
                    <td className="px-6 py-4 text-slate-600">{report.date}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 text-slate-400">
                        <button className="hover:text-teal-600 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                        <button className="hover:text-teal-600 transition-colors">
                          <Printer className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
