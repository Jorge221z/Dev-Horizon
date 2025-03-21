import {View, Text, } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar} from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import { logout } from "../services/AuthService";
import { useAuth, USER_KEY } from "../providers/AuthProvider";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
import Toast from "react-native-root-toast";
import { useState, useEffect } from "react";
import { CommonActions } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

export default function DrawerContent (props) {
    const [user, setUser] = useState([]);

    useEffect(() => {   //obtenemos el usuario para trabajar con el//
      (async () => {
        const _user = await SecureStore.getItemAsync(USER_KEY);
        setUser(JSON.parse(_user));
      })();
    }, []);

    const { handleLogout } = useAuth();

    return (
      <View style={ styles.drawerContent}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfo}> 
              <View style={{flexDirection: "row", marginTop: 15}}>
                <Avatar 
                  rounded
                  size="medium"
                  source={require("../../assets/avatar.png")}
                />

                {user && 
                    <View style={{marginLeft: 15, marginTop: 15}}>
                      <Text style={styles.title}>{user.name}</Text>
                     <Text style={styles.subtitle}>{user.email}</Text>
                    </View>
                 }
                </View>
            </View>

                <View style={styles.drawerItem}>
                 <DrawerItem
                      label="Home"
                      labelStyle={styles.label}
                      onPress={() => props.navigation.navigate("Main")}
                      icon={() => (
                        <Ionicons
                          name="home"
                          size={22}
                          type="ionicon"
                        />
                      )}
                />
                </View>

                <View style={styles.drawerItem}>
                 <DrawerItem
                      label="Profile"
                      labelStyle={styles.label}
                      onPress={() => props.navigation.navigate("Profile")}
                      icon={() => (
                        <Ionicons
                          name="person-outline"
                          size={22}
                          type="ionicon"
                        />
                      )}
                />
                </View>

          </View>
        </DrawerContentScrollView>

        <View style={styles.bottomDrawerItem}>
          <DrawerItem
            label="Cerrar sesión"
            labelStyle={styles.label}
            onPress={async () => {
              try {
                props.navigation.dispatch(DrawerActions.closeDrawer());
                  await handleLogout(); 
                  Toast.show("Sesión cerrada");
                  
                   
              } catch (error) {
                  // "Unauthorized" es esperado tras el primer logout exitoso
                  if (error.message !== "Unauthenticated.") {
                      Toast.show(error.message);
                  }
              }
          }}
          />
        </View>
      </View>
    );

}



const styles = EStyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfo: {
    paddingLeft: 20,
  },
  title: {
    fontSize: '$font16',
    marginTop: 3,
    fontWeight: "bold",
    fontFamily: '$700Bold',
  },
  subtitle: {
    fontSize: '$font14',
    lineHeight: 14,
    fontFamily: '$400Regular',
  },
  drawerItem: {
    marginTop: 15,
  },
  label: {
    fontFamily: '$400Regular',
  },
  bottomDrawerItem: {
    marginBottom: 10,
    borderTopColor: "#ddd5d5",
    borderTopWidth: 1,
  },
});