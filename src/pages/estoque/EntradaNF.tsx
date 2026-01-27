import React from 'react';
import PlaceholderPage from '../../components/PlaceholderPage';
import { FileInput } from 'lucide-react';

const EntradaNF: React.FC = () => {
    return (
        <PlaceholderPage
            title="Entrada de NF"
            description="Registre a entrada de notas fiscais e atualize o estoque."
            icon={<FileInput className="w-16 h-16 text-teal-400 mx-auto mb-4" />}
        />
    );
};

export default EntradaNF;
