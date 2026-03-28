
import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTabs } from '../context/TabsContext';

const TabNavigation: React.FC = () => {
  const { tabs, activeTabId, closeTab, setActiveTab } = useTabs();

  const handleClose = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    closeTab(id);
  };

  return (
    <div className="w-full bg-[#F3F4F6] border-b border-slate-200 flex items-center px-4 h-10 overflow-hidden relative">
      <div className="flex gap-1 overflow-x-auto no-scrollbar h-full items-end pt-1">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              group flex items-center gap-2 px-4 py-1.5 h-8 rounded-t-lg text-xs font-semibold cursor-pointer transition-all border-x border-t
              ${activeTabId === tab.id 
                ? 'bg-white border-slate-200 text-blue-600 shadow-[0_-2px_4px_rgba(0,0,0,0.05)] z-10' 
                : 'bg-slate-100 border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }
            `}
          >
            <span className="whitespace-nowrap">{tab.label}</span>
            <button
              onClick={(e) => handleClose(e, tab.id)}
              className={`
                p-0.5 rounded-full hover:bg-slate-200 transition-colors
                ${activeTabId === tab.id ? 'text-slate-400 opacity-100' : 'text-slate-400 opacity-0 group-hover:opacity-100'}
              `}
            >
              <X size={12} strokeWidth={3} />
            </button>
          </div>
        ))}
      </div>
      
      {/* Indicador de Sombras para scroll se necessário */}
      <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#F3F4F6] to-transparent pointer-events-none"></div>
    </div>
  );
};

export default TabNavigation;
