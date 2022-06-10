import nodemailer from 'nodemailer';
import variables from '../config/variables.config.js'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: variables.EMAIL_USER,
    pass: variables.EMAIL_PASSWORD,
  },
});
  
  export  const sendReserve = function (){
 
    transporter.sendMail({
        from: `"Temporal" <${variables.EMAIL_USER}>`, // sender address
        to: variables.EMAIL_RECIVERS, // list of receivers
        subject: `Reserva Realizada ✔`, // Subject line
        text: `Se generado la reserva`, // plain text body
        html: `<b>Se generado la reserva </b>`, // html body
      }).then(info => {
        console.log({info});
      }).catch(console.error);
      return 'exito'
  }

  
