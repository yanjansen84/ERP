
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import TaskList from './components/TaskList';
import FocusCalendar from './components/FocusCalendar';
import WeeklyPlan from './components/WeeklyPlan';
import TaskDiagram from './components/TaskDiagram';
import TaskFolders from './components/TaskFolders';
import MonthlyProductivity from './components/MonthlyProductivity';

// Componente para a Dashboard (Conteúdo atual)
const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Gestão de Tarefas');
  const tabs = ['Gestão de Tarefas', 'Recursos Humanos', 'Finanças e Contratos', 'Almoxarifado', 'LMS', 'CRM'];

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Sub Navegação */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${activeTab === tab
                ? 'bg-white border-blue-500 text-blue-600 shadow-sm'
                : 'bg-white border-slate-200 text-slate-400 hover:border-blue-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TaskList />
        <FocusCalendar />
        <WeeklyPlan />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
        <TaskDiagram />
        <TaskFolders />
        <MonthlyProductivity />
      </div>
    </div>
  );
};

// Componente Placeholder para Cadastros
const Cadastros: React.FC = () => {
  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Cadastros</h2>
      <p className="text-slate-500">Selecione uma opção no menu lateral.</p>
    </div>
  );
};

// Cadastros
import ClientList from './src/pages/clients/ClientList';
import SupplierList from './src/pages/suppliers/SupplierList';
import TransportadoraList from './src/pages/cadastros/TransportadoraList';
import Marcas from './src/pages/cadastros/Marcas';
import Grupos from './src/pages/cadastros/Grupos';
import Subgrupo from './src/pages/cadastros/Subgrupo';

// PDV
import Orcamento from './src/pages/pdv/Orcamento';
import Pedido from './src/pages/pdv/Pedido';

// Estoque
import Produtos from './src/pages/estoque/Produtos';
import PedidoFornecedorList from './src/pages/estoque/PedidoFornecedorList';
import Ressuprimento from './src/pages/estoque/Ressuprimento';
import EntradaNF from './src/pages/estoque/EntradaNF';
import DevolucaoPedido from './src/pages/estoque/DevolucaoPedido';
import AjusteEstoque from './src/pages/estoque/AjusteEstoque';

// Outros módulos
import Financeiro from './src/pages/financeiro/Financeiro';
import Fiscal from './src/pages/fiscal/Fiscal';
import Relatorios from './src/pages/relatorios/Relatorios';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
        <Sidebar />

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* PDV */}
            <Route path="/pdv/orcamento" element={<Orcamento />} />
            <Route path="/pdv/pedido" element={<Pedido />} />

            {/* Cadastros */}
            <Route path="/cadastros/clientes" element={<ClientList />} />
            <Route path="/cadastros/fornecedores" element={<SupplierList />} />
            <Route path="/cadastros/transportadora" element={<TransportadoraList />} />
            <Route path="/cadastros/marcas" element={<Marcas />} />
            <Route path="/cadastros/grupos" element={<Grupos />} />
            <Route path="/cadastros/subgrupo" element={<Subgrupo />} />
            <Route path="/cadastros" element={<Cadastros />} />

            {/* Estoque */}
            <Route path="/estoque/produtos" element={<Produtos />} />
            <Route path="/estoque/pedido-ao-fornecedor" element={<PedidoFornecedorList />} />
            <Route path="/estoque/ressuprimento" element={<Ressuprimento />} />
            <Route path="/estoque/entrada-de-nf" element={<EntradaNF />} />
            <Route path="/estoque/devolucao-de-pedido" element={<DevolucaoPedido />} />
            <Route path="/estoque/ajuste-de-estoque" element={<AjusteEstoque />} />

            {/* Financeiro */}
            <Route path="/financeiro" element={<Financeiro />} />

            {/* Fiscal */}
            <Route path="/fiscal" element={<Fiscal />} />

            {/* Relatórios */}
            <Route path="/relatorios" element={<Relatorios />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
