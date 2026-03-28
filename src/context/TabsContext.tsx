
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export interface Tab {
  id: string;
  label: string;
  path: string;
}

interface TabsContextType {
  tabs: Tab[];
  activeTabId: string | null;
  openTab: (tab: Tab) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Mapeamento de caminhos para labels amigáveis
const pathLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/pdv/orcamento': 'Orçamentos',
  '/pdv/pedido': 'Pedidos',
  '/cadastros/clientes': 'Clientes',
  '/cadastros/fornecedores': 'Fornecedores',
  '/cadastros/transportadora': 'Transportadora',
  '/cadastros/marcas': 'Marcas',
  '/cadastros/grupos': 'Grupos',
  '/cadastros/subgrupo': 'Subgrupo',
  '/estoque/produtos': 'Produtos',
  '/estoque/pedido-ao-fornecedor': 'Pedido ao Fornecedor',
  '/estoque/ressuprimento': 'Ressuprimento',
  '/estoque/entrada-de-nf': 'Entrada de NF',
  '/estoque/devolucao-de-pedido': 'Devolução de Pedido',
  '/estoque/ajuste-de-estoque': 'Ajuste de Estoque',
  '/financeiro': 'Financeiro',
  '/fiscal': 'Fiscal',
  '/relatorios': 'Relatórios',
};

// Função utilitária para resolver labels amigáveis
const getPathLabel = (path: string): string | undefined => {
  return pathLabels[path];
};

export const TabsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const saved = localStorage.getItem('erp_open_tabs');
    if (saved) {
      const parsed = JSON.parse(saved) as Tab[];
      // Garante que apenas abas válidas sejam carregadas
      const filtered = parsed.filter(t => getPathLabel(t.path));
      return filtered.length > 0 ? filtered : [{ id: '/dashboard', label: 'Dashboard', path: '/dashboard' }];
    }
    return [{ id: '/dashboard', label: 'Dashboard', path: '/dashboard' }];
  });
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Sincronizar activeTabId com a URL atual
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/' || currentPath === '/login') return;
    
    // Só abre aba se o caminho for válido
    const label = getPathLabel(currentPath);
    if (!label) return;

    const existingTab = tabs.find(t => t.path === currentPath);
    if (existingTab) {
      // Atualiza o label se ele for dinâmico (caso o ID mude ou algo assim)
      if (existingTab.label !== label) {
          setTabs(prev => prev.map(t => t.id === existingTab.id ? { ...t, label } : t));
      }
      setActiveTabId(existingTab.id);
    } else {
      const newTab = { id: currentPath, label, path: currentPath };
      setTabs(prev => [...prev, newTab]);
      setActiveTabId(currentPath);
    }
  }, [location.pathname]);

  // Persistência
  useEffect(() => {
    localStorage.setItem('erp_open_tabs', JSON.stringify(tabs));
  }, [tabs]);

  const openTab = (tab: Tab) => {
    if (!tabs.find(t => t.id === tab.id)) {
      setTabs(prev => [...prev, tab]);
    }
    setActiveTabId(tab.id);
    navigate(tab.path);
  };

  const closeTab = (id: string) => {
    if (tabs.length === 1) return; // Não fecha a última aba

    const index = tabs.findIndex(t => t.id === id);
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);

    if (activeTabId === id) {
      const nextTab = newTabs[index] || newTabs[index - 1];
      if (nextTab) {
        setActiveTabId(nextTab.id);
        navigate(nextTab.path);
      }
    }
  };

  const setActiveTab = (id: string) => {
    const tab = tabs.find(t => t.id === id);
    if (tab) {
      setActiveTabId(id);
      navigate(tab.path);
    }
  };

  return (
    <TabsContext.Provider value={{ tabs, activeTabId, openTab, closeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};
