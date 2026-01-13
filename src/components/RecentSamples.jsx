import { FlaskConical } from "lucide-react";

function RecentSamples() {
  // Recent samples data
  const samples = [
    {
      initials: "JS",
      name: "John Smith",
      test: "Complete Blood Count",
      status: "processing",
      time: "10 mins ago",
      initialsColor: "bg-teal-100 text-teal-700",
    },
    {
      initials: "SJ",
      name: "Sarah Johnson",
      test: "Lipid Panel",
      status: "pending",
      time: "25 mins ago",
      initialsColor: "bg-emerald-100 text-emerald-700",
    },
    {
      initials: "MB",
      name: "Michael Brown",
      test: "Glucose Test",
      status: "completed",
      time: "1 hour ago",
      initialsColor: "bg-teal-100 text-teal-700",
    },
  ];

  // Function to get status color
  const getStatusColor = (status) => {
    if (status === "processing") {
      return "bg-blue-100 text-blue-700";
    } else if (status === "pending") {
      return "bg-amber-100 text-amber-700";
    } else if (status === "completed") {
      return "bg-emerald-100 text-emerald-700";
    } else {
      return "bg-slate-100 text-slate-700";
    }
  };

  return (
    // Recent samples component
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-teal-600" />
          <h2 className="text-lg font-bold text-slate-800">Recent Samples</h2>
        </div>
        <button className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1">
          View all <span>→</span>
        </button>
      </div>

      <div className="space-y-4">
        {samples.map((sample, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${sample.initialsColor}`}
              >
                {sample.initials}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  {sample.name}
                </h4>
                <p className="text-xs text-slate-500">{sample.test}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  sample.status
                )}`}
              >
                {sample.status}
              </span>
              <span className="text-xs text-slate-400 w-20 text-right">
                {sample.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSamples;
