import React from 'react';
import PlaceholderPage from '../../components/PlaceholderPage';
import { Settings } from 'lucide-react';

const AjusteEstoque: React.FC = () => {
    return (
        <PlaceholderPage
            title="Ajuste de Estoque"
            description="Realize ajustes manuais de estoque e correções de inventário."
            icon={<Settings className="w-16 h-16 text-amber-400 mx-auto mb-4" />}
        />
    );
};

export default AjusteEstoque;
