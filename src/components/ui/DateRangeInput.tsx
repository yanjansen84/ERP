import React, { useState, useRef, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format, parse, isValid, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, X, ChevronDown, Trash2 } from 'lucide-react';
import 'react-day-picker/dist/style.css';

interface DateRangeInputProps {
    onChange?: (range: DateRange | undefined) => void;
    placeholder?: string;
    className?: string; // Permitir passar classes de largura e posição
}

export const DateRangeInput: React.FC<DateRangeInputProps> = ({ onChange, placeholder = "Selecione o período", className = "" }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [range, setRange] = useState<DateRange | undefined>();
    const [tempRange, setTempRange] = useState<DateRange | undefined>();
    
    // Inputs manuais
    const [inputValueFrom, setInputValueFrom] = useState('');
    const [inputValueTo, setInputValueTo] = useState('');
    const [leftMonth, setLeftMonth] = useState<Date>(new Date());
    const [rightMonth, setRightMonth] = useState<Date>(subMonths(new Date(), -1));

    const containerRef = useRef<HTMLDivElement>(null);

    // Sincronizar input visual com range
    useEffect(() => {
        if (tempRange?.from) setInputValueFrom(format(tempRange.from, 'dd/MM/yyyy'));
        else setInputValueFrom('');

        if (tempRange?.to) setInputValueTo(format(tempRange.to, 'dd/MM/yyyy'));
        else setInputValueTo('');
    }, [tempRange]);

    // Fechar ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsPopoverOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef]);

    const handleSelect = (newRange: DateRange | undefined) => {
        setRange(newRange);
        setTempRange(newRange);
        if (onChange) onChange(newRange);
    };

    const handleDayClick = (newRange: DateRange | undefined) => {
        setTempRange(newRange);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'from' | 'to') => {
        const val = e.target.value;
        if (type === 'from') setInputValueFrom(val);
        else setInputValueTo(val);

        if (val.length === 10) {
            const parsed = parse(val, 'dd/MM/yyyy', new Date());
            if (isValid(parsed)) {
                const newR = { ...tempRange, [type]: parsed };
                setTempRange(newR as DateRange);
                if (type === 'to') setRightMonth(parsed);
                else setLeftMonth(parsed);
            }
        }
    }

    const formatDateRangeDisplay = () => {
        if (!range?.from) return '';
        if (!range.to) return format(range.from, 'dd/MM/yyyy');
        return `${format(range.from, 'dd/MM/yyyy')} - ${format(range.to, 'dd/MM/yyyy')}`;
    };

    const clearSelection = () => {
        setRange(undefined);
        setTempRange(undefined);
        setInputValueFrom('');
        setInputValueTo('');
        if (onChange) onChange(undefined);
    }

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                onClick={() => {
                    setIsPopoverOpen(!isPopoverOpen);
                    setTempRange(range); 
                }}
                className={`w-full pl-9 pr-3 py-1.5 bg-white border transition-all rounded-lg text-sm focus:outline-none flex items-center h-[34px] shadow-sm hover:border-slate-300 ${isPopoverOpen ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200'}`}
            >
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <span className={range?.from ? 'text-slate-700 font-medium' : 'text-slate-400 truncate'}>
                    {formatDateRangeDisplay() || placeholder}
                </span>
            </button>

            {isPopoverOpen && (
                <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 z-50 bg-white border border-slate-200 shadow-2xl rounded-2xl w-[740px] animate-in fade-in zoom-in-95 duration-200 overflow-hidden ring-1 ring-slate-900/5">
                    
                    {/* Header: Presets e Inputs */}
                    <div className="p-5 border-b border-slate-100 bg-white">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Período</span>
                                <div className="relative">
                                    <select 
                                        className="appearance-none bg-slate-50 border border-slate-200 text-blue-600 text-xs font-bold rounded-lg px-3 py-1.5 pr-8 cursor-pointer focus:outline-none hover:bg-slate-100 transition-colors"
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            const today = new Date();
                                            let newRange: DateRange | undefined;
                                            if (val === 'Últimos 7 dias') newRange = { from: subDays(today, 7), to: today };
                                            else if (val === 'Este Mês') newRange = { from: startOfMonth(today), to: endOfMonth(today) };
                                            else if (val === 'Mês Passado') {
                                                const lastMonth = subMonths(today, 1);
                                                newRange = { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
                                            }
                                            if (newRange) {
                                                setTempRange(newRange);
                                                if (newRange.from) setLeftMonth(newRange.from);
                                            }
                                        }}
                                        defaultValue="Personalizado"
                                    >
                                        <option value="Personalizado">Personalizado</option>
                                        <option value="Últimos 7 dias">Últimos 7 dias</option>
                                        <option value="Este Mês">Este Mês</option>
                                        <option value="Mês Passado">Mês Passado</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" size={14} />
                                </div>
                            </div>
                            <button onClick={clearSelection} className="text-red-500 text-xs font-bold hover:text-red-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all">
                                <Trash2 size={14} /> Limpar
                            </button>
                        </div>

                        <div className="flex justify-center gap-8">
                            <div className="w-[310px]">
                                <label className="text-[9px] uppercase font-black text-slate-400 mb-1.5 block tracking-tighter">Data Inicial</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold tracking-tight shadow-sm transition-all"
                                    placeholder="DD/MM/AAAA"
                                    value={inputValueFrom}
                                    onChange={(e) => handleInputChange(e, 'from')}
                                    maxLength={10}
                                />
                            </div>
                            <div className="w-[310px]">
                                <label className="text-[9px] uppercase font-black text-slate-400 mb-1.5 block tracking-tighter">Data Final</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold tracking-tight shadow-sm transition-all"
                                    placeholder="DD/MM/AAAA"
                                    value={inputValueTo}
                                    onChange={(e) => handleInputChange(e, 'to')}
                                    maxLength={10}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dual Calendars */}
                    <div className="p-6 flex justify-center gap-10 bg-white relative">
                        <style>{`
                            .rdp { --rdp-cell-size: 38px; --rdp-accent-color: #2563eb; --rdp-background-color: #eff6ff; margin: 0; font-family: inherit; }
                            .rdp-caption_label { font-size: 16px; font-weight: 800; color: #1e293b; text-transform: lowercase; }
                            .rdp-caption_label::first-letter { text-transform: uppercase; }
                            .rdp-nav { color: #94a3b8; }
                            .rdp-head_cell { color: #94a3b8; font-weight: 600; font-size: 11px; text-transform: lowercase; padding-bottom: 12px; }
                            .rdp-day { border-radius: 10px; font-size: 13px; font-weight: 500; color: #475569; }
                            .rdp-day_selected { background-color: #2563eb; color: white !important; font-weight: 800; }
                            .rdp-day_today { color: #2563eb; font-weight: 800; background-color: #f8fafc; }
                            .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #f1f5f9; color: #1e293b; }
                            .rdp-day_range_middle { background-color: #eff6ff; color: #2563eb; border-radius: 0; }
                            .rdp-day_range_start { border-top-right-radius: 0; border-bottom-right-radius: 0; }
                            .rdp-day_range_end { border-top-left-radius: 0; border-bottom-left-radius: 0; }
                        `}</style>

                        <div>
                            <DayPicker
                                mode="range"
                                selected={tempRange}
                                onSelect={handleDayClick}
                                month={leftMonth}
                                onMonthChange={setLeftMonth}
                                locale={ptBR}
                            />
                        </div>
                        <div>
                            <DayPicker
                                mode="range"
                                selected={tempRange}
                                onSelect={handleDayClick}
                                month={rightMonth}
                                onMonthChange={(m) => setRightMonth(m)}
                                locale={ptBR}
                            />
                        </div>
                    </div>

                    <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                        <button
                            onClick={() => setIsPopoverOpen(false)}
                            className="px-5 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-all font-bold"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => { handleSelect(tempRange); setIsPopoverOpen(false); }}
                            className="px-8 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 transition-all font-bold active:scale-95"
                        >
                            Aplicar Filtro
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
