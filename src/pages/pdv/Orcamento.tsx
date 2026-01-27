import React from 'react';
import PlaceholderPage from '../../components/PlaceholderPage';
import { FileText } from 'lucide-react';

const Orcamento: React.FC = () => {
    return (
        <PlaceholderPage
            title="Orçamento"
            description="Crie e gerencie orçamentos para seus clientes."
            icon={<FileText className="w-16 h-16 text-blue-400 mx-auto mb-4" />}
        />
    );
};

export default Orcamento;
