import { connectToDatabase } from '../../lib/mongodb'

class MailgunManagerService {
  constructor() {}

  async parseIncomingEmail(email: any) {
    try {
      var { db } = await connectToDatabase();
      await db.collection('email-backup').insertOne({
        email: email
      });
      console.log("Email from " + email?.sender + " / " + email?.subject);
      console.log(email);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default new MailgunManagerService();