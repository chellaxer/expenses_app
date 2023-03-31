import {
  View,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
// import ManageExpenses from '../../screens/ManageExpense';

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
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
});
function ExpenseItem({
  id, description, date, amount,
}) {
  const nav = useNavigation();
  const expensePressHandler = () => {
    nav.navigate('ManageExpenses', {
      id,
      description,
      date: getFormattedDate(date),
      amount,
    });
  };
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{id}</Text>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
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
  date: { getFormattedDate },
  id: '',
};
ExpenseItem.propTypes = {
  description: PropTypes.string,
  amount: PropTypes.number,
  date: PropTypes.instanceOf(Date),
  id: PropTypes.string,
};
export default ExpenseItem;
