import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import GenButton from '../UI/GenButton';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

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
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    // padding: 10,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
function ExpenseForm({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });
  const submitHandler = () => {
    console.log('[ExpenseForm] submitHandler... ');
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !Number.isNaN(expenseData?.amount)
      && expenseData?.amount > 0;
    const dateIsValid = expenseData?.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData?.description.trim().length > 0; // not empty

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currInputs) => ({
        amount: {
          value: currInputs.amount.value,
          isValid: amountIsValid,
        },
        date: {
          value: currInputs.date.value,
          isValid: dateIsValid,
        },
        description: {
          value: currInputs.description.value,
          isValid: descriptionIsValid,
        },
      }));
      // Alert.alert('Invalid Input', 'Please check your input values!');
      return;
    }

    onSubmit(expenseData);
  };
  const inputChangedHandler = useCallback((inputIdentifier, enteredValue) => {
    // eslint-disable-next-line max-len
    setInputs((currInputs) => (
      {
        ...currInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      }));
  }, []);
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    inputChangedHandler;
  });
  const invalidForm = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense:</Text>
        <View style={styles.inputsRow}>
          <Input
            invalid={!inputs.amount.isValid}
            style={styles.rowInput}
            label="Amount"
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: (amt) => inputChangedHandler('amount', amt),
              value: inputs.amount.value,
            }}
          />
          <Input
            invalid={!inputs.date.isValid}
            style={styles.rowInput}
            label="Date"
            textInputConfig={{
              placeholder: 'YYYY-MM-DD',
              // keyboardType: 'decimal-pad',
              onChangeText: (date) => inputChangedHandler('date', date),
              value: inputs.date.value,
            }}
          />
        </View>
        <Input
          invalid={!inputs.description.isValid}
          label="Description"
          textInputConfig={{
            multiline: true,
            maxLength: 10,
            onChangeText: (desc) => inputChangedHandler('description', desc),
            value: inputs.description.value,
          }}
        />
        {
        invalidForm && (
          <Text
            style={styles.errorText}
          >
            Invalid input value - please check entered values!
          </Text>
        )
      }
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
    </TouchableWithoutFeedback>
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
