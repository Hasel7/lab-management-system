import React, { useState } from "react";
import { User, Bell, Shield, Building } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  //   Profile
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@lab.com",
    phone: "+1 234 567 890",
    role: "Lab Technician",
  });

  //   Notifications
  const [preferences, setPreferences] = useState({
    email: true,
    tasks: true,
    lowStock: true,
    approvals: true,
    reminders: false,
  });

  //   Security
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  //   Lab Settings
  const [labSettings, setLabSettings] = useState({
    name: "Central Diagnostics Lab",
    address: "123 Medical Center Drive",
    timezone: "UTC",
    currency: "USD",
    autoApprove: false,
  });

  //   Lab Settings
  const handleLabSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLabSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //   Security
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   Notifications
  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  //   Profile
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   Tabs
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "lab", label: "Lab Settings", icon: Building },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      {/* Tabs Navigation */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl w-full sm:w-fit overflow-x-auto">
        {tabs.map((tab) => {
          let tabClass =
            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap flex-shrink-0";
          if (activeTab === tab.id) {
            tabClass += " bg-white text-slate-900 shadow-sm";
          } else {
            tabClass +=
              "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50";
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={tabClass}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Profile Information
              </h2>
              <p className="text-sm text-slate-500">
                Update your personal details
              </p>
            </div>

            {/* Profile Form */}
            <form className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  disabled
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Notification Preferences
              </h2>
              <p className="text-sm text-slate-500">
                Choose what notifications you receive
              </p>
            </div>

            <div className="space-y-6 divide-y divide-slate-100">
              {[
                {
                  id: "email",
                  label: "Email Notifications",
                  desc: "Receive email for important updates",
                },
                {
                  id: "tasks",
                  label: "Task Reminders",
                  desc: "Get notified about pending tasks",
                },
                {
                  id: "lowStock",
                  label: "Low Stock Alerts",
                  desc: "Alert when inventory is running low",
                },
                {
                  id: "approvals",
                  label: "Result Approvals",
                  desc: "Notify when results need approval",
                },
                {
                  id: "reminders",
                  label: "Sample Collection Reminders",
                  desc: "Reminders for scheduled collections",
                },
              ].map((item, index) => {
                let itemClass = "flex items-center justify-between";
                if (index !== 0) {
                  itemClass += " pt-6";
                }

                let toggleButtonClass =
                  "relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20";
                if (preferences[item.id]) {
                  toggleButtonClass += " bg-teal-600";
                } else {
                  toggleButtonClass += " bg-slate-200";
                }

                let toggleSpanClass =
                  "block w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200";
                if (preferences[item.id]) {
                  toggleSpanClass += " translate-x-6";
                } else {
                  toggleSpanClass += " translate-x-1";
                }

                return (
                  <div key={item.id} className={itemClass}>
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-medium text-slate-900">
                        {item.label}
                      </h3>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => handleToggle(item.id)}
                      className={toggleButtonClass}
                    >
                      <span className={toggleSpanClass} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Change Password
              </h2>
              <p className="text-sm text-slate-500">
                Update your password regularly for security
              </p>
            </div>

            <form className="space-y-6 max-w-2xl">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Current Password
                </label>
                <input
                  type="password"
                  name="current"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50"
                  placeholder="Enter current password"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="new"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50"
                  placeholder="Enter new password"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lab Settings */}
        {activeTab === "lab" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Laboratory Settings
              </h2>
              <p className="text-sm text-slate-500">
                Configure lab-wide settings
              </p>
            </div>

            <form className="space-y-6 max-w-2xl">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Laboratory Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={labSettings.name}
                  onChange={handleLabSettingsChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={labSettings.address}
                  onChange={handleLabSettingsChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Timezone
                  </label>
                  <select
                    name="timezone"
                    value={labSettings.timezone}
                    onChange={handleLabSettingsChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50 appearance-none"
                  >
                    <option value="UTC">UTC</option>
                    <option value="PST">PST</option>
                    <option value="EST">EST</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={labSettings.currency}
                    onChange={handleLabSettingsChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50 appearance-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium text-slate-900">
                      Auto-approve Results
                    </h3>
                    <p className="text-sm text-slate-500">
                      Skip manual approval for routine tests
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setLabSettings((prev) => ({
                        ...prev,
                        autoApprove: !prev.autoApprove,
                      }))
                    }
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${(() => {
                      if (labSettings.autoApprove) {
                        return "bg-teal-600";
                      } else {
                        return "bg-slate-200";
                      }
                    })()}`}
                  >
                    <span
                      className={`block w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${(() => {
                        if (labSettings.autoApprove) {
                          return "translate-x-6";
                        } else {
                          return "translate-x-1";
                        }
                      })()}`}
                    />
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
