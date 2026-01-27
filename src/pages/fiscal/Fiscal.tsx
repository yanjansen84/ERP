import React from 'react';
import PlaceholderPage from '../../components/PlaceholderPage';
import { Receipt } from 'lucide-react';

const Fiscal: React.FC = () => {
    return (
        <PlaceholderPage
            title="Fiscal"
            description="Gerencie notas fiscais, impostos e obrigações fiscais."
            icon={<Receipt className="w-16 h-16 text-blue-400 mx-auto mb-4" />}
        />
    );
};

export default Fiscal;
