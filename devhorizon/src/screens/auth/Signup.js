import { SafeAreaView, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Button, Image } from "react-native-elements";
import Toast from "react-native-root-toast";
import { ErrorText, ActivityLoader } from "../../components/Shared";
import { useForm } from "react-hook-form";
import { EmailInput, PasswordInput, TextInput } from "../../components/inputs";
import { useState } from "react";
import { signup as signupService } from "../../services/AuthService";
import * as SecureStore from 'expo-secure-store';


const Signup = ({ navigation }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [secureEntry, setSecureEntry] = useState(true);
    const [secureConfirmationEntry, setSecureConfirmationEntry] = useState(true);
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const handleSignup = async (data) => {
      try {
        setLoading(true);
        const message = await signupService(data);
       // const token = await SecureStore.getItemAsync(USER_TOKEN_KEY);
        await navigation.navigate("Login");
        Toast.show(message, { position: Toast.positions.CENTER });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const toggleSecureEntry = () => {
      setSecureEntry(!secureEntry);
    };

    const toggleSecureConfirmationEntry = () => {
      setSecureConfirmationEntry(!secureConfirmationEntry);
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {loading === true ? <ActivityLoader /> : null}
          <Image
            source={require("../../../assets/app_icon.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Registro</Text>

          <ErrorText error={error} />

          <TextInput
            name="name"
            minLength={2}
            maxLength={30}
            control={control}
            errors={errors}
            iconName={"person-outline"}
            errorValidationStyle={styles.errorValidation}
            inputStyle={styles.input}
            placeholder="Nombre"
          />

          <EmailInput
            control={control}
            name="email"
            errors={errors}
            errorValidationStyle={styles.errorValidation}
            inputStyle={styles.input}
          />

          <PasswordInput
            control={control}
            name="password"
            errors={errors}
            errorValidationStyle={styles.errorValidation}
            inputStyle={styles.input}
            secureEntry={secureEntry}
            toggleSecureEntry={toggleSecureEntry}
            rules={{ required: "La contraseña es requerida" }}
          />

          <PasswordInput
            control={control}
            name="password_confirmation"
            errors={errors}
            errorValidationStyle={styles.errorValidation}
            inputStyle={styles.input}
            secureEntry={secureConfirmationEntry}
            toggleSecureEntry={toggleSecureConfirmationEntry}
            rules={{
              required: "Confirma tu contraseña",
              validate: (value) =>
                value === control.fieldsRef.current.password.value ||
                "Las contraseñas no coinciden",
            }}
          />

          <Button
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            title="Crear cuenta"
            type="outline"
            onPress={handleSubmit(handleSignup)}
            disabled={loading}
          />

          <Text
            onPress={() => navigation.navigate("Login")}
            style={styles.link}
          >
            Ya tengo una cuenta
          </Text>
        </View>
      </SafeAreaView>
    );
};

export default Signup;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$authBg",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "80%",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontFamily: "$700Bold",
    color: "$primary",
    fontWeight: "$fontWeight900",
    fontSize: 27,
    marginBottom: 5,
  },
  input: {
    fontFamily: "$400Regular",
    color: "$black",
    borderWidth: 0,
    borderBottomWidth: 1.5,
    borderBottomColor: "$primary",
    paddingVertical: 8,
    paddingHorizontal: 0,
    width: "100%",
    marginBottom: 13,
    paddingTop: 12,
  },
  errorValidation: {
    color: "$red",
    fontSize: "$font12",
  },
  buttonTitle: {
    fontFamily: "$400Regular",
    color: "$primary",
    fontSize: 22,
  },
  button: {
    borderColor: "transparent",
    paddingTop: 25,
  },
  link: {
    fontFamily: "$400Regular",
    fontSize: "$font12",
    color: "$black",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
