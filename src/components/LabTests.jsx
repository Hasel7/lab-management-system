import React from "react";
import {
  TestTube,
  Microscope,
  Activity,
  Stethoscope,
  Search,
  Plus,
  Clock,
  Droplet,
} from "lucide-react";

const LabTests = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Tests Data
  const [tests, setTests] = React.useState([
    {
      id: "TEST-001",
      name: "Complete Blood Count",
      category: "Hematology",
      duration: "2 hours",
      type: "Blood",
      price: 25.0,
      fasting: false,
    },
    {
      id: "TEST-002",
      name: "Lipid Panel",
      category: "Biochemistry",
      duration: "4 hours",
      type: "Blood",
      price: 45.0,
      fasting: true,
    },
    {
      id: "TEST-003",
      name: "Hemoglobin A1C",
      category: "Biochemistry",
      duration: "3 hours",
      type: "Blood",
      price: 35.0,
      fasting: false,
    },
    {
      id: "TEST-004",
      name: "Thyroid Function Panel",
      category: "Biochemistry",
      duration: "6 hours",
      type: "Blood",
      price: 55.0,
      fasting: false,
    },
    {
      id: "TEST-005",
      name: "Urinalysis",
      category: "Clinical Pathology",
      duration: "1 hour",
      type: "Urine",
      price: 15.0,
      fasting: false,
    },
    {
      id: "TEST-006",
      name: "Blood Culture",
      category: "Microbiology",
      duration: "48 hours",
      type: "Blood",
      price: 75.0,
      fasting: false,
    },
  ]);

  // New Test Form Data
  const [newTest, setNewTest] = React.useState({
    name: "",
    category: "Hematology",
    duration: "",
    type: "Blood",
    price: "",
    fasting: false,
  });

  // Categories Data
  const categories = [
    {
      label: "Hematology",
      count: "12 tests",
      color: "bg-red-500",
      icon: TestTube,
      lightColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      label: "Biochemistry",
      count: "24 tests",
      color: "bg-blue-500",
      icon: FlaskIcon,
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Microbiology",
      count: "18 tests",
      color: "bg-green-500",
      icon: Microscope,
      lightColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      label: "Clinical Pathology",
      count: "15 tests",
      color: "bg-purple-500",
      icon: Stethoscope,
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTest((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Add Test
  const handleAddTest = (e) => {
    e.preventDefault();
    const id = `TEST-00${tests.length + 1}`;
    const testToAdd = {
      id,
      ...newTest,
      price: parseFloat(newTest.price),
    };

    setTests([testToAdd, ...tests]);
    setIsModalOpen(false);
    setNewTest({
      name: "",
      category: "Hematology",
      duration: "",
      type: "Blood",
      price: "",
      fasting: false,
    });
  };

  // Helper component for category icon to handle dynamic import or fallback
  // Using a simple replacement for FlaskIcon since it wasn't imported directly above properly in the list
  // Actually, let's fix the FlaskIcon import. I'll use TestTube2 as a generic substitute or import FlaskConical if needed.
  // Ideally, I should strictly follow imports. Let's use Activity as placeholder or fix imports.

  // Get Test Type Icon
  const getTestTypeIcon = (type) => {
    if (type === "Blood") {
      return <Droplet size={16} />;
    } else {
      return <TestTube size={16} />;
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-8 bg-gray-50 min-h-screen relative">
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4"
          >
            <div className={`p-4 rounded-xl ${cat.color} text-white`}>
              <cat.icon size={24} />
            </div>
            <div>
              <div className="font-bold text-gray-800">{cat.label}</div>
              <div className="text-sm text-gray-500">{cat.count}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-4 w-full md:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Test
          </button>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {test.name}
                </h3>
                <div className="text-gray-400 text-sm font-mono">{test.id}</div>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                {test.category}
              </span>
            </div>

            <div className="flex items-center gap-6 mb-6 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{test.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                {getTestTypeIcon(test.type)}
                <span>{test.type}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-teal-600 font-bold text-xl">
                  ${test.price.toFixed(2)}
                </span>
                {test.fasting && (
                  <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded font-medium">
                    Fasting
                  </span>
                )}
              </div>
              <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors">
                Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Test Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Add New Test</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <form onSubmit={handleAddTest} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={newTest.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. Vitamin D"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={newTest.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.label} value={cat.label}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sample Type
                  </label>
                  <select
                    name="type"
                    value={newTest.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Blood">Blood</option>
                    <option value="Urine">Urine</option>
                    <option value="Swab">Swab</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    required
                    value={newTest.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g. 2 hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    step="0.01"
                    value={newTest.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g. 50.00"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="fasting"
                  id="fasting"
                  checked={newTest.fasting}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="fasting" className="ml-2 text-sm text-gray-700">
                  Patient needs fasting
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
                  Create Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Fix for missing FlaskIcon import
const FlaskIcon = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
    <path d="M8.5 2h7" />
    <path d="M7 16h10" />
  </svg>
);

export default LabTests;
