
import React, { useState } from 'react';
import { Plus, Search, Filter, Download, PackageOpen } from 'lucide-react';
import { DataGrid } from '../../components/ui/DataGrid';
import ProductForm from './ProductForm';

interface Product {
    id: number;
    name: string;
    sku: string;
    category: string;
    stock: number;
    minStock: number;
    costPrice: number;
    salePrice: number;
    status: 'Ativo' | 'Inativo';
    image: string;
}

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Cadeira de Escritório Ergonômica',
        sku: 'MOV-001',
        category: 'Móveis',
        stock: 45,
        minStock: 10,
        costPrice: 450.00,
        salePrice: 899.90,
        status: 'Ativo',
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=100' // Cadeira
    },
    {
        id: 2,
        name: 'Monitor LED 27" 4K',
        sku: 'ELE-055',
        category: 'Eletrônicos',
        stock: 5,
        minStock: 8,
        costPrice: 1200.00,
        salePrice: 1899.00,
        status: 'Ativo',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=100' // Monitor
    },
    {
        id: 3,
        name: 'Teclado Mecânico RGB',
        sku: 'ELE-102',
        category: 'Eletrônicos',
        stock: 120,
        minStock: 20,
        costPrice: 150.00,
        salePrice: 349.90,
        status: 'Ativo',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?auto=format&fit=crop&q=80&w=100' // Teclado
    },
    {
        id: 4,
        name: 'Mesa de Jantar Madeira Maciça',
        sku: 'MOV-022',
        category: 'Móveis',
        stock: 0,
        minStock: 2,
        costPrice: 2500.00,
        salePrice: 4500.00,
        status: 'Inativo',
        image: 'https://images.unsplash.com/photo-1577140917170-285929dfe55c?auto=format&fit=crop&q=80&w=100' // Mesa
    }
];

export default function Produtos() {
    const [products] = useState<Product[]>(mockProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

    const handleOpenForm = (product?: Product) => {
        setSelectedProduct(product);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedProduct(undefined);
    };

    const columns: Array<{
        key: keyof Product;
        title: string;
        sortable?: boolean;
        width?: string;
        render?: (value: any, item: Product) => React.ReactNode;
    }> = [
            {
                key: 'id',
                title: 'Cód.',
                sortable: true,
                width: '8%',
                render: (value: number) => (
                    <span className="text-slate-700 font-medium">{value.toString().padStart(4, '0')}</span>
                )
            },
            {
                key: 'name',
                title: 'Produto',
                sortable: true,
                width: '28%',
                render: (value: string, item: Product) => (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                            {item.image ? (
                                <img src={item.image} alt={value} className="w-full h-full object-cover" />
                            ) : (
                                <PackageOpen className="w-5 h-5 text-slate-400 m-auto mt-2" />
                            )}
                        </div>
                        <div>
                            <div className="font-medium text-slate-900">{value}</div>
                            <div className="text-xs text-slate-500">{item.sku}</div>
                        </div>
                    </div>
                )
            },
            { key: 'category', title: 'Categoria', sortable: true, width: '15%' },
            {
                key: 'stock',
                title: 'Estoque',
                sortable: true,
                width: '15%',
                render: (value: number, item: Product) => {
                    let stockColor = 'bg-emerald-100 text-emerald-700'; // Normal
                    if (value === 0) stockColor = 'bg-red-100 text-red-700'; // Zerado
                    else if (value <= item.minStock) stockColor = 'bg-amber-100 text-amber-700'; // Baixo

                    return (
                        <div className="flex flex-col">
                            <span className={`w-fit px-2 py-0.5 rounded-full text-xs font-bold ${stockColor}`}>
                                {value} un
                            </span>
                            {value <= item.minStock && value > 0 && <span className="text-[10px] text-amber-600 mt-0.5 font-medium">Estoque Baixo</span>}
                        </div>
                    );
                }
            },
            {
                key: 'salePrice',
                title: 'Preço Venda',
                sortable: true,
                width: '15%',
                render: (value: number) => (
                    <span className="font-medium text-slate-700">
                        R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                )
            },
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

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col p-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Produtos</h1>
                    <p className="text-slate-500">Gerencie seu catálogo de produtos e controle de estoque.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleOpenForm()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm shadow-blue-200"
                    >
                        <Plus size={18} />
                        Novo Produto
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nome, SKU, categoria..."
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
                data={filteredProducts}
                onEdit={(item) => handleOpenForm(item)}
            />

            {isFormOpen && (
                <ProductForm
                    product={selectedProduct}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
}
