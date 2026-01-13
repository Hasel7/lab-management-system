import React, { useState } from "react";
import { Search, Filter, Plus, MoreHorizontal, X } from "lucide-react";

const Patients = () => {
  // Patients Data
  const [patients, setPatients] = useState([
    {
      id: "PAT-001",
      initials: "JS",
      name: "John Smith",
      age: 45,
      gender: "Male",
      phone: "+1 234-567-8900",
      email: "john.smith@email.com",
      lastVisit: "2024-01-15",
      status: "Active",
      avatarColor: "bg-teal-100 text-teal-700",
    },
    {
      id: "PAT-002",
      initials: "SJ",
      name: "Sarah Johnson",
      age: 32,
      gender: "Female",
      phone: "+1 234-567-8901",
      email: "sarah.j@email.com",
      lastVisit: "2024-01-14",
      status: "Active",
      avatarColor: "bg-teal-100 text-teal-700",
    },
    {
      id: "PAT-003",
      initials: "MB",
      name: "Michael Brown",
      age: 58,
      gender: "Male",
      phone: "+1 234-567-8902",
      email: "m.brown@email.com",
      lastVisit: "2024-01-10",
      status: "Pending",
      avatarColor: "bg-emerald-100 text-emerald-700",
    },
    {
      id: "PAT-004",
      initials: "ED",
      name: "Emily Davis",
      age: 27,
      gender: "Female",
      phone: "+1 234-567-8903",
      email: "emily.d@email.com",
      lastVisit: "2024-01-08",
      status: "Active",
      avatarColor: "bg-teal-100 text-teal-700",
    },
    {
      id: "PAT-005",
      initials: "RW",
      name: "Robert Wilson",
      age: 63,
      gender: "Male",
      phone: "+1 234-567-8904",
      email: "r.wilson@email.com",
      lastVisit: "2024-01-05",
      status: "Inactive",
      avatarColor: "bg-emerald-100 text-emerald-700",
    },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    email: "",
  });

  // Get Status Color
  const getStatusColor = (status) => {
    if (status === "Active") {
      return "bg-emerald-50 text-emerald-600";
    } else if (status === "Pending") {
      return "bg-amber-50 text-amber-600";
    } else {
      return "bg-slate-100 text-slate-500";
    }
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = `PAT-00${patients.length + 1}`;
    const initials = formData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newPatient = {
      id: newId,
      initials,
      ...formData,
      lastVisit: new Date().toISOString().split("T")[0],
      status: "Active", // Default status
      avatarColor: "bg-teal-100 text-teal-700", // Default color
    };

    setPatients((prev) => [...prev, newPatient]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      age: "",
      gender: "Male",
      phone: "",
      email: "",
    });
  };

  return (
    <div className="space-y-6 relative">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <Filter className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Register Patient
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Patient ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Age/Gender</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Last Visit</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-teal-600">
                    {patient.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${patient.avatarColor}`}
                      >
                        {patient.initials}
                      </div>
                      <span className="font-medium text-slate-700">
                        {patient.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {patient.age} / {patient.gender}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-700">{patient.phone}</span>
                      <span className="text-slate-400 text-xs">
                        {patient.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        patient.status
                      )}`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
                      {/* <MoreHorizontal className="w-4 h-4" /> */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800">
                Register New Patient
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    placeholder="e.g. 30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  placeholder="e.g. +1 234-567-8900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  placeholder="e.g. john@example.com"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors cursor-pointer"
                >
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
