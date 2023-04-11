import {
  View,
  StyleSheet,
} from 'react-native';
import {
  useContext,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import {
  dbStore,
  dbUpdate,
  dbDelete,
} from '../util/http';

const styles = StyleSheet.create({
  expenseItem: {
    alignItems: 'flex-start',
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 14,
    minWidth: 30,
    minHeight: 30,
    marginHorizontal: 12,
    marginBottom: 22,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: GlobalStyles.colors.primary200,
  },
  expenseText: {
    color: 'white',
    margin: 2,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    paddingTop: 8,
    borderWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
function ManageExpenses({ route, navigation }) {
  const editingExpenseId = route.params?.id ?? '';
  const expenseCtx = useContext(ExpensesContext);
  // console.log(`[ManageExpenses] editingExpenseId: ${editingExpenseId}`);
  const {
    addExpense,
    deleteExpense,
    updateExpense,
  } = useContext(ExpensesContext);
  const isEditing = !!editingExpenseId;
  const { expenses } = expenseCtx;
  const selectedExpense = expenses.find(
    (expense) => expense.id === editingExpenseId,
  );
  useLayoutEffect(() => navigation.setOptions({
    title: isEditing ? 'Edit Expense' : 'Add Expense',
  }), [navigation, isEditing]);
  const confirmHandler = async (expenseData) => {
    if (isEditing) {
      // eslint-disable-next-line react/destructuring-assignment
      updateExpense(editingExpenseId, expenseData);
      await dbUpdate(editingExpenseId, expenseData);
    } else {
      const id = await dbStore(expenseData);
      // eslint-disable-next-line react/destructuring-assignment
      // expenseCtx.addExpense(expenseData);
      addExpense({ ...expenseData, id });
    }
    navigation.goBack();
  };

  const deleteExpenseHandler = async () => {
    // eslint-disable-next-line react/destructuring-assignment
    deleteExpense(editingExpenseId);
    await dbDelete(editingExpenseId);
    navigation.goBack();
  };
  const cancelHandler = () => {
    // console.log('[ManageExpenses] cancelHandler... ');
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

ManageExpenses.defaultProps = {
  route: () => {},
  navigation: () => {},
};

ManageExpenses.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.string,
      amount: PropTypes.number,
    }),
  }),
  navigation: () => {},
};
export default ManageExpenses;
