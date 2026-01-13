import { AlertTriangle, Package } from "lucide-react";

function LowStockAlerts() {
    // Low stock alerts data
  const alerts = [
    {
      name: "Blood Collection Tubes",
      current: 45,
      total: 100,
      isCritical: true,
    },
    {
      name: "Glucose Test Strips",
      current: 120,
      total: 150,
      isCritical: false,
    },
    {
      name: "Urine Sample Containers",
      current: 30,
      total: 50,
      isCritical: true,
    },
    {
      name: "Pipette Tips (1000μL)",
      current: 250,
      total: 500,
      isCritical: false,
    },
  ];

  return (
    // Low stock alerts component
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-teal-600" />
          <h2 className="text-lg font-bold text-slate-800">Low Stock Alerts</h2>
        </div>
        <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold">
          2
        </div>
      </div>

      <div className="space-y-6">
        {alerts.map((item, index) => {
          const percentage = (item.current / item.total) * 100;
          const isCritical = item.isCritical; // Could also judge by percentage < 50
          let colorClass;
          let textClass;

          if (isCritical) {
            colorClass = "bg-rose-500";
            textClass = "text-rose-600";
          } else {
            colorClass = "bg-teal-500";
            textClass = "text-slate-500";
          }

          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isCritical && (
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      isCritical ? "text-slate-800" : "text-slate-700"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <div className="text-sm font-bold">
                  <span className={textClass}>{item.current}</span>
                  <span className="text-slate-400"> / {item.total}</span>
                </div>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${colorClass}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LowStockAlerts;
