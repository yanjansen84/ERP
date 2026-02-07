
import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { DataGrid } from '../../components/ui/DataGrid';
import PedidoFornecedorForm from './PedidoFornecedorForm';

// Mock Data
const pedidos = [
    { id: 1023, fornecedor: 'Tech Distribuidora LTDA', dataEmissao: '2024-03-20', previsaoEntrega: '2024-03-25', total: 6900.00, status: 'Pendente' },
    { id: 1022, fornecedor: 'Móveis & Cia', dataEmissao: '2024-03-18', previsaoEntrega: '2024-03-22', total: 12450.00, status: 'Aprovado' },
    { id: 1021, fornecedor: 'Papelaria Central', dataEmissao: '2024-03-15', previsaoEntrega: '2024-03-15', total: 850.50, status: 'Recebido' },
    { id: 1020, fornecedor: 'Mega Eletrônicos', dataEmissao: '2024-03-10', previsaoEntrega: '2024-03-12', total: 3200.00, status: 'Cancelado' },
];

export default function PedidoFornecedorList() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpenForm = (pedido?: any) => {
        setSelectedPedido(pedido || null);
        setIsFormOpen(true);
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pendente': return 'bg-yellow-100 text-yellow-700';
            case 'Aprovado': return 'bg-blue-100 text-blue-700';
            case 'Recebido': return 'bg-emerald-100 text-emerald-700';
            case 'Cancelado': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    const columns = [
        {
            key: 'id',
            title: 'Cód.',
            width: '10%',
            render: (val: number) => val.toString().padStart(4, '0')
        },
        {
            key: 'status',
            title: 'Status',
            width: '15%',
            render: (val: string) => (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(val)}`}>
                    {val}
                </span>
            )
        },
        { key: 'fornecedor', title: 'Fornecedor', width: '30%', sortable: true },
        {
            key: 'dataEmissao',
            title: 'Emissão',
            width: '15%',
            render: (val: string) => new Date(val).toLocaleDateString('pt-BR')
        },
        {
            key: 'previsaoEntrega',
            title: 'Previsão',
            width: '15%',
            render: (val: string) => new Date(val).toLocaleDateString('pt-BR')
        },
        {
            key: 'total',
            title: 'Total (R$)',
            width: '15%',
            render: (val: number) => (
                <span className="font-bold text-slate-700">
                    {val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
            )
        }
    ];

    const filteredData = pedidos.filter(p =>
        p.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm)
    );

    return (
        <div className="h-full flex flex-col p-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Pedidos de Compra</h1>
                    <p className="text-slate-500">Gerencie pedidos de compra e reposição de estoque.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleOpenForm()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm shadow-blue-200"
                    >
                        <Plus size={18} />
                        Novo Pedido
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por fornecedor ou número..."
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
                data={filteredData}
                onEdit={(item) => handleOpenForm(item)}
            />

            {isFormOpen && (
                <PedidoFornecedorForm
                    pedido={selectedPedido}
                    onClose={() => setIsFormOpen(false)}
                />
            )}
        </div>
    );
}
