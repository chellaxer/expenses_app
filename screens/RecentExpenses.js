import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays, getFormattedDate } from '../util/date';

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const dateMinus7Days = getDateMinusDays(today, 7);
    return expense.date >= dateMinus7Days;
  });
  console.log(`[RecentExpenses] recentExpenses: ${JSON.stringify(RecentExpenses)}`);
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
  expenses: () => {},
};

export default RecentExpenses;
