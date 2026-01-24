
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell, CartesianGrid } from 'recharts';

const TaskDiagram: React.FC = () => {
  const data = [
    { name: '30 Ago', value: 2, display: '30 Ago' },
    { name: '1 Set', value: 8, display: '' },
    { name: '2 Set', value: 16, display: '2 Set' },
    { name: '3 Set', value: 12, display: '' },
    { name: '4 Set', value: 18, highlight: true, display: '' },
    { name: '5 Set', value: 10, display: '5 Set' },
    { name: '6 Set', value: 0, display: '' },
    { name: 'Hoje', value: 5, display: 'Hoje' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col h-[350px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-sm">Diagrama de tarefas</h3>
        <button className="text-slate-300"><span className="material-icons-round text-lg">more_vert</span></button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex bg-slate-50 p-0.5 rounded-lg border border-slate-100">
          <button className="px-5 py-1 text-[10px] font-bold rounded-md bg-white text-blue-600 shadow-sm border border-slate-100">Diário</button>
          <button className="px-5 py-1 text-[10px] font-bold rounded-md text-slate-400 hover:text-slate-600">Semanal</button>
          <button className="px-5 py-1 text-[10px] font-bold rounded-md text-slate-400 hover:text-slate-600">Mensal</button>
        </div>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-slate-50 rounded border border-slate-100 text-slate-400">
            <span className="material-icons-round text-sm">chevron_left</span>
          </button>
          <button className="p-1 hover:bg-slate-50 rounded border border-slate-100 text-slate-400">
            <span className="material-icons-round text-sm">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#F1F5F9" strokeDasharray="3 3" />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length && payload[0].payload.highlight) {
                  return (
                    <div className="bg-red-500 text-[10px] text-white font-bold px-2 py-1 rounded shadow-lg relative -top-8">
                      18 <br/> 4 Set
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rotate-45"></div>
                    </div>
                  );
                }
                return null;
              }}
              position={{ y: 0 }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={16}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.highlight ? '#4F46E5' : '#3B82F6'} 
                  fillOpacity={entry.name === '30 Ago' || entry.name === '6 Set' ? 0.3 : 1}
                />
              ))}
            </Bar>
            <XAxis 
              dataKey="display" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskDiagram;
