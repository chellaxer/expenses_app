import {
  Pressable,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../../constants/styles';

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
function GenButton({
  children, onPress, mode, style,
}) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, (mode === 'flat' && styles.flatText)]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

GenButton.defaultProps = {
  children: '',
  mode: '',
  style: () => {},
  onPress: () => {},
};
GenButton.propTypes = {
  children: PropTypes.string,
  mode: PropTypes.string,
  onPress: () => {},
  style: () => {},
};
export default GenButton;
