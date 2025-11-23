// lib/utils.js

// --- Funções Utilitárias ---
export const cleanNumber = (value) => {
    // Remove tudo que não for dígito, vírgula ou ponto. Depois, substitui a vírgula por ponto.
    return parseFloat(String(value).replace(/[^0-9,.]/g, '').replace(',', '.')) || 0;
};

export const formatCurrency = (value) => {
    // Formata o número como moeda brasileira (R$ 1.000,00)
    return `R$ ${parseFloat(value).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

// Geração de ID simples (mantida, caso precise de IDs locais)
export const generateLocalId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);