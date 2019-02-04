const nodemailer = require('nodemailer')
const mailgunTransport = require('nodemailer-mailgun-transport')
const mailgunOptions = {
  auth: {
    api_key: "08926764465f8dbdc223032dbb7d2633-9b463597-c0532c42",
    domain: "marketing.metalpro.pt",
  }
}
const transport = mailgunTransport(mailgunOptions)
class EmailService {
  constructor() {
    this.emailClient = nodemailer.createTransport(transport)
  }
  sendText(from, to, subject, text, html) {
    return new Promise((resolve, reject) => {
      this.emailClient.sendMail({
        from,
        to,
        subject,
        text,
        html
      }, (err, info) => {
        if (err) {
          reject(err)
        } else {
          resolve(info)
        }
      })
    })
  }
}
module.exports = new EmailService()