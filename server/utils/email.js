import nodemailer from "nodemailer";

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name;
    this.url = url;
    this.from = `HEALTH pharmacy <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    const transport = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: { user, pass },
    });

    return transport;
  }

  async send(subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: "This message was sent from Node js server.",
      html: `This <i>message</i> was sent from <strong>${this.url}</strong> server.`,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    await this.send("Ваш токен сброса пароля (действителен только 10 минут)");
  }
}

export default Email;
