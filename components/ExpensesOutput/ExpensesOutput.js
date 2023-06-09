import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  // console.log(`[ExpensesOutput] expenses: ${JSON.stringify(expenses)}`);
  if (expenses && Array.isArray(expenses)) {
  // if (expenses.length > 0) {
    content = (
      <ExpensesList
        expenses={expenses}
      />
    );
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={expenses}
        periodName={expensesPeriod}
      />
      {content}
    </View>
  );
}
ExpensesOutput.defaultProps = {
  expensesPeriod: '',
  expenses: () => {},
};
ExpensesOutput.propTypes = {
  expensesPeriod: PropTypes.string,
  expenses: () => {},
};
export default ExpensesOutput;
