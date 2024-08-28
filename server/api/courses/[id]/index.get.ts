import {prisma} from '~/server/db';
import {Course} from '~/utils/types';
// @ts-ignore
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event: any) => {
    const courseId: number = Number(getRouterParam(event, 'id'));
    const token = getHeader(event, 'Authorization')?.replace('Bearer ', '');

    try {
        const secret = process.env.JWT_SECRET as string;
        jwt.verify(token, secret);

        return prisma.course.findUniqueOrThrow({
            where: {
                id: courseId
            }
        }) as Course;
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            console.error('Token has expired:', error.expiredAt);
        } else {
            console.error('Error:', error.message);
        }
        return [] as Course[];
    }
});
