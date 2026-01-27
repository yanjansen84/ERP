import React from 'react';
import PlaceholderPage from '../../components/PlaceholderPage';
import { BarChart3 } from 'lucide-react';

const Relatorios: React.FC = () => {
    return (
        <PlaceholderPage
            title="Relatórios"
            description="Visualize relatórios gerenciais e análises de dados."
            icon={<BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-4" />}
        />
    );
};

export default Relatorios;
