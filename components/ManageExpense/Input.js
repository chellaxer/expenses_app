/* eslint-disable react/jsx-props-no-spreading */
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../../constants/styles';

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
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
function Input({ label, textInputConfig, style }) {
  let inputStyles;
  // eslint-disable-next-line prefer-const
  inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    /* eslint-disable-next-line */
    inputStyles.push(styles.inputMultiLine);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

Input.defaulProps = {
  label: PropTypes.string,
  // textInputConfig: () => {},
  style: () => {},
};

Input.propTypes = {
  label: PropTypes.string,
  // textInputConfig: () => {},
  style: () => {},
};
export default Input;
