import { useState } from 'react';
import Modal from 'react-modal';
import Logo from '../../assets/logo.svg';
import { Container, Content } from './style';


type HeaderProps = {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {

    return (
        <Container>
            <Content>
                <img src={Logo} alt="dt money"/>
                <button onClick={onOpenNewTransactionModal}>Nova transação</button>


            </Content>
        </Container>
    );
}