import {prisma} from '~/server/db';
import {Course, CourseCreationResponseBody} from '~/utils/types';
// @ts-ignore
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event: any): Promise<CourseCreationResponseBody> => {
    const updatedCourse: Course = await readBody(event);
    const token = getHeader(event, 'Authorization')?.replace('Bearer ', '');
    const courseId: number = Number(getRouterParam(event, 'id'));
    updatedCourse.id = courseId;

    try {
        const secret = process.env.JWT_SECRET as string;
        const decodedJWT = jwt.verify(token, secret);

        if (decodedJWT.userType === "admin") {
            await prisma.course.update({
                where: {
                    id: courseId,
                },
                data: {
                    ...updatedCourse,
                },
            });
            return {"message": `Course ${updatedCourse.name} created.`} as CourseCreationResponseBody;
        } else {
            throw createError({statusCode: 403, statusMessage: 'Forbidden: Admins only'});
        }
    } catch (error) {
        console.error('Error updating course:', error);
        return {"message": "Something went wrong"} as CourseCreationResponseBody;
    }
});
