var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var express = require('express');
var router = express.Router();



router.post('/sayHello', function(req, res,next) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport(smtpTransport({
      /*    service: 'Gmail',

      auth: {
            user: 'vickyqliao@gmail.com', // Your email id
            pass: 'asdQWE123' // Your password
        }*/
        host:'mx-out.unisa.edu.au',
        port:25
    }));



    var mailOptions = {
    from: req.body.from, // sender address
    to: req.body.to, // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.content //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};



transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
});


module.exports = router;