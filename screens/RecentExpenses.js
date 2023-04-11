import {
  useContext,
  useEffect,
} from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { dbFetch } from '../util/http';

function RecentExpenses() {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      const fetchedExpenses = await dbFetch();
      setExpenses(fetchedExpenses);
    }
    getExpenses().catch((err) => console.log(`[RecentExpenses] [getExpenses] error: ${err.message}`));
    // eslint-disable-next-line
  }, []);
  // console.log(`[RecentExpenses] POST useEffect expenses: ${JSON.stringify(expenses)}`);

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
      // expenses={fetchedExpenses}
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
