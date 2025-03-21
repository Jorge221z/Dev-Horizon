import AuthNavigation from "./AuthNavigation";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./MainNavigation";

const AppNavigation = ({ userToken }) => {
    return (
        <NavigationContainer>
            {userToken ? (
                <MainNavigation key="main" /> // 🔑 Key cambia al hacer logout
            ) : (
                <AuthNavigation key="auth" />
            )}
        </NavigationContainer>
    );
};

export default AppNavigation;