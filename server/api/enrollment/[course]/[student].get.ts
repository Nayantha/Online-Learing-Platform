// @ts-ignore
import {defineEventHandler, H3Event, readBody} from 'h3';
// @ts-ignore
import jwt from "jsonwebtoken";
import {prisma} from "~/server/db";

export default defineEventHandler(async (event: H3Event<Request>) => {
    const token = getHeader(event, 'Authorization')?.replace('Bearer ', '');
    const courseId: number = Number(event.context.params.course);
    const studentId: number = Number(event.context.params.student);

    try {
        const secret = process.env.JWT_SECRET as string;
        jwt.verify(token, secret);

        const enrollmentDetails = await prisma.enrollment.findUniqueOrThrow({
            where: {
                studentId_courseId: {
                    studentId: studentId,
                    courseId: courseId
                }
            }
        });
        return true;
    } catch (e) {
        return false;
    }
});