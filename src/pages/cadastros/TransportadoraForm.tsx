
import { useState } from 'react';
import { X, Truck, FileText, DollarSign, Search, Filter, Warehouse } from 'lucide-react';
import { DateRangeInput } from '../../components/ui/DateRangeInput';

interface TransportadoraFormProps {
    transportadora?: {
        id: number;
        name: string;
        cnpj: string;
        rntrc: string;
        city: string;
        contact: string;
        email: string;
        status: 'Ativo' | 'Inativo';
    };
    onClose: () => void;
}

export default function TransportadoraForm({ transportadora, onClose }: TransportadoraFormProps) {
    const [activeTab, setActiveTab] = useState<'ficha' | 'fretes' | 'financeiro'>('ficha');
    const [personType, setPersonType] = useState<'fisica' | 'juridica'>('juridica');

    // Mock Data for Tabs
    const mockFretes = [
        { id: 1, date: '15/01/2026', origin: 'São Paulo/SP', dest: 'Curitiba/PR', document: 'CTe 12345', value: 'R$ 2.420,00', status: 'Entregue' },
        { id: 2, date: '10/01/2026', origin: 'Rio de Janeiro/RJ', dest: 'São Paulo/SP', document: 'CTe 12340', value: 'R$ 1.800,00', status: 'Em Trânsito' },
        { id: 3, date: '05/01/2026', origin: 'Belo Horizonte/MG', dest: 'São Paulo/SP', document: 'CTe 12330', value: 'R$ 3.150,00', status: 'Pendente' }
    ];

    const mockFinancial = [
        { id: 1, document: 'CTe 12345', dueDate: '20/02/2026', value: 'R$ 2.420,00', status: 'A Vencer', days: 24 },
        { id: 2, document: 'CTe 12330', dueDate: '25/01/2026', value: 'R$ 3.150,00', status: 'Vencido', days: -3 }
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
                            <h2 className="text-xl font-bold text-slate-800">{transportadora?.name || 'Nova Transportadora'}</h2>
                            <p className="text-xs text-slate-500">{transportadora?.cnpj || 'Preencha os dados da transportadora para cadastro.'}</p>
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
                            <Truck size={16} /> Ficha
                        </button>
                        <button
                            onClick={() => setActiveTab('fretes')}
                            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'fretes' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Warehouse size={16} /> Fretes Realizados
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
                            {/* Type Toggle */}
                            <div className="flex items-center gap-4 mb-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="personType"
                                        checked={personType === 'juridica'}
                                        onChange={() => setPersonType('juridica')}
                                        className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Pessoa Jurídica</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="personType"
                                        checked={personType === 'fisica'}
                                        onChange={() => setPersonType('fisica')}
                                        className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Pessoa Física / Autônomo</span>
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                                        Dados Principais
                                    </h3>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            {personType === 'juridica' ? 'Razão Social' : 'Nome Completo'} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            defaultValue={transportadora?.name}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                {personType === 'juridica' ? 'CNPJ' : 'CPF'} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                defaultValue={transportadora?.cnpj}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                RNTRC <span className="text-blue-500 text-xs">(ANTT)</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                defaultValue={transportadora?.rntrc}
                                                placeholder="00000000"
                                            />
                                        </div>
                                    </div>

                                    {personType === 'juridica' && (
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Nome Fantasia</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Telefone <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                defaultValue={transportadora?.contact}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                E-mail <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                defaultValue={transportadora?.email}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Address & Details */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                                        Endereço e Detalhes
                                    </h3>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium text-slate-700 mb-1">CEP</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Rua</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Bairro</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Cidade/UF</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                defaultValue={transportadora?.city}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                        <select
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            defaultValue={transportadora?.status || 'Ativo'}
                                        >
                                            <option value="Ativo">Ativo</option>
                                            <option value="Inativo">Inativo</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Observações</label>
                                        <textarea
                                            rows={2}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                            placeholder="Informações adicionais sobre veículos, rotas, etc."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'fretes' && (
                        <div className="space-y-6">
                            <div className="flex gap-4 flex-wrap">
                                <DateRangeInput placeholder="Período" className="w-72" />
                            </div>

                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3">Data</th>
                                        <th className="px-4 py-3">Origem</th>
                                        <th className="px-4 py-3">Destino</th>
                                        <th className="px-4 py-3">Documento</th>
                                        <th className="px-4 py-3 text-right">Valor</th>
                                        <th className="px-4 py-3 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockFretes.map((frete) => (
                                        <tr key={frete.id} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-slate-900">{frete.date}</td>
                                            <td className="px-4 py-3 text-slate-600">{frete.origin}</td>
                                            <td className="px-4 py-3 text-slate-600">{frete.dest}</td>
                                            <td className="px-4 py-3 text-slate-600">{frete.document}</td>
                                            <td className="px-4 py-3 text-right font-medium text-slate-900">{frete.value}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${frete.status === 'Entregue' ? 'bg-emerald-100 text-emerald-600' :
                                                        frete.status === 'Em Trânsito' ? 'bg-blue-100 text-blue-600' :
                                                            'bg-amber-100 text-amber-600'
                                                    }`}>
                                                    {frete.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'financeiro' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                    <p className="text-sm text-emerald-600 font-medium">Total Pago (Mês)</p>
                                    <h3 className="text-2xl font-bold text-emerald-700 mt-1">R$ 15.420,00</h3>
                                </div>
                                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                                    <p className="text-sm text-amber-600 font-medium">A Vencer</p>
                                    <h3 className="text-2xl font-bold text-amber-700 mt-1">R$ 5.620,00</h3>
                                </div>
                                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                    <p className="text-sm text-red-600 font-medium">Vencido</p>
                                    <h3 className="text-2xl font-bold text-red-700 mt-1">R$ 3.150,00</h3>
                                </div>
                            </div>

                            <div className="flex gap-4 flex-wrap">
                                <DateRangeInput placeholder="Vencimento" className="w-72" />
                            </div>

                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3">Documento</th>
                                        <th className="px-4 py-3">Vencimento</th>
                                        <th className="px-4 py-3 text-right">Valor</th>
                                        <th className="px-4 py-3 text-center">Status</th>
                                        <th className="px-4 py-3 text-right">Dias</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockFinancial.map((item) => (
                                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-slate-900">{item.document}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.dueDate}</td>
                                            <td className="px-4 py-3 text-right font-medium text-slate-900">{item.value}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${item.status === 'Pago' ? 'bg-emerald-100 text-emerald-600' :
                                                        item.status === 'A Vencer' ? 'bg-blue-100 text-blue-600' :
                                                            'bg-red-100 text-red-600'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className={`px-4 py-3 text-right font-bold ${item.days < 0 ? 'text-red-500' : 'text-slate-400'}`}>
                                                {item.days > 0 ? `${item.days} dias` : `${Math.abs(item.days)} atraso`}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
