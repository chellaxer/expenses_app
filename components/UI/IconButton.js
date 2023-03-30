import {
  Pressable,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
    marginVertical: 2,
    marginHorizontal: 18,
  },
  pressed: {
    opacity: 0.75,
  },
});
function IconButton({
  icon, size, color, onPress,
}) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        style={(pressed) => pressed && styles.pressed}
      >
        <View>
          <Ionicons
            name={icon}
            size={size}
            color={color}
            onPress={onPress}
          />
        </View>
      </Pressable>
    </View>
  );
}
IconButton.defaultProps = {
  icon: '',
  size: 0,
  color: '',
  onPress: () => {},
};
IconButton.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  onPress: () => {},
};
export default IconButton;
