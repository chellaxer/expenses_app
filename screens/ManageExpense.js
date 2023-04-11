import {
  View,
  StyleSheet,
} from 'react-native';
import {
  useContext,
  useLayoutEffect, useState,
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
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
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
  const errorHandler = () => {
    setError(null);
    setIsSubmitting(false);
    navigation.goBack();
  };
  useLayoutEffect(() => navigation.setOptions({
    title: isEditing ? 'Edit Expense' : 'Add Expense',
  }), [navigation, isEditing]);
  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true);
    let handled;
    if (isEditing) {
      // eslint-disable-next-line react/destructuring-assignment
      handled = await dbUpdate(editingExpenseId, expenseData);
      console.log(`[ManageExpenses] updated: ${JSON.stringify(handled?.error)}`);
      if (!handled?.error) {
        updateExpense(editingExpenseId, expenseData);
      }
    } else {
      handled = await dbStore(expenseData);
      // eslint-disable-next-line react/destructuring-assignment
      // expenseCtx.addExpense(expenseDa
      if (!handled?.error && handled?.data?.name) {
        addExpense({ ...expenseData, id: handled.data.name });
      }
    }
    setIsSubmitting(false);
    if (handled?.error) {
      setError(handled.error);
    } else {
      navigation.goBack();
    }
  };

  const deleteExpenseHandler = async () => {
    // eslint-disable-next-line react/destructuring-assignment
    setIsSubmitting(true);
    const del = await dbDelete(editingExpenseId);
    if (del?.error) {
      setError(del.error);
      setIsSubmitting(false);
    } else {
      deleteExpense(editingExpenseId);
      setIsSubmitting(false);
      navigation.goBack();
    }
  };
  const cancelHandler = () => {
    // console.log('[ManageExpenses] cancelHandler... ');
    navigation.goBack();
  };
  if (error && !isSubmitting) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={errorHandler}
      />
    );
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
  }
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
