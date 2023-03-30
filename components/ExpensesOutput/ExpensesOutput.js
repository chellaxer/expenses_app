import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Nike shoes',
    amount: 59.99,
    date: new Date('2021-12-19').toDateString(),
  },
  {
    id: 'e2',
    description: 'Polo Slacks',
    amount: 89.99,
    date: new Date('2021-01-05').toDateString(),
  },
  {
    id: 'e3',
    description: 'Grocery',
    amount: 6.99,
    date: new Date('2021-12-01').toDateString(),
  },
  {
    id: 'e4',
    description: 'Moby Dick Novel',
    amount: 14.95,
    date: new Date('2022-02-19').toDateString(),
  },
  {
    id: 'e5',
    description: 'How to Garden book',
    amount: 18.95,
    date: new Date('2022-02-18').toDateString(),
  },
  {
    id: 'e6',
    description: 'Dress Shoes',
    amount: 200.95,
    date: new Date('2022-03-18').toDateString(),
  },
  {
    id: 'e7',
    description: 'Motorcycle Helmet',
    amount: 650.93,
    date: new Date('2022-05-01').toDateString(),
  },
  {
    id: 'e8',
    description: 'Motorcycle Jacket',
    amount: 551.26,
    date: new Date('2022-05-02').toDateString(),
  },
];
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
        expenses={DUMMY_EXPENSES}
        periodName={expensesPeriod}
      />
      <ExpensesList
        expenses={DUMMY_EXPENSES}
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
