
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, AlertTriangle, ShoppingCart, Plus, ArrowRight, Trash2, Save, XCircle, ArrowRightCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Interfaces
interface Product {
    id: number;
    sku: string;
    description: string;
    stock: number;
    minStock: number;
    maxStock: number;
    cost: number;
    supplier: string;
    category: string;
    suggestion: number;
    brand: string;
    group: string;
    subgroup: string;
}

interface OrderItem extends Product {
    quantity: number;
}

// Mock Data
const productsData: Product[] = [
    { id: 1, sku: 'CAM-001', description: 'CÂMERA DE SEGURANÇA VHD 3220 D FULL HD', stock: 0, minStock: 10, maxStock: 50, cost: 117.25, supplier: 'INTELBRAS', category: 'SEGURANÇA', suggestion: 50, brand: 'INTELBRAS', group: 'CÂMERAS', subgroup: 'BULLET' },
    { id: 2, sku: 'CAM-002', description: 'CÂMERA DE SEGURANÇA VHD 1120 B G6', stock: 0, minStock: 15, maxStock: 60, cost: 94.50, supplier: 'INTELBRAS', category: 'SEGURANÇA', suggestion: 60, brand: 'INTELBRAS', group: 'CÂMERAS', subgroup: 'BULLET' },
    { id: 3, sku: 'DVR-003', description: 'GRAVADOR DE VÍDEO DIGITAL MHDX 1004', stock: 2, minStock: 5, maxStock: 20, cost: 380.00, supplier: 'INTELBRAS', category: 'SEGURANÇA', suggestion: 18, brand: 'INTELBRAS', group: 'GRAVADORES', subgroup: '4 CANAIS' },
    { id: 4, sku: 'CAB-004', description: 'CABO COAXIAL 4MM B/N 100M', stock: 5, minStock: 20, maxStock: 100, cost: 45.90, supplier: 'CONDUTTI', category: 'ACESSÓRIOS', suggestion: 95, brand: 'CONDUTTI', group: 'CABOS', subgroup: 'COAXIAL' },
    { id: 5, sku: 'CON-005', description: 'CONECTOR BNC MACHO MOLA PARAFUSO', stock: 15, minStock: 50, maxStock: 200, cost: 1.50, supplier: 'CONNEX', category: 'ACESSÓRIOS', suggestion: 185, brand: 'CONNEX', group: 'CONECTORES', subgroup: 'BNC' },
    { id: 6, sku: 'FON-006', description: 'FONTE ALIMENTAÇÃO 12V 1A', stock: 8, minStock: 30, maxStock: 100, cost: 12.90, supplier: 'FC FONTES', category: 'ENERGIA', suggestion: 92, brand: 'FC FONTES', group: 'FONTES', subgroup: '12V' },
    { id: 7, sku: 'HD-007', description: 'HD WD PURPLE 1TB', stock: 1, minStock: 4, maxStock: 10, cost: 350.00, supplier: 'WESTERN DIGITAL', category: 'ARMAZENAMENTO', suggestion: 9, brand: 'WESTERN DIGITAL', group: 'DISCOS', subgroup: 'HD' },
    { id: 8, sku: 'SEN-008', description: 'SENSOR PRESENÇA COM FIO IVP 3000', stock: 25, minStock: 10, maxStock: 50, cost: 35.00, supplier: 'INTELBRAS', category: 'ALARME', suggestion: 0, brand: 'INTELBRAS', group: 'SENSORES', subgroup: 'INTERNO' },
];

// Dados para filtros (extraídos dos produtos únicos)
const brands = Array.from(new Set(productsData.map(p => p.brand)));
const groups = Array.from(new Set(productsData.map(p => p.group)));
const subgroups = Array.from(new Set(productsData.map(p => p.subgroup)));

export default function Ressuprimento() {
    const navigate = useNavigate();

    // Filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBrand, setFilterBrand] = useState('');
    const [filterGroup, setFilterGroup] = useState('');
    const [filterSubgroup, setFilterSubgroup] = useState('');

    // Estado do Pedido
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [selectedBuyer, setSelectedBuyer] = useState('Yan Jansen'); // Default user
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    // Filtragem Inteligente
    const filteredProducts = useMemo(() => {
        return productsData.filter(p => {
            const matchesSearch = p.description.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesBrand = filterBrand ? p.brand === filterBrand : true;
            const matchesGroup = filterGroup ? p.group === filterGroup : true;
            const matchesSubgroup = filterSubgroup ? p.subgroup === filterSubgroup : true;

            // Regra de exibição: estoque baixo
            const needsRestock = p.stock < p.minStock;

            return matchesSearch && matchesBrand && matchesGroup && matchesSubgroup && needsRestock;
        }).sort((a, b) => a.stock - b.stock);
    }, [searchTerm, filterBrand, filterGroup, filterSubgroup]);

    // Atualiza o fornecedor automaticamente baseado nos itens
    useEffect(() => {
        if (orderItems.length === 0) {
            setSelectedSupplier('');
            return;
        }

        const suppliers = Array.from(new Set(orderItems.map(i => i.supplier)));

        if (suppliers.length === 1) {
            setSelectedSupplier(suppliers[0]);
        } else {
            setSelectedSupplier('DIVERSOS');
        }
    }, [orderItems]);

    // Lógica do Carrinho
    const addToOrder = (product: Product) => {
        setOrderItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) return prev;
            return [...prev, { ...product, quantity: product.suggestion }];
        });
    };

    const removeFromOrder = (id: number) => {
        setOrderItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, newQty: number) => {
        setOrderItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    };

    const totalOrderValue = orderItems.reduce((acc, item) => acc + (item.cost * item.quantity), 0);

    const handleCreateOrder = () => {
        alert(`Pedido gerado para ${selectedSupplier} por ${selectedBuyer} no valor de R$ ${totalOrderValue.toFixed(2)}`);
        setOrderItems([]);
        navigate('/estoque/pedido-ao-fornecedor');
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">

            {/* Esquerda: Lista de Sugestões */}
            <div className="flex-1 flex flex-col min-w-0 pr-0 border-r border-slate-200">
                {/* Header */}
                <div className="p-6 pb-2">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Ressuprimento de Estoque</h1>
                            <p className="text-slate-500 text-sm">Sugestão de compras baseada em estoque mínimo.</p>
                        </div>
                    </div>

                    {/* Filtros Avançados */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="relative col-span-1 md:col-span-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar SKU ou Nome..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                            />
                        </div>
                        <select
                            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                            value={filterBrand}
                            onChange={(e) => setFilterBrand(e.target.value)}
                        >
                            <option value="">Todas as Marcas</option>
                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        <select
                            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                            value={filterGroup}
                            onChange={(e) => setFilterGroup(e.target.value)}
                        >
                            <option value="">Todos os Grupos</option>
                            {groups.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                        <select
                            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                            value={filterSubgroup}
                            onChange={(e) => setFilterSubgroup(e.target.value)}
                        >
                            <option value="">Todos os Subgrupos</option>
                            {subgroups.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                {/* Tabela */}
                <div className="flex-1 overflow-auto px-6 pb-6">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-100 text-slate-600 text-xs uppercase font-semibold sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="px-4 py-3 rounded-tl-lg text-center">Status</th>
                                <th className="px-4 py-3">Produto</th>
                                <th className="px-4 py-3">Classificação</th>
                                <th className="px-4 py-3 text-center">Forn.</th>
                                <th className="px-4 py-3 text-center">Atual</th>
                                <th className="px-4 py-3 text-center">Sugestão</th>
                                <th className="px-4 py-3 text-right">Custo</th>
                                <th className="px-4 py-3 rounded-tr-lg text-center"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white shadow-sm border border-slate-100 rounded-b-lg">
                            {filteredProducts.map(product => {
                                const stockStatus = product.stock === 0 ? 'critical' : product.stock < product.minStock ? 'warning' : 'ok';
                                const isInOrder = orderItems.some(item => item.id === product.id);

                                return (
                                    <tr key={product.id} className={`hover:bg-slate-50 transition-colors ${isInOrder ? 'bg-blue-50/30' : ''}`}>
                                        <td className="px-4 py-3 w-12 text-center">
                                            {stockStatus === 'critical' && <div className="mx-auto w-6 h-6 rounded bg-red-100 text-red-600 flex items-center justify-center animate-pulse"><AlertTriangle size={14} /></div>}
                                            {stockStatus === 'warning' && <div className="mx-auto w-6 h-6 rounded bg-amber-100 text-amber-600 flex items-center justify-center"><AlertTriangle size={14} /></div>}
                                        </td>
                                        <td className="px-4 py-3 max-w-[300px]">
                                            <div className="font-bold text-slate-800 text-sm truncate" title={product.description}>{product.description}</div>
                                            <div className="text-xs text-slate-500 font-mono">{product.sku}</div>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-slate-500">
                                            <div>{product.brand}</div>
                                            <div className="text-[10px] text-slate-400">{product.group} / {product.subgroup}</div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200 whitespace-nowrap">
                                                {product.supplier}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className={`inline-block px-1.5 py-0.5 rounded text-xs font-bold ${stockStatus === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {product.stock}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center font-bold text-blue-600 text-sm">
                                            {product.suggestion}
                                        </td>
                                        <td className="px-4 py-3 text-right text-sm text-slate-600">
                                            {product.cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => addToOrder(product)}
                                                disabled={isInOrder}
                                                className={`p-1.5 rounded-lg transition-all ${isInOrder
                                                    ? 'bg-emerald-100 text-emerald-600 cursor-default'
                                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200'}`}
                                            >
                                                {isInOrder ? <ArrowRightCircle size={18} /> : <Plus size={18} />}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-slate-400">Nenhum produto encontrado para os filtros.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Direita: Painel de Pedido */}
            <div className="w-[400px] bg-white border-l border-slate-200 shadow-xl z-20 flex flex-col">
                <div className="p-5 bg-slate-50 border-b border-slate-200">
                    <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                        <ShoppingCart className="text-blue-600" size={20} />
                        Novo Pedido
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 mb-4">Produtos selecionados para compra.</p>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Fornecedor (Automático)</label>
                            <div className="relative">
                                <select
                                    className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 font-medium outline-none appearance-none cursor-not-allowed"
                                    value={selectedSupplier}
                                    disabled
                                >
                                    <option value="">Selecione itens...</option>
                                    <option value="INTELBRAS">INTELBRAS</option>
                                    <option value="CONDUTTI">CONDUTTI</option>
                                    <option value="WESTERN DIGITAL">WESTERN DIGITAL</option>
                                    <option value="DIVERSOS">DIVERSOS/MÚLTIPLOS</option>
                                </select>
                                {selectedSupplier === 'DIVERSOS' && (
                                    <div className="mt-1 text-[10px] text-amber-600 flex items-center gap-1 font-medium">
                                        <AlertTriangle size={12} />
                                        Múltiplos fornecedores detectados.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Comprador</label>
                            <div className="relative">
                                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <select
                                    className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedBuyer}
                                    onChange={(e) => setSelectedBuyer(e.target.value)}
                                >
                                    <option value="Yan Jansen">Yan Jansen</option>
                                    <option value="João Silva">João Silva</option>
                                    <option value="Maria Oliveira">Maria Oliveira</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                    {orderItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                            <ShoppingCart size={48} className="mb-4" />
                            <p className="text-center text-sm px-4">Selecione itens na lista ao lado.</p>
                        </div>
                    ) : (
                        orderItems.map(item => (
                            <div key={item.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-2 group relative">
                                <div className="flex justify-between items-start pr-6">
                                    <div>
                                        <div className="text-xs text-slate-400 font-mono mb-0.5">{item.sku}</div>
                                        <div className="text-sm font-bold text-slate-700 leading-tight line-clamp-2">{item.description}</div>
                                    </div>
                                    <button
                                        onClick={() => removeFromOrder(item.id)}
                                        className="absolute top-2 right-2 text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <XCircle size={18} />
                                    </button>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400 mt-1 border-t border-slate-50 pt-1">
                                    <span>Forn: {item.supplier}</span>
                                </div>

                                <div className="flex items-end justify-between mt-1">
                                    <div>
                                        <label className="text-[10px] text-slate-400 uppercase font-bold">Qtd</label>
                                        <input
                                            type="number"
                                            className="w-20 px-2 py-1 text-sm border border-slate-200 rounded focus:border-blue-500 outline-none font-bold text-slate-800"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-slate-700">
                                            {(item.cost * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-5 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-500 font-medium">Total Estimado</span>
                        <span className="text-2xl font-bold text-slate-800">
                            {totalOrderValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                    </div>

                    <button
                        onClick={handleCreateOrder}
                        disabled={orderItems.length === 0}
                        className={`w-full py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg
                            ${orderItems.length === 0
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] text-white shadow-blue-200'}`}
                    >
                        <Save size={20} />
                        Gerar Pedido
                    </button>
                </div>
            </div>

        </div>
    );
}
