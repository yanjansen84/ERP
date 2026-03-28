import React, { useState } from 'react';
import { Plus, Search, Calendar, Filter, Download, FileText, ShoppingBag, ShoppingCart } from 'lucide-react';
import { DataGrid, Column } from '../../components/ui/DataGrid';
import { DateRangeInput } from '../../components/ui/DateRangeInput';
import OrderForm from './components/OrderForm';

import { mockOrders } from '../../data/mockData';

const Pedido: React.FC = () => {
    const [orders] = useState(mockOrders);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

    const handleOpenForm = (id?: number) => {
        setSelectedOrderId(id || null);
        setIsFormOpen(true);
    };

    const columns: Column<typeof orders[0]>[] = [
        { key: 'id', title: 'Cód.', width: '8%', render: (val) => val.toString().padStart(4, '0') },
        { key: 'date', title: 'Data', width: '12%' },
        { key: 'clientName', title: 'Cliente', width: '25%' },
        { 
            key: 'total', title: 'Total', width: '15%', 
            render: (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val as number) 
        },
        { 
            key: 'status', title: 'Status', width: '12%',
            render: (val) => (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    val === 'Finalizado' ? 'bg-emerald-100 text-emerald-600' : 
                    val === 'Faturado' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                }`}>
                    {val}
                </span>
            )
        },
        { key: 'payment', title: 'Pagamento', width: '15%' }
    ];

    return (
        <div className="h-full flex flex-col p-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Pedidos de Venda</h1>
                    <p className="text-slate-500 text-sm">Gerencie seus pedidos e faturamentos.</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-sm active:scale-95 text-sm">
                        <FileText size={18} />
                        Carregar Orçamento
                    </button>
                    <button 
                        onClick={() => handleOpenForm()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 text-sm"
                    >
                        <Plus size={18} />
                        Novo Pedido
                    </button>
                </div>
            </div>

            {/* Toolbar Principal */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between shadow-sm">
                <div className="flex flex-1 gap-4 w-full">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text"
                            placeholder="Buscar por cliente, pagamento ou código..."
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 text-sm transition-all"
                        />
                    </div>
                    
                    <DateRangeInput />
                </div>

                <div className="flex gap-2 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0">
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-sm font-bold transition-all">
                        <Download size={18} />
                        Exportar
                    </button>
                </div>
            </div>

            <DataGrid 
                columns={columns} 
                data={orders} 
                onEdit={(item) => handleOpenForm(item.id)}
            />

            <OrderForm 
                type="pedido"
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                id={selectedOrderId}
            />
        </div>
    );
};

export default Pedido;
