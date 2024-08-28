// @ts-ignore
import jwt from "jsonwebtoken";


export default defineEventHandler(async (event: any) => {
    const token: string = getRouterParam(event, 'token');
    try {
        const secret = process.env.JWT_SECRET as string;
        jwt.verify(token, secret);
        return true;
    } catch (e) {
        return false;
    }
})