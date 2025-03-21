# DevHorizon
App movil desarrollada con react native y expo. Backend desarollado con laravel 12 y entorno docker.
# DevHorizon

App móvil desarrollada con React Native y Expo. Backend desarrollado con Laravel 12, entorno Docker y Laravel Sail.

## Tabla de Contenidos
- [Requisitos](#requisitos)
- [Instalación](#instalación)
  - [Backend (Laravel 12 con Docker y Laravel Sail)](#backend-laravel-12-con-docker-y-laravel-sail)
  - [Frontend (React Native con Expo)](#frontend-react-native-con-expo)
- [Uso](#uso)
- [Comandos Útiles](#comandos-útiles)
- [Notas](#notas)

## Requisitos
- **Docker** y **Docker Compose** instalados y funcionando.
- **PHP** (recomendado 8.0 o superior) y **Composer**.
- **Node.js** (recomendado v14 o superior) y **npm**.
- **Expo CLI** instalado globalmente:
  ```bash
  npm install -g expo-cli

Instalación
Backend (Laravel 12 con Docker y Laravel Sail)

    Clonar el repositorio:

git clone https://tu-repositorio-url.git
cd tu-repositorio

Configurar el entorno:

    Copia el archivo de ejemplo y configúralo:

    cp .env.example .env

    Revisa y ajusta las variables de entorno en el archivo .env según sea necesario.

Instalar dependencias de PHP: Si aún no lo has hecho, instala Sail:

composer require laravel/sail --dev

Luego, instala las dependencias:

./vendor/bin/sail composer install

Levantar el entorno Docker con Laravel Sail:

./vendor/bin/sail up -d

Esto iniciará los contenedores necesarios (web, base de datos, etc.).

Generar la clave de la aplicación:

./vendor/bin/sail artisan key:generate

Ejecutar migraciones (y seeders si aplica):

./vendor/bin/sail artisan migrate

Si necesitas sembrar datos de prueba:

    ./vendor/bin/sail artisan db:seed

Frontend (React Native con Expo)

    Navegar al directorio del frontend:

cd frontend

Instalar dependencias:

npm install

Iniciar la aplicación con Expo: Usa npx para ejecutar Expo sin necesidad de tenerlo instalado globalmente:

    npx expo start

    Esto abrirá el Metro Bundler y te permitirá ejecutar la app en un emulador o dispositivo físico.

Uso

    Backend:
    Con Laravel Sail en funcionamiento, la API estará disponible en http://localhost (o el puerto especificado en tu .env). Asegúrate de que la configuración de la base de datos en el archivo .env sea correcta.

    Frontend:
    La aplicación móvil se ejecutará a través de Expo. Usa el Metro Bundler para ver la app en un simulador o en tu dispositivo escaneando el código QR.

Comandos Útiles

    Backend (Laravel Sail):
        Levantar los contenedores:

./vendor/bin/sail up -d

Detener los contenedores:

./vendor/bin/sail down

Instalar dependencias:

./vendor/bin/sail composer install

Ejecutar migraciones:

    ./vendor/bin/sail artisan migrate

Frontend (Expo):

    Iniciar Expo:

        npx expo start

Notas

    Asegúrate de que Docker y Docker Compose estén correctamente instalados y configurados.
    Verifica que los puertos configurados no entren en conflicto con otros servicios en tu máquina.
    Personaliza el archivo .env según las necesidades específicas de tu entorno de desarrollo.
    Para más detalles y configuraciones avanzadas, revisa la documentación de Laravel Sail y la documentación de Expo.


Ahora todo está ajustado según lo que mencionaste. ¡Espero que te sirva!
