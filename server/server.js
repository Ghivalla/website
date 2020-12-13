const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const express = require('express')
const app = express()
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.post('/send-email', function (req, res) {
    const { email, name, message } = req.body
    const msg = {
        to: 'ghivalla.soumar@gmail.com',
        from: email,
        subject: `Website : New message from ${name}`,
        text: message,
        html: `<p>${message}</p>`,
    };
    (async () => {
        try {
          await sgMail.send(msg);
          res.status(200).json('message sent successfully')
        } catch (err) {
          console.error(err.toString());
          res.status(400).json('something went wrong...')
        }
    })();
})

app.listen(3001, function () {
  console.log('App listening on port 3001!')
})
