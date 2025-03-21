import EStyleSheet from 'react-native-extended-stylesheet';
import metrics from './metrics';

EStyleSheet.build({
    // Colores
    $primary: '#2570e3',
    $appBg: '#dbdcdc',
    $authBg: '#eaf1f1',
    $accent: '#cc00cc',
    $orange: '#e5722a',
    $red: '#dd3333',
    $gray: '#6d6861',
    $darkGray: '#282828',
    $black: '#000000',
    $white: '#ffffff',

    // Pesos de fuente
    $fontWeight400: 400,
    $fontWeight600: 600,
    $fontWeight900: 900,
    $inputFontWeight: 'bold',

    // Familias de fuente Lato
    $100Thin: 'Lato_100Thin',
    $400Regular: 'Lato_400Regular',
    $700Bold: 'Lato_700Bold',

    // Tamaños de fuente escalables
    $font6: metrics.calc(6),
    $font8: metrics.calc(8),
    $font10: metrics.calc(10),
    $font12: metrics.calc(12),
    $font14: metrics.calc(14),
    $font16: metrics.calc(16),
    $font20: metrics.calc(20),
    $font22: metrics.calc(22),
    $font24: metrics.calc(24),
    $font28: metrics.calc(28),
    $font32: metrics.calc(32),
    $inputFontSize: metrics.calc(14),
});