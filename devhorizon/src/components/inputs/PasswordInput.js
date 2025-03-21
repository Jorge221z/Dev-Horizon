import { Controller } from 'react-hook-form';
import { Input, Text, View } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function PasswordInput({ name, control, errors, inputStyle, errorValidationStyle, secureEntry, toggleSecureEntry }) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="key" size={24} color="black" style={{ marginRight: 10 }} />
            <Input
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              style={[inputStyle, { fontSize: EStyleSheet.value('$inputFontSize'), fontWeight: EStyleSheet.value('$inputFontWeight') }]}
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry={secureEntry}
              variant="unstyled"
              borderWidth={0}
              _focus={{ borderColor: 'transparent', backgroundColor: 'transparent' }}
              InputRightElement={
                <Ionicons
                  name={secureEntry ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                  onPress={toggleSecureEntry}
                  style={{ margin: 10, marginRight: 0 }}
                />
              }
            />
          </View>
        )}
        rules={{
          required: true,
          minLength: 4,
          maxLength: 20,
        }}
      />
      {errors[name]?.type === "required" && (
        <Text style={errorValidationStyle}>Este campo es obligatorio.</Text>
      )}
      {errors[name]?.type === "minLength" && (
        <Text style={errorValidationStyle}>La contraseña es demasiado corta.</Text>
      )}
      {errors[name]?.type === "maxLength" && (
        <Text style={errorValidationStyle}>La contraseña es demasiado larga.</Text>
      )}
    </>
  );
}