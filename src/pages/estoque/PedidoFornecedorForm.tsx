
import React, { useState } from 'react';
import { X, Calendar, User, Search, Trash2, Plus, ShoppingCart, DollarSign, FileText } from 'lucide-react';

interface PedidoItem {
    id: number;
    produtoId: number;
    produtoNome: string;
    sku: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
}

interface PedidoFornecedorFormProps {
    pedido?: any;
    onClose: () => void;
}

export default function PedidoFornecedorForm({ pedido, onClose }: PedidoFornecedorFormProps) {
    const [itens, setItens] = useState<PedidoItem[]>([
        { id: 1, produtoId: 101, produtoNome: 'Cadeira de Escritório Ergonômica', sku: 'CAD-001', quantidade: 10, valorUnitario: 450.00, valorTotal: 4500.00 },
        { id: 2, produtoId: 102, produtoNome: 'Mesa de Reunião 2m', sku: 'MSA-200', quantidade: 2, valorUnitario: 1200.00, valorTotal: 2400.00 },
    ]);

    const totalPedido = itens.reduce((acc, item) => acc + item.valorTotal, 0);

    return (
        <>
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity" onClick={onClose} />
            <div className="fixed inset-0 m-auto w-[95%] h-[90%] bg-white rounded-2xl shadow-2xl z-[70] flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden ring-1 ring-slate-900/5">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-xl font-bold text-slate-800">{pedido ? `Pedido #${pedido.id.toString().padStart(4, '0')}` : 'Novo Pedido de Compra'}</h2>
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-600 border border-blue-200">
                                {pedido?.status || 'Rascunho'}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500">Emissão de pedido para reposição de estoque.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">

                    {/* Dados Gerais */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6">
                        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                            <FileText size={16} className="text-blue-500" /> Dados do Pedido
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Fornecedor</label>
                                <div className="flex gap-2">
                                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="Selecione o Fornecedor..." defaultValue={pedido?.fornecedor || ''} />
                                    <button className="px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200 text-slate-600"><Search size={16} /></button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Data Emissão</label>
                                <div className="relative">
                                    <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" defaultValue={new Date().toISOString().split('T')[0]} />
                                    <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Previsão Entrega</label>
                                <div className="relative">
                                    <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                                    <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Condição Pagamento</label>
                                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                                    <option>28/42/56 Dias</option>
                                    <option>30 Dias</option>
                                    <option>À Vista</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Comprador</label>
                                <div className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600 text-sm">
                                    <User size={14} />
                                    <span>Yan Jansen</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Itens do Pedido */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm min-h-[300px] flex flex-col">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-4">
                            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                <ShoppingCart size={16} className="text-emerald-500" /> Itens do Pedido
                            </h3>
                            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-100 transition-colors">
                                <Plus size={14} /> Adicionar Produto
                            </button>
                        </div>

                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 rounded-lg">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Cód/SKU</th>
                                        <th className="px-4 py-3">Produto</th>
                                        <th className="px-4 py-3 text-right">Qtd</th>
                                        <th className="px-4 py-3 text-right">V. Unit.</th>
                                        <th className="px-4 py-3 text-right">Total</th>
                                        <th className="px-4 py-3 rounded-r-lg text-center" style={{ width: '50px' }}></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {itens.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 group">
                                            <td className="px-4 py-3 text-slate-500 font-mono text-xs">
                                                <div>{item.produtoId.toString().padStart(4, '0')}</div>
                                                <div className="text-[10px] text-slate-400">{item.sku}</div>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-slate-700">{item.produtoNome}</td>
                                            <td className="px-4 py-3 text-right">
                                                <input type="number" className="w-16 px-2 py-1 text-right border border-slate-200 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" defaultValue={item.quantidade} />
                                            </td>
                                            <td className="px-4 py-3 text-right text-slate-600">
                                                R$ {item.valorUnitario.toFixed(2)}
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold text-slate-800">
                                                R$ {item.valorTotal.toFixed(2)}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button className="text-slate-300 hover:text-red-500 transition-colors bg-transparent p-1 rounded hover:bg-red-50">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totais do Pedido */}
                        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                            <div className="w-64 space-y-2">
                                <div className="flex justify-between text-slate-500 text-sm">
                                    <span>Subtotal</span>
                                    <span>R$ {totalPedido.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-500 text-sm">
                                    <span>Descontos</span>
                                    <span className="text-green-600">- R$ 0,00</span>
                                </div>
                                <div className="flex justify-between text-slate-500 text-sm">
                                    <span>Frete</span>
                                    <span>R$ 150,00</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-slate-800 pt-2 border-t border-slate-100">
                                    <span>Total Final</span>
                                    <span className="text-blue-600">R$ {(totalPedido + 150).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between items-center p-6 border-t border-slate-200 bg-slate-50">
                    <button className="text-slate-500 hover:text-red-600 text-sm font-medium px-4 py-2 hover:bg-red-50 rounded-lg transition-colors">
                        Excluir Pedido
                    </button>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors font-medium">
                            Cancelar
                        </button>
                        <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors font-medium flex items-center gap-2">
                            <FileText size={18} /> Salvar Rascunho
                        </button>
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2 shadow-sm shadow-emerald-200">
                            <DollarSign size={18} /> Aprovar Pedido
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
