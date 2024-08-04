const nodemailer = require('nodemailer');
const fs = require('fs');

module.exports = class Email {
  constructor(user, url) {
    this.user = user;
    this.url = url;
    this.from = 'gokul <krishnagokul1729@gmail.com>';
  }

  newTransport() {
    return nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '3cdee7ce347300',
        pass: '269f4524e75e06',
      },
    });
  }

  async send(subject, templatePath, placeholders) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = this.replacePlaceholders(template, placeholders);

    const mailOptions = {
      from: this.from,
      to: this.user.email,
      subject,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  replacePlaceholders(template, placeholders) {
    let html = template;
    for (const key in placeholders) {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), placeholders[key]);
    }
    return html;
  }

  async sendWelcome() {
    await this.send('Welcome to Natours', `${__dirname}/../view/welcome.html`, {
      name: this.user.name,
      url: this.url,
    });
  }

  async sendBookingConfirmation(tourDetails) {
    console.log(tourDetails);
    await this.send(
      'Booking Confirmation',
      `${__dirname}/../view/Booked.html`,
      {
        name: this.user.name,
        url: this.url,
        tourName: tourDetails.name,
        tourDuration: `${tourDetails.duration} days`,
        tourPrice: tourDetails.price,
      }
    );
  }
};