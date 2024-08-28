import {CourseCreationBody, CourseCreationResponseBody} from "~/utils/types";
import {prisma} from "~/server/db";
// @ts-ignore
import jwt from "jsonwebtoken";


export default defineEventHandler(async (event: CourseCreationBody): Promise<CourseCreationResponseBody> => {
    const body: CourseCreationBody = await readBody(event);
    const token = getHeader(event, 'Authorization')?.replace('Bearer ', '');

    try {
        const secret = process.env.JWT_SECRET as string;
        const decodedJWT = jwt.verify(token, secret);

        if (decodedJWT.userType === "admin") {
            await prisma.course.create({
                data: {
                    ...body
                }
            });
            return {"message": `Course ${body.name} created.`} as CourseCreationResponseBody;
        } else {
            throw createError({statusCode: 403, statusMessage: 'Forbidden: Admins only'});
        }

    } catch (e) {
        return { "message": "Something went wrong" } as CourseCreationResponseBody;
    }
})