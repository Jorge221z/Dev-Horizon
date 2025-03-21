import { SafeAreaView, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Button } from "react-native-elements";


const Profile = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <Button 
                    title="Cambiar contraseña"
                    onPress={() => navigation.navigate("ChangePassword")}
                    buttonStyle={styles.button}
                />
            </View>
        </SafeAreaView>
    );
}

export default Profile;


const styles = EStyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '$appBg',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '$primary',
    }
  });
  