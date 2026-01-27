import React from 'react';
import PlaceholderPage from '../../components/PlaceholderPage';
import { RefreshCw } from 'lucide-react';

const Ressuprimento: React.FC = () => {
    return (
        <PlaceholderPage
            title="Ressuprimento"
            description="Gerencie o ressuprimento automático de produtos em estoque."
            icon={<RefreshCw className="w-16 h-16 text-cyan-400 mx-auto mb-4" />}
        />
    );
};

export default Ressuprimento;
