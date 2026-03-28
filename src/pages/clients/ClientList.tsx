import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { DataGrid, Column } from '../../components/ui/DataGrid';
import ClientForm from './ClientForm';

import { mockClients } from '../../data/mockData';

const ClientList: React.FC = () => {
    const [clients] = useState(mockClients);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<any>(null);

    const handleOpenForm = (client?: any) => {
        setSelectedClient(client || null);
        setIsFormOpen(true);
    }

    const columns: Column<typeof clients[0]>[] = [
        { key: 'id', title: 'Cód.', width: '10%', render: (val) => val.toString().padStart(4, '0') },
        { key: 'name', title: 'Cliente / Razão Social', width: '25%' },
        { key: 'doc', title: 'CPF / CNPJ', width: '20%' },
        { key: 'type', title: 'Tipo', width: '15%' },
        { key: 'city', title: 'Cidade/UF', width: '20%' },
        {
            key: 'status', title: 'Status', width: '15%', render: (val) => (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${val === 'Ativo' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    {val}
                </span>
            )
        }
    ];

    return (
        <div className="h-full flex flex-col p-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Clientes</h1>
                    <p className="text-slate-500">Gerencie sua base de clientes e revendedores.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleOpenForm()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm shadow-blue-200"
                    >
                        <Plus size={18} />
                        Novo Cliente
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Pesquisar por nome, CPF/CNPJ..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">
                        <Filter size={16} />
                        Filtros
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">
                        <Download size={16} />
                        Exportar
                    </button>
                </div>
            </div>

            <DataGrid
                columns={columns}
                data={clients}
                onEdit={(item) => handleOpenForm(item)}
            />

            <ClientForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                clientData={selectedClient}
            />
        </div>
    );
};

export default ClientList;
