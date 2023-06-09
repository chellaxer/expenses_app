import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../../constants/styles';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
});
function ExpensesSummary({ expenses, periodName }) {
  let expensesSum;
  // console.log(`[ExpensesSummary] expenses: ${JSON.stringify(expenses)}`);
  if (expenses && Array.isArray(expenses?.data) && expenses?.data.length > 0) {
    expensesSum = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>
        $
        {expensesSum && expensesSum.toFixed(2)}
      </Text>
    </View>
  );
}
ExpensesSummary.defaultProps = {
  periodName: '',
  expenses: () => {},
};
ExpensesSummary.propTypes = {
  periodName: PropTypes.string,
  expenses: () => {},
};

export default ExpensesSummary;
