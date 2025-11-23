// lib/constants.js

// 🚨 Configurações do Firebase (SUBSTITUA PELAS SUAS CHAVES!)
export const firebaseConfig = {
  apiKey: "AIzaSyBTeQSKtaXdm5tI9APbniKGbvwhQP205JU",
  authDomain: "orcamento-44592.firebaseapp.com",
  projectId: "orcamento-44592",
  storageBucket: "orcamento-44592.firebasestorage.app",
  messagingSenderId: "946840065878",
  appId: "1:946840065878:web:432102f1113927e6cb28f7",
  measurementId: "G-M1S34G3D62"
};

// Variáveis Globais para Firestore
export const APP_ID = 'local-budget-app'; 
export const COLLECTIONS = {
    BASE_PRICES: 'base_prices',
    BUDGETS: 'budgets',
};
export const DOC_IDS = {
    BASE_PRICES_DOC: 'global_prices', // Documento único para todos os preços base
};


// --- Dados Iniciais dos Itens ---
export const INITIAL_ITEMS = [
    { id: 'boiler2', description: 'RESERVATÓRIO DE 200 LTS BAIXA PRESSÃO KISOLTEC', unitPrice: 2408.00, qty: 0, details: 'Reservatório interno em INOX 304, Revestimento em Poliuretano Expandido, Apoio elétrico 3000W.' },
    { id: 'boiler3', description: 'RESERVATÓRIO DE 300 LTS BAIXA PRESSÃO KISOLTEC', unitPrice: 2898.00, qty: 0, details: 'Reservatório interno em INOX 304, Revestimento em Poliuretano Expandido, Apoio elétrico 3000W.' },
    { id: 'boiler4', description: 'RESERVATÓRIO DE 400 LTS BAIXA PRESSÃO KISOLTEC', unitPrice: 3315.00, qty: 0, details: 'Reservatório interno em INOX 304, Revestimento em Poliuretano Expandido, Apoio elétrico 3000W.' },
    { id: 'boiler5', description: 'RESERVATÓRIO DE 500 LTS BAIXA PRESSÃO KISOLTEC', unitPrice: 3864.00, qty: 0, details: 'Reservatório interno em INOX 304, Revestimento em Poliuretano Expandido, Apoio elétrico 3000W.' },
    { id: 'boiler6', description: 'RESERVATÓRIO DE 600 LTS BAIXA PRESSÃO KISOLTEC', unitPrice: 4447.00, qty: 0, details: 'Reservatório interno em INOX 304, Revestimento em Poliuretano Expandido, Apoio elétrico 3000W.' },
    { id: 'boiler8', description: 'RESERVATÓRIO DE 800 LTS BAIXA PRESSÃO KISOLTEC', unitPrice: 5315.00, qty: 0, details: 'Reservatório interno em INOX 304, Revestimento em Poliuretano Expandido, Apoio elétrico 3000W.' },
    { id: 'boiler10', description: 'RESERVATÓRIO DE 1000 LTS BAIXA PRESSÃO KISOLTEC', unitPrice: 6157.00, qty: 0, details: 'Reservatório interno em INOX 304, Revestimento em Poliuretano Expandido, Apoio elétrico 3000W.' },
    { id: 'placas', description: 'COLETORES SOLAR KISOLTEC - MODELO ULTRATEC 1.50x0.90', unitPrice: 1220.00, qty: 0, details: 'Máximo aproveitamento por m², Certificado pelo INMETRO e Selo PROCEL.' },
    { id: 'placas2', description: 'COLETORES SOLAR KISOLTEC - MODELO ULTRATEC 2.00x0.90', unitPrice: 1536.00, qty: 0, details: 'Máximo aproveitamento por m², Certificado pelo INMETRO e Selo PROCEL.' },
    { id: 'pressurizador', description: 'PRESSURIZADOR MAX POWER (EM INOX)', unitPrice: 1425.00, qty: 0, details: 'Garante pressão ideal pós-boiler.' },
    { id: 'kit_instalacao', description: 'KIT MATERIAL (EM COBRE) P/INSTALAÇÃO (ESTIMATIVA)', unitPrice: 1900.00, qty: 0, details: 'Tubulação e conexões para montagem do sistema.' },
    { id: 'timer', description: 'TIMER DIGITAL TLZ', unitPrice: 580.00, qty: 0, details: 'Controle de apoio elétrico.' },
    { id: 'mao_obra', description: 'MÃO DE OBRA DE INSTALAÇÃO (ESTIMATIVA)', unitPrice: 950.00, qty: 0, details: 'Instalação e testes do sistema completo.' },
];