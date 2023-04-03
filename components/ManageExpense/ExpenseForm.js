import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import GenButton from '../UI/GenButton';
import { getFormattedDate } from '../../util/date';

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  form: {
    padding: 10,
    marginTop: 40,
    marginBottom: 110,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 120,
    // padding: 10,
  },
  button: {
    minWidth: 100,
    padding: 8,
  },
});
function ExpenseForm({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : '',
    date: defaultValues ? getFormattedDate(defaultValues.date) : '',
    description: defaultValues ? defaultValues.description : '',
  });
  const submitHandler = () => {
    // console.log('[ManageExpenses] confirmHandler... ');
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };
    onSubmit(expenseData);
  };
  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputValues((currentInputValues) => ({
      ...currentInputValues,
      // dynamically target input values...
      [inputIdentifier]: enteredValue,
    }));
  };
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense:</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'description'),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCorrect: True,
          // autoCapitalize: 'characters',
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <GenButton
          mode="flat"
          onPress={onCancel}
          style={styles.button}
        >
          Cancel
        </GenButton>
        <GenButton
          onPress={submitHandler}
          style={styles.button}
        >
          {submitButtonLabel}
        </GenButton>
      </View>
    </View>
  );
}
ExpenseForm.defaultProps = {
  submitButtonLabel: '',
  onCancel: () => {},
  onSubmit: () => {},
  defaultValues: '',
};
ExpenseForm.propTypes = {
  submitButtonLabel: PropTypes.string,
  defaultValues: () => {},
  onCancel: () => {},
  onSubmit: () => {},
};
export default ExpenseForm;
