import { VercelRequest, VercelResponse } from "@vercel/node";
import MailgunManagerService from "../../../controllers/webhooks/MailgunManagerService";

export  default async (req: VercelRequest, res: VercelResponse) => {
    const method = req.method;
    switch (method) {
        case "POST":
        case "PUT": {
            await MailgunManagerService.parseIncomingEmail(req.body);
            return res.send(200);
            break;
        }
        default:
            return res.status(404);
            break;
    }
};