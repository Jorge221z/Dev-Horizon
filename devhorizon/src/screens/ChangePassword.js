import { SafeAreaView, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const ChangePassword = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <Text style={styles.text}>
                    Cambiar contraseña
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default ChangePassword;

const styles = EStyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '$appBg',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: '$primary',
      fontWeight: '$fontWeight600',
      fontSize: '$font24',
    }
  });
  