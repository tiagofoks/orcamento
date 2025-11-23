// components/ui/ClientForm.jsx

import React from 'react';
import { User, Home, Mail, Phone, MapPin } from 'lucide-react';

const ClientForm = ({ client, handleClientChange }) => (
    <div className="bg-white p-6 shadow-xl rounded-lg border-t-4 border-blue-500">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            1. Dados do Cliente
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['nome', 'telefone', 'email', 'endereco', 'cidade'].map((field) => (
                <div key={field} className="flex flex-col">
                    <label htmlFor={field} className="text-sm font-medium text-gray-600 mb-1 capitalize flex items-center">
                        {field === 'nome' && <User className="w-4 h-4 mr-1 text-blue-400" />}
                        {field === 'telefone' && <Phone className="w-4 h-4 mr-1 text-blue-400" />}
                        {field === 'email' && <Mail className="w-4 h-4 mr-1 text-blue-400" />}
                        {field === 'endereco' && <Home className="w-4 h-4 mr-1 text-blue-400" />}
                        {field === 'cidade' && <MapPin className="w-4 h-4 mr-1 text-blue-400" />}
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                        id={field}
                        type={field === 'email' ? 'email' : 'text'}
                        value={client[field]}
                        onChange={(e) => handleClientChange(field, e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder={`Digite o ${field}...`}
                    />
                </div>
            ))}
        </div>
    </div>
);

export default ClientForm;