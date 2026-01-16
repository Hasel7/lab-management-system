import React, { useState } from "react";
import {
  Search,
  Plus,
  FileText,
  CreditCard,
  Filter,
  Receipt,
  Download,
  X,
} from "lucide-react";

const Billing = () => {
  // Mock Data for Invoices
  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      patient: "John Doe",
      amount: "150.00",
      date: "2024-01-15",
      status: "paid",
    },
    {
      id: "INV-002",
      patient: "Jane Smith",
      amount: "275.00",
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: "INV-003",
      patient: "Mike Johnson",
      amount: "95.00",
      date: "2024-01-14",
      status: "overdue",
    },
    {
      id: "INV-004",
      patient: "Sarah Williams",
      amount: "180.00",
      date: "2024-01-14",
      status: "paid",
    },
    {
      id: "INV-005",
      patient: "Tom Brown",
      amount: "320.00",
      date: "2024-01-13",
      status: "pending",
    },
  ]);

  //   Modal State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   New Invoice State
  const [newInvoice, setNewInvoice] = useState({
    patient: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    status: "pending",
  });

  //   Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const invoice = {
      id: `INV-00${invoices.length + 1}`,
      ...newInvoice,
    };
    setInvoices((prev) => [invoice, ...prev]);
    setIsModalOpen(false);
    setNewInvoice({
      patient: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    });
  };

  //   Get Status Badge
  const getStatusBadge = (status) => {
    if (status === "paid") {
      return (
        <span className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-full capitalize font-medium">
          {status}
        </span>
      );
    } else if (status === "pending") {
      return (
        <span className="px-3 py-1 bg-amber-500 text-white text-xs rounded-full capitalize font-medium">
          {status}
        </span>
      );
    } else if (status === "overdue") {
      return (
        <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full capitalize font-medium">
          {status}
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full capitalize font-medium">
        {status}
      </span>
    );
  };

  // Filter logic
  const filteredInvoices = invoices.filter((invoice) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      invoice.patient.toLowerCase().includes(searchLower) ||
      invoice.id.toLowerCase().includes(searchLower);
    const matchesStatus =
      filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium mb-2">
            Total Revenue
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-semibold text-slate-800">
              $12,450
            </span>
          </div>
          <p className="text-xs text-emerald-500 font-medium mt-1">+12%</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium mb-2">Pending</h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-semibold text-slate-800">
              $2,340
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">8 invoices</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium mb-2">Overdue</h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-semibold text-slate-800">$890</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">3 invoices</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-3">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 font-medium outline-none cursor-pointer focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <Filter className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* New Invoice Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Invoices</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-sm font-medium">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {invoice.patient}
                  </td>
                  <td className="px-6 py-4 text-slate-900 font-medium">
                    ${invoice.amount}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{invoice.date}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-slate-400">
                      <button
                        className="hover:text-teal-600 transition-colors p-1"
                        title="View details"
                      >
                        <Receipt className="w-4 h-4" />
                      </button>
                      {(invoice.status === "pending" ||
                        invoice.status === "overdue") && (
                        <button
                          className="hover:text-teal-600 transition-colors p-1"
                          title="Process Payment"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800">
                Create New Invoice
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="patient"
                  required
                  value={newInvoice.patient}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    step="0.01"
                    required
                    value={newInvoice.amount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={newInvoice.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={newInvoice.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
