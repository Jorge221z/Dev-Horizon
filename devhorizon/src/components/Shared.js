import { ActivityIndicator, View } from "react-native";
import { Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export const ErrorText = ({ error }) => {
    return <Text style={styles.errorText}>{error}</Text>
}

export const ActivityLoader = () => {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", position:"absolute" }}>
        <ActivityIndicator size="large" color="#f29866" />
    </View>
}



//estilos del mensaje//
const styles = EStyleSheet.create({
    errorText: {
        color: '$red',
        fontFamily: '$400Regular',
        fontSize: "$font14",
        marginBottom: 8,
    },
});

