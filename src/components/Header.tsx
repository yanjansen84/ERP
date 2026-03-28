
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-50 px-6 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Câmbio */}
        <div className="flex items-center gap-2 text-slate-500">
          <span className="material-icons-round text-lg text-red-400">trending_up</span>
          <span className="text-xs font-medium">1 USD = 5,10 BRL</span>
        </div>

        {/* Tempo de Foco */}
        <div className="flex items-center gap-2 text-blue-500 bg-blue-50/50 px-2 py-1 rounded-lg">
          <span className="material-icons-round text-lg">schedule</span>
          <span className="text-xs font-bold">4h 15m</span>
        </div>
        
        {/* Notificações e Busca */}
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full relative">
            <span className="material-icons-round">notifications_none</span>
            <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-[9px] text-white flex items-center justify-center rounded-full border-2 border-white font-bold">12</span>
          </button>
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full relative">
            <span className="material-icons-round">mail_outline</span>
            <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-[9px] text-white flex items-center justify-center rounded-full border-2 border-white font-bold">2</span>
          </button>
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full">
            <span className="material-icons-round">search</span>
          </button>
        </div>

        <div className="h-6 w-px bg-slate-200"></div>

        {/* Perfil */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-700">Administrador</p>
          </div>
          <div className="relative">
            <img 
              alt="Usuário" 
              className="w-8 h-8 rounded-full" 
              src="https://picsum.photos/seed/avatar-main/100/100" 
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
