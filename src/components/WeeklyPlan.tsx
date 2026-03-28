
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import { startOfWeek, endOfWeek, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const WeeklyPlan: React.FC = () => {
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 });
  const end = endOfWeek(today, { weekStartsOn: 1 });
  const dateRange = `${format(start, 'd', { locale: ptBR })}-${format(end, 'd', { locale: ptBR })} de ${format(end, 'MMMM', { locale: ptBR })}`;

  const data = [
    { name: 'Concluído', value: 37.4 },
    { name: 'Restante', value: 100 - 37.4 },
  ];
  const COLORS = ['#3B82F6', '#F1F5F9'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-slate-800">Plano semanal</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">{dateRange}</span>
          <button className="text-slate-300">
            <span className="material-icons-round text-xl">more_vert</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="w-full h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                startAngle={210}
                endAngle={-30}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={index === 0 ? 10 : 0} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <span className="text-3xl font-extrabold text-slate-800">37:25</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Tempo de Tarefas</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlan;
