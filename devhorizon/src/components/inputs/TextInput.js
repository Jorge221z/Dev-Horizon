import { Controller } from 'react-hook-form';
import { Input, Text, View } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function TextInput({
  name,
  required = true,
  minLength,
  maxLength,
  pattern,
  iconName,
  control,
  errors,
  inputStyle,
  errorValidationStyle,
  keyboardType = "default",
  placeholder,
}) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {iconName && (
              <Ionicons
                name={iconName}
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            )}
            <Input
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              style={[
                inputStyle,
                {
                  fontSize: EStyleSheet.value('$inputFontSize'),
                  fontWeight: EStyleSheet.value('$inputFontWeight'),
                },
              ]}
              placeholder={placeholder}
              placeholderTextColor="black"
              keyboardType={keyboardType}
              variant="unstyled"
              borderWidth={0}
              _focus={{ borderColor: 'transparent', backgroundColor: 'transparent' }}
            />
          </View>
        )}
        rules={{
          required,
          minLength,
          maxLength,
          pattern,
        }}
      />
      {errors[name]?.type === "required" && (
        <Text style={errorValidationStyle}>Este campo es obligatorio.</Text>
      )}
      {errors[name]?.type === "minLength" && (
        <Text style={errorValidationStyle}>Longitud demasiado corta.</Text>
      )}
      {errors[name]?.type === "maxLength" && (
        <Text style={errorValidationStyle}>Longitud demasiado larga.</Text>
      )}
      {errors[name]?.type === "pattern" && (
        <Text style={errorValidationStyle}>El formato no es válido.</Text>
      )}
    </>
  );
}