
require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Parser para los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para el archivo principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configurar transporte Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Reemplaza con tu email
        pass: process.env.EMAIL_PASS, // Reemplaza con tu contraseña de aplicación
    }
});

// Ruta para enviar emails
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    console.log('Datos recibidos del formulario:', { name, email, message });

    const mailOptions = {
        from: process.env.EMAIL_USER,       // Debe ser tu email
        to: 'asdrubalgonzalezg@gmail.com',  // El correo que recibe
        replyTo: email,                     // El email del remitente
        subject: `Mensaje de ${name}`,      // Asunto o Titulo del correo
        text: message,                      // El mensaje del correo
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            res.json({ success: false });
        } else {
            console.log('Correo enviado:', info.response);
            res.json({ success: true });
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


