require('dotenv').config();

const cors = require('cors');

const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');

const express = require('express');
const app = express();
app.use(express.json())

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//CROSS ORIGIN___________________________________
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();

});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASSWORD_MAIL
    }
});


app.post('/send_mail', (req, res) => {
    const { full_name, email, message } = req.body.data;
    transporter.sendMail({
        from: 'kylevelarde374@gmail.com',
        to: 'kylevelarde374@gmail.com',
        subject: "Message from your Portfolio",
        text: `Name: ${ full_name } __________, Email: ${ email }__________, Message: ${ message }`
    }, (err, info) => {
        if(err) res.json({ success: 'not-success' }); 

        res.json({ success: 'success' });
    });
});

app.listen((process.env.PORT || 8080));