var connect = require('connect');
var nodemailer = require('nodemailer');
var port = process.env.PORT || 3000;

connect.createServer(connect.static(__dirname)).listen(port);
console.log('Listening on ' + port + '...');
console.log('Press Ctrl + C to stop');



function sendEmail() {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "vorotina@gmail.com",
            pass: "Gala_GraDiva_ru"
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Fred Foo <foo@blurdybloop.com>", // sender address
        to: "vorotina@gmail.com", // list of receivers
        subject: "Сообщение с сайта!", // Subject line
        text: "Text", // plaintext body
        html: "Text" // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: " + info.response);
    });

}
