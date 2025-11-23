// pages/index.js

import React, { useCallback, useState, useRef } from 'react';
import { Sun, ArrowRight, RefreshCw } from 'lucide-react';
// Importação do html2pdf.js (dynamic import)
// Não precisamos mais da inicialização do Firebase aqui!

// Importa o Hook e os Componentes refatorados
import { useBudget } from '../hooks/useBudget'; 
import ClientForm from '../components/ui/ClientForm';
import ItemTable from '../components/ui/ItemTable';
import PriceSettings from '../components/ui/PriceSettings';
import BudgetView from '../components/ui/BudgetView';
import ActionButtons from '../components/ui/ActionButtons';

// --- FUNÇÃO PARA IMPRIMIR/GERAR PDF (MOVENDO A LÓGICA DE GERAÇÃO PARA CÁ) ---

// Handler de Impressão (MANTIDO)
const handlePrint = (budgetRef) => {
    if (budgetRef.current) {
        const printContents = budgetRef.current.outerHTML;
        const printWindow = window.open('', '_blank');

        printWindow.document.write(`
            <html>
            <head>
                <title>Orçamento Solar</title>
                <script src="https://cdn.tailwindcss.com"></script> 
                <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Roboto+Mono:wght@400;700&display=swap');
                body { font-family: 'Inter', sans-serif; margin: 0; padding: 20px; color: #1f2937; }
                .budget-view { max-width: 800px; margin: 0 auto; }
                .header-print h1 { font-size: 24px !important; }
                /* O estilo de impressão com cores deve ser replicado para garantir que a impressão funcione em todos os navegadores */
                .total-row-print td { 
                    background-color: #DBEAFE !important; 
                    color: #06B6D4 !important; 
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }
                </style>
            </head>
            <body class="p-8">
                ${printContents}
                <script>
                // Atraso para garantir que a renderização ocorra
                setTimeout(() => {
                    window.print();
                    window.onafterprint = function() {
                        window.close();
                    };
                }, 500);
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }
};

// Função para gerar o PDF e forçar o download
const generateAndDownloadPdf = async (budgetRef, clientName, setIsGeneratingPdf, isSilent = false) => {
    if (!budgetRef.current) return;

    // Importação dinâmica para reduzir o bundle inicial
    const html2pdf = (await import('html2pdf.js')).default; 

    setIsGeneratingPdf(true);
    const nomeArquivo = `Orcamento_Solar_${clientName.replace(/ /g, '_') || 'Cliente'}_${new Date().toISOString().substring(0, 10)}.pdf`;

    const options = {
        margin: 10,
        filename: nomeArquivo,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: false, scrollY: 0, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(options).from(budgetRef.current).save();
        if (!isSilent) {
             alert('PDF gerado e baixado com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar o PDF. Verifique o console. (Certifique-se de que está no navegador)');
    } finally {
        setIsGeneratingPdf(false);
    }
};


// --- COMPONENTE PRINCIPAL: App (Orquestrador) ---
const App = () => {
    // 1. Usa o Hook para obter todo o estado e lógica
    const {
        loading,
        userId,
        isAuthReady,
        client,
        items,
        totalValue,
        basePrices,
        handleClientChange,
        handleItemChange,
        saveBasePrices,
        saveBudget,
    } = useBudget();

    const budgetRef = useRef(null);
    const [isSavingBudget, setIsSavingBudget] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false); 

    // Handlers de Ação
    const handleSaveBudget = async () => {
        setIsSavingBudget(true);
        const docId = await saveBudget(); 
        if (docId) {
            alert(`Orçamento salvo com sucesso no Firestore! ID: ${docId}`);
        } else {
            alert('Erro ao salvar o orçamento. Verifique o console.');
        }
        setIsSavingBudget(false);
    };

    const pdfGenerator = useCallback((isSilent) => {
        generateAndDownloadPdf(budgetRef, client.nome, setIsGeneratingPdf, isSilent);
    }, [client.nome]);

    // Simplificando o loading
    if (loading && !isAuthReady) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-xl">
                    <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                    <p className="mt-4 text-gray-700 font-medium">Carregando aplicação...</p>
                </div>
            </div>
        );
    }
    
    // ATENÇÃO: Removemos a tag <script src="https://cdn.tailwindcss.com"></script> daqui!

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Cabeçalho */}
                <div className="bg-cyan-600 text-white p-6 rounded-xl shadow-2xl">
                    <h1 className="text-3xl font-extrabold flex items-center">
                        <Sun className="w-8 h-8 mr-3 text-yellow-300" />
                        A Casa dos Aquecedores
                    </h1>
                    <p className="mt-1 text-cyan-100">Salvamento em Nuvem (Firestore).</p> 
                </div>

                {/* Colunas: Formulário de Edição vs. Preços Base */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* 1. Dados do Cliente */}
                        <ClientForm client={client} handleClientChange={handleClientChange} />

                        {/* 2. Itens do Orçamento */}
                        <ItemTable items={items} handleItemChange={handleItemChange} totalValue={totalValue} />

                        {/* Ações */}
                        <ActionButtons
                            client={client}
                            handlePrint={() => handlePrint(budgetRef)}
                            handleSaveBudget={handleSaveBudget}
                            isSavingBudget={isSavingBudget}
                            isGeneratingPdf={isGeneratingPdf}
                            generateAndDownloadPdf={pdfGenerator}
                        />
                    </div>

                    {/* Configuração de Preços Base */}
                    <div className="lg:col-span-1 no-print">
                        <PriceSettings 
                            basePrices={basePrices} 
                            saveBasePrices={saveBasePrices}
                            loadingHook={loading}
                        />
                    </div>
                </div>
                
                {/* 3. Visualização do Orçamento para Impressão */}
                <h2 className="text-2xl font-bold pt-8 border-t-2 mt-8 flex items-center text-gray-700">
                    <ArrowRight className="w-5 h-5 mr-2 text-cyan-500"/>
                    Pré-visualização do Orçamento
                </h2>
                <div className="p-4 bg-gray-100 rounded-xl shadow-inner">
                    <BudgetView 
                        ref={budgetRef} 
                        client={client} 
                        items={items} 
                        totalValue={totalValue} 
                        userId={userId} 
                    />
                </div>
            </div>
        </div>
    );
};

export default App;