import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import CloseImg from '../../assets/close.svg';
import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import { useTransaction } from '../../contexts/Transactions/TransactionContext';


import { Container, RadioBox, TransactionTypeContainer } from "./style";

type NewTransactionModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    const { createTransaction } = useTransaction();

    
    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            category,
            type,
            amount: value
        });

        cleanForm();
        onRequestClose();
    }

    function cleanForm() {
        setTitle('');
        setValue(0);
        setCategory('');
        setType('deposit');
    }

    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button className="react-modal-close" onClick={onRequestClose}>
                <img src={CloseImg} alt="Fechar modal"/>
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>    

                <input type="text" placeholder="Título" value={title} onChange={(value) => setTitle(value.target.value)}/>

                <input type="number" placeholder="Valor" value={value} onChange={(value) => setValue(Number(value.target.value))}/> 

                <TransactionTypeContainer >
                    <RadioBox type="button" onClick={() => setType('deposit')} isActive={type === 'deposit'} activeColor='green'>
                        <img src={IncomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox type="button" onClick={() => setType('withdraw')} isActive={type === 'withdraw'} activeColor='red'>
                        <img src={OutcomeImg} alt="Saída"/>
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input type="text" placeholder="Categoria" value={category} onChange={(value) => setCategory(value.target.value)}/> 

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )
}