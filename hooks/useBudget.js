// hooks/useBudget.js

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
    doc, 
    setDoc, 
    getDoc, 
    collection, 
    serverTimestamp, 
} from 'firebase/firestore';

import { db } from '../lib/firebase'; // Importa a instância do DB
import { cleanNumber } from '../lib/utils'; // Importa a função utilitária
import { INITIAL_ITEMS, COLLECTIONS, DOC_IDS } from '../lib/constants'; // Importa constantes

// --- CUSTOM HOOK: useBudget (Lógica de Estado e FIREBASE) ---
export const useBudget = () => {
    const [loading, setLoading] = useState(true);
    // ID Fixo (idealmente viria de um Auth do Firebase)
    const [userId, setUserId] = useState('user_local_123'); 
    const [isAuthReady, setIsAuthReady] = useState(true); 
    const [basePrices, setBasePrices] = useState({}); 

    // Estado do Cliente
    const [client, setClient] = useState({
        nome: '',
        telefone: '',
        email: '',
        endereco: '',
        cidade: 'Sorocaba/SP',
    });

    // Estado dos Itens
    const [items, setItems] = useState(INITIAL_ITEMS.map(item => ({
        ...item,
        unitPrice: item.unitPrice,
        qty: item.qty,
    })));

    // 🚨 EFEITO DE CARREGAMENTO INICIAL (Preços Base do Firestore)
    useEffect(() => {
        const loadBasePricesFromFirestore = async () => {
            setLoading(true);
            try {
                // Referência ao documento de preços
                const docRef = doc(db, COLLECTIONS.BASE_PRICES, DOC_IDS.BASE_PRICES_DOC);
                const docSnap = await getDoc(docRef);

                let loadedPrices = {};

                if (docSnap.exists()) {
                    loadedPrices = docSnap.data();
                } else {
                    console.log("Documento de Preços Base não encontrado, usando defaults.");
                }
                
                setBasePrices(loadedPrices);

                // Aplica os preços base carregados (ou o default inicial) aos itens atuais
                setItems(prevItems => prevItems.map(item => {
                    const persistedPrice = cleanNumber(loadedPrices[item.id]);
                    const newPrice = persistedPrice > 0 ? persistedPrice : item.unitPrice; 
                    return { 
                        ...item, 
                        unitPrice: newPrice 
                    };
                }));

            } catch (error) {
                console.error('Erro ao carregar preços base do Firestore:', error);
                // Em caso de erro, usa os preços iniciais definidos
            } finally {
                setLoading(false);
            }
        };

        if (isAuthReady) {
            loadBasePricesFromFirestore();
        }
    }, [isAuthReady]);

    // Handlers
    const handleClientChange = useCallback((field, value) => {
        setClient(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleItemChange = useCallback((id, field, value) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    let newValue = field === 'description' ? value : cleanNumber(value);
                    if (field === 'qty' && newValue < 0) newValue = 0;
                    return { ...item, [field]: newValue };
                }
                return item;
            })
        );
    }, []);

    // Cálculo do Total
    const totalValue = useMemo(() => {
        return items.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
    }, [items]);
    
    // Salvar Preços Base no Firestore
    const saveBasePrices = useCallback(async (pricesToSave) => {
        setLoading(true);
        try {
            const dataToSave = {};
            // Converte valores para float
            Object.keys(pricesToSave).forEach(id => {
                dataToSave[id] = cleanNumber(pricesToSave[id]);
            });

            const docRef = doc(db, COLLECTIONS.BASE_PRICES, DOC_IDS.BASE_PRICES_DOC);
            
            await setDoc(docRef, dataToSave, { merge: true });

            setBasePrices(dataToSave); 
            return true;
        } catch (error) {
            console.error('Erro ao salvar preços base no Firestore:', error);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);
    
    // Salvar Orçamento no Firestore
    const saveBudget = useCallback(async () => {
        setLoading(true);

        try {
            const budgetData = {
                client,
                items: items.map(item => ({
                    description: item.description,
                    qty: item.qty,
                    unitPrice: item.unitPrice,
                    subtotal: item.qty * item.unitPrice,
                    details: item.details,
                })),
                totalValue,
                createdBy: userId,
                createdAt: serverTimestamp(),
                date: new Date().toLocaleDateString('pt-BR'), 
                guarantees: ['03 ANOS P/BOILER', '03 ANOS P/COLETOR SOLAR', '01 ANO P/PRESSURIZADORES'],
                conditions: 'À COMBINAR',
            };

            const docRef = doc(collection(db, COLLECTIONS.BUDGETS));
            await setDoc(docRef, budgetData);
            
            return docRef.id;
        } catch (error) {
            console.error('Erro ao salvar orçamento no Firestore:', error);
            return null;
        } finally {
            setLoading(false);
        }
    }, [client, items, totalValue, userId]);


    return {
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
    };
};