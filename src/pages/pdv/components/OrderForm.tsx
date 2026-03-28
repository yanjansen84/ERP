import React, { useState, useEffect } from 'react';
import { Save, X, Search, Plus, Trash2, User, ShoppingBag, FileText, ShoppingCart } from 'lucide-react';
import { mockClients, mockProducts, mockQuotes, mockOrders, Product, Client, OrderItem, Quote, Order } from '../../../data/mockData';

interface OrderFormProps {
    type: 'orcamento' | 'pedido';
    isOpen: boolean;
    onClose: () => void;
    id?: number | null;
}

const OrderForm: React.FC<OrderFormProps> = ({ type, isOpen, onClose, id }) => {
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [clientSearch, setClientSearch] = useState('');
    const [showClientResults, setShowClientResults] = useState(false);
    
    const [productSearch, setProductSearch] = useState('');
    const [showProductResults, setShowProductResults] = useState(false);
    
    const [items, setItems] = useState<OrderItem[]>([]);
    const [discount, setDiscount] = useState(0);
    const [priceTable, setPriceTable] = useState('Padrão');
    const [isApproved, setIsApproved] = useState(false);
    const [showApprovalModal, setShowApprovalModal] = useState(false);

    // Reiniciar estados ao fechar/abrir
    useEffect(() => {
        if (!isOpen) {
            setSelectedClient(null);
            setClientSearch('');
            setItems([]);
            setDiscount(0);
            setPriceTable('Padrão');
            setIsApproved(false);
            setShowApprovalModal(false);
        }
    }, [isOpen]);

    // Carregar dados se houver ID (Edição)
    useEffect(() => {
        if (isOpen && id) {
            const source = type === 'orcamento' ? mockQuotes : mockOrders;
            const record = (source as any[]).find(r => r.id === id);
            
            if (record) {
                const client = mockClients.find(c => c.id === record.clientId);
                if (client) setSelectedClient(client);
                setItems(record.items || []);
            }
        }
    }, [isOpen, id, type]);

    // Cálculos
    const grossTotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    const finalTotal = items.reduce((acc, item) => acc + item.total, 0) - discount;
    const totalDiscounts = grossTotal - finalTotal;

    const needsApproval = items.some(i => i.total / i.quantity < i.basePrice);
    const canSave = !needsApproval || isApproved;

    const handleAddProduct = (product: Product) => {
        const existingItem = items.find(i => i.productId === product.id);
        if (existingItem) {
            setItems(items.map(i => {
                if (i.productId === product.id) {
                    const newQty = i.quantity + 1;
                    return { 
                        ...i, 
                        quantity: newQty, 
                        total: newQty * (i.unitPrice * (1 - (i.discount / 100))) 
                    };
                }
                return i;
            }));
        } else {
            const newItem: OrderItem = {
                id: Date.now(),
                productId: product.id,
                name: product.name,
                quantity: 1,
                unitPrice: product.salePrice,
                basePrice: product.salePrice, // Armazena o preço de tabela original
                discount: 0,
                total: product.salePrice,
                codRef: product.codRef
            };
            setItems([...items, newItem]);
        }
        setProductSearch('');
        setShowProductResults(false);
    };

    const handleUpdateQuantity = (id: number, qty: number) => {
        if (qty < 1) return;
        setItems(items.map(i => i.id === id ? { ...i, quantity: qty, total: qty * (i.unitPrice * (1 - (i.discount / 100))) } : i));
    };

    const handleUpdatePrice = (id: number, price: number) => {
        setItems(items.map(i => {
            if (i.id === id) {
                // Ao mudar o preço unitário livremente
                return { 
                    ...i, 
                    unitPrice: price, 
                    discount: 0, // Resetamos o desconto manual ao mexer no preço base da linha
                    total: i.quantity * price
                };
            }
            return i;
        }));
    };

    const handleUpdateItemDiscount = (id: number, itemDiscount: number) => {
        setItems(items.map(i => {
            if (i.id === id) {
                // O desconto incide sobre o preço unitário atual (ex: 1000 - 5% ou 850 - 5%)
                return { 
                    ...i, 
                    discount: itemDiscount, 
                    total: i.quantity * (i.unitPrice * (1 - (itemDiscount / 100))) 
                };
            }
            return i;
        }));
    };

    const handleRemoveItem = (id: number) => {
        setItems(items.filter(i => i.id !== id));
    };

    const filteredClients = mockClients.filter(c => 
        c.name.toLowerCase().includes(clientSearch.toLowerCase()) || 
        c.doc.includes(clientSearch)
    );

    const filteredProducts = mockProducts.filter(p => 
        p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
        p.sku.toLowerCase().includes(productSearch.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm shadow-2xl" onClick={onClose} />
            
            {/* Modal Content */}
            {/* Modal Content */}
            <div className="relative bg-slate-50 w-[98%] md:w-[95%] h-[96%] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 ring-1 ring-white/50">
                
                {/* Header Fixo */}
                <div className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between shrink-0 shadow-sm z-20 transition-all">
                    <div className="flex items-center gap-5">
                        <div className={`p-3 rounded-2xl shadow-inner ${type === 'orcamento' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                            {type === 'orcamento' ? <FileText size={32} /> : <ShoppingCart size={32} />}
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                                {id ? 'Editando' : 'Novo'} {type === 'orcamento' ? 'Orçamento' : 'Pedido'}
                                {id && <span className="text-blue-600 text-sm font-bold bg-blue-50 px-3 py-1 rounded-full ring-1 ring-blue-100 shadow-sm">#{id}</span>}
                            </h1>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                PDV &bull; SISTEMA DE VENDAS &bull; {new Date().toLocaleDateString('pt-BR')}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <button 
                            onClick={() => {
                                if (!canSave) {
                                    setShowApprovalModal(true);
                                } else {
                                    // Lógica de salvar real aqui
                                    onClose();
                                }
                            }}
                            className={`px-10 py-3 text-xs font-black uppercase tracking-widest text-white rounded-xl shadow-xl transition-all active:scale-95 flex items-center gap-2 ${
                                !canSave 
                                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200 animate-pulse' 
                                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                            }`}
                        >
                            {!canSave ? <ShoppingCart size={18} /> : <Save size={18} />}
                            {!canSave ? 'Aguardando Autorização' : `Salvar ${type === 'orcamento' ? 'Orçamento' : 'Pedido'}`}
                        </button>
                        <div className="w-px h-8 bg-slate-200 mx-2"></div>
                        <button onClick={onClose} className="p-3 text-slate-300 hover:text-slate-600 transition-all rounded-full hover:bg-slate-100">
                            <X size={28} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Coluna Principal: Cliente e Itens */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Seleção de Cliente */}
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2.5">
                                    <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><User size={14} /></div>
                                    Dados do Cliente
                                </h3>
                                
                                {!selectedClient ? (
                                    <div className="relative">
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                            <input 
                                                type="text"
                                                placeholder="Buscar cliente por nome ou CPF/CNPJ..."
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
                                                value={clientSearch}
                                                onChange={(e) => {
                                                    setClientSearch(e.target.value);
                                                    setShowClientResults(true);
                                                }}
                                                onFocus={() => setShowClientResults(true)}
                                            />
                                        </div>
                                        
                                        {showClientResults && clientSearch.length > 0 && (
                                            <div className="absolute top-full left-0 w-full mt-3 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-72 overflow-y-auto ring-1 ring-slate-900/5">
                                                {filteredClients.map(client => (
                                                    <div 
                                                        key={client.id}
                                                        onClick={() => {
                                                            setSelectedClient(client);
                                                            setShowClientResults(false);
                                                        }}
                                                        className="px-5 py-4 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors flex items-center justify-between group"
                                                    >
                                                        <div>
                                                            <div className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors uppercase text-xs tracking-tight">{client.name}</div>
                                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{client.doc} &bull; {client.city}</div>
                                                        </div>
                                                        <Plus size={14} className="text-slate-300 group-hover:text-blue-500" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl group transition-all hover:shadow-lg hover:shadow-blue-500/5">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 text-xl font-black border border-blue-100 shadow-xl shadow-blue-500/10">
                                                {selectedClient.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-800 text-sm uppercase tracking-tight">{selectedClient.name}</div>
                                                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2 mt-1">
                                                    <span>{selectedClient.doc}</span>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                    <span>{selectedClient.city}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedClient(null)}
                                            className="p-3 text-slate-400 hover:text-red-500 hover:bg-white rounded-2xl transition-all shadow-sm hover:shadow-md"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Itens do Pedido */}
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                                <div className="p-8 border-b border-slate-50 bg-white">
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2.5">
                                        <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600"><ShoppingBag size={14} /></div>
                                        Itens do Carrinho
                                    </h3>
                                    
                                    <div className="flex flex-col md:flex-row gap-4 items-end">
                                        <div className="flex-1 relative w-full">
                                            <div className="relative">
                                                <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                                <input 
                                                    type="text"
                                                    placeholder="Adicionar produto por nome ou SKU..."
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
                                                    value={productSearch}
                                                    onChange={(e) => {
                                                        setProductSearch(e.target.value);
                                                        setShowProductResults(true);
                                                    }}
                                                    onFocus={() => setShowProductResults(true)}
                                                />
                                            </div>
                                            
                                            {showProductResults && productSearch.length > 0 && (
                                                <div className="absolute top-full left-0 w-full mt-3 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-72 overflow-y-auto ring-1 ring-slate-900/5">
                                                    {filteredProducts.map(product => (
                                                        <div 
                                                            key={product.id}
                                                            onClick={() => handleAddProduct(product)}
                                                            className="px-5 py-4 hover:bg-emerald-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors flex items-center justify-between group"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <img src={product.image} className="w-12 h-12 rounded-xl object-cover shadow-md group-hover:scale-110 transition-transform" />
                                                                <div>
                                                                    <div className="font-black text-slate-800 uppercase text-xs tracking-tight">{product.name}</div>
                                                                    <div className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-0.5">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.salePrice)}</div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-end">
                                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU: {product.sku}</div>
                                                                <div className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">{product.codRef}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full md:w-64">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Tabela de Preço</h4>
                                            <select 
                                                value={priceTable}
                                                onChange={(e) => setPriceTable(e.target.value)}
                                                className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-bold text-xs text-slate-700 appearance-none cursor-pointer"
                                            >
                                                <option value="Padrão">TABELA PADRÃO (VAREJO)</option>
                                                <option value="Atacado">TABELA ATACADO</option>
                                                <option value="Promocional">TABELA PROMOCIONAL</option>
                                                <option value="Funcionario">TABELA COLABORADOR</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-separate border-spacing-0">
                                        <thead className="bg-slate-50/50 text-[10px] uppercase font-black text-slate-400 tracking-widest">
                                            <tr>
                                                <th className="px-8 py-4">Produto</th>
                                                <th className="px-8 py-4">R$ Unit.</th>
                                                <th className="px-8 py-4 text-center">Qtd.</th>
                                                <th className="px-8 py-4">Desconto (%)</th>
                                                <th className="px-8 py-4 text-right">Subtotal</th>
                                                <th className="px-8 py-4 w-20"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {items.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="px-8 py-20 text-center animate-in fade-in zoom-in-95">
                                                        <div className="text-slate-200 mb-4 transform scale-125">
                                                            <ShoppingCart size={64} className="mx-auto opacity-30 stroke-[1.5]" />
                                                        </div>
                                                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">O carrinho está vazio</p>
                                                        <p className="text-slate-300 text-[10px] mt-1">Busque um produto acima para começar</p>
                                                    </td>
                                                </tr>
                                            ) : (
                                                items.map(item => (
                                                    <tr key={item.id} className="hover:bg-slate-50/30 transition-all group">
                                                        <td className="px-8 py-5">
                                                            <div className="font-black text-slate-800 text-xs uppercase tracking-tight">{item.name}</div>
                                                            <div className="text-[9px] text-slate-300 font-black uppercase tracking-widest mt-1 flex items-center gap-2">
                                                                <span>PROD_ID: {item.productId}</span>
                                                                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                                <span>REF: {item.codRef}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5">
                                                            <div className="relative group/input">
                                                                <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black ${(item.total / item.quantity) < item.basePrice ? 'text-red-500' : 'text-slate-400'}`}>R$</span>
                                                                <input 
                                                                    type="number"
                                                                    value={item.unitPrice}
                                                                    onChange={(e) => handleUpdatePrice(item.id, Number(e.target.value))}
                                                                    className={`w-32 pl-8 pr-3 py-2 border rounded-xl text-sm font-black outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                                                                        (item.total / item.quantity) < item.basePrice 
                                                                        ? 'bg-red-50 border-red-200 text-red-700 focus:ring-red-500/10' 
                                                                        : 'bg-white border-slate-200 text-slate-800 focus:ring-blue-500/5 focus:border-blue-500'
                                                                    }`}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5">
                                                            <div className="flex items-center justify-between bg-white w-28 mx-auto rounded-xl p-1 border border-slate-200 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500/10">
                                                                <button 
                                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                                >-</button>
                                                                <span className="text-sm font-black text-slate-800">{item.quantity}</span>
                                                                <button 
                                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                                >+</button>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5">
                                                            <div className="relative group/input">
                                                                <input 
                                                                    type="number"
                                                                    placeholder="0"
                                                                    value={item.discount || (item.unitPrice < item.basePrice ? Number(((1 - (item.unitPrice / item.basePrice)) * 100).toFixed(2)) : '')}
                                                                    onChange={(e) => handleUpdateItemDiscount(item.id, Number(e.target.value))}
                                                                    className={`w-20 px-3 py-2 border rounded-xl text-sm font-black outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                                                                        (item.total / item.quantity) < item.basePrice 
                                                                        ? 'bg-red-50 border-red-200 text-red-700 focus:ring-red-500/10 text-center' 
                                                                        : 'bg-white border-slate-200 text-slate-800 focus:ring-blue-500/5 focus:border-blue-500 text-center'
                                                                    }`}
                                                                />
                                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">%</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5 text-right">
                                                            <div className="text-sm font-black text-slate-900 tracking-tighter">
                                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total)}
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5">
                                                            <button 
                                                                onClick={() => handleRemoveItem(item.id)}
                                                                className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Coluna Lateral: Resumo Financeiro */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/80 border border-slate-100 p-8 sticky top-0 ring-1 ring-slate-900/5">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-50 pb-4 flex items-center justify-between">
                                    Resumo Financeiro
                                    <ShoppingBag size={14} />
                                </h3>
                                
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-sm font-black text-slate-500 uppercase tracking-tight">
                                        <span>Subtotal Sugerido</span>
                                        <span className="text-slate-800 font-black">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(grossTotal)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-black text-slate-500 uppercase tracking-tight group">
                                        <div className="flex flex-col">
                                            <span>Total Descontos</span>
                                            <span className="text-[9px] text-blue-600 hover:text-indigo-600 underline underline-offset-4 cursor-pointer transition-colors mt-1">Configurar desconto global</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-red-500 font-black decoration-red-200 decoration-double">
                                                - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDiscounts)}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-8 border-t-2 border-dashed border-slate-100 flex flex-col items-center">
                                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">Total Líquido do {type === 'orcamento' ? 'Orçamento' : 'Pedido'}</span>
                                        <div className="text-5xl font-black text-slate-900 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-500">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(finalTotal)}
                                        </div>
                                    </div>

                                    <div className="pt-8 space-y-5">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            Notas Adicionais
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-tight">
                                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-blue-200 transition-colors">
                                                <div className="text-slate-400 mb-1 group-hover:text-blue-500">Produtos</div>
                                                <div className="text-lg text-slate-700">{items.length} tipo(s)</div>
                                            </div>
                                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-blue-200 transition-colors">
                                                <div className="text-slate-400 mb-1 group-hover:text-blue-500">Volumes</div>
                                                <div className="text-lg text-slate-700">{items.reduce((acc, i) => acc + i.quantity, 0)} un.</div>
                                            </div>
                                        </div>
                                        <textarea 
                                            className="w-full mt-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold uppercase tracking-tight outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all min-h-[140px] shadow-inner placeholder:text-slate-300"
                                            placeholder="Descreva observações fiscais ou logísticas..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal de Aprovação Simulado */}
                {showApprovalModal && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 animate-in fade-in duration-200">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowApprovalModal(false)} />
                        <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6 ring-8 ring-amber-50">
                                <ShoppingCart size={40} className="animate-bounce" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 mb-2">Autorização Necessária</h2>
                            <p className="text-slate-500 text-sm font-medium mb-8">Este {type} contém itens com preços abaixo da tabela e requer aprovação de um gerente para ser finalizado.</p>
                            
                            <div className="w-full space-y-3 mb-8">
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Desconto Total</span>
                                    <span className="text-red-500 font-black tracking-tight">-{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDiscounts)}</span>
                                </div>
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center font-black">
                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">Margem de Negócio</span>
                                    <span className="text-emerald-500 text-sm italic">{Math.round(((finalTotal / grossTotal) - 1) * -100)}% Reduzido</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <button 
                                    onClick={() => setShowApprovalModal(false)}
                                    className="px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all font-black text-center"
                                >
                                    Voltar
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsApproved(true);
                                        setShowApprovalModal(false);
                                    }}
                                    className="px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest bg-emerald-600 text-white shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all font-black text-center"
                                >
                                    Autorizar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderForm;
