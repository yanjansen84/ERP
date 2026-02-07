
import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { DataGrid } from '../../components/ui/DataGrid';
import TransportadoraForm from './TransportadoraForm';

interface Transportadora {
    id: number;
    name: string;
    cnpj: string;
    rntrc: string;
    city: string;
    contact: string;
    email: string;
    status: 'Ativo' | 'Inativo';
}

const mockTransportadoras: Transportadora[] = [
    {
        id: 1,
        name: 'TransRodovia Logística',
        cnpj: '45.123.789/0001-50',
        rntrc: '12345678',
        city: 'São Paulo/SP',
        contact: '(11) 3222-1111',
        email: 'ops@transrodovia.com.br',
        status: 'Ativo'
    },
    {
        id: 2,
        name: 'Expresso Rápido',
        cnpj: '32.987.654/0001-20',
        rntrc: '87654321',
        city: 'Curitiba/PR',
        contact: '(41) 3333-2222',
        email: 'comercial@expressorapido.com',
        status: 'Ativo'
    },
    {
        id: 3,
        name: 'LogSul Transportes',
        cnpj: '10.555.444/0001-10',
        rntrc: '55443322',
        city: 'Porto Alegre/RS',
        contact: '(51) 3111-4444',
        email: 'contato@logsul.com.br',
        status: 'Inativo'
    }
];

export default function TransportadoraList() {
    const [transportadoras] = useState<Transportadora[]>(mockTransportadoras);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTransportadora, setSelectedTransportadora] = useState<Transportadora | undefined>();

    const handleOpenForm = (transportadora?: Transportadora) => {
        setSelectedTransportadora(transportadora);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedTransportadora(undefined);
    };

    const columns: Array<{
        key: keyof Transportadora;
        title: string;
        sortable?: boolean;
        width?: string;
        render?: (value: any, item: Transportadora) => React.ReactNode;
    }> = [
            { key: 'id', title: 'Cód.', width: '10%', render: (value: number) => value.toString().padStart(4, '0') },
            { key: 'name', title: 'Razão Social', sortable: true, width: '25%' },
            { key: 'cnpj', title: 'CNPJ', sortable: true, width: '15%' },
            { key: 'rntrc', title: 'RNTRC', sortable: true, width: '10%' },
            { key: 'city', title: 'Cidade/UF', sortable: true, width: '15%' },
            { key: 'contact', title: 'Contato', sortable: false, width: '15%' },
            {
                key: 'status',
                title: 'Status',
                sortable: true,
                width: '10%',
                render: (value: string) => (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${value === 'Ativo' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {value}
                    </span>
                )
            }
        ];

    const filteredTransportadoras = transportadoras.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.cnpj.includes(searchTerm) ||
        t.rntrc.includes(searchTerm)
    );

    return (
        <div className="h-full flex flex-col p-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Transportadoras</h1>
                    <p className="text-slate-500">Gerencie sua frota terceirizada e parceiros logísticos.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleOpenForm()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm shadow-blue-200"
                    >
                        <Plus size={18} />
                        Nova Transportadora
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nome, CNPJ, RNTRC..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                data={filteredTransportadoras}
                onEdit={(item) => handleOpenForm(item)}
            />

            {isFormOpen && (
                <TransportadoraForm
                    transportadora={selectedTransportadora}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
}
