import { VercelRequest, VercelResponse } from "@vercel/node";

const users = ["Bob Smith", "Guillaume Bibeau"];

export default (req: VercelRequest, res: VercelResponse) => {
    const { id } = req.query;
    res.status(200).json({ user: users[Number(id)] });
};