import React from "react";
import {
  Clock,
  FlaskConical,
  CheckCircle,
  Search,
  Scan,
  Plus,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

const SampleTracking = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  // Sample Data
  const [samples, setSamples] = React.useState([
    {
      id: 1,
      sampleId: "SMP-2024-0156",
      barcode: "BC-001234",
      testName: "Complete Blood Count (CBC)",
      patientName: "John Smith",
      patientId: "PAT-001",
      doctor: "Dr. Mark Lee",
      date: "2024-01-15 09:30 AM",
      status: "Processing",
      urgent: false,
    },
    {
      id: 2,
      sampleId: "SMP-2024-0157",
      barcode: "BC-001235",
      testName: "Lipid Panel",
      patientName: "Sarah Johnson",
      patientId: "PAT-002",
      doctor: "Dr. Sarah Chen",
      date: "2024-01-15 09:45 AM",
      status: "Pending",
      urgent: false,
    },
    {
      id: 3,
      sampleId: "SMP-2024-0158",
      barcode: "BC-001236",
      testName: "Glucose Tolerance Test",
      patientName: "Michael Brown",
      patientId: "PAT-003",
      doctor: "Dr. James Wilson",
      date: "2024-01-15 10:00 AM",
      status: "Completed",
      urgent: false,
    },
    {
      id: 4,
      sampleId: "SMP-2024-0159",
      barcode: "BC-001237",
      testName: "Thyroid Function Panel",
      patientName: "Emily Davis",
      patientId: "PAT-004",
      doctor: "Dr. Mark Lee",
      date: "2024-01-15 10:15 AM",
      status: "Processing",
      urgent: true,
    },
  ]);

  // New Sample Data
  const [newSample, setNewSample] = React.useState({
    patientName: "",
    doctor: "",
    testName: "",
    urgent: false,
  });

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue;

    if (type === "checkbox") {
      finalValue = checked;
    } else {
      finalValue = value;
    }

    setNewSample((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  // Handle Add Sample
  const handleAddSample = (e) => {
    e.preventDefault();
    const id = samples.length + 1;
    const sampleId = `SMP-2024-0${159 + id}`;
    const barcode = `BC-0012${37 + id}`;
    const date = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const sampleToAdd = {
      id,
      sampleId,
      barcode,
      patientId: `PAT-00${4 + id}`, // Mock logic
      date,
      status: "Pending",
      ...newSample,
    };

    setSamples([sampleToAdd, ...samples]);
    setIsModalOpen(false);
    setNewSample({
      patientName: "",
      doctor: "",
      testName: "",
      urgent: false,
    });
  };

  // Get Status Color
  const getStatusColor = (status) => {
    if (status === "Pending") {
      return "bg-amber-100 text-amber-700";
    } else if (status === "Processing") {
      return "bg-blue-100 text-blue-700";
    } else if (status === "Completed") {
      return "bg-emerald-100 text-emerald-700";
    } else {
      return "bg-gray-100 text-gray-700";
    }
  };

  // Get Icon Style
  const getIconStyle = (status) => {
    if (status === "Completed") {
      return "bg-emerald-50 text-emerald-600";
    } else if (status === "Pending") {
      return "bg-amber-50 text-amber-600";
    } else {
      return "bg-blue-50 text-blue-600";
    }
  };

  // Get Status Icon
  const getStatusIcon = (status) => {
    if (status === "Completed") {
      return <CheckCircle size={24} />;
    } else if (status === "Pending") {
      return <Clock size={24} />;
    } else {
      return <FlaskConical size={24} />;
    }
  };

  // Get Urgent Badge
  const getUrgentBadge = () => (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-600 ml-2">
      <AlertCircle className="w-3 h-3 mr-1" />
      Urgent
    </span>
  );

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6 bg-gray-50 min-h-screen relative">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-center space-x-4">
          <div className="p-3 bg-amber-500 rounded-lg text-white">
            <Clock size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">
              {samples.filter((s) => s.status === "Pending").length}
            </div>
            <div className="text-amber-600 font-medium">Pending</div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-500 rounded-lg text-white">
            <FlaskConical size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">
              {samples.filter((s) => s.status === "Processing").length}
            </div>
            <div className="text-blue-600 font-medium">Processing</div>
          </div>
        </div>

        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center space-x-4">
          <div className="p-3 bg-emerald-500 rounded-lg text-white">
            <CheckCircle size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">
              {samples.filter((s) => s.status === "Completed").length}
            </div>
            <div className="text-emerald-600 font-medium">Completed</div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-4 w-full md:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Sample
          </button>
        </div>
      </div>

      {/* Sample List */}
      <div className="space-y-4">
        {samples.map((sample) => (
          <div
            key={sample.id}
            className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div
                  className={`p-3 rounded-lg ${getIconStyle(sample.status)}`}
                >
                  {getStatusIcon(sample.status)}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-teal-700 font-bold font-mono text-lg">
                      {sample.sampleId}
                    </span>
                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded font-mono">
                      {sample.barcode}
                    </span>
                    {sample.urgent && getUrgentBadge()}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {sample.testName}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full md:w-auto justify-between md:justify-end px-4">
                <div className="text-center md:text-right">
                  <div className="font-semibold text-gray-800">
                    {sample.patientName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {sample.patientId}
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <div className="font-semibold text-gray-800">
                    {sample.doctor}
                  </div>
                  <div className="text-xs text-gray-500">{sample.date}</div>
                </div>

                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                    sample.status,
                  )}`}
                >
                  {sample.status}
                </span>

                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Sample Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">New Sample</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <form onSubmit={handleAddSample} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="patientName"
                  required
                  value={newSample.patientName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name
                </label>
                <input
                  type="text"
                  name="doctor"
                  required
                  value={newSample.doctor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. Dr. Sarah Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Name
                </label>
                <input
                  type="text"
                  name="testName"
                  required
                  value={newSample.testName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. Blood Count"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="urgent"
                  id="urgent"
                  checked={newSample.urgent}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="urgent" className="ml-2 text-sm text-gray-700">
                  Mark as Urgent
                </label>
              </div>

              <div className="pt-4 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors"
                >
                  Add Sample
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleTracking;
