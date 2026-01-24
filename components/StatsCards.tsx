
import React from 'react';

const StatsCards: React.FC = () => {
  const stats = [
    { label: 'A Fazer', value: 31, color: 'bg-slate-300', textColor: 'text-slate-400' },
    { label: 'Em Andamento', value: 56, color: 'bg-blue-500', textColor: 'text-blue-500' },
    { label: 'Atrasadas', value: 14, color: 'bg-red-500', textColor: 'text-red-500' },
    { label: 'Visão Geral', value: 17, color: 'bg-indigo-600', textColor: 'text-indigo-600' },
    { label: 'Concluídas', value: 28, color: 'bg-emerald-500', textColor: 'text-emerald-500' },
    { label: 'Total Tarefas', value: 146, color: 'bg-slate-800', textColor: 'text-slate-800' },
  ];

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
