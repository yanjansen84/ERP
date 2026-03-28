
import React, { useState } from 'react';
import { X, Package, DollarSign, BarChart3, Receipt, Users, Upload, Image as ImageIcon, Search } from 'lucide-react';

interface ProductFormProps {
    product?: any;
    onClose: () => void;
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
    const [activeTab, setActiveTab] = useState<'ficha' | 'precos' | 'estoque' | 'fiscal' | 'fornecedores'>('ficha');

    // Price Calculation State
    const [costPrice, setCostPrice] = useState(product?.costPrice || 0);
    const [margin, setMargin] = useState(product?.margin || 50);
    const [salePrice, setSalePrice] = useState(product?.salePrice || 0);

    const calculateSalePrice = (cost: number, marg: number) => {
        const price = cost + (cost * (marg / 100));
        setSalePrice(price);
    };

    const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setCostPrice(val);
        calculateSalePrice(val, margin);
    };

    const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setMargin(val);
        calculateSalePrice(costPrice, val);
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 m-auto w-[95%] md:w-[85%] h-[90%] bg-white rounded-2xl shadow-2xl z-[70] flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden ring-1 ring-slate-900/5">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">{product?.name || 'Novo Produto'}</h2>
                            <p className="text-xs text-slate-500">{product?.sku ? `SKU: ${product.sku}` : 'Cadastre um novo produto no estoque.'}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-slate-200/50 p-1 rounded-lg overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('ficha')}
                            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[100px] ${activeTab === 'ficha' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Package size={16} /> Ficha
                        </button>
                        <button
                            onClick={() => setActiveTab('precos')}
                            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[100px] ${activeTab === 'precos' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <DollarSign size={16} /> Preços
                        </button>
                        <button
                            onClick={() => setActiveTab('estoque')}
                            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[100px] ${activeTab === 'estoque' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <BarChart3 size={16} /> Estoque
                        </button>
                        <button
                            onClick={() => setActiveTab('fiscal')}
                            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[100px] ${activeTab === 'fiscal' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Receipt size={16} /> Fiscal
                        </button>
                        <button
                            onClick={() => setActiveTab('fornecedores')}
                            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[100px] ${activeTab === 'fornecedores' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Users size={16} /> Fornecedores
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'ficha' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Image Upload Column */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Foto do Produto</label>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors cursor-pointer bg-slate-50 h-64">
                                    {product?.image ? (
                                        <img src={product.image} alt="Produto" className="w-full h-full object-cover rounded-lg" />
                                    ) : (
                                        <>
                                            <Upload size={32} className="mb-2" />
                                            <span className="text-sm font-medium text-center">Arraste uma imagem ou clique para selecionar</span>
                                        </>
                                    )}
                                </div>
                                <div className="grid grid-cols-4 gap-2 mt-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="aspect-square bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center cursor-pointer hover:border-blue-300">
                                            <ImageIcon size={16} className="text-slate-300" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Info Column */}
                            <div className="col-span-2 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Produto <span className="text-red-500">*</span></label>
                                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" defaultValue={product?.name} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">SKU</label>
                                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" defaultValue={product?.sku} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Código de Barras (EAN)</label>
                                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="789..." />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option>Eletrônicos</option>
                                            <option>Móveis</option>
                                            <option>Vestuário</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Marca</label>
                                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Unidade</label>
                                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="UN">Unidade (UN)</option>
                                            <option value="KG">Quilo (KG)</option>
                                            <option value="MT">Metro (MT)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Peso Líq. (Kg)</label>
                                        <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Peso Bruto (Kg)</label>
                                        <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Descrição Detalhada</label>
                                    <textarea rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'precos' && (
                        <div className="max-w-3xl mx-auto space-y-8">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <DollarSign size={18} className="text-blue-500" /> Formação de Preço
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Preço de Custo (R$)</label>
                                        <input
                                            type="number"
                                            value={costPrice}
                                            onChange={handleCostChange}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Margem de Lucro (%)</label>
                                        <input
                                            type="number"
                                            value={margin}
                                            onChange={handleMarginChange}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-600 font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Preço de Venda (R$)</label>
                                        <input
                                            type="number"
                                            value={salePrice.toFixed(2)}
                                            readOnly
                                            className="w-full px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Preço Promocional (R$)</label>
                                    <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    <p className="text-xs text-slate-500 mt-1">Preencha para agendar uma promoção.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Preço Mínimo (R$)</label>
                                    <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    <p className="text-xs text-slate-500 mt-1">Limite inferior para descontos de vendedores.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'estoque' && (
                        <div className="max-w-3xl mx-auto space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
                                    <p className="text-sm text-blue-600 font-medium mb-1">Estoque Atual</p>
                                    <h3 className="text-4xl font-bold text-blue-800">{product?.stock || 0}</h3>
                                    <p className="text-xs text-blue-400 mt-2">Unidades</p>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Estoque Mínimo</label>
                                        <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" defaultValue={10} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Estoque Máximo</label>
                                        <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" defaultValue={100} />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-200">
                                <h3 className="text-sm font-bold text-slate-900 mb-4">Localização no Armazém</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Corredor</label>
                                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ex: A" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Prateleira</label>
                                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ex: 3" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Posição</label>
                                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ex: 12" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'fiscal' && (
                        <div className="space-y-6 max-w-5xl mx-auto">
                            {/* Classificação Fiscal Básica */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                                    <Receipt size={16} className="text-blue-500" /> Classificação Geral
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">NCM (Classificação Fiscal)</label>
                                        <div className="flex gap-2">
                                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Ex: 8471.60.53" />
                                            <button className="px-3 py-2 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors text-slate-600"><Search size={16} /></button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Código CEST</label>
                                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="12.345.67" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Origem da Mercadoria</label>
                                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                                            <option value="0">0 - Nacional</option>
                                            <option value="1">1 - Estrangeira (Imp. Direta)</option>
                                            <option value="2">2 - Estrangeira (Adq. no mercado interno)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Grupo ICMS */}
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-1 lg:col-span-2">
                                    <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 text-emerald-600">ICMS</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-slate-500 mb-1">Situação Tributária (CST/CSOSN)</label>
                                            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                                                <option value="102">102 - Tributada pelo Simples Nacional sem permissão de crédito</option>
                                                <option value="00">00 - Tributada Integralmente</option>
                                                <option value="60">60 - Cobrado anteriormente por Substituição Tributária</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">MVA (%)</label>
                                            <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="0,00" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">FCP - Fundo Pobreza (%)</label>
                                            <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="0,00" />
                                        </div>

                                        {/* Alíquotas */}
                                        <div className="md:col-span-4 grid grid-cols-3 gap-4 bg-slate-50 p-3 rounded-lg mt-2">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-500 mb-1">Alíquota Interna (%)</label>
                                                <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" defaultValue={18} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-500 mb-1">Alíquota Interestadual - PF (%)</label>
                                                <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" defaultValue={12} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-500 mb-1">Alíquota Interestadual - PJ (%)</label>
                                                <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" defaultValue={12} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Grupo CFOP / Natureza */}
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 text-orange-600">Natureza da Operação (CFOP)</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">Venda Interna (Estadual)</label>
                                            <div className="flex gap-2">
                                                <input type="text" className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-center font-bold text-sm" defaultValue="5102" />
                                                <select className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 text-slate-500" disabled>
                                                    <option>Venda de mercadoria adquirida de terceiros</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">Venda Interestadual</label>
                                            <div className="flex gap-2">
                                                <input type="text" className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-center font-bold text-sm" defaultValue="6102" />
                                                <select className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 text-slate-500" disabled>
                                                    <option>Venda de mercadoria adquirida de terceiros</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Grupo IPI */}
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 text-purple-600">IPI</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">Situação Tributária (CST)</label>
                                            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                                                <option value="53">53 - Saída não-tributada</option>
                                                <option value="50">50 - Saída tributada</option>
                                                <option value="99">99 - Outras saídas</option>
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-500 mb-1">Enquadramento</label>
                                                <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="999" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-500 mb-1">Alíquota (%)</label>
                                                <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="0,00" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Grupo PIS/COFINS */}
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 text-blue-600">PIS / COFINS</h3>
                                    <div className="space-y-4">
                                        {/* PIS */}
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs font-bold text-slate-600">PIS</span>
                                                <span className="text-[10px] text-slate-400">Saída</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <select className="col-span-2 px-3 py-2 border border-slate-300 rounded-lg text-sm">
                                                    <option value="01">01 - Operação Tributável</option>
                                                    <option value="49">49 - Outras Operações</option>
                                                </select>
                                                <div className="relative">
                                                    <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm pl-8" defaultValue={0.65} />
                                                    <span className="absolute left-2 top-2 text-slate-400 text-xs font-bold">%</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* COFINS */}
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs font-bold text-slate-600">COFINS</span>
                                                <span className="text-[10px] text-slate-400">Saída</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <select className="col-span-2 px-3 py-2 border border-slate-300 rounded-lg text-sm">
                                                    <option value="01">01 - Operação Tributável</option>
                                                    <option value="49">49 - Outras Operações</option>
                                                </select>
                                                <div className="relative">
                                                    <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm pl-8" defaultValue={3.00} />
                                                    <span className="absolute left-2 top-2 text-slate-400 text-xs font-bold">%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ISSQN - Opcional */}
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm opacity-50 hover:opacity-100 transition-opacity">
                                    <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 text-slate-500">Serviços (ISSQN)</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">Cód. Serviço</label>
                                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">Alíquota (%)</label>
                                            <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'fornecedores' && (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900">Nenhum fornecedor vinculado</h3>
                            <p className="text-slate-500 mb-6 max-w-sm mx-auto">Vincule fornecedores a este produto para facilitar os pedidos de compra e cotações.</p>
                            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                                Adicionar Fornecedor
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Salvar Produto
                    </button>
                </div>
            </div>
        </>
    );
}
