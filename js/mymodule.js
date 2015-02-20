define(
    'mymodule', 
    ['jquery'], 
	['../../node_modules/nodemailer/src/nodemailer'],
    function( $, gallery_item ,nodemailer ) {
	
        return {  
            gallery : function(){
			console.log('email');
					// create reusable transporter object using SMTP transport
					var transporter = nodemailer.createTransport({
						service: 'Gmail',
						auth: {
							user: 'vorotina@gmail.com',
							pass: 'userpass'
						}
					});

					// NB! No need to recreate the transporter object. You can use
					// the same transporter object for all e-mails

					// setup e-mail data with unicode symbols
					var mailOptions = {
						from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
						to: 'vorotina@gmail.com, baz@blurdybloop.com', // list of receivers
						subject: 'Hello ✔', // Subject line
						text: 'Hello world ✔', // plaintext body
						html: '<b>Hello world ✔</b>' // html body
					};
					
					

					// send mail with defined transport object
					transporter.sendMail(mailOptions, function(error, info){
						if (error){
							console.log(error);
						} else{
							console.log('Message sent: ' + info.response);
						}
					});
			} 
        }
		
	}	
);