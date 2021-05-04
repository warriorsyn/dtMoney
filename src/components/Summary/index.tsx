import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import TotalImg from '../../assets/total.svg';
import { useTransaction } from '../../contexts/Transactions/TransactionContext';
import { Container } from "./style";

export function Summary() {

    const { getTotalByType } = useTransaction();

    const totalDeposit =  new Intl.NumberFormat('pt-BR', {currency: 'BRL', style: 'currency'}).format(getTotalByType('deposit'));
    const totalWithdraw = new Intl.NumberFormat('pt-BR', {currency: 'BRL', style: 'currency'}).format(getTotalByType('withdraw'));
    const total = new Intl.NumberFormat('pt-BR', {currency: 'BRL', style: 'currency'}).format(getTotalByType('deposit') - getTotalByType('withdraw'));
    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomeImg} alt=""/>
                </header>
                <strong>{totalDeposit}</strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={OutcomeImg} alt=""/>
                </header>
                <strong>- {totalWithdraw}</strong>
            </div>

            <div>
                <header>
                    <p>Total</p>
                    <img src={TotalImg} alt=""/>
                </header>
                <strong>{total}</strong>
            </div>
        </Container>
    )
}