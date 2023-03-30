import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function AllExpenses({ expenses }) {
  return (
    <ExpensesOutput
      expenses={expenses}
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
