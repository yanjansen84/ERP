import React, { useState, useRef, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format, parse, isValid, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, X, ChevronDown, Trash2 } from 'lucide-react';
import 'react-day-picker/dist/style.css';

interface DateRangeInputProps {
    onChange?: (range: DateRange | undefined) => void;
    placeholder?: string;
}

export const DateRangeInput: React.FC<DateRangeInputProps> = ({ onChange, placeholder = "Selecione o período" }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [range, setRange] = useState<DateRange | undefined>();
    const [tempRange, setTempRange] = useState<DateRange | undefined>(); // Range temporário durante a seleção

    // Inputs manuais
    const [inputValueFrom, setInputValueFrom] = useState('');
    const [inputValueTo, setInputValueTo] = useState('');
    const [leftMonth, setLeftMonth] = useState<Date>(new Date());
    const [rightMonth, setRightMonth] = useState<Date>(subMonths(new Date(), -1));

    const containerRef = useRef<HTMLDivElement>(null);

    // Sincronizar input visual com range selecionado
    useEffect(() => {
        if (tempRange?.from) setInputValueFrom(format(tempRange.from, 'dd/MM/yyyy'));
        else setInputValueFrom('');

        if (tempRange?.to) setInputValueTo(format(tempRange.to, 'dd/MM/yyyy'));
        else setInputValueTo('');
    }, [tempRange]);

    // Fechar ao clicar fora e aplicar
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsPopoverOpen(false);
                // Ao fechar, confirma a seleção temporária
                if (tempRange) {
                    handleSelect(tempRange);
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef, tempRange]);

    const handleSelect = (newRange: DateRange | undefined) => {
        setRange(newRange);
        setTempRange(newRange);
        if (onChange) onChange(newRange);
    };

    const handleDayClick = (newRange: DateRange | undefined) => {
        setTempRange(newRange);
    }

    // Tratamento de input manual
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'from' | 'to') => {
        const val = e.target.value;
        if (type === 'from') setInputValueFrom(val);
        else setInputValueTo(val);

        if (val.length === 10) {
            const parsed = parse(val, 'dd/MM/yyyy', new Date());
            if (isValid(parsed)) {
                const newR = { ...tempRange, [type]: parsed };
                setTempRange(newR as DateRange);

                // Se for data final, atualiza calendário da direita
                // Se for data inicial, atualiza calendário da esquerda
                if (type === 'to') {
                    setRightMonth(parsed);
                } else {
                    setLeftMonth(parsed);
                }
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
        <div className="relative w-full" ref={containerRef}>
            {/* Trigger Button */}
            <button
                onClick={() => {
                    setIsPopoverOpen(!isPopoverOpen);
                    setTempRange(range); // Reinicia temp com o atual ao abrir
                }}
                className={`w-full pl-9 pr-3 py-1.5 bg-slate-50 border transition-all rounded-md text-sm focus:outline-none flex items-center h-[34px] ${isPopoverOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200'}`}
            >
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <span className={range?.from ? 'text-slate-700' : 'text-slate-400 truncate'}>
                    {formatDateRangeDisplay() || placeholder}
                </span>
            </button>

            {isPopoverOpen && (
                <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-slate-200 shadow-2xl rounded-xl w-[800px] animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col">

                    {/* Header com Inputs e Filtros */}
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Período</span>
                                <div className="relative">
                                    <select
                                        className="appearance-none bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold rounded px-2 py-1 pr-6 cursor-pointer focus:outline-none hover:bg-blue-100 transition-colors"
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            const today = new Date();
                                            let newRange: DateRange | undefined;
                                            // Lógica de presets
                                            if (val === 'Últimos 7 dias') newRange = { from: subDays(today, 7), to: today };
                                            else if (val === 'Este Mês') newRange = { from: startOfMonth(today), to: endOfMonth(today) };
                                            else if (val === 'Mês Passado') {
                                                const lastMonth = subMonths(today, 1);
                                                newRange = { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
                                            }

                                            if (newRange) {
                                                setTempRange(newRange);
                                                if (newRange.from) setLeftMonth(newRange.from); // Pula para o mês do início
                                            }
                                        }}
                                        defaultValue="Personalizado"
                                    >
                                        <option value="Personalizado">Personalizado</option>
                                        <option value="Últimos 7 dias">Últimos 7 dias</option>
                                        <option value="Este Mês">Este Mês</option>
                                        <option value="Mês Passado">Mês Passado</option>
                                    </select>
                                    <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" size={14} />
                                </div>
                            </div>
                            <button onClick={clearSelection} className="text-red-500 text-xs font-medium hover:text-red-700 flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50 transition-colors">
                                <Trash2 size={14} /> Limpar
                            </button>
                        </div>

                        {/* Inputs Alinhados com os Calendários */}
                        {/* A largura do calendário com cell-size 36px é aprox 280-300px. Vamos tentar alinhar visualmente. */}
                        <div className="flex justify-center gap-6">
                            <div className="w-[300px] relative">
                                <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block pl-1">Data Inicial</label>
                                <input
                                    type="text"
                                    className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono shadow-sm"
                                    placeholder="DD/MM/AAAA"
                                    value={inputValueFrom}
                                    onChange={(e) => handleInputChange(e, 'from')}
                                    maxLength={10}
                                />
                                {inputValueFrom && <div className="absolute right-3 top-[34px] text-slate-400 cursor-pointer hover:text-red-500" onClick={() => { setInputValueFrom(''); setTempRange({ ...tempRange, from: undefined }) }}><X size={14} /></div>}
                            </div>

                            <div className="w-[300px] relative">
                                <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block pl-1">Data Final</label>
                                <input
                                    type="text"
                                    className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono shadow-sm"
                                    placeholder="DD/MM/AAAA"
                                    value={inputValueTo}
                                    onChange={(e) => handleInputChange(e, 'to')}
                                    maxLength={10}
                                />
                                {inputValueTo && <div className="absolute right-3 top-[34px] text-slate-400 cursor-pointer hover:text-red-500" onClick={() => { setInputValueTo(''); setTempRange({ ...tempRange, to: undefined }) }}><X size={14} /></div>}
                            </div>
                        </div>
                    </div>

                    {/* Calendário */}
                    {/* Calendários Independentes */}
                    <div className="p-6 flex justify-center gap-6 bg-white relative">
                        {/* Styles globais do RDP */}
                        <style>{`
                            .rdp { --rdp-cell-size: 40px; --rdp-accent-color: #2563eb; --rdp-background-color: #eff6ff; margin: 0; }
                            .rdp-caption { display: flex; justify-content: center; margin-bottom: 12px; position: relative; }
                            .rdp-caption_dropdowns { display: flex; gap: 8px; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; }
                            .rdp-dropdown { padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px; color: #1e293b; background: #fff; cursor: pointer; height: 32px; font-weight: 600; }
                            .rdp-dropdown:hover { border-color: #cbd5e1; background-color: #f8fafc; }
                            .rdp-dropdown_month { min-width: 100px; }
                            .rdp-dropdown_year { min-width: 80px; }
                            .rdp-nav { display: none; } 
                            .rdp-head_cell { color: #94a3b8; font-weight: 500; font-size: 0.75rem; text-transform: uppercase; padding-bottom: 8px; }
                            .rdp-day { border-radius: 8px; font-size: 0.9rem; }
                            .rdp-day_selected { background-color: #2563eb; color: white; font-weight: bold; }
                            .rdp-day_today { color: #2563eb; font-weight: bold; background-color: #f8fafc; }
                            .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #f1f5f9; color: #1e293b; }
                        `}</style>

                        {/* Calendário Esquerda - DATA INICIAL */}
                        <div className="w-[300px]">
                            <DayPicker
                                mode="range"
                                selected={tempRange}
                                onSelect={handleDayClick}
                                month={leftMonth}
                                onMonthChange={setLeftMonth}
                                locale={ptBR}
                                captionLayout="dropdown-buttons"
                                fromYear={2020}
                                toYear={2030}
                                classNames={{ caption_label: "hidden" }}
                            />
                        </div>

                        {/* Calendário Direita - DATA FINAL */}
                        <div className="w-[300px]">
                            <DayPicker
                                mode="range"
                                selected={tempRange}
                                onSelect={handleDayClick}
                                month={rightMonth}
                                onMonthChange={setRightMonth}
                                locale={ptBR}
                                captionLayout="dropdown-buttons"
                                fromYear={2020}
                                toYear={2030}
                                classNames={{ caption_label: "hidden" }}
                            />
                        </div>
                    </div>

                    <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
                        <button
                            onClick={() => setIsPopoverOpen(false)}
                            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-lg transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => { handleSelect(tempRange); setIsPopoverOpen(false); }}
                            className="px-6 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors font-bold"
                        >
                            Aplicar Filtro
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
