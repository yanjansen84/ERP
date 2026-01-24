
import React from 'react';

const FocusCalendar: React.FC = () => {
  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800">Meta de tempo de foco</h3>
        <button className="text-slate-300"><span className="material-icons-round text-xl">more_vert</span></button>
      </div>

      <div className="flex items-center justify-between mb-6 px-2">
        <button className="p-1 hover:bg-slate-50 rounded text-slate-400">
          <span className="material-icons-round text-lg">chevron_left</span>
        </button>
        <span className="text-sm font-bold text-slate-700">Setembro 2023</span>
        <button className="p-1 hover:bg-slate-50 rounded text-slate-400">
          <span className="material-icons-round text-lg">chevron_right</span>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-4 text-center mb-6">
        {weekDays.map(d => (
          <div key={d} className="text-[10px] font-bold text-slate-400 uppercase">{d}</div>
        ))}
        {/* Espaços vazios para o mês */}
        <div className="text-xs text-slate-200">29</div>
        <div className="text-xs text-slate-200">30</div>
        <div className="text-xs text-slate-200">31</div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(d => (
          <div key={d} className="relative flex justify-center">
            <div className={`text-[11px] font-bold w-7 h-7 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
              [1, 2, 5, 6, 7, 8].includes(d) 
                ? 'border-2 border-blue-500 text-blue-600' 
                : 'text-slate-700 hover:bg-slate-50'
            }`}>
              {d}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl relative">
          <p className="text-[10px] font-bold text-red-500 uppercase">Gestor de RH</p>
          <div className="absolute -top-1.5 left-5 w-3 h-3 bg-red-50 rotate-45 border-l border-t border-red-100"></div>
        </div>
      </div>
    </div>
  );
};

export default FocusCalendar;
