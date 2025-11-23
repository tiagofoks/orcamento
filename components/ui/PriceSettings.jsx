// components/ui/PriceSettings.jsx

import React, { useState, useEffect } from 'react';
import { DollarSign, Save, RefreshCw, AlertTriangle, Package } from 'lucide-react';
import { INITIAL_ITEMS } from '../../lib/constants';
import { cleanNumber } from '../../lib/utils';

const PriceSettings = ({ basePrices, saveBasePrices, loadingHook }) => {
    const [editingPrices, setEditingPrices] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (basePrices) {
            const initialEditing = {};
            INITIAL_ITEMS.forEach(item => {
                // Usa o preço carregado do Firestore, ou o default inicial
                const price = basePrices[item.id] || item.unitPrice;
                initialEditing[item.id] = cleanNumber(price).toFixed(2).replace('.', ',');
            });
            setEditingPrices(initialEditing);
        }
    }, [basePrices]);

    const handlePriceChange = (id, value) => {
        // Permite apenas dígitos e vírgula/ponto para o input
        const cleanedValue = value.replace(/[^0-9,.]/g, ''); 
        setEditingPrices(prev => ({ ...prev, [id]: cleanedValue }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Chama a função do hook para salvar no Firestore
        const success = await saveBasePrices(editingPrices);

        if (success) {
            alert('Preços base salvos com sucesso no Firestore!');
        } else {
            alert('Erro ao salvar preços base. Verifique o console.');
        }
        setIsSaving(false);
    };

    if (loadingHook && Object.keys(basePrices).length === 0) {
        return (
            <div className="flex items-center justify-center p-8 bg-white rounded-xl shadow-xl min-h-[300px]">
                <RefreshCw className="w-6 h-6 text-yellow-500 animate-spin" />
                <p className="ml-2 text-gray-700">Carregando configurações...</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 shadow-xl rounded-lg border-t-4 border-yellow-500">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
                <DollarSign className="w-5 h-5 mr-2 text-yellow-500" />
                Configuração de Preços Base
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {INITIAL_ITEMS.map((item) => (
                    <div key={item.id} className="flex flex-col">
                        <label htmlFor={`price-${item.id}`} className="text-sm font-medium text-gray-600 mb-1 flex items-center">
                            <Package className="w-4 h-4 mr-1 text-blue-500" />
                            Preço Base - {item.description.split('(')[0].trim()}
                        </label>
                        <div className="flex items-center">
                            <span className="p-2 bg-gray-100 rounded-l-lg border border-gray-300 text-gray-600 text-sm">R$</span>
                            <input
                                id={`price-${item.id}`}
                                type="text"
                                value={editingPrices[item.id] || ''}
                                onChange={(e) => handlePriceChange(item.id, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-r-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150 text-right"
                                placeholder="0,00"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 flex items-center disabled:opacity-50"
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                        <Save className="w-5 h-5 mr-2" />
                    )}
                    {isSaving ? 'Salvando...' : 'Salvar Preços Base no Firestore'}
                </button>
            </div>
            <p className="mt-4 text-xs text-gray-500 flex items-start">
                <AlertTriangle className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0 text-red-400" />
                Estes preços são persistentes (**Firestore**) e aplicados automaticamente.
            </p>
        </div>
    );
};

export default PriceSettings;