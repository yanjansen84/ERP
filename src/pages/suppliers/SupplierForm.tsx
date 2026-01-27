import { useState } from 'react';
import { X, Building2, FileText, Package, DollarSign, Search, Filter, ChevronDown, Trash2, ShoppingBag } from 'lucide-react';
import { DateRangeInput } from '../../components/ui/DateRangeInput';

interface SupplierFormProps {
    supplier?: {
        id: number;
        name: string;
        cnpj: string;
        category: string;
        contact: string;
        email: string;
        status: 'Ativo' | 'Inativo';
    };
    onClose: () => void;
}

export default function SupplierForm({ supplier, onClose }: SupplierFormProps) {
    const [activeTab, setActiveTab] = useState<'ficha' | 'movimentacao' | 'produtos' | 'financeiro'>('ficha');
    const [personType, setPersonType] = useState<'fisica' | 'juridica'>('juridica');

    const mockMovements = [
        { id: 1, date: '15/01/2026', type: 'Compra', document: 'NF 12345', value: 'R$ 5.420,00', status: 'Pago' },
        { id: 2, date: '10/01/2026', type: 'Compra', document: 'NF 12340', value: 'R$ 3.200,00', status: 'Pendente' },
        { id: 3, date: '05/01/2026', type: 'Devolução', document: 'NF 12330', value: 'R$ 850,00', status: 'Processado' }
    ];

    const mockProducts = [
        { id: 1, code: 'PROD-001', name: 'Mouse Gamer RGB', lastPrice: 'R$ 89,90', lastPurchase: '15/01/2026', quantity: 50 },
        { id: 2, code: 'PROD-002', name: 'Teclado Mecânico', lastPrice: 'R$ 299,00', lastPurchase: '10/01/2026', quantity: 30 },
        { id: 3, code: 'PROD-003', name: 'Monitor 24"', lastPrice: 'R$ 899,00', lastPurchase: '05/01/2026', quantity: 15 }
    ];

    const mockFinancial = [
        { id: 1, document: 'NF 12345', dueDate: '20/02/2026', value: 'R$ 5.420,00', status: 'A Vencer', days: 24 },
        { id: 2, document: 'NF 12340', dueDate: '15/02/2026', value: 'R$ 3.200,00', status: 'A Vencer', days: 19 },
        { id: 3, document: 'NF 12335', dueDate: '25/01/2026', value: 'R$ 1.500,00', status: 'Vencido', days: -2 }
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
                            <h2 className="text-xl font-bold text-slate-800">{supplier?.name || 'Novo Fornecedor'}</h2>
                            <p className="text-xs text-slate-500">{supplier?.cnpj || 'Preencha os dados do fornecedor para cadastro.'}</p>
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
                            <ShoppingBag size={16} /> Movimentação
                        </button>
                        <button
                            onClick={() => setActiveTab('produtos')}
                            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'produtos' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Package size={16} /> Produtos
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
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'ficha' && (
                        <div className="space-y-6">
                            {/* Person Type Toggle */}
                            <div className="flex gap-4 bg-slate-50 p-1 rounded-lg w-fit">
                                <button
                                    onClick={() => setPersonType('fisica')}
                                    className={`px-4 py-2 rounded-md transition-colors ${personType === 'fisica'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-slate-600 hover:text-slate-800'
                                        }`}
                                >
                                    Pessoa Física
                                </button>
                                <button
                                    onClick={() => setPersonType('juridica')}
                                    className={`px-4 py-2 rounded-md transition-colors ${personType === 'juridica'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-slate-600 hover:text-slate-800'
                                        }`}
                                >
                                    Pessoa Jurídica
                                </button>
                            </div>

                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        {personType === 'fisica' ? 'Nome Completo' : 'Razão Social'} *
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={supplier?.name}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={personType === 'fisica' ? 'Digite o nome completo' : 'Digite a razão social'}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        {personType === 'fisica' ? 'CPF' : 'CNPJ'} *
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={supplier?.cnpj}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={personType === 'fisica' ? '000.000.000-00' : '00.000.000/0000-00'}
                                    />
                                </div>
                            </div>

                            {personType === 'juridica' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Nome Fantasia</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Digite o nome fantasia"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Inscrição Estadual</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Digite a inscrição estadual"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Contact Information */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefone *</label>
                                    <input
                                        type="text"
                                        defaultValue={supplier?.contact}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="(00) 00000-0000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">E-mail *</label>
                                    <input
                                        type="email"
                                        defaultValue={supplier?.email}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="email@exemplo.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Categoria *</label>
                                    <input
                                        type="text"
                                        defaultValue={supplier?.category}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ex: Eletrônicos"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">CEP</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="00000-000"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Endereço</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Rua, Avenida..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Número</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nº"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Bairro</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Bairro"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Cidade</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Cidade"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="UF"
                                    />
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Prazo de Pagamento</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ex: 30 dias"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                    <select
                                        defaultValue={supplier?.status || 'Ativo'}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Ativo">Ativo</option>
                                        <option value="Inativo">Inativo</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Observações</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Informações adicionais sobre o fornecedor..."
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'movimentacao' && (
                        <div className="space-y-4">
                            {/* Filters */}
                            <div className="flex gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                <div className="w-72">
                                    <DateRangeInput placeholder="Filtrar por período" />
                                </div>
                                <div className="relative flex-1">
                                    <select className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-500 appearance-none pr-8">
                                        <option value="">Tipo de Movimentação</option>
                                        <option value="compra">Compra</option>
                                        <option value="devolucao">Devolução</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                </div>
                                <div className="relative flex-1">
                                    <select className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-500 appearance-none pr-8">
                                        <option value="">Status</option>
                                        <option value="pago">Pago</option>
                                        <option value="pendente">Pendente</option>
                                        <option value="processado">Processado</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                </div>
                            </div>

                            {/* Movements Table */}
                            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Data</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Tipo</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Documento</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Valor</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockMovements.map((movement) => (
                                            <tr key={movement.id} className="border-b border-slate-100 hover:bg-slate-50">
                                                <td className="px-4 py-3 text-sm text-slate-700">{movement.date}</td>
                                                <td className="px-4 py-3 text-sm text-slate-700">{movement.type}</td>
                                                <td className="px-4 py-3 text-sm text-slate-700">{movement.document}</td>
                                                <td className="px-4 py-3 text-sm font-medium text-slate-900">{movement.value}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${movement.status === 'Pago' ? 'bg-green-100 text-green-700' :
                                                        movement.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {movement.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <button className="text-slate-400 hover:text-red-600 transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'produtos' && (
                        <div className="space-y-4">
                            {/* Filters */}
                            <div className="flex gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                <div className="w-64">
                                    <DateRangeInput placeholder="Período de Compra" />
                                </div>
                                <div className="relative w-96">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Buscar produto por nome..."
                                        className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm hover:bg-slate-100 transition-colors">
                                    <Filter size={16} />
                                    Filtros
                                </button>
                            </div>

                            {/* Products Table */}
                            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Código</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Produto</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Último Preço</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Última Compra</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Quantidade</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockProducts.map((product) => (
                                            <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                                                <td className="px-4 py-3 text-sm text-slate-700">{product.code}</td>
                                                <td className="px-4 py-3 text-sm text-slate-700">{product.name}</td>
                                                <td className="px-4 py-3 text-sm font-medium text-slate-900">{product.lastPrice}</td>
                                                <td className="px-4 py-3 text-sm text-slate-700">{product.lastPurchase}</td>
                                                <td className="px-4 py-3 text-sm text-slate-700">{product.quantity}</td>
                                                <td className="px-4 py-3">
                                                    <button className="text-slate-400 hover:text-red-600 transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'financeiro' && (
                        <div className="space-y-4">
                            {/* Filters */}
                            <div className="flex gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                <div className="w-72">
                                    <DateRangeInput placeholder="Filtrar por vencimento" />
                                </div>
                                <div className="relative flex-1">
                                    <select className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-500 appearance-none pr-8">
                                        <option value="">Status</option>
                                        <option value="avencer">A Vencer</option>
                                        <option value="vencido">Vencido</option>
                                        <option value="pago">Pago</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                </div>
                            </div>

                            {/* Financial Table */}
                            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Documento</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Vencimento</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Valor</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Dias</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockFinancial.map((item) => (
                                            <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                                                <td className="px-4 py-3 text-sm text-slate-700">{item.document}</td>
                                                <td className="px-4 py-3 text-sm text-slate-700">{item.dueDate}</td>
                                                <td className="px-4 py-3 text-sm font-medium text-slate-900">{item.value}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'A Vencer' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-red-100 text-red-700'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`text-sm font-medium ${item.days < 0 ? 'text-red-600' : 'text-slate-700'
                                                        }`}>
                                                        {item.days > 0 ? `${item.days} dias` : `${Math.abs(item.days)} dias atrás`}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <button className="text-slate-400 hover:text-red-600 transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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
                        Salvar
                    </button>
                </div>
            </div>
        </>
    );
}

