import React from 'react';
import { ChevronLeft, ChevronRight, Search, Filter, Edit2, Trash2, Printer, Eye } from 'lucide-react';

export interface Column<T> {
    key: keyof T;
    title: string;
    width?: string;
    render?: (value: any, item: T) => React.ReactNode;
    sortable?: boolean;
}

interface DataGridProps<T> {
    columns: Column<T>[];
    data: T[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onPrint?: (item: T) => void;
    loading?: boolean;
}

export function DataGrid<T extends { id: any }>({ columns, data, onEdit, onDelete, onPrint, loading }: DataGridProps<T>) {
    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm text-left border-separate border-spacing-0">
                    <thead className="text-[10px] text-slate-400 uppercase bg-slate-50/50 border-b border-slate-200 sticky top-0 font-black tracking-widest z-10">
                        <tr>
                            {columns.map((col) => (
                                <th key={String(col.key)} className="px-4 py-3 whitespace-nowrap border-b border-slate-200" style={{ width: col.width }}>
                                    <div className="flex items-center gap-2 group/header cursor-pointer hover:text-slate-600 transition-colors">
                                        <span>{col.title}</span>
                                        <Filter size={10} className="text-slate-300 group-hover/header:text-slate-400" />
                                    </div>
                                </th>
                            ))}
                            <th className="px-4 py-3 text-center border-b border-slate-200" style={{ width: '120px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="p-12 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                                        <span className="text-slate-400 font-medium">Carregando dados...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="p-12 text-center">
                                    <div className="flex flex-col items-center gap-2 text-slate-400">
                                        <Search size={32} strokeWidth={1.5} className="opacity-20" />
                                        <span className="font-medium">Nenhum registro encontrado.</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((item, idx) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-blue-50/30 transition-all group cursor-default"
                                >
                                    {columns.map((col) => (
                                        <td key={`${item.id}-${String(col.key)}`} className="px-4 py-3 text-slate-600 font-medium border-transparent transition-all">
                                            {col.render ? col.render(item[col.key], item) : String(item[col.key] || '-')}
                                        </td>
                                    ))}
                                    <td className="px-4 py-2">
                                        <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {onPrint && (
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); onPrint(item); }}
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="Imprimir"
                                                >
                                                    <Printer size={16} />
                                                </button>
                                            )}
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); onEdit && onEdit(item); }}
                                                className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                title="Editar/Visualizar"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); onDelete && onDelete(item); }}
                                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Excluir"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="bg-slate-50/50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <div className="flex items-center gap-4">
                    <span className="text-emerald-500 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        Pronto
                    </span>
                    <span className="h-3 w-px bg-slate-200"></span>
                    <span>{data.length} registros</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-1 hover:text-blue-600 transition-colors disabled:opacity-30"><ChevronLeft size={14} strokeWidth={3} /></button>
                    <span className="px-2">Página 1 de 1</span>
                    <button className="p-1 hover:text-blue-600 transition-colors disabled:opacity-30"><ChevronRight size={14} strokeWidth={3} /></button>
                </div>
            </div>
        </div>
    );
}
