import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const { expenses } = expensesCtx;
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const dateMinus7Days = getDateMinusDays(today, 7);
    return (
      (expense.date >= dateMinus7Days)
      && (expense.date <= today)
    );
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
    />
  );
}
RecentExpenses.defaultProps = {
  expenses: () => {},
};
RecentExpenses.propTypes = {
  /* eslint-disable-next-line */
  expenses: () => {},
};

export default RecentExpenses;
