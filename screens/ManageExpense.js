import {
  View,
  StyleSheet,
} from 'react-native';
import { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import GenButton from '../components/UI/GenButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
function ManageExpenses({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  useLayoutEffect(() => navigation.setOptions({
    title: isEditing ? 'Edit Expense' : 'Add Expense',
  }), [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    console.log('[ManageExpenses] deleteExpenseHandler... ');
  };
  const cancelHandler = () => {
    console.log('[ManageExpenses] cancelHandler... ');
    navigation.goBack();
  };
  const confirmHandler = () => {
    console.log('[ManageExpenses] confirmHandler... ');
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <GenButton
          mode="flat"
          onPress={cancelHandler}
          style={styles.button}
        >
          Cancel
        </GenButton>
        <GenButton
          onPress={confirmHandler}
          style={styles.button}
        >
          {isEditing ? 'Update' : 'Add'}
        </GenButton>
      </View>
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
      expenseId: PropTypes.string,
    }),
  }),
  navigation: () => {},
};
export default ManageExpenses;
