
# Mi Proyecto Html-Modularizado

Este proyecto es una aplicación web modularizada creada con HTML, CSS y JavaScript. Utiliza *Nodemailer* para el envío de correos electrónicos y *Express* para servir la página.

## Estructura del Proyecto
~~~
/mi-proyecto 
    /public 
        /css styles.css 
    /images 
        /teamwork.jpg 
    /js 
        /load-components.js 
    header.html 
    footer.html 
    principal.html 
    servicios.html 
    contacto.html 
    acerca.html 
    index.html 
    .env 
    .gitignore 
    package.json 
    server.js 
    README.md
~~~

## Configuración y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/jacksdy/html-modularizado.git
cd html-modularizado
```
### 2. Instalar dependencias
Asegúrate de tener Node.js instalado.

```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto con las siguientes variables:


```bash
'plaintext'
EMAIL_USER=tu.email@gmail.com
EMAIL_PASS=tu.contraseña_de_aplicación
```

### 4. Ejecutar la aplicación
Para ejecutar la aplicación en modo desarrollo con Nodemon:

```bash
npm run dev
```
Para ejecutar la aplicación en modo producción:


```bash
npm start
```
La aplicación estará disponible en:  ```http://localhost:3000```

#### Archivos Importantes

index.html: Página principal de la aplicación.

#### Componentes modulares cargados en la página principal: 
header.html, footer.html, principal.html, servicios.html, contacto.html, acerca.html.

#### load-components.js: 
JavaScript que carga los componentes HTML de manera dinámica.

#### styles.css: 
Hoja de estilos CSS que define la apariencia de la aplicación.

#### server.js: 
Archivo principal del servidor que configura Express y Nodemailer.

#### Funcionalidades
Modularización: El proyecto está dividido en componentes modulares para una mejor organización.

#### Cambio de Tema: 
Botón para cambiar entre temas claro y oscuro.

#### Envío de Correos: 
Formulario de contacto que envía correos electrónicos utilizando Nodemailer.

Contribuir
Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que te gustaría hacer.
