import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function RecentExpenses({ expenses }) {
  return (
    <ExpensesOutput
      expenses={expenses}
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
