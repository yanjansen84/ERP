import React from 'react';
import PlaceholderPage from '../../components/PlaceholderPage';
import { Package } from 'lucide-react';

const Produtos: React.FC = () => {
    return (
        <PlaceholderPage
            title="Produtos"
            description="Gerencie seu catálogo de produtos e controle de estoque."
            icon={<Package className="w-16 h-16 text-purple-400 mx-auto mb-4" />}
        />
    );
};

export default Produtos;
