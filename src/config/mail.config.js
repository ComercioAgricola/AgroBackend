const nodemailer = require('nodemailer');

const mail = {
    user: 'agroMarketPlaceUQ@gmail.com',
    pass: process.env.PASS_EMAIL
}

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    tls: {
        rejectUnauthorized:false
    },
    secure: false, // true for 465, false for other ports
    auth: {
        user: mail.user, // generated ethereal user
        pass: mail.pass, // generated ethereal password
    },
});

const sendEmail = async (email, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"AgroMarketPlace" <${mail.user}>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: html, // html body
        });
    } catch (error) {
        console.log('Algo salio mal al enviar el email : ', error)
    }
}

const getTemplate = (name, token) => {
    return`
    <head>
        <meta charset="UTF-8">
        <title>Verificación de correo electrónico</title>
    </head>
    <body>
        <h1>Verificación de correo electrónico</h1>
        <p>Hola ${name},</p>
        <p>Gracias por registrarte en nuestro sitio. Para verificar tu correo electrónico, por favor haz clic en el siguiente enlace:</p>
        <a href="https://agromarketplace2023.web.app/user/confirm/${token}" target="_blank">Haz click AQUI para verificar tu correo</a>
        <p>Si no has creado una cuenta en nuestro sitio, por favor ignora este mensaje.</p>
        <p>Gracias.</p>
        <p>El equipo de AgroMarketPlace</p>
    </body>
    `
}

module.exports = {
    sendEmail,
    getTemplate
}