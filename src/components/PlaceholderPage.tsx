import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description, icon }) => {
    return (
        <div className="h-full flex flex-col p-6 animate-in fade-in duration-500">
            <div className="flex flex-col items-center justify-center flex-1">
                <div className="text-center max-w-md">
                    {icon || <Construction className="w-16 h-16 text-slate-300 mx-auto mb-4" />}
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">{title}</h1>
                    <p className="text-slate-500 mb-6">{description}</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                            <span className="font-semibold">🚧 Em Desenvolvimento</span>
                            <br />
                            Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceholderPage;
