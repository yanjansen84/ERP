import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { DataGrid } from '../../components/ui/DataGrid';
import SupplierForm from './SupplierForm';

interface Supplier {
    id: number;
    name: string;
    cnpj: string;
    category: string;
    contact: string;
    email: string;
    status: 'Ativo' | 'Inativo';
}

const mockSuppliers: Supplier[] = [
    {
        id: 1,
        name: 'Tech Distribuidora LTDA',
        cnpj: '12.345.678/0001-90',
        category: 'Eletrônicos',
        contact: '(11) 98765-4321',
        email: 'contato@techdist.com.br',
        status: 'Ativo'
    },
    {
        id: 2,
        name: 'Móveis & Cia',
        cnpj: '98.765.432/0001-10',
        category: 'Móveis',
        contact: '(21) 91234-5678',
        email: 'vendas@moveisecia.com.br',
        status: 'Ativo'
    },
    {
        id: 3,
        name: 'Papelaria Central',
        cnpj: '11.222.333/0001-44',
        category: 'Papelaria',
        contact: '(31) 99876-5432',
        email: 'central@papelaria.com.br',
        status: 'Inativo'
    }
];

export default function SupplierList() {
    const [suppliers] = useState<Supplier[]>(mockSuppliers);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | undefined>();

    const handleOpenForm = (supplier?: Supplier) => {
        setSelectedSupplier(supplier);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedSupplier(undefined);
    };

    const columns: Array<{
        key: keyof Supplier;
        title: string;
        sortable?: boolean;
        width?: string;
        render?: (value: any, item: Supplier) => React.ReactNode;
    }> = [
            { key: 'name', title: 'Nome', sortable: true },
            { key: 'cnpj', title: 'CNPJ', sortable: true },
            { key: 'category', title: 'Categoria', sortable: true },
            { key: 'contact', title: 'Contato', sortable: false },
            { key: 'email', title: 'E-mail', sortable: false },
            {
                key: 'status',
                title: 'Status',
                sortable: true,
                render: (value: string) => (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${value === 'Ativo' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {value}
                    </span>
                )
            }
        ];

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.cnpj.includes(searchTerm) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col p-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Fornecedores</h1>
                    <p className="text-slate-500">Gerencie sua base de fornecedores.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleOpenForm()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm shadow-blue-200"
                    >
                        <Plus size={18} />
                        Novo Fornecedor
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Pesquisar por nome, CNPJ, e-mail..."
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
                data={filteredSuppliers}
                onEdit={(item) => handleOpenForm(item)}
            />

            {isFormOpen && (
                <SupplierForm
                    supplier={selectedSupplier}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
}
