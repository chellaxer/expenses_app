/* eslint-disable react/jsx-props-no-spreading */
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
function Input({ label, textInputConfig }) {
  let inputStyles;
  inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    console.log(`[Input] textInputConfig: ${JSON.stringify(textInputConfig)}`);
    /* eslint-disable-next-line */
    inputStyles.push(styles.inputMultiLine);
  }
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;
