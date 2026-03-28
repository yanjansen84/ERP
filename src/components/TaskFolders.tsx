
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TaskFolders: React.FC = () => {
  const data = [
    { name: 'Depto. Financeiro', value: 24, color: '#EF4444' },
    { name: 'Depto. de TI', value: 59, color: '#6366F1' },
    { name: 'Gestão de RH', value: 31, color: '#10B981' },
    { name: 'Depto. de Design', value: 17, color: '#FB923C' },
    { name: 'Depto. de Vendas', value: 15, color: '#3B82F6' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-[350px]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-slate-800">Pastas de tarefas</h3>
        <button className="text-slate-300">
          <span className="material-icons-round text-xl">more_vert</span>
        </button>
      </div>

      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-36 h-36 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={65}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-slate-800">146</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Total Tarefas</span>
          </div>
        </div>

        <div className="flex-1 space-y-2.5">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11px] font-bold">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-slate-500 whitespace-nowrap">{item.name}</span>
              </div>
              <span className="text-slate-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskFolders;
