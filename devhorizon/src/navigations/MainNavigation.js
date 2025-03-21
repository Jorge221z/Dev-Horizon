import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import Constants from 'expo-constants';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent';
import MainStack from './stacks/MainStack';
import ProfileStack from './stacks/ProfileStack';
import { Tab } from 'react-native-elements';
import { Icon } from 'native-base';

const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabBar = ({ appName = Constants.expoConfig.name }) => {
    return (
        <BottomTabs.Navigator
            initialRouteName='Main'
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused }) => showIcon(route, focused),
                headerRight: () => menuIcon(navigation),
                tabBarStyle: {
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    alignItems: 'center',
                    backgroundColor: styles.tabStyles.backgroundColor,
                    paddingTop: 5,
                    position: 'absolute',
                    overflow: 'hidden',
                },
                headerTitleAlign: 'center',
            })}
        >


            <BottomTabs.Screen
                name="Main"
                component={MainStack}
                options={{ 
                    title: '',
                    headerTitle: appName,
                    headertTitleAlign: 'center',
                    headerStyle: styles.headerStyle,
                    headerTintColor: styles.header.color,
                    headerTitleStyle: {
                        fontFamily: styles.header.fontFamily,
                        fontSize: styles.header.fontSize,
                        fontWeight: styles.header.fontWeight,
                    }
                 }}
            />
            <BottomTabs.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    title: '', 
                    headerTitle: appName,
                    headertTitleAlign: 'center',
                    headerStyle: styles.headerStyle,
                    headerTintColor: styles.header.color,
                    headerTitleStyle: {
                        fontFamily: styles.header.fontFamily,
                        fontSize: styles.header.fontSize,
                        fontWeight: styles.header.fontWeight,
                    }
                 }}
            />
        </BottomTabs.Navigator>
    );
}


const showIcon = (route, focused) => {
    let icon = "";

    switch (route.name) {
        case "Main":
            icon = "home";
            break;
        case "Profile":
            icon = "person-outline";
            break;
        default:
            icon = "home";
            break;   
    }
    return <Ionicons name={icon} size={27} type="ionicon" style={{ marginTop: 2 }}  color={focused ? "#2570e3" : "white"}/>; 
}

const menuIcon = (navigation) => {
    return <Ionicons name="menu" size={30} color="white" style={{ marginTop: 2, marginRight: 10 }} type="ionicon" onPress={() => navigation.toggleDrawer()} />
}



export default function MainNavigation() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Drawer.Screen name="BottomTabs" component={TabBar}  />
        </Drawer.Navigator>
    )
}

const styles = EStyleSheet.create({
    tabStyles: {
      backgroundColor: '$black',
    },
    headerStyle: {
      backgroundColor: "$primary",
      shadowColor: "$primary",
    },
    header: {
      color: "$white",
      fontFamily: '$700Bold',
      fontSize: '$font22',
        fontWeight: 'bold',
    }
  });