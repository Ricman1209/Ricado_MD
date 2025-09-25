# 1) Ir a la carpeta donde guardas tus proyectos
cd "C:\Users\coach\Universidad\Implementación de aplicaciones móviles"

# 2) Crear el proyecto Expo con template en blanco
# (se creará una carpeta llamada "Modal o el nombre que quieras")
npx create-expo-app@latest Modal --template blank

# 3) Entrar a la carpeta del proyecto recién creado
cd "C:\Users\coach\Universidad\Implementación de aplicaciones móviles\Modal"

# 4) Instalar dependencias para ejecutar en Web
# (algunas ya vienen con Expo, pero no pasa nada si se reinstalan)
npx expo install react-dom react-native-web @expo/metro-runtime

# 5) Iniciar el proyecto en el navegador Web
# --web   -> abre en navegador
npx expo start --web -c
# --android  -> abre en el emulador de android
npm run android
