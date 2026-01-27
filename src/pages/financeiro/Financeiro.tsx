import React from 'react';
import PlaceholderPage from '../../components/PlaceholderPage';
import { DollarSign } from 'lucide-react';

const Financeiro: React.FC = () => {
    return (
        <PlaceholderPage
            title="Financeiro"
            description="Gerencie contas a pagar, contas a receber e fluxo de caixa."
            icon={<DollarSign className="w-16 h-16 text-green-400 mx-auto mb-4" />}
        />
    );
};

export default Financeiro;
