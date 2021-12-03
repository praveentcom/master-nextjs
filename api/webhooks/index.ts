import { VercelRequest, VercelResponse } from "@vercel/node";

export default (req: VercelRequest, res: VercelResponse) => {
    const { id } = req.query;
    const method = req.method;
    switch (method) {
        case "GET":
        case "POST":
        case "PUT":
        default: {

            break;
        }
    }
};