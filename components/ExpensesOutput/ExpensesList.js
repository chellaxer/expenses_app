import {
  FlatList,
} from 'react-native';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem(data) {
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <ExpenseItem {...data.item} />
  );
}
function ExpensesList({ expenses }) {
  console.log(`[ExpensesList] ${JSON.stringify(expenses)}`);
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

ExpensesList.defaultProps = {
  expenses: () => {},
};

ExpensesList.propTypes = {
  expenses: () => {},
};
export default ExpensesList;
