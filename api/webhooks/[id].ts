import { VercelRequest, VercelResponse } from "@vercel/node";

const users = [""];

export default (req: VercelRequest, res: VercelResponse) => {
    const { id } = req.query;
    res.status(200).json({ user: users[Number(id)] });
};