
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const MonthlyProductivity: React.FC = () => {
  const data = [
    { value: 65, color: '#10B981' },
    { value: 35, color: '#F1F5F9' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col h-[350px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800 text-sm">Produtividade mensal</h3>
        <div className="flex items-center gap-1.5">
          <button className="p-0.5 text-slate-300 hover:text-slate-500">
            <span className="material-icons-round text-lg">chevron_left</span>
          </button>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Setembro</span>
          <button className="p-0.5 text-slate-300 hover:text-slate-500">
            <span className="material-icons-round text-lg">chevron_right</span>
          </button>
          <button className="text-slate-300 ml-1">
            <span className="material-icons-round text-lg">more_vert</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center flex-1">
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Baixa</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Boa</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Alta</span>
          </div>
        </div>

        <div className="relative w-64 h-36 overflow-hidden flex items-end justify-center">
          <div className="absolute w-64 h-64 -bottom-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={75}
                  outerRadius={95}
                  dataKey="value"
                  stroke="none"
                  paddingAngle={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col items-center z-10 pb-2">
            <span className="text-3xl font-black text-slate-800">65%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alta</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyProductivity;
