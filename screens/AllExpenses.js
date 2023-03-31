import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

function AllExpenses({ expenses }) {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
    />
  );
}
AllExpenses.defaultProps = {
  expenses: () => {},
};
AllExpenses.propTypes = {
  expenses: () => {},
};
export default AllExpenses;
