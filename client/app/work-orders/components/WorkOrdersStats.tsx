"use client";

import { Clock, Wrench, AlertTriangle, CheckCircle2 } from "lucide-react";

export function WorkOrdersStats() {
  const stats = [
    {
      title: "Pending",
      count: 12,
      subtitle: "Awaiting Assignment",
      icon: Clock,
      color: "yellow"
    },
    {
      title: "In Progress",
      count: 24,
      subtitle: "Currently being fixed",
      icon: Wrench,
      color: "blue"
    },
    {
      title: "Urgent",
      count: 5,
      subtitle: "Needs Immediate Action",
      icon: AlertTriangle,
      color: "red",
      subtitleColor: "text-red-500"
    },
    {
      title: "Completed",
      count: 156,
      subtitle: "This month",
      icon: CheckCircle2,
      color: "green"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-transparent dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-500`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold">{stat.title}</h3>
          </div>
          <p className="text-2xl font-black">{stat.count}</p>
          <p className={`text-[10px] ${stat.subtitleColor || 'text-gray-400'} font-bold uppercase mt-1`}>{stat.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
