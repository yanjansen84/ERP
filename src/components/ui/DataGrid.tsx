import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, Filter } from 'lucide-react';

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
    loading?: boolean;
}

export function DataGrid<T extends { id: any }>({ columns, data, onEdit, onDelete, loading }: DataGridProps<T>) {
    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0 font-semibold tracking-wide">
                        <tr>
                            {columns.map((col) => (
                                <th key={String(col.key)} className="px-4 py-3 whitespace-nowrap" style={{ width: col.width }}>
                                    <div className="flex items-center justify-between gap-2 group/header cursor-pointer hover:bg-slate-100 p-1 -ml-1 rounded">
                                        <span>{col.title}</span>
                                        <Filter size={12} className="text-slate-300 group-hover/header:text-slate-500" />
                                    </div>
                                </th>
                            ))}
                            <th className="px-4 py-3 text-right" style={{ width: '80px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="p-8 text-center text-slate-400">
                                    Carregando dados...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="p-8 text-center text-slate-400">
                                    Nenhum registro encontrado.
                                </td>
                            </tr>
                        ) : (
                            data.map((item, idx) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                                    onClick={() => onEdit && onEdit(item)}
                                >
                                    {columns.map((col) => (
                                        <td key={`${item.id}-${String(col.key)}`} className="px-4 py-2.5 border-r border-transparent group-hover:border-slate-100 last:border-0 truncate max-w-xs text-slate-600">
                                            {col.render ? col.render(item[col.key], item) : String(item[col.key] || '-')}
                                        </td>
                                    ))}
                                    <td className="px-4 py-2 text-right" onClick={(e) => e.stopPropagation()}>
                                        <button className="text-slate-400 hover:text-blue-600 p-1 rounded-md hover:bg-blue-100 transition-colors">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer Styled like Excel Status Bar */}
            <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                    <span>Pronto</span>
                    <span className="h-3 w-px bg-slate-300"></span>
                    <span>{data.length} registros</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="disabled:opacity-50 hover:text-blue-600"><ChevronLeft size={14} /></button>
                    <span>Página 1 de 1</span>
                    <button className="disabled:opacity-50 hover:text-blue-600"><ChevronRight size={14} /></button>
                </div>
            </div>
        </div>
    );
}
