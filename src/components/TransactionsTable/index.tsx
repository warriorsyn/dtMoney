import { useEffect, useState } from "react";
import { useTransaction } from "../../contexts/Transactions/TransactionContext";
import { api } from "../../services/api";
import { Container } from "./style";


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

export function TransactionTable() {
   const { transactions } = useTransaction();

   console.log(transactions)

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                   { transactions.map(item => (
                    <tr key={item.id}>
                        <td>{ item.title }</td>
                        <td className={item.type === 'deposit' ? 'deposit' : 'withdraw'}>{item.type !== 'deposit' && <span>-</span>}{new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(item.amount)}</td>
                        <td>{item.category}</td>
                        <td>{new Intl.DateTimeFormat('pt-BR').format(
                            new Date(item.createdAt)
                        )}</td>
                    </tr>
                   )) }
                </tbody>
            </table>
        </Container>
    )
}