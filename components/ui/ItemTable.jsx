// components/ui/ItemTable.jsx

import React from 'react';
import { Package } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

const ItemTable = ({ items, handleItemChange, totalValue }) => (
    <div className="bg-white p-6 shadow-xl rounded-lg border-t-4 border-green-500">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
            <Package className="w-5 h-5 mr-2 text-green-500" />
            2. Itens e Valores
        </h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className="text-left bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="p-3 w-16">QTDE</th>
                        <th className="p-3 w-72">ITEM</th>
                        <th className="p-3 w-32 text-right">PREÇO UNIT. (R$)</th>
                        <th className="p-3 w-32 text-right">SUBTOTAL</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {items.map((item) => (
                        <tr key={item.id} className="hover:bg-green-50/50">
                            <td className="p-2">
                                <input
                                    type="number"
                                    value={item.qty}
                                    min="0"
                                    onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                                    className="w-full text-center p-1 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 text-sm"
                                />
                            </td>
                            <td className="p-2">
                                <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">{item.details}</p>
                            </td>
                            <td className="p-2 text-right">
                                <input
                                    type="text"
                                    value={item.unitPrice.toFixed(2).replace('.', ',')}
                                    onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                                    className="w-full text-right p-1 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 text-sm font-mono"
                                    placeholder="0,00"
                                />
                            </td>
                            <td className="p-2 text-right font-bold text-gray-700 font-mono">
                                {formatCurrency(item.qty * item.unitPrice)}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="bg-green-100 text-green-800 font-bold text-lg">
                        <td colSpan="3" className="p-3 text-right">TOTAL GERAL</td>
                        <td className="p-3 text-right">{formatCurrency(totalValue)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
);

export default ItemTable;