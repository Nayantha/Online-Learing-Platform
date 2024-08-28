import {prisma} from '~/server/db';
// @ts-ignore
import jwt from "jsonwebtoken";
import {Course} from "~/utils/types";

export default defineEventHandler(async (event: any): Promise<Course[]> => {
    const token = getHeader(event, 'Authorization')?.replace('Bearer ', '');
    try {
        const secret = process.env.JWT_SECRET as string;
        jwt.verify(token, secret);
        return prisma.course.findMany() as Course[];
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            console.error('Token has expired:', error.expiredAt);
        } else {
            console.error('Error:', error.message);
        }
        return [] as Course[];
    }
});
