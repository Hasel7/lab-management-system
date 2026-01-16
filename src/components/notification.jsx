import React, { useState } from "react";
import {
  Bell,
  Clock,
  AlertCircle,
  FileText,
  Check,
  Trash2,
} from "lucide-react";

const Notifications = () => {
  // Mock Data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "alert",
      title: "Pending result approval",
      description: "3 test results awaiting your approval",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "warning",
      title: "Low stock alert",
      description: "Glucose reagent is running low (5 units left)",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "reminder",
      title: "Sample collection reminder",
      description: "Patient John Doe scheduled for 2:00 PM",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 4,
      type: "report",
      title: "Report ready",
      description: "CBC report for Jane Smith is ready for download",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 5,
      type: "task",
      title: "New test assigned",
      description: "Lipid Panel test assigned to you",
      time: "Yesterday",
      unread: false,
    },
  ]);

  //   Tabs
  const [activeTab, setActiveTab] = useState("all");

  //   Unread Count
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Interactions
  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  //   Delete Notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  // Helper for icons
  const getIconInfo = (type) => {
    if (type === "alert") {
      return {
        icon: Clock,
        bg: "bg-teal-50",
        text: "text-teal-600",
      };
    } else if (type === "warning") {
      return {
        icon: AlertCircle,
        bg: "bg-red-50",
        text: "text-red-500",
      };
    } else if (type === "reminder") {
      return {
        icon: Bell,
        bg: "bg-slate-50",
        text: "text-slate-500",
      };
    } else if (type === "report") {
      return {
        icon: FileText,
        bg: "bg-slate-50",
        text: "text-slate-500",
      };
    } else if (type === "task") {
      return {
        icon: Clock,
        bg: "bg-teal-50",
        text: "text-teal-600",
      };
    } else {
      return {
        icon: Bell,
        bg: "bg-slate-50",
        text: "text-slate-500",
      };
    }
  };

  // Tabs Configuration
  const tabs = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "alerts", label: "Alerts" },
    { id: "tasks", label: "Tasks" },
  ];

  // Filtering Logic
  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return n.unread;
    if (activeTab === "alerts")
      return n.type === "alert" || n.type === "warning";
    if (activeTab === "tasks")
      return n.type === "task" || n.type === "reminder";
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-slate-500 font-medium">
          {unreadCount} unread notifications
        </h2>
        <button
          onClick={markAllRead}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <Check className="w-4 h-4" />
          Mark all read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => {
          let tabClass =
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all";
          if (activeTab === tab.id) {
            tabClass += " bg-white text-slate-800 shadow-sm";
          } else {
            tabClass +=
              " text-slate-500 hover:text-slate-700 hover:bg-slate-100/50";
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={tabClass}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        {(() => {
          if (filteredNotifications.length > 0) {
            return filteredNotifications.map((notification) => {
              const { icon: Icon, bg, text } = getIconInfo(notification.type);
              return (
                <div
                  key={notification.id}
                  className="flex items-start gap-4 p-4 hover:bg-slate-50/50 transition-colors group"
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bg}`}
                  >
                    <Icon className={`w-5 h-5 ${text}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {notification.description}
                    </p>
                    <p className="text-xs text-slate-400 mt-1.5">
                      {notification.time}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {notification.unread && (
                      <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      title="Delete notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            });
          } else {
            return (
              <div className="p-8 text-center text-slate-500">
                <p>No notifications found</p>
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default Notifications;
