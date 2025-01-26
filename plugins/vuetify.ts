import 'vuetify/styles'; // Importa los estilos globales de Vuetify
import { createVuetify } from 'vuetify';

// Crear la instancia de Vuetify
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark', // Puedes cambiar a 'light' si lo prefieres
  },
});

export default vuetify;
