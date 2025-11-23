// components/ui/ActionButtons.jsx

import React from 'react';
import { Save, Printer, RefreshCw, Send } from 'lucide-react';

// Componente do Botão de WhatsApp
const WhatsappButton = ({ client, onGeneratePdf, isGenerating }) => {
    const nomeCliente = client.nome || 'Cliente';
    const telefone = client.telefone.replace(/\D/g, ''); 
    
    const whatsappMessage = `Olá ${nomeCliente}, aqui está o seu orçamento de Aquecimento Solar. Por favor, baixe o arquivo PDF gerado e anexe-o nesta conversa.`;
    const whatsappUrl = `https://wa.me/${telefone}?text=${encodeURIComponent(whatsappMessage)}`;

    const handleClick = () => {
        // Primeiro, gera o PDF silenciosamente
        onGeneratePdf(); 
        // Em seguida, abre o WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1000); 
    };

    return (
        <button
            onClick={handleClick}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200 flex items-center disabled:opacity-50"
            disabled={isGenerating || !client.telefone}
            title={!client.telefone ? "Preencha o telefone do cliente para enviar pelo WhatsApp" : "Gera o PDF e abre o WhatsApp (o usuário deve anexar o PDF)"}
        >
            {isGenerating ? (
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            ) : (
                <Send className="w-5 h-5 mr-2" /> 
            )}
            {isGenerating ? 'Gerando PDF...' : 'Enviar por WhatsApp'}
        </button>
    );
};


const ActionButtons = ({ client, handlePrint, handleSaveBudget, isSavingBudget, isGeneratingPdf, generateAndDownloadPdf }) => (
    <div className="flex justify-end space-x-4 no-print">
        {/* BOTÃO DE WHATSAPP */}
        <WhatsappButton 
            client={client} 
            // Passa a função de geração silenciosa
            onGeneratePdf={() => generateAndDownloadPdf(true)} 
            isGenerating={isGeneratingPdf}
        />
        
        <button
            onClick={handleSaveBudget}
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200 flex items-center disabled:opacity-50"
            disabled={isSavingBudget || isGeneratingPdf}
        >
            {isSavingBudget ? (
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            ) : (
                <Save className="w-5 h-5 mr-2" />
            )}
            {isSavingBudget ? 'Salvando...' : 'Salvar Orçamento (Firestore)'} 
        </button>

        <button
            onClick={handlePrint}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200 flex items-center disabled:opacity-50"
            disabled={isGeneratingPdf}
        >
            <Printer className="w-5 h-5 mr-2" />
            Imprimir / Gerar PDF
        </button>
    </div>
);

export default ActionButtons;