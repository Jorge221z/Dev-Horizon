import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "../../screens/Main";

const Stack = createNativeStackNavigator();

export default function MainStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main menu" component={Main} options={{ headerTitleAlign: 'center' }}/>
        </Stack.Navigator>
    );
}


