import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
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
});
function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={expenses}
        periodName={expensesPeriod}
      />
      <ExpensesList
        expenses={expenses}
      />
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
