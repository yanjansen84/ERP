import React from 'react';
import PlaceholderPage from '../../components/PlaceholderPage';
import { ClipboardList } from 'lucide-react';

const PedidoFornecedor: React.FC = () => {
    return (
        <PlaceholderPage
            title="Pedido ao Fornecedor"
            description="Crie e acompanhe pedidos de compra aos fornecedores."
            icon={<ClipboardList className="w-16 h-16 text-indigo-400 mx-auto mb-4" />}
        />
    );
};

export default PedidoFornecedor;
