
import React from 'react';

const TaskList: React.FC = () => {
  const tasks = [
    {
      title: 'Integração com redes sociais v5',
      dept: 'Departamento de TI',
      time: '04:00',
      dotColor: 'bg-emerald-400',
      borderColor: 'border-emerald-400'
    },
    {
      title: 'Verificação de prazos do pacote de vendas com a data de reunião...',
      dept: 'Departamento de Vendas',
      time: '05:30',
      dotColor: 'bg-indigo-500',
      borderColor: 'border-indigo-500'
    },
    {
      title: 'Desenvolver Design System do aplicativo móvel',
      dept: 'Departamento de Design',
      time: '12:00',
      dotColor: 'bg-orange-400',
      borderColor: 'border-orange-400'
    },
    {
      title: 'Reunião com a equipe de gestão sobre o plano de novos recursos',
      dept: 'Gestão',
      time: '06:00',
      dotColor: 'bg-orange-500',
      borderColor: 'border-orange-500'
    },
    {
      title: 'Observar como os usuários interagem com o protótipo, onde encontram dificul...',
      dept: 'Departamento de Design',
      time: '04:30',
      dotColor: 'bg-indigo-600',
      borderColor: 'border-indigo-600'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[400px]">
      <div className="p-4 flex items-center justify-between border-b border-slate-50">
        <h3 className="font-bold text-slate-800 text-sm">Tarefas</h3>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded-lg flex items-center gap-1 font-bold shadow-sm">
            <span className="material-icons-round text-sm">add</span> Adicionar
          </button>
          <button className="text-slate-300">
            <span className="material-icons-round text-lg">more_vert</span>
          </button>
        </div>
      </div>
      <div className="p-3 space-y-2 overflow-y-auto no-scrollbar">
        {tasks.map((task, idx) => (
          <div 
            key={idx} 
            className={`p-3 bg-white hover:bg-slate-50 transition-colors border-l-4 ${task.borderColor} rounded-r-lg group cursor-pointer`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                <h4 className="text-[11px] font-bold text-slate-700 leading-tight mb-1">{task.title}</h4>
                <p className="text-[9px] text-slate-400 font-medium uppercase">{task.dept}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${task.dotColor}`}></span>
                  <span className="material-icons-round text-sm text-indigo-500">flag</span>
                </div>
                <div className="text-[9px] font-bold text-slate-400">
                  Meta: <span className="text-slate-600">{task.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
