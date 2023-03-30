import {
  View,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../../constants/styles';

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
function ExpenseItem({ description, date, amount }) {
  console.log(`[ExpenseItem] description: ${description}`);
  console.log(`[ExpenseItem] date: ${date}`);
  console.log(`[ExpenseItem] amount: ${amount}`);
  // return <Text>{description}</Text>;
  return (
    <Pressable>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{date}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text>{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}
ExpenseItem.defaultProps = {
  description: '',
  amount: 0,
  date: '',
};
ExpenseItem.propTypes = {
  description: PropTypes.string,
  amount: PropTypes.number,
  date: PropTypes.string,
};
export default ExpenseItem;
