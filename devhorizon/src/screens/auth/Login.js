import { SafeAreaView, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Button, Image } from "react-native-elements";
import Toast from "react-native-root-toast";
import { ErrorText, ActivityLoader } from "../../components/Shared";
import { useForm } from "react-hook-form";
import { EmailInput, PasswordInput } from "../../components/inputs";
import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider"; //contiene los handle y el state//
import { login as loginService } from "../../services/AuthService";

const Login = ({ navigation }) => {
  const [error, setError] = useState(null); // Errores del servidor (Laravel)
  const [loading, setLoading] = useState(false);
  const [secureEntry, setSecureEntry] = useState(true);
  const { control, handleSubmit, formState: { errors } } = useForm(); // Errores del cliente

  const { handleLogin } = useAuth(); // Importa la función de login


  const submitLogin = async (data) => {
    try {
      setLoading(true);
      const response = await loginService(data); //peticion a la api//
      await handleLogin(response.data); // Guarda el token en el contexto
      Toast.show(
        response.message,
        { position: Toast.positions.CENTER, duration: 2000 }
      );
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } 
  };

  const toggleSecureEntry = () => {
    setSecureEntry(!secureEntry); // Cambia el estado al contrario
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {loading === true ? <ActivityLoader /> : null}
        <Image
          source={require("../../../assets/app_icon.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Inicio de sesión</Text>
        <ErrorText error={error} />
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
        />
        <Button
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          title="Acceder"
          type="outline"
          onPress={handleSubmit(submitLogin)}
        />

        <Text
        onPress={() => navigation.navigate("Signup")}
        style={styles.link}
        >
          Crear una cuenta
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$authBg",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "80%", // Define un ancho para el contenido
    alignItems: "center", // Centra los elementos horizontalmente dentro del View
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
    fontSize: 24, // Ajusta el tamaño si es necesario
    marginBottom: 5, // Espacio debajo del título
  },
  input: {
    fontFamily: "$400Regular",
    color: "$black",
    borderWidth: 0, // Quita el borde completo
    borderBottomWidth: 1.5, // Solo deja una línea inferior
    borderBottomColor: "$primary", // Usa tu color primario en lugar de 'blue'
    paddingVertical: 8, // Espacio vertical interno
    paddingHorizontal: 0, // Quita el padding horizontal para alinear mejor
    width: "100%", // Asegura que el input ocupe todo el ancho del contenedor
    marginBottom: 13, // Espacio debajo del input
    paddingTop: 12, // Añade espacio debajo del texto
  },
  errorValidation: {
    color: "$red",
    fontSize: "$font12",
  },
  buttonTitle: {
    fontFamily: '$400Regular',
    color: '$primary',
    fontSize: 22,
  },
  button: {
    borderColor: 'transparent',
    paddingTop: 25,
  },
  link: {
    fontFamily: "$400Regular",
    fontSize: '$font12',
    color: '$black',
    textDecorationLine: "underline",
    marginTop: 10,
  },

});