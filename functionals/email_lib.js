const nodemailer = require('nodemailer')
const mailgunTransport = require('nodemailer-mailgun-transport')
const mailgunOptions = {
  auth: {
    api_key: "e88d6b3551a89ecf44a974bb3350fe02-9b463597-20e1b8d0",
    domain: "sandbox07e510b477bb44fcb7eeccf0195540ec.mailgun.org",
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