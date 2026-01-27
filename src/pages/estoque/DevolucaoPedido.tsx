import React from 'react';
import PlaceholderPage from '../../components/PlaceholderPage';
import { Undo2 } from 'lucide-react';

const DevolucaoPedido: React.FC = () => {
    return (
        <PlaceholderPage
            title="Devolução de Pedido"
            description="Gerencie devoluções de pedidos e ajustes de estoque."
            icon={<Undo2 className="w-16 h-16 text-red-400 mx-auto mb-4" />}
        />
    );
};

export default DevolucaoPedido;
