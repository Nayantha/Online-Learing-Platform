// @ts-ignore
import {defineEventHandler, H3Event, readBody} from 'h3';
import {CourseCreationResponseBody, CourseEnrollmentBody} from "~/utils/types";
// @ts-ignore
import jwt from "jsonwebtoken";
import {prisma} from "~/server/db";

export default defineEventHandler(async (event: H3Event<Request>): Promise<CourseCreationResponseBody> => {
    const token = getHeader(event, 'Authorization')?.replace('Bearer ', '');
    const body: CourseEnrollmentBody = await readBody(event);

    try {
        const secret = process.env.JWT_SECRET as string;
        jwt.verify(token, secret);

        await prisma.enrollment.create({
            data: {
                ...body
            }
        });
        return {"message": `Student ${body.studentId} is now enrolled in Course ${body.courseId}.`} as CourseCreationResponseBody;

    } catch (e) {
        return {"message": "Something went wrong"} as CourseCreationResponseBody;
    }
})