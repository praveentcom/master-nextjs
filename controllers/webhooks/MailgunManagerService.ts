class MailgunManagerService {
    constructor() {}

    parseIncomingEmail(email: any) {
        console.log(email)
        return email;
    }

}

export default new MailgunManagerService();