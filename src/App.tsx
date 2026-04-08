
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
import { TabsProvider } from './context/TabsContext';
import { NotificationProvider } from './context/NotificationContext';
import TabNavigation from './components/TabNavigation';

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
import ClientList from './pages/clients/ClientList';
import SupplierList from './pages/suppliers/SupplierList';
import TransportadoraList from './pages/cadastros/TransportadoraList';
import Marcas from './pages/cadastros/Marcas';
import Grupos from './pages/cadastros/Grupos';
import Subgrupo from './pages/cadastros/Subgrupo';

// PDV
import Orcamento from './pages/pdv/Orcamento';
import Pedido from './pages/pdv/Pedido';

// Estoque
import Produtos from './pages/estoque/Produtos';
import PedidoFornecedorList from './pages/estoque/PedidoFornecedorList';
import Ressuprimento from './pages/estoque/Ressuprimento';
import EntradaNF from './pages/estoque/EntradaNF';
import DevolucaoPedido from './pages/estoque/DevolucaoPedido';
import AjusteEstoque from './pages/estoque/AjusteEstoque';

// Outros módulos
import Financeiro from './pages/financeiro/Financeiro';
import Fiscal from './pages/fiscal/Fiscal';
import Relatorios from './pages/relatorios/Relatorios';

const App: React.FC = () => {
  return (
    <Router>
      <NotificationProvider>
        <TabsProvider>
          <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <Header />
              <TabNavigation />

              <div className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />

                  {/* PDV */}
                  <Route path="/pdv/orcamento" element={<Orcamento />} />
                  <Route path="/pdv/pedido" element={<Pedido />} />
                  <Route path="/settings" element={<div className="p-8">Configurações</div>} />

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
              </div>
            </main>
          </div>
        </TabsProvider>
      </NotificationProvider>
    </Router>
  );
};

export default App;
