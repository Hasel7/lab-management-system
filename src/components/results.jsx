import React, { useState } from "react";
import {
  Eye,
  Download,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  Calendar,
  User,
} from "lucide-react";

const Results = () => {
  const [activeTab, setActiveTab] = useState("All");

  // Results Data
  const results = [
    {
      id: "RES-2024-001",
      sampleId: "SMP-2024-0156",
      patient: "John Smith",
      patientInitials: "JS",
      patientColor: "bg-teal-100 text-teal-700",
      test: "Complete Blood Count",
      technician: "Dr. Mark Lee",
      submitted: "2024-01-15 11:30 AM",
      status: "Approved",
    },
    {
      id: "RES-2024-002",
      sampleId: "SMP-2024-0157",
      patient: "Sarah Johnson",
      patientInitials: "SJ",
      patientColor: "bg-purple-100 text-purple-700",
      test: "Lipid Panel",
      technician: "Dr. Sarah Chen",
      submitted: "2024-01-15 12:00 PM",
      status: "Pending",
    },
    {
      id: "RES-2024-003",
      sampleId: "SMP-2024-0158",
      patient: "Michael Brown",
      patientInitials: "MB",
      patientColor: "bg-blue-100 text-blue-700",
      test: "Glucose Tolerance Test",
      technician: "Dr. James Wilson",
      submitted: "2024-01-15 12:30 PM",
      status: "Approved",
    },
    {
      id: "RES-2024-004",
      sampleId: "SMP-2024-0159",
      patient: "Emily Davis",
      patientInitials: "ED",
      patientColor: "bg-pink-100 text-pink-700",
      test: "Thyroid Function Panel",
      technician: "Dr. Mark Lee",
      submitted: "2024-01-15 01:00 PM",
      status: "Pending",
    },
  ];

  // Tabs Data
  const tabs = [
    { label: "All", count: results.length },
    {
      label: "Pending",
      count: results.filter((r) => r.status === "Pending").length,
    },
    {
      label: "Approved",
      count: results.filter((r) => r.status === "Approved").length,
    },
    { label: "Rejected", count: 0 },
  ];

  // Filtered Results
  let filteredResults;
  if (activeTab === "All") {
    filteredResults = results;
  } else {
    filteredResults = results.filter((r) => r.status === activeTab);
  }

  // Status Badge
  const getStatusBadge = (status) => {
    if (status === "Approved") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">
          <CheckCircle size={16} className="mr-1.5" />
          Approved
        </span>
      );
    } else if (status === "Pending") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
          <Clock size={16} className="mr-1.5" />
          Pending
        </span>
      );
    } else if (status === "Rejected") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
          <AlertCircle size={16} className="mr-1.5" />
          Rejected
        </span>
      );
    } else {
      return null;
    }
  };

  // Helper function for tab button classes
  const getTabButtonClasses = (isActive) => {
    if (isActive) {
      return "bg-slate-800 text-white shadow-md";
    } else {
      return "text-gray-500 hover:text-gray-700 hover:bg-gray-50";
    }
  };

  // Helper function for pending badge classes
  const getPendingBadgeClasses = (isActive) => {
    if (isActive) {
      return "bg-amber-500 text-white";
    } else {
      return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6 bg-gray-50 min-h-screen">
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 inline-flex">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${getTabButtonClasses(
                activeTab === tab.label
              )}`}
            >
              {tab.label}
              {tab.label === "Pending" && tab.count > 0 && (
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${getPendingBadgeClasses(
                    activeTab === tab.label
                  )}`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results List (Card Layout) */}
      <div className="space-y-4">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left Section: Patient & Test Info */}
              <div className="flex items-start gap-4 flex-1 w-full md:w-auto">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${result.patientColor}`}
                >
                  {result.patientInitials}
                </div>

                <div className="min-w-0">
                  <h3 className="text-gray-900 font-bold text-lg truncate">
                    {result.test}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                      {result.id}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {result.patient}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Section: Meta Data */}
              <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto justify-between md:justify-end px-4">
                <div className="text-center md:text-right hidden md:block">
                  <span className="block text-sm font-medium text-gray-900">
                    {result.technician}
                  </span>
                  <span className="text-xs text-gray-500">Technician</span>
                </div>

                <div className="text-center md:text-right">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                    <Calendar size={14} className="text-gray-400" />
                    {result.submitted}
                  </div>
                  <span className="text-xs text-gray-500">Suggested Date</span>
                </div>

                <div className="flex items-center gap-4">
                  {getStatusBadge(result.status)}

                  <div className="flex items-center gap-1 border-l border-gray-100 pl-4">
                    <button
                      className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                      title="Download Report"
                    >
                      <Download size={18} />
                    </button>
                    {result.status === "Pending" && (
                      <button className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors cursor-pointer ml-1">
                        <FileSpreadsheet size={16} />
                        Review
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Actions: Review Button if pending */}
              {result.status === "Pending" && (
                <button className="md:hidden w-full flex items-center justify-center gap-2 px-3 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors cursor-pointer">
                  <FileSpreadsheet size={16} />
                  Review Results
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
