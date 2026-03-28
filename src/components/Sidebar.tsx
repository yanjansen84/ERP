import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MenuItem {
  icon: string;
  path: string;
  label?: string;
  subItems?: string[];
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;

  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);

  const menuItems: MenuItem[] = [
    { icon: 'dashboard', path: '/dashboard', label: 'Dashboard' },
    {
      icon: 'point_of_sale',
      path: '/pdv',
      label: 'PDV',
      subItems: [
        'Orçamento',
        'Pedido'
      ]
    },
    {
      icon: 'app_registration',
      path: '/cadastros',
      label: 'Cadastros',
      subItems: [
        'Clientes',
        'Fornecedores',
        'Transportadora',
        'Marcas',
        'Grupos',
        'Subgrupo'
      ]
    },
    {
      icon: 'inventory_2',
      path: '/estoque',
      label: 'Estoque',
      subItems: [
        'Produtos',
        'Pedido ao Fornecedor',
        'Ressuprimento',
        'Entrada de NF',
        'Devolução de Pedido',
        'Ajuste de Estoque'
      ]
    },
    { icon: 'account_balance', path: '/financeiro', label: 'Financeiro' },
    { icon: 'receipt_long', path: '/fiscal', label: 'Fiscal' },
    { icon: 'assessment', path: '/relatorios', label: 'Relatórios' },
  ];

  const handleNavigation = (item: MenuItem) => {
    if (!item.subItems) {
      navigate(item.path);
    }
  };

  return (
    <aside className="w-16 lg:w-20 bg-white border-r border-slate-100 flex flex-col items-center py-6 flex-shrink-0 z-50">
      {/* Logo colorido estilo flor/estrela */}
      <div className="w-10 h-10 mb-8 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="25" r="12" fill="#3B82F6" />
          <circle cx="75" cy="50" r="12" fill="#10B981" />
          <circle cx="50" cy="75" r="12" fill="#F59E0B" />
          <circle cx="25" cy="50" r="12" fill="#EF4444" />
          <circle cx="50" cy="50" r="8" fill="#6366F1" />
        </svg>
      </div>

      <nav className="flex flex-col gap-4 relative">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className="relative group"
            onMouseEnter={() => setHoveredMenu(idx)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <button
              onClick={() => handleNavigation(item)}
              className={`p-2.5 rounded-xl transition-all duration-200 relative z-10 ${activePath === item.path || (item.path !== '/dashboard' && activePath.startsWith(item.path))
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'text-slate-400 hover:bg-slate-50 hover:text-blue-500'
                }`}
            >
              <span className="material-icons-round text-[22px]">{item.icon}</span>
            </button>

            {/* Menu Suspenso (Popover) */}
            {item.subItems && hoveredMenu === idx && (
              <div
                className="absolute left-full top-0 pl-3 w-64 z-20 flex flex-col gap-1 animate-in fade-in slide-in-from-left-2 duration-200"
              >
                <div className="bg-white border border-slate-100 shadow-xl rounded-xl p-2 w-full">
                  <div className="text-xs font-bold text-slate-400 px-3 py-2 uppercase tracking-wider border-b border-slate-50 mb-1">
                    {item.label}
                  </div>
                  {item.subItems.map((sub, subIdx) => (
                    <button
                      key={subIdx}
                      className="text-left px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2 w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Normalizar texto para url: "Usuários do Sistema" -> "usuarios-do-sistema"
                        const path = sub.toLowerCase()
                          .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove acentos
                          .replace(/ /g, "-");
                        navigate(`${item.path}/${path}`);
                        setHoveredMenu(null);
                      }}
                    >
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-5">
        <button className="text-slate-400 hover:text-blue-500 transition-colors">
          <span className="material-icons-round text-[22px]">settings</span>
        </button>
        <button className="text-slate-400 hover:text-blue-500 transition-colors">
          <span className="material-icons-round text-[22px]">info</span>
        </button>
        <button className="text-slate-400 hover:text-blue-500 transition-colors">
          <span className="material-icons-round text-[22px]">chat_bubble_outline</span>
        </button>
      </div>

      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
    </aside>
  );
};

export default Sidebar;
