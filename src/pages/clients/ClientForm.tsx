import React, { useState } from 'react';
import { X, Save, Building2, User, Phone, Package, DollarSign, FileText, ShoppingBag, Filter, Search, Calendar } from 'lucide-react';
import { DataGrid, Column } from '../../components/ui/DataGrid';
import { DateRangeInput } from '../../components/ui/DateRangeInput';

interface ClientFormProps {
    isOpen: boolean;
    onClose: () => void;
    clientData?: any;
}

// Mock Data
const mockOrders = [
    { id: 101, date: '24/01/2026', total: 'R$ 1.500,00', status: 'Concluído' },
    { id: 102, date: '15/01/2026', total: 'R$ 3.250,50', status: 'Em Aberto' },
    { id: 103, date: '10/12/2025', total: 'R$ 900,00', status: 'Cancelado' },
];

const mockProducts = [
    { id: 1, orderId: 101, name: 'Licença ERP Standard', qty: 2, lastPurchase: '24/01/2026' },
    { id: 2, orderId: 102, name: 'Suporte Premium Mensal', qty: 12, lastPurchase: '15/01/2026' },
];

const mockFinancial = [
    { id: 1, date: '24/01/2026', desc: 'Fatura #101', value: 'R$ 1.500,00', type: 'Débito' },
    { id: 2, date: '20/01/2026', desc: 'Pagamento Recebido', value: 'R$ 1.500,00', type: 'Crédito' },
];

const ClientForm: React.FC<ClientFormProps> = ({ isOpen, onClose, clientData }) => {
    const [activeTab, setActiveTab] = useState<'ficha' | 'movimentacao' | 'produtos' | 'financeiro'>('ficha');
    const [personType, setPersonType] = useState<'juridica' | 'fisica'>('juridica');

    if (!isOpen) return null;

    const orderColumns: Column<typeof mockOrders[0]>[] = [
        { key: 'id', title: 'Pedido #', width: '20%' },
        { key: 'date', title: 'Data', width: '30%' },
        { key: 'total', title: 'Total', width: '25%' },
        {
            key: 'status', title: 'Status', width: '25%', render: (val) => (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${val === 'Concluído' ? 'bg-emerald-100 text-emerald-600' :
                    val === 'Em Aberto' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                    }`}>
                    {val}
                </span>
            )
        }
    ];

    const productColumns: Column<typeof mockProducts[0]>[] = [
        { key: 'orderId', title: 'Pedido #', width: '15%' },
        { key: 'name', title: 'Produto', width: '45%' },
        { key: 'qty', title: 'Qtd', width: '15%' },
        { key: 'lastPurchase', title: 'Data', width: '25%' },
    ];

    const financialColumns: Column<typeof mockFinancial[0]>[] = [
        { key: 'date', title: 'Data', width: '20%' },
        { key: 'desc', title: 'Descrição', width: '40%' },
        { key: 'value', title: 'Valor', width: '25%' },
        {
            key: 'type', title: 'Tipo', width: '15%', render: (val) => (
                <span className={`font-bold ${val === 'Crédito' ? 'text-emerald-600' : 'text-red-600'}`}>{val}</span>
            )
        }
    ];

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
                            <h2 className="text-xl font-bold text-slate-800">{clientData?.name || 'Novo Cliente'}</h2>
                            <p className="text-xs text-slate-500">{clientData?.doc || 'Preencha os dados do cliente para cadastro.'}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-slate-200/50 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('ficha')}
                            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'ficha' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <FileText size={16} /> Ficha
                        </button>
                        <button
                            onClick={() => setActiveTab('movimentacao')}
                            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'movimentacao' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Package size={16} /> Movimentação
                        </button>
                        <button
                            onClick={() => setActiveTab('produtos')}
                            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'produtos' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <ShoppingBag size={16} /> Produtos
                        </button>
                        <button
                            onClick={() => setActiveTab('financeiro')}
                            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'financeiro' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <DollarSign size={16} /> Financeiro
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC]">

                    {activeTab === 'ficha' && (
                        <div className="space-y-6">
                            {/* Tipo de Pessoa Toggle */}
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`flex items-center justify-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${personType === 'juridica' ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50 opacity-60'}`}>
                                    <input
                                        type="radio"
                                        name="tipo"
                                        className="hidden"
                                        checked={personType === 'juridica'}
                                        onChange={() => setPersonType('juridica')}
                                    />
                                    <Building2 className={personType === 'juridica' ? 'text-blue-600' : 'text-slate-500'} />
                                    <div>
                                        <div className={`font-bold text-sm ${personType === 'juridica' ? 'text-blue-900' : 'text-slate-700'}`}>Pessoa Jurídica</div>
                                        <div className={`text-xs ${personType === 'juridica' ? 'text-blue-600' : 'text-slate-500'}`}>Empresas e CNPJ</div>
                                    </div>
                                </label>
                                <label className={`flex items-center justify-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${personType === 'fisica' ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50 opacity-60'}`}>
                                    <input
                                        type="radio"
                                        name="tipo"
                                        className="hidden"
                                        checked={personType === 'fisica'}
                                        onChange={() => setPersonType('fisica')}
                                    />
                                    <User className={personType === 'fisica' ? 'text-blue-600' : 'text-slate-500'} />
                                    <div>
                                        <div className={`font-bold text-sm ${personType === 'fisica' ? 'text-blue-900' : 'text-slate-700'}`}>Pessoa Física</div>
                                        <div className={`text-xs ${personType === 'fisica' ? 'text-blue-600' : 'text-slate-500'}`}>CPF e Autônomos</div>
                                    </div>
                                </label>
                            </div>

                            {/* Dados Principais */}
                            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <User size={14} /> Dados Principais
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            {personType === 'juridica' ? 'Razão Social / Nome da Empresa' : 'Nome Completo'} *
                                        </label>
                                        <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder={personType === 'juridica' ? "Ex: Tech Solutions LTDA" : "Ex: João da Silva"} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            {personType === 'juridica' ? 'CNPJ' : 'CPF'} *
                                        </label>
                                        <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder={personType === 'juridica' ? "00.000.000/0000-00" : "000.000.000-00"} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            {personType === 'juridica' ? 'Inscrição Estadual' : 'RG'}
                                        </label>
                                        <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="Opcional" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Telefone / Celular</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <input type="text" className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="(00) 00000-0000" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                                        <input type="email" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="contato@empresa.com" />
                                    </div>
                                </div>
                            </div>

                            {/* Endereço */}
                            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <Building2 size={14} /> Endereço
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">CEP</label>
                                        <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="00000-000" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Rua / Logradouro</label>
                                        <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Número</label>
                                        <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Bairro</label>
                                        <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Cidade</label>
                                        <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Financeiro e Classificação */}
                            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <DollarSign size={14} /> Financeiro e Classificação
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Limite de Crédito (R$)</label>
                                        <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="0,00" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Empresa Agenciadora</label>
                                        <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm">
                                            <option value="">Selecione...</option>
                                            <option value="1">Agência Matriz</option>
                                            <option value="2">Parceiro SP</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Classificação do Cliente</label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="class" className="text-blue-600 focus:ring-blue-500" defaultChecked />
                                                <span className="text-sm text-slate-700">Consumidor Final</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="class" className="text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-slate-700">Revenda / Atacado</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'movimentacao' && (
                        <div className="h-full flex flex-col gap-4">
                            {/* Filtros Movimentacao */}
                            <div className="flex gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                <div className="w-72">
                                    <DateRangeInput placeholder="Filtrar por período" />
                                </div>
                                <div className="relative w-48">
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <select className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-500 appearance-none">
                                        <option>Status: Todos</option>
                                        <option>Concluído</option>
                                        <option>Em Aberto</option>
                                        <option>Cancelado</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex-1">
                                <DataGrid columns={orderColumns} data={mockOrders} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'produtos' && (
                        <div className="h-full flex flex-col gap-4">
                            {/* Filtros Produtos */}
                            <div className="flex gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                <div className="w-64">
                                    <DateRangeInput placeholder="Período de Compra" />
                                </div>
                                <div className="relative w-96">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input type="text" placeholder="Buscar produto por nome..." className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <DataGrid columns={productColumns} data={mockProducts} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'financeiro' && (
                        <div className="h-full flex flex-col gap-4">
                            {/* Resumo Financeiro */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                                    <div className="text-xs text-emerald-600 font-bold uppercase">Total Pago</div>
                                    <div className="text-xl font-bold text-emerald-700">R$ 12.450,00</div>
                                </div>
                                <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                                    <div className="text-xs text-red-600 font-bold uppercase">Em Aberto</div>
                                    <div className="text-xl font-bold text-red-700">R$ 3.250,50</div>
                                </div>
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                                    <div className="text-xs text-blue-600 font-bold uppercase">Limite Disponível</div>
                                    <div className="text-xl font-bold text-blue-700">R$ 6.750,00</div>
                                </div>
                            </div>

                            {/* Filtros Financeiro */}
                            <div className="flex gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                <div className="w-72">
                                    <DateRangeInput placeholder="Período do Extrato" />
                                </div>
                                <div className="relative w-48">
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <select className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-500 appearance-none">
                                        <option>Tipo: Todos</option>
                                        <option>Débito / A Pagar</option>
                                        <option>Crédito / Pago</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex-1">
                                <DataGrid columns={financialColumns} data={mockFinancial} />
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer actions only for Ficha tab */}
                {activeTab === 'ficha' && (
                    <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 transition-all">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-200 transition-all flex items-center gap-2">
                            <Save size={18} />
                            Salvar Cliente
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ClientForm;
