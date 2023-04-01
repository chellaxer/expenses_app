import {
  View,
  StyleSheet,
} from 'react-native';
import Input from './Input';

function ExpenseForm() {
  function amountChangeHandler() {

  }
  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: amountChangeHandler,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCorrect: True,
          // autoCapitalize: 'characters',
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
    </View>
  );
}

export default ExpenseForm;