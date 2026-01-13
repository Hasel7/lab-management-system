import React from "react";
import {
  Search,
  ArrowUpDown,
  Plus,
  Package,
  Calendar,
  AlertTriangle,
} from "lucide-react";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Inventory Data
  const [inventory, setInventory] = React.useState([
    {
      id: "INV-001",
      name: "Blood Collection Tubes (EDTA)",
      category: "Collection Supplies",
      stockLevel: 45,
      maxStock: 500,
      location: "Storage A-1",
      expiryDate: "2024-06-15",
      status: "Critical",
    },
    {
      id: "INV-002",
      name: "Glucose Test Strips",
      category: "Test Consumables",
      stockLevel: 120,
      maxStock: 400,
      location: "Storage B-2",
      expiryDate: "2024-08-20",
      status: "Low Stock",
    },
    {
      id: "INV-003",
      name: "Urine Sample Containers",
      category: "Collection Supplies",
      stockLevel: 30,
      maxStock: 200,
      location: "Storage A-2",
      expiryDate: "2024-12-01",
      status: "Critical",
    },
    {
      id: "INV-004",
      name: "Pipette Tips (1000µL)",
      category: "Lab Equipment",
      stockLevel: 250,
      maxStock: 2000,
      location: "Storage C-1",
      expiryDate: "2025-03-10",
      status: "Low Stock",
    },
    {
      id: "INV-005",
      name: "Alcohol Swabs",
      category: "Collection Supplies",
      stockLevel: 800,
      maxStock: 1000,
      location: "Storage A-3",
      expiryDate: "2024-11-30",
      status: "In Stock",
    },
  ]);

  // New Item Form Data
  const [newItem, setNewItem] = React.useState({
    name: "",
    category: "Collection Supplies",
    stockLevel: "",
    maxStock: "",
    location: "",
    expiryDate: "",
  });

  // Critical and Low Stock Count
  const criticalCount = inventory.filter(
    (item) => item.status === "Critical"
  ).length;
  const lowStockCount = inventory.filter(
    (item) => item.status === "Low Stock"
  ).length;

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate Status
  const calculateStatus = (stockLevel, maxStock) => {
    const percentage = (stockLevel / maxStock) * 100;
    if (percentage < 15) {
      return "Critical";
    } else if (percentage < 30) {
      return "Low Stock";
    } else {
      return "In Stock";
    }
  };

  // Handle Add Item
  const handleAddItem = (e) => {
    e.preventDefault();
    const id = `INV-${String(inventory.length + 1).padStart(3, "0")}`;
    const stockLevel = parseInt(newItem.stockLevel);
    const maxStock = parseInt(newItem.maxStock);
    const status = calculateStatus(stockLevel, maxStock);

    const itemToAdd = {
      id,
      ...newItem,
      stockLevel,
      maxStock,
      status,
    };

    setInventory([itemToAdd, ...inventory]);
    setIsModalOpen(false);
    setNewItem({
      name: "",
      category: "Collection Supplies",
      stockLevel: "",
      maxStock: "",
      location: "",
      expiryDate: "",
    });
  };

  // Get Status Badge
  const getStatusBadge = (status) => {
    if (status === "Critical") {
      return (
        <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
          Critical
        </span>
      );
    } else if (status === "Low Stock") {
      return (
        <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
          Low Stock
        </span>
      );
    } else if (status === "In Stock") {
      return (
        <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
          In Stock
        </span>
      );
    } else {
      return null;
    }
  };

  // Get Stock Percentage
  const getStockPercentage = (current, max) => {
    return (current / max) * 100;
  };

  // Get Stock Bar Color
  const getStockBarColor = (status) => {
    if (status === "Critical") {
      return "bg-red-500";
    } else if (status === "Low Stock") {
      return "bg-amber-500";
    } else {
      return "bg-teal-500";
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6 bg-gray-50 min-h-screen relative">
      {/* Alert Banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-red-600 w-6 h-6" />
          <div>
            <h3 className="text-red-800 font-bold">
              Inventory Alert: {criticalCount} critical, {lowStockCount} low
              stock items
            </h3>
            <p className="text-red-600 text-sm">
              Please reorder supplies to maintain laboratory operations
            </p>
          </div>
        </div>
        <button className="px-4 py-2 text-red-700 hover:bg-red-100 rounded-lg font-medium transition-colors cursor-pointer">
          View Alerts
        </button>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Item
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {inventory.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-400">{item.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.category}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">
                          {item.stockLevel} units
                        </span>
                        <span className="text-gray-400">/ {item.maxStock}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getStockBarColor(
                            item.status
                          )}`}
                          style={{
                            width: `${getStockPercentage(
                              item.stockLevel,
                              item.maxStock
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Calendar size={16} />
                      <span className="text-sm font-medium">
                        {item.expiryDate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Add New Item</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={newItem.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. Blood Collection Tubes"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={newItem.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Collection Supplies">
                      Collection Supplies
                    </option>
                    <option value="Test Consumables">Test Consumables</option>
                    <option value="Lab Equipment">Lab Equipment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={newItem.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g. Storage A-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Stock
                  </label>
                  <input
                    type="number"
                    name="stockLevel"
                    required
                    value={newItem.stockLevel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g. 100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Stock
                  </label>
                  <input
                    type="number"
                    name="maxStock"
                    required
                    value={newItem.maxStock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g. 500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  required
                  value={newItem.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
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
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
