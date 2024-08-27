import { CourseCreationBody, CourseCreationResponseBody } from "~/utils/types";
import { prisma } from "~/server/db";


export default defineEventHandler(async (event: CourseCreationBody): Promise<CourseCreationResponseBody> => {
    const body: CourseCreationBody = await readBody(event);
    try {
        await prisma.course.create({
            data: {
                ...body
            }
        });
        return { "message": `Course ${ body.name } created.` } as CourseCreationResponseBody;
    } catch (e) {
        return { "message": "Something went wrong" } as CourseCreationResponseBody;
    }
})