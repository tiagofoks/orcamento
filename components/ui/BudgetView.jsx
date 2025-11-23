// components/ui/BudgetView.jsx

import React from 'react';
import { User, Ruler, Clock } from 'lucide-react';
import { formatCurrency } from '../../lib/utils'; // Caminho para o utilitário de formatação

const BudgetView = React.forwardRef(({ client, items, totalValue, userId }, ref) => (
    <div ref={ref} data-userid={userId} className="budget-view p-8 bg-white shadow-xl rounded-lg print:shadow-none print:p-0">
        
        {/* 1. CABEÇALHO DE IMPRESSÃO */}
        <div className="header-print text-center border-b-2 border-cyan-500 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-cyan-600 uppercase tracking-widest">A CASA DOS AQUECEDORES</h1>
            <p className="text-sm text-gray-600 mt-1">SOLAR, ELÉTRICO, GÁS E BOMBAS DE CALOR P/ PISCINAS.</p>
            <p className="text-xs text-gray-500 mt-2">FONE (15) 3227-3025 / (15) 99705-0935- SOROCABA/SP</p>
            <p className="text-xs text-gray-500">E-mail: casa.aquecedores@yahoo.com.hr</p>
        </div>

        {/* 2. INFORMAÇÕES DO CLIENTE */}
        <div className="client-info-print grid grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="col-span-2 text-lg font-bold text-blue-800 flex items-center mb-2 border-b border-blue-300 pb-1">
                <User className="text-sm text-gray-600 mt-1" /> DADOS DO CLIENTE
            </div>
            <div className="text-sm"><strong>Nome:</strong> {client.nome || '-'}</div>
            <div className="text-sm"><strong>Telefone:</strong> {client.telefone || '-'}</div>
            <div className="text-sm"><strong>E-mail:</strong> {client.email || '-'}</div>
            <div className="text-sm"><strong>Cidade:</strong> {client.cidade || '-'}</div>
            <div className="col-span-2 text-sm"><strong>Endereço:</strong> {client.endereco || '-'}</div>
        </div>

        {/* 3. TÍTULO DO ORÇAMENTO */}
        <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-green-500 pb-1 inline-block">ORÇAMENTO DE AQUECIMENTO SOLAR - {new Date().toLocaleDateString('pt-BR')}</h2>
            <p className="text-sm text-gray-600 mt-1"></p>
        </div>

        {/* 4. TABELA DE ITENS */}
        <table className="items-table-print w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100 text-sm">
                    <th className="p-3 border-r">QTDE</th>
                    <th className="p-3 border-r">ITEM</th>
                    <th className="p-3 border-r text-right">VALOR UNITÁRIO</th>
                    <th className="p-3 text-right">VALOR TOTAL</th>
                </tr>
            </thead>
            <tbody>
                {/* Filtra apenas itens com quantidade maior que 0 */}
                {items.filter(i => i.qty > 0).map((item) => (
                    <tr key={item.id} className="text-gray-700 hover:bg-gray-50 transition duration-100">
                        <td className="p-3 border-r font-medium text-center w-16">{item.qty.toFixed(0)}</td>
                        <td className="p-3 border-r">
                            <strong className="text-sm">{item.description.split('(')[0].trim()}</strong>
                            <p className="text-xs text-gray-500 mt-0.5">{item.details}</p>
                        </td>
                        <td className="p-3 border-r text-right w-36 font-mono">{formatCurrency(item.unitPrice)}</td>
                        <td className="p-3 text-right w-36 font-bold text-green-600 font-mono">{formatCurrency(item.qty * item.unitPrice)}</td>
                    </tr>
                ))}
                {/* Linha do Total */}
                <tr className="total-row-print bg-cyan-100 font-bold text-cyan-800">
                    <td colSpan="3" className="p-3 text-right text-md border-r-0">TOTAL GERAL</td>
                    <td className="p-3 text-right text-md border-l-0">{formatCurrency(totalValue)}</td>
                </tr>
            </tbody>
        </table>

        {/* 5. OBSERVAÇÕES E CONDIÇÕES */}
        <div className="notes-print mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
                <h3 className="font-bold text-sm uppercase text-green-600 mb-2 border-b border-green-300 pb-1 flex items-center">
                    <Ruler className="w-4 h-4 mr-1"/>
                    GARANTIAS
                </h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1 text-sm">
                    <li>03 ANOS P/ RESERVATÓRIO (BOILER)</li>
                    <li>03 ANOS P/ COLETORES SOLAR</li>
                    <li>01 ANO P/ PRESSURIZADORES</li>
                    <li>03 MESES P/ TERMOSTATO, RESISTÊNCIA</li>
                    <li className="mt-2 text-red-500">A garantia não cobre intempéries da natureza.</li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-sm uppercase text-green-600 mb-2 border-b border-green-300 pb-1 flex items-center">
                    <Clock className="w-4 h-4 mr-1"/>
                    CONDIÇÕES GERAIS
                </h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1 text-sm">
                    <li><strong className="font-semibold">CONDIÇÕES DE PAGAMENTO:</strong> À COMBINAR</li>
                    <li><strong className="font-semibold">PRAZO DE ENTREGA:</strong> 10 DIAS ÚTEIS, após confirmação do pedido.</li>
                    <li className="mt-2 font-semibold">OBS: ORÇAMENTO SUJEITO À ALTERAÇÕES</li>
                    {/* Validade de 7 dias */}
                    <li>Válido até: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}</li>
                </ul>
            </div>
        </div>

        {/* 6. ASSINATURA/CONTATO */}
        <div className="footer-print text-center mt-12 pt-6 border-t border-gray-300 text-gray-600">
            <p className="font-semibold text-sm">Roseli Sepulveda</p>
            <p className="font-semibold text-sm">(15) 99705-0935</p>
            <p className='text-xs mt-1'>Data: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        
        {/* 🚨 BLOCGO DE ESTILO STYLED JSX CORRIGIDO 🚨 */}
        {/* Deve ser o único elemento dentro do bloco de estilos para evitar erros de parsing */}
        <style jsx global>
            {`
            @media print {
                .no-print { display: none !important; }
                .budget-view { box-shadow: none !important; padding: 0 !important; }
                .client-info-print { grid-template-columns: 1fr 1fr; }
                .notes-print { grid-template-columns: 1fr 1fr; }
            }
            /* Garantir que as linhas de total fiquem visíveis na impressão (Forçando a cor de fundo) */
            .total-row-print td {
                background-color: #DBEAFE !important; 
                color: #06B6D4 !important; 
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
            `}
        </style>
    </div>
));

BudgetView.displayName = 'BudgetView'; 

export default BudgetView;