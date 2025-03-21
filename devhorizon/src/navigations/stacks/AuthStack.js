import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import Constants from 'expo-constants';
import Login from '../../screens/auth/Login';
import Signup from '../../screens/auth/Signup';

const Stack = createNativeStackNavigator();

const AuthStack = ({ appName = Constants.expoConfig.name }) => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerBackTitle: "devhorizon",
                headerShown: true,
                headerTitle: appName,
                headerTitleAlign: "center",
                headerStyle: styles.headerStyle,
                headerShadowVisible: false,
                headerTintColor: "$primary",
                headerTitleStyle: {
                    fontFamily: "Lato_700Bold",
                    fontSize: 28,
                    color: styles.header.color,
                },
            }}
        >
            
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup}  />
        </Stack.Navigator>
    );
};


export default AuthStack;

const styles = EStyleSheet.create({
    headerStyle: {
      backgroundColor: "$authBg",
    },
    header: {
      fontSize: '$font28',
      color: "$primary",
      fontFamily: '$700Bold',
    }
  });
  