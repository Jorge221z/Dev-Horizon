import { Controller } from 'react-hook-form';
import { Input, Text, View } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function EmailInput({ name, control, errors, inputStyle, errorValidationStyle }) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="at" size={24} color="black" style={{ marginRight: 10 }} />
            <Input
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              style={[inputStyle, { fontSize: EStyleSheet.value('$inputFontSize'), fontWeight: EStyleSheet.value('$inputFontWeight') }]}
              placeholder="Email"
              placeholderTextColor="black"
              keyboardType="email-address"
              variant="unstyled" // Elimina los estilos predeterminados
              borderWidth={0} // Asegura que no haya bordes
              _focus={{ borderColor: 'transparent', backgroundColor: 'transparent' }} // Elimina bordes al enfocar
            />
          </View>
        )}
        rules={{
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        }}
      />
      {errors[name]?.type === "required" && (
        <Text style={errorValidationStyle}>Este campo es obligatorio.</Text>
      )}
      {errors[name]?.type === "pattern" && (
        <Text style={errorValidationStyle}>El formato no es válido.</Text>
      )}
    </>
  );
}