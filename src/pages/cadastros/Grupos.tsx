
import React, { useState } from 'react';
import { Plus, Search, Layers, X } from 'lucide-react';
import { DataGrid } from '../../components/ui/DataGrid';

interface Grupo {
    id: number;
    name: string;
    subgroupsCount: number;
    status: 'Ativo' | 'Inativo';
}

const mockGrupos: Grupo[] = [
    { id: 1, name: 'Eletrônicos', subgroupsCount: 5, status: 'Ativo' },
    { id: 2, name: 'Móveis', subgroupsCount: 3, status: 'Ativo' },
    { id: 3, name: 'Informática', subgroupsCount: 8, status: 'Ativo' },
    { id: 4, name: 'Periféricos', subgroupsCount: 4, status: 'Ativo' },
    { id: 5, name: 'Serviços', subgroupsCount: 0, status: 'Ativo' },
];

export default function Grupos() {
    const [grupos, setGrupos] = useState<Grupo[]>(mockGrupos);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGrupo, setSelectedGrupo] = useState<Grupo | null>(null);

    // Form State
    const [formData, setFormData] = useState({ name: '', status: 'Ativo' });

    const handleOpenModal = (grupo?: Grupo) => {
        if (grupo) {
            setSelectedGrupo(grupo);
            setFormData({ name: grupo.name, status: grupo.status });
        } else {
            setSelectedGrupo(null);
            setFormData({ name: '', status: 'Ativo' });
        }
        setIsModalOpen(true);
    };

    const handleSave = () => {
        setIsModalOpen(false);
    };

    const columns: Array<{
        key: keyof Grupo;
        title: string;
        sortable?: boolean;
        width?: string;
        render?: (value: any, item: Grupo) => React.ReactNode;
    }> = [
            {
                key: 'id',
                title: 'Cód.',
                width: '10%',
                render: (value: number) => <span className="text-slate-500 font-medium">{value.toString().padStart(4, '0')}</span>
            },
            {
                key: 'name',
                title: 'Nome do Grupo',
                sortable: true,
                width: '40%',
                render: (value: string) => (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                            <Layers size={14} />
                        </div>
                        <span className="font-medium text-slate-700">{value}</span>
                    </div>
                )
            },
            {
                key: 'subgroupsCount',
                title: 'Subgrupos',
                sortable: true,
                width: '30%',
                render: (value: number) => (
                    <span className="text-slate-500 text-sm">{value} subgrupos</span>
                )
            },
            {
                key: 'status',
                title: 'Status',
                sortable: true,
                width: '20%',
                render: (value: string) => (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${value === 'Ativo' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {value}
                    </span>
                )
            }
        ];

    const filteredGrupos = grupos.filter(g =>
        g.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col p-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Grupos</h1>
                    <p className="text-slate-500">Organize seus produtos em grupos principais.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm shadow-blue-200"
                >
                    <Plus size={18} />
                    Novo Grupo
                </button>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar grupos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    />
                </div>
            </div>

            <DataGrid
                columns={columns}
                data={filteredGrupos}
                onEdit={(item) => handleOpenModal(item)}
            />

            {isModalOpen && (
                <>
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]" onClick={() => setIsModalOpen(false)} />
                    <div className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-2xl shadow-2xl z-[70] p-6 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-800">
                                {selectedGrupo ? 'Editar Grupo' : 'Novo Grupo'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Grupo</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ex: Eletrônicos"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm shadow-blue-200"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
