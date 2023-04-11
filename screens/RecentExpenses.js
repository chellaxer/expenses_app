import {
  useContext,
  useEffect,
  useState,
} from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { dbFetch } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const onConfirmHandler = () => {
    setError(null);
    setIsFetching(false);
  };
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const fetchedExpenses = await dbFetch();
      if (fetchedExpenses?.error) {
        setError(fetchedExpenses.error);
      } else {
        setIsFetching(false);
        setExpenses(fetchedExpenses.data);
      }
    }
    getExpenses().catch((err) => console.log(`[RecentExpenses] [getExpenses] error: ${err.message}`));
    // eslint-disable-next-line
  }, []);

  if (error) {
    return <ErrorOverlay onConfirm={onConfirmHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  console.log(`[RecentExpenses] expenses: ${JSON.stringify(expenses)}`);
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
