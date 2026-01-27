import React from 'react';
import PlaceholderPage from '../../components/PlaceholderPage';
import { ShoppingCart } from 'lucide-react';

const Pedido: React.FC = () => {
    return (
        <PlaceholderPage
            title="Pedido"
            description="Gerencie pedidos de vendas e acompanhe o status."
            icon={<ShoppingCart className="w-16 h-16 text-green-400 mx-auto mb-4" />}
        />
    );
};

export default Pedido;
