import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../../services/api";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}


type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

type TransactionContextData = {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
    getTotalByType: (type: 'deposit' | 'withdraw') => number;
}

type TransactionContextProviderProps = {
    children: ReactNode
}

export const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export function TransactionProvider({ children }: TransactionContextProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        callApi();
    }, [])

    function callApi() {
        api.get('transactions').then(res => setTransactions(res.data.transactions))
    }

    async function createTransaction(transactionInput: TransactionInput) {
        const { data } = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        });
        
        const { transaction } = data;

        setTransactions([
            ...transactions,
            transaction
        ])

    }

    function getTotalByType(type: 'deposit' | 'withdraw'): number {
        return transactions.reduce((acc, transaction) =>{
            if (transaction.type === type) {
                return acc + transaction.amount;
            }

            return acc;
        }, 0);
    }

    return (
        <TransactionContext.Provider value={{transactions, createTransaction, getTotalByType}}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransaction = () => {
    return useContext(TransactionContext);
}