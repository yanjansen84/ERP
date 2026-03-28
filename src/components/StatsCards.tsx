
import React from 'react';

import { dashboardStats } from '../data/mockData';

const StatsCards: React.FC = () => {
  const stats = dashboardStats;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          className="bg-white p-4 rounded-xl border border-slate-50 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-1 h-3 ${stat.color} rounded-full`}></div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{stat.label}</p>
          </div>
          <p className={`text-2xl font-bold ${stat.textColor}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
