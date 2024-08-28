import {prisma} from '~/server/db';
import {CourseCreationResponseBody} from "~/utils/types";
// @ts-ignore
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event: any): Promise<CourseCreationResponseBody> => {
    const courseId: String = event.context.params.id;
    const token = getHeader(event, 'Authorization')?.replace('Bearer ', '');

    try {
        const secret = process.env.JWT_SECRET as string;
        const decodedJWT = jwt.verify(token, secret);

        if (decodedJWT.userType === "admin") {
            await prisma.course.delete({
                where: {
                    // @ts-ignore
                    id: parseInt(courseId)
                }
            });
            return {"message": `Course is removed.`} as CourseCreationResponseBody;
        } else {
            throw createError({statusCode: 403, statusMessage: 'Forbidden: Admins only'});
        }
    } catch (e) {
        return { "message": "Something went wrong" } as CourseCreationResponseBody;
    }
});
