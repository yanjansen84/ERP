
// Interfaces
export interface Product {
    id: number;
    name: string;
    sku: string;
    category: string;
    stock: number;
    minStock: number;
    costPrice: number;
    salePrice: number;
    status: 'Ativo' | 'Inativo';
    image: string;
    codRef: string;
}

export interface Client {
    id: number;
    name: string;
    doc: string;
    type: string;
    city: string;
    status: string;
}

export interface Supplier {
    id: number;
    name: string;
    cnpj: string;
    category: string;
    contact: string;
    email: string;
    status: 'Ativo' | 'Inativo';
}

export interface Stat {
    label: string;
    value: number;
    color: string;
    textColor: string;
}

export interface OrderItem {
    id: number;
    productId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    basePrice: number; // Preço original da tabela no momento da adição
    discount: number;
    total: number;
    codRef: string;
}

export interface Quote {
    id: number;
    clientId: number;
    clientName: string;
    date: string;
    total: number;
    status: 'Pendente' | 'Aprovado' | 'Recusado' | 'Vencido';
    items: OrderItem[];
}

export interface Order {
    id: number;
    clientId: number;
    clientName: string;
    date: string;
    total: number;
    status: 'Aberto' | 'Faturado' | 'Cancelado' | 'Entregue';
    items: OrderItem[];
}

// Mock Data
export const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Cadeira de Escritório Ergonômica',
        sku: 'MOV-001',
        category: 'Móveis',
        stock: 45,
        minStock: 10,
        costPrice: 450.00,
        salePrice: 899.90,
        status: 'Ativo',
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=100',
        codRef: 'REF-AN600'
    },
    {
        id: 2,
        name: 'Monitor LED 27" 4K',
        sku: 'ELE-055',
        category: 'Eletrônicos',
        stock: 5,
        minStock: 8,
        costPrice: 1200.00,
        salePrice: 1899.00,
        status: 'Ativo',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=100',
        codRef: 'REF-MT427'
    },
    {
        id: 3,
        name: 'Teclado Mecânico RGB',
        sku: 'ELE-102',
        category: 'Eletrônicos',
        stock: 120,
        minStock: 20,
        costPrice: 150.00,
        salePrice: 349.90,
        status: 'Ativo',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?auto=format&fit=crop&q=80&w=100',
        codRef: 'REF-KB885'
    },
    {
        id: 4,
        name: 'Mesa de Jantar Madeira Maciça',
        sku: 'MOV-022',
        category: 'Móveis',
        stock: 0,
        minStock: 2,
        costPrice: 2500.00,
        salePrice: 4500.00,
        status: 'Inativo',
        image: 'https://images.unsplash.com/photo-1577140917170-285929dfe55c?auto=format&fit=crop&q=80&w=100',
        codRef: 'REF-TB202'
    }
];

export const mockClients: Client[] = [
    { id: 1, name: 'Tech Solutions LTDA', doc: '12.345.678/0001-90', type: 'Jurídica', city: 'São Paulo/SP', status: 'Ativo' },
    { id: 2, name: 'João da Silva', doc: '123.456.789-00', type: 'Física', city: 'Rio de Janeiro/RJ', status: 'Inativo' },
    { id: 3, name: 'Mercado do Bairro', doc: '98.765.432/0001-10', type: 'Jurídica', city: 'Curitiba/PR', status: 'Ativo' },
];

export const mockSuppliers: Supplier[] = [
    {
        id: 1,
        name: 'Tech Distribuidora LTDA',
        cnpj: '12.345.678/0001-90',
        category: 'Eletrônicos',
        contact: '(11) 98765-4321',
        email: 'contato@techdist.com.br',
        status: 'Ativo'
    },
    {
        id: 2,
        name: 'Móveis & Cia',
        cnpj: '98.765.432/0001-10',
        category: 'Móveis',
        contact: '(21) 91234-5678',
        email: 'vendas@moveisecia.com.br',
        status: 'Ativo'
    },
    {
        id: 3,
        name: 'Papelaria Central',
        cnpj: '11.222.333/0001-44',
        category: 'Papelaria',
        contact: '(31) 99876-5432',
        email: 'central@papelaria.com.br',
        status: 'Inativo'
    }
];

export const dashboardStats: Stat[] = [
    { label: 'A Fazer', value: 31, color: 'bg-slate-300', textColor: 'text-slate-400' },
    { label: 'Em Andamento', value: 56, color: 'bg-blue-500', textColor: 'text-blue-500' },
    { label: 'Atrasadas', value: 14, color: 'bg-red-500', textColor: 'text-red-500' },
    { label: 'Visão Geral', value: 17, color: 'bg-indigo-600', textColor: 'text-indigo-600' },
    { label: 'Concluídas', value: 28, color: 'bg-emerald-500', textColor: 'text-emerald-500' },
    { label: 'Total Tarefas', value: 146, color: 'bg-slate-800', textColor: 'text-slate-800' },
];

export const mockQuotes: Quote[] = [
    {
        id: 1,
        clientId: 1,
        clientName: 'Tech Solutions LTDA',
        date: '2026-03-25',
        total: 1250.00,
        status: 'Pendente',
        items: [
            { id: 1, productId: 1, name: 'Cadeira Ergonômica', quantity: 1, unitPrice: 899.90, basePrice: 899.90, discount: 0, total: 899.90, codRef: 'REF-AN600' },
            { id: 2, productId: 3, name: 'Teclado Mecânico', quantity: 1, unitPrice: 349.90, basePrice: 349.90, discount: 0, total: 349.90, codRef: 'REF-KB885' }
        ]
    },
    {
        id: 2,
        clientId: 2,
        clientName: 'João da Silva',
        date: '2026-03-27',
        total: 1899.00,
        status: 'Aprovado',
        items: [
            { id: 3, productId: 2, name: 'Monitor LED 27"', quantity: 1, unitPrice: 1899.00, basePrice: 1899.00, discount: 0, total: 1899.00, codRef: 'REF-MT427' }
        ]
    }
];

export const mockOrders: Order[] = [
    {
        id: 1,
        clientId: 3,
        clientName: 'Mercado do Bairro',
        date: '2026-03-28',
        total: 4500.00,
        status: 'Aberto',
        items: [
            { id: 4, productId: 4, name: 'Mesa de Jantar Madeira', quantity: 1, unitPrice: 4500.00, basePrice: 4500.00, discount: 0, total: 4500.00, codRef: 'REF-TB202' }
        ]
    }
];
