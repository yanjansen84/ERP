import React from 'react';
import PlaceholderPage from '../../components/PlaceholderPage';
import { Truck } from 'lucide-react';

const TransportadoraList: React.FC = () => {
    return (
        <PlaceholderPage
            title="Transportadoras"
            description="Gerencie sua base de transportadoras e parceiros logísticos."
            icon={<Truck className="w-16 h-16 text-orange-400 mx-auto mb-4" />}
        />
    );
};

export default TransportadoraList;
