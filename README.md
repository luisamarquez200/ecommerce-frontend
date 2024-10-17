Para ejecutar el frontend de tu aplicación localmente, sigue estos pasos:

1. Instalar Node.js
Asegúrate de tener Node.js instalado en tu máquina. Puedes verificarlo ejecutando el siguiente comando en tu terminal:

node -v
Si no lo tienes instalado, descárgalo e instálalo desde la página oficial.

2. Clonar el Repositorio
Si aún no has clonado tu repositorio, utiliza el siguiente comando, reemplazando <https://github.com/luisamarquez200/ecommerce-frontend.git> con la URL de tu repositorio en GitHub:

bash
Copiar código
git clone <https://github.com/luisamarquez200/ecommerce-frontend.git>
Luego navega al directorio del proyecto:

3. Instalar Dependencias
Dentro del directorio del proyecto, instala las dependencias necesarias utilizando el siguiente comando:

npm install
Esto descargará e instalará todos los paquetes necesarios que están especificados en el archivo package.json.

5. Configurar el Entorno

API_URL=http://localhost:4000/api

5. Ejecutar el Servidor de Desarrollo
Para iniciar el servidor de desarrollo y ejecutar la aplicación, utiliza el siguiente comando:

npm run dev
Esto debería iniciar el servidor de desarrollo, normalmente en http://localhost:5173 o un puerto similar, dependiendo de tu configuración.
